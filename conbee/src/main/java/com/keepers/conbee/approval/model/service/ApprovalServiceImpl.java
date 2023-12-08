
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
		return null;
	}
	
	

}

