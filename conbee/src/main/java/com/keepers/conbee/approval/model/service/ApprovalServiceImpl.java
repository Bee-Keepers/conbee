package com.keepers.conbee.approval.model.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.approval.model.dto.Approval;
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
	public Member selectWriteInfo(int memberNo) {
		
		return mapper.selectWriteInfo(memberNo);
	}
	
	
	// 기안문 insert
	@Override
	public int insertApproval(Approval approval) {
		
		// 1) 전자결재 테이블 삽입
		int result = mapper.insertApproval(approval);
		if(result == 0) return 0;
		
//		// 2) 휴가/퇴직/출폐점/발주 결재문서 테이블 삽입
//		int approvalNo = approval.getApprovalNo();
//		int result2 = mapper.insertApprovalDoc(approvalNo, approval);
		
		
		
		return result;
	}
	
 

}
