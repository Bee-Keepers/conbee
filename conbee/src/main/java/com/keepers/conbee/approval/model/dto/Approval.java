package com.keepers.conbee.approval.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Approval {
	
	private int approvalNo; // 문서번호
	private String approvalDate; // 작성일
	private String approvalTitle; // 제목
	private String approvalContent; // 내용
	private int approvalCondition; // 문서 상태
	private String approvalReturnComment; // 반려사유
	private int approvalDelete; // 삭제상태
	
	
	private int docNo; // 템플릿 번호
	private int memberNo; // 작성자(회원번호)
	private int departmentNo; // 협조 부서 코드(부서코드)
	
	// 추가

}
