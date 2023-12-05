
package com.keepers.conbee.approval.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Approval {

  // 전자결재 문서
  private int approvalNo; // 문서번호 - 문서 첨부파일, 템플릿 4종
  private String approvalDate; // 작성일
  private String approvalTitle; // 제목
  private String approvalContent; // 내용
  private int approvalCondition; // 문서 상태
  private String approvalReturnComment; // 반려사유
  private int approvalDelete; // 삭제상태
  private String approvalDocTitle; // 전자결재 내부 문서 제목

  private int memberNo; // 작성자 - 회원테이블
  private int departmentNo; // 협조부서코드 - 부서테이블
  private int docCategoryNo; // 분류번호 - 문서분류 테이블


  // 결재문서 첨부파일 (approvalNo)
  private int approvalFileNo; // 첨부파일 번호
  private String approvalFileRoute; // 첨부파일 경로

  // 문서분류 (docCategoryNo)
  private String docHtmlName; // html 파일 이름
  private String docCategoryGroup; // 구분(복무/인사/업무)
  private String docCategorySort; // 항목(휴가/퇴직/출폐점/지출/발주)


  // 휴가 템플릿 (approvalNo)
  private String docHolidayStart; // 휴가시작일
  private String docHolidayEnd; // 휴가종료일 

  // 퇴직 템플릿 (approvalNo)
  private String docRetireDate; // 퇴직일

  // 출폐점 템플릿 (approvalNo)
  private int docStoreState; // 출폐상태
  private int storeNo; // 점포번호 - 점포테이블 매핑
  private String storeName; // 점포명

  // 발주 템플릿 (approvalNo)
  private int docOrderNo; // 발주 번호
  private int docOrderAmount; // 수량
  private int docOrderUnitPrice; // 단가
  private int docOrderPrice; // 금액
  private int goodsNo; // 상품번호 - 상품테이블 매핑


  
  //==================================
  
  private String memberName;


}

