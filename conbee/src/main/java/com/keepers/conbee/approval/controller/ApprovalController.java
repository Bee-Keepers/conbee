
package com.keepers.conbee.approval.controller;

import java.util.HashMap;
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
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.approval.model.service.ApprovalService;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("approval")
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
public class ApprovalController { // 전자결재 컨트롤러

	private final ApprovalService service; 



	// ============================== 페이지 포워드 ==============================

	/** 임시저장함 (전자결재 첫 페이지) 포워드
	* @return
	* @author 예리나
	*/
	@GetMapping("tempSave")
	public String tempSave() {
		return "approval/tempSave";
	}


	/** 기안문작성 포워드
	* @return
	* @author 예리나
	*/
	@GetMapping("writeApproval")
	public String writeApproval() {
		return "approval/writeApproval";
	}

//	/** 결재요청함 포워드
//	* @return
//	* @author 예리나
//	*/
//	@GetMapping("requestApproval")
//	public String requestApproval() {
//		return "approval/requestApproval";
//	}

	/** 회수문서함 포워드
	* @return
	* @author 예리나
	*/
	@GetMapping("reclaimeApproval")
	public String reclaimeApproval() {
		return "approval/reclaimeApproval";
	}

	/** 결재대기함 포워드
	* @return
	* @author 예리나
	*/
	@GetMapping("waitApproval")
	public String waitApproval() {
		return "approval/waitApproval";
	}

	/** 결재진행함 포워드
	* @return
	* @author 예리나
	*/
	@GetMapping("progressApproval")
	public String progressApproval() {
		return "approval/progressApproval";
	}

	/** 완료문서함 포워드
	* @return
	* @author 예리나
	*/
	@GetMapping("completeApproval")
	public String completeApproval() {
		return "approval/completeApproval";
	}

	/** 반려문서함 포워드
	* @return
	* @author 예리나
	*/
	@GetMapping("returnApproval")
	public String returnApproval() {
		return "approval/returnApproval";
	}

	/** 협조문서함 포워드
	* @return
	* @author 예리나
	*/
	@GetMapping("joinApproval")
	public String joinApproval() {
		return "approval/joinApproval";
	}
	
	
	// ============================== 임시 저장함 ==============================
	

	// ============================== 기안문 작성 ==============================

	/** 기안문 작성자 정보 조회 - 로그인한 회원의 이름, 팀이름, 결재자 받아오기
	* @param loginMember
	* @return map
	* @author 유진
	*/
	@GetMapping(value = "writeApproval/docWriteInfos", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public Map<String, Object> selectWriteInfo(@SessionAttribute(value="loginMember", required=false) Member loginMember) {
	
		// 이건 나중에 삭제
		if(loginMember==null) {
		  return null;
		}
		
		// 로그인한 회원의 이름, 팀이름, 결재자 받아오기
		Member member = service.selectWriteInfo(loginMember.getMemberNo());
		List<Member> InfoApproverList = service.selectApproverList(loginMember.getMemberNo());
		
		Map<String, Object> docWriteInfosMap = new HashMap<>();
		docWriteInfosMap.put("infoName", member.getMemberName());
		docWriteInfosMap.put("infoTeam", member.getTeamName());	
		docWriteInfosMap.put("InfoApproverList", InfoApproverList);


		return docWriteInfosMap;

	}


	/** 기안문 insert
	* @param doc
	* @param ConditionBtn
	* @param loginMember
	* @param approval
	* @param ra
	* @return
	* @author 유진
	*/
	@PostMapping("writeApproval/{doc}")
	public String insertApproval(@PathVariable("doc") String doc,
							@RequestParam("approvalCondition") int approvalCondition,
							@SessionAttribute("loginMember") Member loginMember,
							Approval approval, RedirectAttributes ra) {
		              		// 파일첨부 추가예정
		int departNo;
		int cateNo;
		
		switch(doc) {
		case "docHoliday" : departNo=0; cateNo=0; break;
		case "docRetirement" : departNo=0; cateNo=1; break;
		case "docStore" : departNo=0;  cateNo = approval.getDocStoreState()==0?2:3; break; //출점:2 폐점:3
		case "docExpense" : departNo=1; cateNo=4; break;
		case "docOrder" : departNo=1; cateNo=5; break;
		default : departNo=0; cateNo=0; 
		}
		
		// 값 세팅
		approval.setApprovalCondition(approvalCondition); // 문서 상태
		approval.setMemberNo(loginMember.getMemberNo()); // 사원 번호
		approval.setDepartmentNo(departNo); // 협조부서 코드
		approval.setDocCategoryNo(cateNo); // 문서 분류 번호
			
		int result = service.insertApproval(approval);
		
		log.debug(result+"d");
		log.debug(approval.getApprovalCondition()+"s");
		
		if(result > 0 && approval.getApprovalCondition()==0) {
		  ra.addFlashAttribute("message", "결재 요청이 완료되었습니다.");
		  return "redirect:/approval/requestApproval";
		}
		
		if(result > 0 && approval.getApprovalCondition()==1) {
		  ra.addFlashAttribute("message", "임시저장이 완료되었습니다.");
		  return "redirect:/approval/tempSave";
		}
		
		// 실패 시 
		ra.addFlashAttribute("message", "오류");
		return "redirect:/approval/writeApproval";
	}
	
	
	
	// ============================== 결재 요청함 ==============================
	
	@GetMapping("requestApproval")
	public String selectRequestApproval(Model model,@SessionAttribute("loginMember") Member loginMember) { // cp 추가예정
		
		
		List<Approval> requestApprovalList = service.selectRequestApproval(loginMember.getMemberNo());
		
		model.addAttribute("requestApprovalList",requestApprovalList);
		
		return "approval/requestApproval";
	}
	
	// ============================== 회수 문서함 ==============================
	
	
	// ============================== 결재 대기함 ==============================
	
	
	// ============================== 완료 문서함 ==============================
	
	
	// ============================== 반려 문서함 ==============================
	
	
	// ============================== 협조 문서함 ==============================
	
	
	// =========================================================================
	

}
