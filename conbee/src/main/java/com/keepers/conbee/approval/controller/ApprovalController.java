package com.keepers.conbee.approval.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.keepers.conbee.approval.model.service.ApprovalService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("approval")
@RequiredArgsConstructor
public class ApprovalController { // 전자결재 컨트롤러
	
	private final ApprovalService service; 
	
	
	
	// =============== 페이지 포워드 =============== 
	
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
	
	/** 결재요청함 포워드
	 * @return
	 * @author 예리나
	 */
	@GetMapping("requestApproval")
	public String requestApproval() {
		return "approval/requestApproval";
	}
	
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
	
	
	// ====================================================
	

}
 