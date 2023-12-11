
package com.keepers.conbee.approval.model.service;

import java.util.List;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.approval.model.dto.Approver;
import com.keepers.conbee.approval.model.mapper.ApprovalMapper;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ApprovalServiceImpl implements ApprovalService{


	private final ApprovalMapper mapper;

	// 기안문 작성자 정보 조회
	@Override
	public Member selectInfo(int memberNo) {
		return mapper.selectInfo(memberNo);
	}
	
	// 부서 모든 멤버 조회
	@Override
	public List<Member> selectAllMember(String selectDepartment) {
		return mapper.selectAllMember(selectDepartment);
	}

	// 팀 멤버 조회
	@Override
	public List<Member> selectTeamMember(String selectTeam) {
		return mapper.selectTeamMember(selectTeam);
	}
	
	// 멤버 조회
	@Override
	public Member selectMember(int memberNo) {
		return mapper.selectMember(memberNo);
	}

	// 기안문 insert
	@Override
	public int insertApproval(Approval approval, List<Approver> approverList) {
	
		int result;
		
		// 1) 전자결재 테이블 삽입
		int resultApproval = mapper.insertApproval(approval);
		if(resultApproval == 0) return 0;
		
		
		// 2) 휴가/퇴직/출폐점/발주 결재문서 테이블 삽입	
		if(approval.getDocCategoryNo()!=4) {			
			resultApproval = mapper.insertApprovalDoc(approval);
			if(resultApproval==0) return 0;
		}				
		
		// 3) 결재자 리스트 테이블 삽입
		for(Approver approver:approverList) {
			approver.setApprovalNo(approval.getApprovalNo()); //문서번호
		}

		int resultApprover = mapper.insertApproverList(approverList);
		if(resultApprover>0) resultApprover=1;
				
	
		if(resultApproval==1 && resultApprover==1) result = 1;
		else result =0;
	
	    return result;
	}
	
	
	// 결재요청함 조회
	@Override
	public List<Approval> selectRequestApproval(int memberNo) {
		return mapper.selectRequestApproval(memberNo);
	}
	
	

	/* ============================= 예리나 ================================ */
	
	/** 결재대기함 조회
	 *
	 */
	@Override
	public List<Approval> selectWaitApproval(int memberNo) {
		return mapper.selectWaitApproval(memberNo);
	}

	
	/** 결재진행함 조회
	 *
	 */
	@Override
	public List<Approval> selectProgressApproval(int memberNo) {
		return mapper.selectProgressApproval(memberNo);
	}
	
	/** 완료문서함 조회
	 *
	 */
	@Override
	public List<Approval> selectCompleteApproval(int memberNo) {
		
		// 1) 결재승인권한자가 조회하는 완료문서 리스트
		List<Approval> completeApprovalListByApprover = mapper.selectCompleteApprovalApprover(memberNo);
		
		// 2) 기안자가 조회하는 결재완료문서 리스트
		List<Approval> completeApprovalListByDrafter = mapper.selectCompleteApprovalDrafter(memberNo);
		
		// 리스트 합치기
		completeApprovalListByApprover.addAll(completeApprovalListByDrafter);
		
		return completeApprovalListByApprover;
	}
	
	
	
	/** 반려문서함 조회
	 *
	 */
	@Override
	public List<Approval> selectReturnApprovalList(int memberNo) {
		
		// 1) 자신이 반려한 문서 리스트 조회
		List<Approval> returnApprovalListByApprover = mapper.selectReturnApprovalApprover(memberNo);
		
		// 2) 기안자가 자신이 기안한 문서가 반려된 경우 리스트 조회
		List<Approval> returnApprovalListByDrafter = mapper.selectReturnApprovalDrafter(memberNo);

		// 리스트 합치기
		returnApprovalListByApprover.addAll(returnApprovalListByDrafter);
		
		
		return returnApprovalListByApprover;
	}
	
	/** 협조문서함 조회
	 *
	 */
	@Override
	public List<Approval> selectJoinApprovalList(int departmentNo) {
		return mapper.selectJoinApprovalList(departmentNo);
	}
	
	
	/** 기안서 상세조회(비동기)
	 *
	 */
	@Override
	public Approval waitApproval(int approvalNo, int docCategoryNo) {
		
		// 문서타입별 mapper 호출
		switch(docCategoryNo) {
		case 0 : return mapper.selectHolidayApproval(approvalNo); // 휴가
		case 1 :  // 퇴직
		case 2 : break; // 출점
		case 3 : break; // 폐점
		case 4 : break; // 지출
		case 5 : break; // 발주
		}
		
		// 문서타입 없을 경우 null 반환
		return null;
	}
	
	
	/** 결재자 목록 상세조회(비동기)
	 *
	 */
	@Override
	public List<Approver> waitApprover(int approvalNo) {
		return mapper.waitApprover(approvalNo);
	}
	
	
	
	

}

