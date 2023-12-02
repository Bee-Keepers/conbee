package com.keepers.conbee.approval.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

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
	

	/** 기안문 - 로그인한 회원의 이름, 팀이름, 결재자 받아오기
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
		// List<Member> approverList = service.selectApproverList(loginMember.getMemberNo());
		
		Map<String, Object> docWriteInfosMap = new HashMap<>();
		docWriteInfosMap.put("infoName", member.getMemberName());
		docWriteInfosMap.put("infoTeam", member.getTeamName());
		
		return docWriteInfosMap;

		
	}
	
	
	// 기안문 insert 코드 작성 예정
	
	
	
	
	// 테스트 - 기안문 제목 받아오기 ok
	@GetMapping("docHoliday")
	public String insertDocHoliday(String holidayTitle) {
		
		log.debug(holidayTitle);
		
		return "approval/writeApproval";
	}
	
	
	
	
	
	
	
	
	

}
 