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
		return mapper.insertApproval(approval);
	}
	


}
