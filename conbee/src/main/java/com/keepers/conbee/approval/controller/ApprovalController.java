
package com.keepers.conbee.approval.controller;

import java.io.IOException;
import java.util.ArrayList;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.approval.model.dto.Approver;
import com.keepers.conbee.approval.model.dto.CommandDTO;
import com.keepers.conbee.approval.model.service.ApprovalService;
import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.stock.model.dto.Stock;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("approval")
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
public class ApprovalController { // 전자결재 컨트롤러

	private final ApprovalService service; 

	
	// ============================== 임시 저장함 ==============================

	/** 임시저장함 (전자결재 첫 페이지) 포워드
	 * @param loginMember
	 * @param model
	 * @return
	 * @author 유진
	 */
	@GetMapping("tempSave")
	public String tempSave(@SessionAttribute("loginMember") Member loginMember, Model model,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		
		Map<String, Object> map = service.selectTempSave(loginMember.getMemberNo(), cp);
		model.addAttribute("map",map);
		
		return "approval/tempSave";
			
	}
	
	/** 임시저장 문서 삭제
	 * @param loginMember
	 * @param approvalNo
	 * @param ra
	 * @return
	 */
	@GetMapping("deleteTempApproval")
	public String deleteTempApproval(@SessionAttribute("loginMember") Member loginMember,
			@RequestParam("approvalNo") int approvalNo, @RequestParam("currentUrl") String currentUrl, RedirectAttributes ra) {
		
		log.debug(approvalNo + "----");
		
		int result = service.deleteTempApproval(loginMember.getMemberNo(), approvalNo);
		
		if(result > 0) {
			ra.addFlashAttribute("message", "문서가 삭제되었습니다.");			
		} else {
			ra.addFlashAttribute("message", "문서 삭제 실패");	
		}
		
		return "redirect:" + currentUrl;
	}
	
