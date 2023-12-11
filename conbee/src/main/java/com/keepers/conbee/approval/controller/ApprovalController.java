
package com.keepers.conbee.approval.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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
	public String tempSave(@SessionAttribute("loginMember") Member loginMember, Model model) {
		
		List<Approval> tempSaveList = service.selectTempSave(loginMember.getMemberNo());
		model.addAttribute("tempSaveList",tempSaveList);
		
		return "approval/tempSave";
			
	}


	// ============================== 기안문 작성 ==============================
	
	/** 기안문작성 포워드
	 * @return
	 * @author 예리나
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
							@RequestParam(value="approverMemNo", required=false) List<Integer> approverMemNo,
							@RequestParam(value="approvalFile", required=false) MultipartFile approvalFile,
							RedirectAttributes ra) throws IllegalStateException, IOException {


		/* 문서 정보 셋팅 */
		int departNo;
		int cateNo;
		
		switch(doc) {
		case "docHoliday" 	 : departNo=0; cateNo=0; break;
		case "docRetirement" : departNo=0; cateNo=1; break;
		case "docStore" 	 : departNo=0;  cateNo = approval.getDocStoreState()==0?2:3; break; //출점:2 폐점:3
		case "docExpense" 	 : departNo=1; cateNo=4; break;
		case "docOrder" 	 : departNo=1; cateNo=5; break;
		default 			 : departNo=0; cateNo=0; 
		}
		
		if(approval.getApprovalTitle().equals("")) approval.setApprovalTitle("제목 없음");
		approval.setApprovalCondition(approvalCondition); // 문서 상태
		approval.setMemberNo(loginMember.getMemberNo()); // 사원 번호
		approval.setDepartmentNo(departNo); // 협조부서 코드
		approval.setDocCategoryNo(cateNo); // 문서 분류 번호
		
				
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
				
			
		int result = service.insertApproval(approval, approverList, approvalFile);
		
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
	
	/** 결재요청함 조회
	 * @param model
	 * @param loginMember
	 * @return
	 * @author 유진
	 */
	@GetMapping("requestApproval")
	public String selectRequestApproval(@SessionAttribute("loginMember") Member loginMember, Model model) { // cp 추가예정
		
		List<Approval> requestApprovalList = service.selectRequestApproval(loginMember.getMemberNo());
		
		model.addAttribute("requestApprovalList",requestApprovalList);
		
		return "approval/requestApproval";
	}
	
	// ============================== 회수 문서함 ==============================
	
	/** 회수문서함 조회
	 * @param loginMember
	 * @param model
	 * @return 
	 * @author 유진
	 */
	@GetMapping("reclaimApproval")
	public String reclaimApproval(@SessionAttribute("loginMember") Member loginMember, Model model) {
		
		List<Approval> reclaimApprovalList = service.selectReclaimApproval(loginMember.getMemberNo());
		
		model.addAttribute("reclaimApprovalList",reclaimApprovalList);
		
		return "approval/reclaimApproval";
	}
	
	
	// ============================== 결재 대기함 ==============================
	
	/** 결재대기함 포워드
	* @return
	* @author 예리나
	*/
	@GetMapping("waitApproval")
	public String waitApproval(@SessionAttribute("loginMember") Member loginMember, Model model) {
		
		// 로그인한 멤버가 승인하지 않은 모든 결재문서 얻어오기
		List<Approval> waitApprovalList = service.selectWaitApproval(loginMember.getMemberNo());
		
		model.addAttribute("waitApprovalList", waitApprovalList);
		
		return "approval/waitApproval";
	}
	
	
	/** 기안서 상세조회(비동기)
	 * @param approvalNo : 전달받은 기안서 번호
	 * @return
	 */
	@GetMapping(value="detailWaitApproval", produces ="application/json; charset=UTF-8")
	@ResponseBody
	public Approval waitApproval(int approvalNo, int docCategoryNo) {
		return service.waitApproval(approvalNo, docCategoryNo);
	}
	
	
	
	
	
	// ============================== 결재 진행함 ==============================
	
	/** 결재진행함 포워드
	* @return
	* @author 예리나
	*/
	@GetMapping("progressApproval")
	public String progressApproval(@SessionAttribute("loginMember") Member loginMember, Model model) {
		
		// 로그인한 멤버가 승인한 모든 결재문서 얻어오기
		List<Approval> progressApprovalList = service.selectProgressApproval(loginMember.getMemberNo());
		
		model.addAttribute("progressApprovalList", progressApprovalList);
		
		return "approval/progressApproval";
	}
	
	// ============================== 완료 문서함 ==============================
	
	/** 완료문서함 포워드
	* @return
	* @author 예리나
	*/
	@GetMapping("completeApproval")
	public String completeApproval(@SessionAttribute("loginMember") Member loginMember, Model model) {
		
		// 1) 자신이 승인한 문서가 완료된 경우 조회
		// 2) 기안자가 자신이 기안한 문서가 최종승인 된 경우 조회
		List<Approval> completeApprovalList = service.selectCompleteApproval(loginMember.getMemberNo());
		
		model.addAttribute("completeApprovalList", completeApprovalList);
		
		return "approval/completeApproval";
	}
	
	
	// ============================== 반려 문서함 ==============================
	

	/** 반려문서함 포워드
	* @return
	* @author 예리나
	*/
	@GetMapping("returnApproval")
	public String returnApproval(@SessionAttribute("loginMember") Member loginMember, Model model) {
		
		// 1) 자신이 반려한 문서 조회
		// 2) 기안자가 자신이 기안한 문서가 반려된 경우 조회
		List<Approval> returnApprovalList = service.selectReturnApprovalList(loginMember.getMemberNo());
		
		model.addAttribute("returnApprovalList", returnApprovalList);
		
		return "approval/returnApproval";
	}

	
	
	// ============================== 협조 문서함 ==============================
	
	/** 협조문서함 포워드
	* @return
	* @author 예리나
	*/
	@GetMapping("joinApproval")
	public String joinApproval(@SessionAttribute("loginMember") Member loginMember, Model model) {
		
		// 로그인멤버가 속한 부서를 협조부터코드로 작성한 기안문만 불러오기
		List<Approval> joinApprovalList = service.selectJoinApprovalList(loginMember.getDepartmentNo());
		
		model.addAttribute("joinApprovalList", joinApprovalList);
		
		return "approval/joinApproval";
	}
	
	// ===============================발주 기안서==========================================
	
	
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
	// =========================================================================
	// =========================================================================
	// =========================================================================
	
	

}
