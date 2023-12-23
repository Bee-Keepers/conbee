
package com.keepers.conbee.approval.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.approval.model.dto.Approver;
import com.keepers.conbee.approval.model.dto.CommandDTO;
import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.stock.model.dto.Stock;

public interface ApprovalService {
	

	/* ============================= 유진 ================================ */

	
	/** 임시저장함 조회
	 * @param memberNo
	 * @param cp 
	 * @return approval list
	 */
	Map<String, Object> selectTempSave(int memberNo, int cp);
	
	
	/** 임시저장 문서 삭제
	 * @param memberNo
	 * @param approvalNo
	 * @return
	 */
	int deleteTempApproval(int memberNo, int approvalNo);
	
	
	/** 임시저장함 데이터 받아오기
	 * @param approvalNo
	 * @param docCategoryNo 
	 * @return
	 */
	Map<String, Object> selectTempData(int approvalNo, int docCategoryNo);
	
	
	/** 재작성
	 * @param approval
	 * @param approverList
	 * @param approvalFile
	 * @param command
	 * @return
	 */
	int updateApproval(Approval approval, List<Approver> approverList, MultipartFile approvalFile, CommandDTO command) throws IllegalStateException, IOException;
	

	
	/** 기안문 작성자 정보 조회
	 * @param memberNo
	 * @return member
	 */
	Member selectInfo(int memberNo);
	
	/** 부서 모든 멤버 조회
	 * @param selectDepartment
	 * @return member list
	 */
	List<Member> selectAllMember(String selectDepartment);

	/** 팀 멤버 조회
	 * @param selectTeam
	 * @return member list
	 */
	List<Member> selectTeamMember(String selectTeam);

	/** 멤버 조회
	 * @param memberNo
	 * @return member
	 */
	Member selectMember(int memberNo);


	/** 기안문 insert
	* @param approval
	* @param approverList
	 * @param command 
	 * @param file 
	* @return result
	*/
	int insertApproval(Approval approval, List<Approver> approverList, MultipartFile approvalFile, CommandDTO command) throws IllegalStateException, IOException;
	
	
	
	/** 점포 정보 조회
	 * @param storeNo
	 * @return
	 */
	int searchStoreNo(int storeNo);
	

	
	/** 결재요청함 조회
	 * @param memberNo
	 * @param cp 
	 * @return approval list
	 */
	public Map<String, Object> selectRequestApproval(int memberNo, int cp);
	
	
	/** 결재요청함 데이터 조회
	 * @param approvalNo
	 * @param docCategoryNo
	 * @return
	 */
	Map<String, Object> selectRequestData(int approvalNo, int docCategoryNo);
	
	
	/** 회수문서함 조회
	 * @param memberNo
	 * @param cp 
	 * @return approval list
	 */
	Map<String, Object> selectReclaimApproval(int memberNo, int cp);
	
	
	/** 문서 회수
	 * @param approvalNo
	 * @param memberNo 
	 * @return
	 */
	int reclaimApproval(int memberNo, int approvalNo);
	
	
	/* ============================= 예리나 ================================ */

	/** 결재대기함 조회
	 * @param memberNo
	 * @return
	 */
	Map<String, Object> selectWaitApproval(int memberNo, int cp);

	/** 결재진행함 조회
	 * @param memberNo
	 * @param cp 
	 * @return
	 */
	Map<String, Object> selectProgressApproval(int memberNo, int cp);

	/** 완료문서함 조회
	 * @param memberNo
	 * @param cp 
	 * @return
	 */
	Map<String, Object> selectCompleteApproval(int memberNo, int cp);

	/** 반려문서함 조회
	 * @param memberNo
	 * @param cp 
	 * @return
	 */
	Map<String, Object> selectReturnApprovalList(int memberNo, int cp);

	/** 협조문서함 조회
	 * @param departmentNo
	 * @param cp 
	 * @return
	 */
	Map<String, Object> selectJoinApprovalList(int departmentNo, int cp);

	/** 기안서 상세조회(비동기)
	 * @param approvalNo
	 * @return
	 */
	Approval waitApproval(int approvalNo, int docCategoryNo);


	/** 결재자 상세조회(비동기)
	 * @param approvalNo
	 * @return
	 */
	List<Approver> waitApprover(int approvalNo);



	/** 발주기안서 품목명 입력시 자동완성 기능
	 * @param goodsName
	 * @return
	 */
	List<Stock> docOrderName(String goodsName);


	/** 결재버튼 클릭 시 승인
	 * @param approvalNo
	 * @param memberNo
	 * @return
	 */
	int approve(int approvalNo, int memberNo);


	/** 반려버튼 클릭 시 반려
	 * @param approvalNo
	 * @param memberNo
	 * @param returnReason 
	 * @return
	 */
	int returnApprove(int approvalNo, int memberNo, String returnReason);


	/** 발주기안서 상세조회(비동기)
	 * @param approvalNo
	 * @param docCategoryNo
	 * @return
	 */
	List<Approval> waitApprovalList(int approvalNo, int docCategoryNo);


	/** 삭제버튼 클릭 시 삭제
	 * @param approvalNo
	 * @return
	 */
	int deleteApprove(int approvalNo);


	/** 반려취소
	 * @param memberNo
	 * @param approvalNo
	 * @return
	 */
	int cancleReturn(int memberNo, int approvalNo);


	/** 반려사유 조회
	 * @param approvalNo
	 * @return
	 */
	String selectReturnReason(int approvalNo);

	
	/** 결재문서가 모두 승인이 났는지 확인 후 문서상태 변경
	 * @param approvalNo
	 */
	int approveAllCheck(int approvalNo);


	/** 폐점 최종승인 확인 후 폐쇄하기
	 * @param approvalNo
	 * @return
	 */
	int storeRunCheck(int approvalNo);


	/** 기안 후 180일 지난 기안문리스트 불러오기
	 * @return
	 */
	List<Approval> selectDateOverApproval();


	/** 기안서 삭제하기(스케쥴링)
	 * @param approvalNo
	 */
	int approvalDeleteScheduling(int approvalNo);


	/** 사직서가 결재완료된 경우 회원 탈퇴승인 처리하기
	 * @param approvalNo
	 * @return
	 */
	int memberDelCheck(int approvalNo);


	/** 결재완료된 사직서의 회원번호, 퇴직예정일 받아오기
	 * @return
	 */
	List<Member> selectRetireMemberList();


	/** 회원탈퇴(스케쥴링)
	 * @param memberNo
	 * @return
	 */
	int deleteMember(int memberNo);


	/** 휴가신청서가 결재완료된 경우 캘린더에 등록하기
	 * @param approvalNo
	 * @return
	 */
	int holidayCalendarInsert(int approvalNo);




} 

