package com.keepers.conbee.admin.member.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.admin.member.model.service.AdminMemberService;
import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.email.model.service.EmailService;
import com.keepers.conbee.email.model.service.EmailServiceImpl;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("admin/memberManage")

public class AdminMemberController {
	
	private final EmailServiceImpl emailService;
	
	private final AdminMemberService service;
	
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡ 1. 회원 조회 ㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	
	/** 회원조회 화면 전환
	 * @return
	 * @author 김민규
	 */
	@GetMapping("memberList")
	public String readAllMemberList(Model model, @RequestParam Map<String, Object> paramMap,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp){ 
		
		// 검색이 아닌 일반 목록 조회인 경우
		if(paramMap.get("query") == null) {
			Map<String, Object> map = service.readAllMemberList(cp);
			model.addAttribute("map", map);
		}
		
		// 검색
		else {
			Map<String, Object> map = service.searchMemberList(paramMap, cp);
			model.addAttribute("map", map);
		}
		
		return "admin/memberManage/memberList";
	}

	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 2. 회원 등록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	/** 회원등록 화면 전환
	 * @return
	 * @author 김민규
	 */
	@GetMapping("signUp")
	public String signUp(){
		return "admin/memberManage/signUp";
	}
	
	
	/** 회원가입
	 * @param inputMember
	 * @param 
	 * @return
	 */
	@PostMapping("signUp/insert")
	public String memberInsert(Member inputMember, RedirectAttributes ra) {
		log.info("--------------------" + inputMember.getStoreNo());
		String tempPw = emailService.createAuthKey();
		inputMember.setMemberPw(tempPw);
		emailService.sendEmail("tempPw", inputMember.getMemberEmail(), tempPw);
		
		log.info("=-=-=-===-=-=-=-=-=-="+inputMember);
		int result = service.memberInsert(inputMember);
		
		if(result>0) {
			ra.addFlashAttribute("message", "회원 가입 성공");
			return "redirect:/admin/memberManage/memberList";
		} 
		ra.addFlashAttribute("message", "가입 실패");
		return "redirect:/admin/memberManage/signUp";
	}
	
	
	
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원 등록 유효성 검사ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	
	// 아이디 유효성 검사
	@GetMapping("checkMemberId")
	@ResponseBody
	public int checkMemberId(String memberId) {
		int result = service.checkMemberId(memberId);
		return result;
	}
	
	
	// 이메일 유효성 검사
	@GetMapping("checkMemberEmail")
	@ResponseBody
	public int checkMemberEmail(String memberEmail) {
		int result = service.checkMemberEmail(memberEmail);
		return result;
	}
	
	// 점포번호 유효성 검사
	@GetMapping("checkStoreNo")
	@ResponseBody
	public int checkStoreNo(Store storeNo) {
		int result = service.checkStoreNo(storeNo);
		return result;
	}
	
	// 회원 주소 유효성 검사
	@GetMapping("checkMemberAddress")
	@ResponseBody
	public int checkMemberAddress(String memberAddress) {
		int result = service.checkMemberAddress(memberAddress);
		return result;
	}
	
	
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 3. 회원 탈퇴 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	@GetMapping("changeMemberDelFl/{memberNo:[0-9]+}/{memberDelFl:[A-Z]}") // 회원 탈퇴 경로
	public String changeMemberDelFl(@PathVariable("memberDelFl") String memberDelFl, @PathVariable("memberNo") int memberNo, RedirectAttributes ra) {
		
		int result = service.changeMemberDelFl(memberDelFl, memberNo);
		
		// result에 담긴 값이 있을 때 
		if(result > 0) {
			ra.addFlashAttribute("message", "회원 탈퇴 성공");
		} else { // result에 담긴 값이 없을 때
			ra.addFlashAttribute("message", "회원 탈퇴 실패");
		}
		
		// 반환 (위에 result 데이터 값만 남겨두고 나머지는 다 삭제 >> redirect!!)
		// redirect가 있어서 redirectAttributes로 값을 반환
		return "redirect:/admin/memberManage/memberList";
	}

	
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 4. 회원 수정 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	// 수정 화면 전환
	@GetMapping("memberUpdate")
	public String  memberUpdate() {
		
		return "admin/memberManage/memberUpdate";
	}
	
	// 수정 화면
	@PostMapping("memberUpdate/update")
	public String memberUpdateResult(Member updateMember, RedirectAttributes ra) {
		
		int result = service.memberUpdateResult(updateMember);
		
		if(result>0) {
			ra.addFlashAttribute("message", "수정 성공");
			return "redirect:/admin/memberManage/memberList";
		}
		ra.addFlashAttribute("message", "수정 실패");
		return "redirect:/admin/memberManage/memberUpdate";
		
	}
	
	
	//============================= 예리나 =====================================
	
	/** 회원가입 시 부서 선택 후 팀 셀렉 기능
	 * @author 예리나
	 * @param departmentNo
	 * @return
	 */
	@GetMapping("teamNoList")
	@ResponseBody
	public List<Member> teamNoList(String departmentNo){
		
		List<Member> teamList = service.teamList(departmentNo);
		
		return teamList;
	}




















}
























