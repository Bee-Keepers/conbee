package com.keepers.conbee.approval.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Approver {
	
	  // 결재자 (approvalNo, memberNo)
	  private int approverNo; // 결재번호
	  private int approverOrder; // 결재순서
	  private int approverCondition; // 결재상태
	  private String approverDate; // 결재일
	  
	  private int approvalNo; // 문서번호
	  private int memberNo; // 결재자 회원번호
	  private String memberName; // 결재자명

}
