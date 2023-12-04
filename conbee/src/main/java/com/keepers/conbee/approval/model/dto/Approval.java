package com.keepers.conbee.approval.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Approval {

	// 전자결재 문서
	private int approvalNo; // 문서번호 - 템플릿 4개 테이블 매핑
	private String approvalDate; // 작성일
	private String approvalTitle; // 제목
	private String approvalContent; // 내용
	private int approvalCondition; // 문서 상태
	private String approvalReturnComment; // 반려사유
	private int approvalDelete; // 삭제상태
	private int memberNo; // 작성자 - 회원테이블 매핑
	private int departmentNo; // 협조부서코드 - 부서테이블 매핑
	private int docCategoryNo; // 분류번호 - 문서분류 테이블 매핑
	
	
	// 결재자 테이블
	//
	private int approverNo; // 결재번호
	private int approverOrder; // 결재순서
	private int approverCondition; // 결재상태
	private String approverDate; // 결재일
	//private int memberNo; // 결재자 - 회원테이블 매핑
	
	
	// 문서분류 테이블 (docCategoryNo)
	private String docHtmlName; // html 파일 이름
	private String docCategoryGroup; // 구분(복무/인사/업무)
	private String docCategorySort; // 항목(휴가/퇴직/출폐점/지출/발주)
	
	
	// 휴가 테이블(approvalNo)
	private String docHolidayStart; // 휴가시작일
	private String docHolidayEnd; // 휴가종료일 
	
	// 퇴직 테이블(approvalNo)
	private String docRetireDate; // 퇴직일
	
	// 출폐점 테이블(approvalNo)
	private int docStoreState; // 출폐상태
	private int storeNo; // 점포번호 - 점포테이블 매핑
	
	// 발주 테이블(approvalNo)
	private int docOrderNo; // 발주 번호
	private int docOrderAmount; // 수량
	private int docOrderUnitPrice; // 단가
	private int docOrderPrice; // 금액
	private int goodsNo; // 상품번호 - 상품테이블 매핑
	
	
	
	// 작성중!


	
 
}
