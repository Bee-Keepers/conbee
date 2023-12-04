
package com.keepers.conbee.approval.model.service;

import java.util.ArrayList;
import java.util.List;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.approval.model.dto.Approver;
import com.keepers.conbee.approval.model.mapper.ApprovalMapper;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
		
		return mapper.selectApproverList(memberNo);
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
				
	
		// 코드 정리 필요======================================================
		
		// 3) 결재자 리스트 테이블 삽입
		
		// 결재라인 개수
		int approverNum;
		switch(approval.getDocCategoryNo()) {
		case 0: approverNum = 1; break;
		case 1: approverNum = 2; break;
		case 2,3: approverNum = 4; break;
		case 4: approverNum = 2; break;
		case 5: approverNum = 4; break;
		default: approverNum=0; break;
		}
		
		List<Approver> approverList = new ArrayList<>(); 
		
		
		// 결재자 이름 받아오기
		List<Member> approverNoList = mapper.selectApproverList(approval.getMemberNo()); 

		
		for(int i=0; i<approverNum; i++) {
			
			Approver approvers = new Approver();
			
			approvers.setApproverOrder(i);
			approvers.setApproverCondition(0);
			approvers.setApprovalNo(approval.getApprovalNo());
			approvers.setMemberNo(approverNoList.get(i).getMemberNo());
			
			approverList.add(approvers);
		}

		

		int resultApprover = mapper.insertApproverList(approverList);
		if(resultApprover>0) resultApprover=1;
				
	
		if(resultApproval==1 && resultApprovalDoc==1 && resultApprover==1) result = 1;
		else result =0;
	
	    return result;
	}



}