	/** 임시저장 데이터 불러오기
	 * @param approvalNo
	 * @return
	 */
	@GetMapping(value = "tempSave/selectTempData", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public Map<String, Object> selectTempData(int approvalNo, int docCategoryNo) {
		
		Map<String, Object> map = service.selectTempData(approvalNo,docCategoryNo);
				

		return map;
	}
	
	
	/** 재작성
	 * @param doc
	 * @param approvalCondition
	 * @param loginMember
	 * @param approval
	 * @param command
	 * @param approverMemNo
	 * @param approvalFile
	 * @param ra
	 * @return
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@PostMapping("updateApproval/{doc}")
	public String updateApproval(@PathVariable("doc") String doc,
							@RequestParam("approvalCondition") int approvalCondition,
							@SessionAttribute("loginMember") Member loginMember,
							Approval approval,
							CommandDTO command,
							@RequestParam(value="approverMemNo", required=false) List<Integer> approverMemNo,
							@RequestParam(value="approvalFile", required=false) MultipartFile approvalFile,
							RedirectAttributes ra) throws IllegalStateException, IOException {
		
		
		log.debug(approval +"====================");
		
		/* 문서 정보 셋팅 */
		int departNo;
		int cateNo;
		
		log.debug(approval.getDocStoreState()+"===");
		
		switch(doc) {
		case "docHoliday" 	 : departNo=0; cateNo=0; break;
		case "docRetirement" : departNo=0; cateNo=1; break;
		case "docStore" 	 : {departNo=0; 
								if(approval.getStoreNo()==200|| approval.getDocStoreState()==200) {cateNo=6;}
								else {cateNo = approval.getDocStoreState()==0?2:3;}
								break; //출점:2 폐점:3 미선택:6}
								}
		case "docExpense" 	 : departNo=1; cateNo=4; break;
		case "docOrder" 	 : departNo=1; cateNo=5; break;
		default 			 : departNo=0; cateNo=0; 
		}	
		
		if(approval.getApprovalTitle().equals("")) approval.setApprovalTitle("제목 없음"); // 임시저장 제목 null인경우
		approval.setApprovalCondition(approvalCondition); // 문서 상태
		approval.setMemberNo(loginMember.getMemberNo()); // 사원 번호
		approval.setDepartmentNo(departNo); // 협조부서 코드
		approval.setDocCategoryNo(cateNo); // 문서 분류 번호

		if(cateNo==2 || cateNo==6) { // 출점인 경우 storeNo는 NULL 
			approval.setStoreNo(-1);
		}
		
		log.debug(approval.getStoreNo()+"--");
		
		/* 결재자 정보 셋팅 */
		List<Approver> approverList = new ArrayList<>();
		
		if(approverMemNo!=null) {			
			
			for(int i=0; i<approverMemNo.size(); i++) {
				Approver approver = new Approver();
				
				approver.setMemberNo(approverMemNo.get(i)); // 결재자 회원번호
				approver.setApproverCondition(0);// 결재상태 미승인=0
				approver.setApproverOrder(i);// 결재순서
				
				approverList.add(approver);
			}
		}
		
		int result = service.updateApproval(approval, approverList, approvalFile, command);
		
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
	

	// ============================== 기안문 작성 ==============================
	
	/** 기안문작성 포워드
	 * @author 예리나
	 * @return
	 */
	@GetMapping("writeApproval")
	public String writeApproval() {
		return "approval/writeApproval";
	}
	
	
	/** 기안문 작성자 정보 조회
	* @param loginMember
	* @return teamName
	* @author 유진
	*/
	@GetMapping(value = "writeApproval/selectInfo", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public Member selectInfo(@SessionAttribute(value="loginMember", required=false) Member loginMember) {
	
		Member writeInfo = service.selectInfo(loginMember.getMemberNo());
		return writeInfo;
	}
	
	
	/** 부서 모든 멤버 조회
	 * @param selectDepartment
	 * @return
	 */
	@GetMapping(value = "writeApproval/selectAllMember", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Member> selectAllMember(String selectDepartment){
		List<Member> departmentMember = service.selectAllMember(selectDepartment);
		return departmentMember;
	}
	
	/** 팀 멤버 조회
	 * @param selectTeam
	 * @return
	 */
	@GetMapping(value = "writeApproval/selectTeamMember", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Member> selectTeamMember(String selectTeam){
		List<Member> teamMember = service.selectTeamMember(selectTeam);
		return teamMember;
	}
	
	/** 멤버 조회
	 * @param memberNo
	 * @return
	 */
	@GetMapping(value = "writeApproval/selectMember", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public Member selectMember(int memberNo) {	
		Member memberInfo = service.selectMember(memberNo);
		return memberInfo;
	}
	
	


	/** 기안문 insert
	 * @param doc : 문서종류
	 * @param approvalCondition : 문서상태 0-결재중, 1-임시저장
	 * @param loginMember : 로그인한 회원정보
	 * @param approval : 문서내용
	 * @param approverMemNo : 결재자 회원번호 list
	 * @param file : 등록한 file
	 * @param ra
	 * @return
	 * @author 유진
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@PostMapping("writeApproval/{doc}")
	public String insertApproval(@PathVariable("doc") String doc,
							@RequestParam("approvalCondition") int approvalCondition,
							@SessionAttribute("loginMember") Member loginMember, 
							Approval approval, 
							CommandDTO command,
							@RequestParam(value="approverMemNo", required=false) List<Integer> approverMemNo,
							@RequestParam(value="approvalFile", required=false) MultipartFile approvalFile,
							RedirectAttributes ra) throws IllegalStateException, IOException {


		/* 문서 정보 셋팅 */
		int departNo;
		int cateNo;
		
		log.debug(approval.getDocStoreState()+"===");
		
		switch(doc) {
		case "docHoliday" 	 : departNo=0; cateNo=0; break;
		case "docRetirement" : departNo=0; cateNo=1; break;
		case "docStore" 	 : {departNo=0; 
								if(approval.getStoreNo()==200 || approval.getDocStoreState()==200) {cateNo=6;}
								else {cateNo = approval.getDocStoreState()==0?2:3;}
								break; //출점:2 폐점:3 미선택:6}
								}
		case "docExpense" 	 : departNo=1; cateNo=4; break;
		case "docOrder" 	 : departNo=1; cateNo=5; break;
		default 			 : departNo=0; cateNo=0; 
		}
				
		if(approval.getApprovalTitle().equals("")) approval.setApprovalTitle("제목 없음"); // 임시저장 제목 null인경우
		approval.setApprovalCondition(approvalCondition); // 문서 상태
		approval.setMemberNo(loginMember.getMemberNo()); // 사원 번호
		approval.setDepartmentNo(departNo); // 협조부서 코드
		approval.setDocCategoryNo(cateNo); // 문서 분류 번호

		if(cateNo==2 || cateNo==6) { // 출점인 경우 storeNo는 NULL 
			approval.setStoreNo(-1);
		}
		
		
		/* 결재자 정보 셋팅 */
		List<Approver> approverList = new ArrayList<>();
		
		if(approverMemNo!=null) {			
			
			for(int i=0; i<approverMemNo.size(); i++) {
				Approver approver = new Approver();
				
				approver.setMemberNo(approverMemNo.get(i)); // 결재자 회원번호
				approver.setApproverCondition(0);// 결재상태 미승인=0
				approver.setApproverOrder(i);// 결재순서
				
				approverList.add(approver);
			}
		}
	
		int result = service.insertApproval(approval, approverList, approvalFile, command);
		
		
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
	
	
	/** 점포 존재 조회
	 * @param storeNo
	 * @return
	 */
	@GetMapping(value = "writeApproval/searchStoreNo", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public int searchStoreNo(int storeNo) {	
		
		int result = service.searchStoreNo(storeNo);
		return result;
	}
	
	
	// ============================== 결재 요청함 ==============================
	
	/** 결재요청함 조회
	 * @param model
	 * @param loginMember
	 * @return
	 * @author 유진
	 */
	@GetMapping("requestApproval")
	public String selectRequestApproval(@SessionAttribute("loginMember") Member loginMember, Model model, 
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		
		Map<String, Object> map = service.selectRequestApproval(loginMember.getMemberNo(), cp);
		model.addAttribute("map",map);
		
		return "approval/requestApproval";
	}
	
	
	/** 결재요청 데이터 불러오기
	 * @param approvalNo
	 * @return
	 */
	@GetMapping(value = "requestApproval/selectRequestData", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public Map<String, Object> selectRequestData(int approvalNo, int docCategoryNo) {
		
		Map<String, Object> map = service.selectRequestData(approvalNo,docCategoryNo);
				
		return map;
	}
	

	
	// ============================== 회수 문서함 ==============================
	
	/** 회수문서함 조회
	 * @param loginMember
	 * @param model
	 * @return 
	 * @author 유진
	 */
	@GetMapping("reclaimApproval")
	public String selectReclaimApproval(@SessionAttribute("loginMember") Member loginMember, Model model,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		
		Map<String, Object> map = service.selectReclaimApproval(loginMember.getMemberNo(), cp);
				
		model.addAttribute("map",map);
		
		return "approval/reclaimApproval";
	}
	
	
	/** 문서 회수
	 * @param approvalNo
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("reclaim")
	public String reclaimApproval(@SessionAttribute("loginMember") Member loginMember,@RequestParam("approvalNo") int approvalNo, RedirectAttributes ra) {
		
		log.debug(approvalNo + "----");
		log.debug(loginMember.getMemberNo()+"----");
		
		int result = service.reclaimApproval(loginMember.getMemberNo(), approvalNo);
		
		if(result > 0) {
			ra.addFlashAttribute("message", "문서가 회수되었습니다.");			
		} else {
			ra.addFlashAttribute("message", "문서 회수에 실패하였습니다.");	
		}
		
		return "redirect:reclaimApproval";
	}
	
	
	/** 문서 재작성 데이터 불러오기
	 * @param approvalNo
	 * @return
	 */
	@GetMapping(value = "rewriteApproval/selectRewriteData", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public Map<String, Object> selectRewriteData(int approvalNo, int docCategoryNo) {
		
		Map<String, Object> map = service.selectTempData(approvalNo,docCategoryNo);
				

		return map;
	}
	
	
	// ============================== 결재 대기함 ==============================
	
	/** 결재대기함 포워드
	 * @author 예리나
	 * @param loginMember : 로그인 회원정보
	 * @param model
	 * @param cp
	 * @return map
	 */
	@GetMapping("waitApproval")
	public String waitApproval(@SessionAttribute("loginMember") Member loginMember, Model model,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		
		// 로그인한 멤버가 승인하지 않은 모든 결재문서 얻어오기
		Map<String, Object> map = service.selectWaitApproval(loginMember.getMemberNo(), cp);
		model.addAttribute("map", map);
		
		return "approval/waitApproval";
	}
	
	
	/** 기안서 상세조회(비동기)
	 * @author 예리나
	 * @param approvalNo : 전달받은 기안서 번호
	 * @param docCategoryNo : 전달받은 템플릿 번호
	 * @return temp : 해당 기안서 내용이 담긴 Approval DTO
	 */
	@GetMapping(value="detailWaitApproval", produces ="application/json; charset=UTF-8")
	@ResponseBody
	public Approval waitApproval(int approvalNo, int docCategoryNo) {
		Approval temp = service.waitApproval(approvalNo, docCategoryNo);
		return temp;
	}
	
	/** 발주기안서 상세조회(비동기)
	 * @author 예리나
	 * @param approvalNo : 전달받은 기안서 번호
	 * @param docCategoryNo : 전달받은 템플릿 번호
	 * @return approvalList : 해당 기안서 내용이 담긴 Approval DTO List
	 */
	@GetMapping(value="detailWaitApprovalList", produces ="application/json; charset=UTF-8")
	@ResponseBody
	public List<Approval> waitApprovalList(int approvalNo, int docCategoryNo) {
		
		// 발주서의 상품명이 1개 이상인 경우 DB에서 여러 컬럼으로 나올 수 있기 때문에 한개의 기안서이지만 List로 담아옴
		List<Approval> approvalList = service.waitApprovalList(approvalNo, docCategoryNo);
		return approvalList;
	}
	
	
	/** 결재자 목록 상세조회(비동기)
	 * @author 예리나
	 * @param approvalNo : 전달받은 기안서 번호
	 * @return List<Approver>
	 */
	@GetMapping(value="selectWaitApprover", produces ="application/json; charset=UTF-8")
	@ResponseBody
	public List<Approver> waitApprover(int approvalNo) {
		return service.waitApprover(approvalNo);
	}
	
	
	/** 결재 버튼 클릭 시 승인 동작 
	 * @author 예리나
	 * @param approvalNo : 전달받은 기안서 번호
	 * @param loginMember : 로그인 회원 정보
	 * @param ra : 리다이렉트 시 정보 전달
	 * @return
	 */
	@GetMapping("approve")
	public String approve(int approvalNo, @SessionAttribute("loginMember") Member loginMember,
			RedirectAttributes ra) {
		
		// 결재 승인 서비스 호출
		int result = service.approve(approvalNo, loginMember.getMemberNo());
		
		if(result > 0) { // 결재승인 완료시
			
			// 해당 문서의 결재자가 모두 승인을 완료했다면 결재완료 상태로 문서 컨디션 바꾸기
			int check = service.approveAllCheck(approvalNo);
			
			if(check > 0) { // 모든 결재자가 결재완료가 된 경우
				
				// 폐점승인서가 결재완료된 경우 점포폐쇄하기
				int storeRunCheck = service.storeRunCheck(approvalNo);
				
				// 사직서가 결재완료된 경우 회원 탈퇴승인 처리하기
				int memberDelCheck = service.memberDelCheck(approvalNo);
				
				// 휴가신청서가 결재완료된 경우 캘린더에 등록하기
				int holidayCalendarInsert = service.holidayCalendarInsert(approvalNo);
			}
			
			ra.addFlashAttribute("message", "결재 승인이 완료되었습니다.");
			
		} else {
			ra.addFlashAttribute("message", "결재 승인이 실패하였습니다.");
		}
		
		return "redirect:waitApproval";
	}
	
	
	/** 반려 버튼 클릭 시 반려 동작 
	 * @author 예리나
	 * @param approvalNo : 전달받은 기안서 번호
	 * @param returnReason : 반려사유
	 * @param loginMember : 로그인 회원 정보
	 * @param ra : 리다이렉트 시 정보 전달
	 * @return
	 */
	@GetMapping("returnApprove")
	public String returnApprove(int approvalNo, String returnReason, @SessionAttribute("loginMember") Member loginMember,
			RedirectAttributes ra) {
		
		int result = service.returnApprove(approvalNo, loginMember.getMemberNo(), returnReason);
		
		if(result > 0) {
			ra.addFlashAttribute("message", "반려처리가 완료되었습니다.");
		} else {
			ra.addFlashAttribute("message", "반려처리가 실패하였습니다.");
		}
		
		return "redirect:waitApproval";
	}
	
	
	/** 결재완료함에서 삭제버튼 클릭 시 기안서 삭제
	 * @author 예리나
	 * @param approvalNo : 전달받은 기안서 번호
	 * @param ra : 리다이렉트 시 정보 전달
	 * @return
	 */
	@GetMapping("deleteApprove")
	public String deleteApprove(int approvalNo, RedirectAttributes ra) {
		
		int result = service.deleteApprove(approvalNo);
		
		if(result > 0) {
			ra.addFlashAttribute("message", "문서 삭제가 완료되었습니다.");
		} else {
			ra.addFlashAttribute("message", "문서 삭제가 실패하였습니다.");
		}
		
		return "redirect:completeApproval"; // 완료문서함으로 리다이렉트
	}
	
	
	
	// ============================== 결재 진행함 ==============================
	
	/** 결재진행함 포워드
	* @author 예리나
	 * @param loginMember
	 * @param model
	 * @param cp
	 * @return map
	 */
	@GetMapping("progressApproval")
	public String progressApproval(@SessionAttribute("loginMember") Member loginMember, Model model,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		
		// 로그인한 멤버가 승인한 모든 결재문서 얻어오기
		Map<String, Object> map = service.selectProgressApproval(loginMember.getMemberNo(), cp);
		
		model.addAttribute("map", map);
		
		return "approval/progressApproval";
	}
	
	// ============================== 완료 문서함 ==============================
	
	/** 완료문서함 포워드
	 * @author 예리나
	 * @param loginMember
	 * @param model
	 * @param cp
	 * @return map
	 */
	@GetMapping("completeApproval")
	public String completeApproval(@SessionAttribute("loginMember") Member loginMember, Model model,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		
		// 1) 자신이 승인한 문서가 완료된 경우 조회
		// 2) 기안자가 자신이 기안한 문서가 최종승인 된 경우 조회
		Map<String, Object> map = service.selectCompleteApproval(loginMember.getMemberNo(), cp);
		
		model.addAttribute("map", map);
		
		return "approval/completeApproval";
	}
	
	
	// ============================== 반려 문서함 ==============================
	

	/** 반려문서함 포워드
	 * @author 예리나
	 * @param loginMember
	 * @param model
	 * @param cp
	 * @return
	 */
	@GetMapping("returnApproval")
	public String returnApproval(@SessionAttribute("loginMember") Member loginMember, Model model,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		
		// 1) 자신이 반려한 문서 조회
		// 2) 기안자가 자신이 기안한 문서가 반려된 경우 조회
		Map<String, Object> map = service.selectReturnApprovalList(loginMember.getMemberNo(), cp);
		
		model.addAttribute("map", map);
		
		return "approval/returnApproval";
	}
	
	
	/** 반려문서함에서 삭제버튼 클릭 시 기안서 삭제
	 * @author 이예리나
	 * @param approvalNo
	 * @param ra
	 * @return
	 */
	@GetMapping("deleteApproveAtReturn")
	public String deleteApproveAtReturn(int approvalNo, RedirectAttributes ra) {
		
		int result = service.deleteApprove(approvalNo);
		
		if(result > 0) {
			ra.addFlashAttribute("message", "문서 삭제가 완료되었습니다.");
		} else {
			ra.addFlashAttribute("message", "문서 삭제가 실패하였습니다.");
		}
		
		return "redirect:returnApproval"; // 반려문서함으로 리다이렉트
	}
	
	
	/** 반려취소
	 * @author 이예리나
	 * @param loginMember
	 * @param approvalNo
	 * @param ra
	 * @return
	 */
	@GetMapping("cancleReturn")
	public String cancleReturn(@SessionAttribute("loginMember") Member loginMember, int approvalNo, RedirectAttributes ra) {
		
		int result = service.cancleReturn(loginMember.getMemberNo(), approvalNo);
		
		if(result > 0) {
			ra.addFlashAttribute("message", "반려 취소가 완료되었습니다.");
			
		} else {
			ra.addFlashAttribute("message", "반려 취소가 실패하였습니다.");
		}
		
		return "redirect:returnApproval"; // 반려문서함으로 리다이렉트
	}

	
	/** 반려사유 조회
	 * @author 이예리나
	 * @param approvalNo
	 * @return
	 */
	@GetMapping("selectReturnReason")
	@ResponseBody
	public String selectReturnReason(int approvalNo) {
		return service.selectReturnReason(approvalNo);
	}
	
	
	// ============================== 협조 문서함 ==============================
	
	/** 협조문서함 포워드
	 * @author 예리나
	 * @param loginMember
	 * @param model
	 * @param cp
	 * @return
	 */
	@GetMapping("joinApproval")
	public String joinApproval(@SessionAttribute("loginMember") Member loginMember, Model model,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		
		// 로그인멤버가 속한 부서를 협조부터코드로 작성한 기안문만 불러오기
		Map<String, Object> map = service.selectJoinApprovalList(loginMember.getDepartmentNo(), cp);
		
		model.addAttribute("map", map);
		
		return "approval/joinApproval";
	}
	
	
	// ===============================발주 기안서==========================================
	// ===============================  김민석  ==========================================
	
	
	/** 발주기안서 품목명 입력시 자동완성 기능
	 * @param goodsName
	 * @return
	 */
	@GetMapping("docOrderName")
	@ResponseBody
	public List<Stock> docOrderName(String goodsName){
		
		List<Stock> goodsList = service.docOrderName(goodsName);
		
		return goodsList;
	}

}
