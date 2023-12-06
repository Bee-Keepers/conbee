package com.keepers.conbee.admin.member.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.admin.member.model.service.AdminMemberService;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("admin/memberManage")

public class AdminMemberController {
	
	private final AdminMemberService service;
	
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡ 회원 조회 ㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	
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
		
		else {
			Map<String, Object> map = service.searchMemberList(paramMap, cp);
			model.addAttribute("map", map);
		}
		
		return "admin/memberManage/memberList";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
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
	 * @param ra
	 * @return
	 */
	@PostMapping("signUp/insert")
	public String memberInsert(Member inputMember, RedirectAttributes ra) {
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
	public int checkStoreNo(int storeNo) {
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
	
	
}
























