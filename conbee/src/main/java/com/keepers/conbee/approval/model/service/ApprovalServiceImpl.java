
package com.keepers.conbee.approval.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	
	
	// 결재자 리스트 조회
	@Override
	public List<Member> selectApproverList(int memberNo) {
		
		
		List<Member> approverList = mapper.selectApproverList(memberNo);
		

		
		return approverList;
	}


	// 기안문 insert
	@Override
	public int insertApproval(Approval approval) {
	
		int result;
		
		// 1) 전자결재 테이블 삽입
		int resultApproval = mapper.insertApproval(approval);
		if(resultApproval == 0) return 0;
		
		// 2) 휴가/퇴직/출폐점/발주 결재문서 테이블 삽입
		int resultApprovalDoc = mapper.insertApprovalDoc(approval);
		if(resultApprovalDoc ==0) return 0;
		
		if(resultApproval==1 && resultApprovalDoc==1) result = 1;
		else result =0;
	
	
	
	    return result;
	}



}

