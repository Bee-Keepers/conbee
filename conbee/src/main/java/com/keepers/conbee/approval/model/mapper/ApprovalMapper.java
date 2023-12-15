
package com.keepers.conbee.approval.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.approval.model.dto.ApprovalFile;
import com.keepers.conbee.approval.model.dto.Approver;
import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.stock.model.dto.Stock;

/**
 * 
 */
@Mapper
public interface ApprovalMapper {


	/* ============================= 유진 ================================ */
	
	
	/** 임시저장함 글 개수 조회
	 * @param memberNo
	 * @return
	 */
	int searchTempSaveCount(int memberNo);
	
	/** 임시저장함 조회
	 * @param memberNo
	 * @param rowBounds 
	 * @return approval list
	 */
	List<Approval> selectTempSave(int memberNo, RowBounds rowBounds);
	
	
	/** 임시저장 데이터 조회
	 * @param approvalNo
	 * @return
	 */
	Approval selectTempHoliday(int approvalNo);


	Approval selectTempRetirement(int approvalNo);


	Approval selectTempStore(int approvalNo);
	

	Approval selectTempExpense(int approvalNo);
	

	List<Approver> selectTempAppover(int approvalNo);
	
	
	/** 기안문 작성자 정보 조회
	 * @param memberNo
	 * @return member
	 */
	Member selectInfo(int memberNo); 
	
	
	/** 부서 모든 멤버 조회
	 * @param selectDepartment
	 * @return
	 */
	List<Member> selectAllMember(String selectDepartment);

	
	/** 팀 멤버 조회
	 * @param selectTeam
	 * @return
	 */
	List<Member> selectTeamMember(String selectTeam);

	
	/** 멤버 조회
	 * @param memberNo
	 * @return
	 */
	Member selectMember(int memberNo);

	
	/** 기안문 insert
	* @param approval
	* @return result
	* @author 유진
	*/
	int insertApproval(Approval approval);
	
	
	/** 파일 insert
	 * @param uploadFile
	 * @return result
	 * @author 유진
	 */
	int insertApprovalFile(ApprovalFile uploadFile);

	
	/** Doc insert
	 * @param approval
	 * @return result
	 * @author 유진
	 */
	int insertApprovalDoc(Approval approval);

	
	/** 결재자 리스트 insert
	 * @param approverList
	 * @return result
	 * @author 유진
	 */
	int insertApproverList(List<Approver> approverList);

	
	/** 결재요청함 글 개수 조회
	 * @param memberNo
	 * @return
	 */
	int searchRequestApprovalCount(int memberNo);

	
	/** 결재요청함
	 * @param memberNo
	 * @param rowBounds 
	 * @return approval list
	 */
	List<Approval> selectRequestApproval(int memberNo, RowBounds rowBounds);
	
	
	/** 결재요청함 데이터 조회
	 * @param approvalNo
	 * @return
	 */
	Approval selectRequestHoliday(int approvalNo);
	

	Approval selectRequestRetirement(int approvalNo);
	

	Approval selectRequestStore(int approvalNo);
	

	Approval selectRequestExpense(int approvalNo);
	

	List<Approver> selectRequestAppover(int approvalNo);
	
	
	/** 회수문서함 조회
	 * @param memberNo
	 * @return approval list
	 */
	List<Approval> selectReclaimApproval(int memberNo);

	/** 문서 회수하기
	 * @param param 
	 * @param approvalNo
	 * @param memberNo 
	 * @return result
	 */
	int reclaimApproval(Map<String, Object> param);
	
	
	/* ============================= 예리나 ================================ */

	/** 결재대기함
	 * @param memberNo
	 * @param rowBounds 
	 * @return
	 */
	List<Approval> selectWaitApproval(int memberNo, RowBounds rowBounds);


	/** 결재진행함 조회
	 * @param memberNo
	 * @param rowBounds 
	 * @return
	 */
	List<Approval> selectProgressApproval(int memberNo, RowBounds rowBounds);


	/** 완료문서함 조회(승인자 기준)
	 * @param memberNo
	 * @return
	 */
	List<Approval> selectCompleteApprovalApprover(int memberNo);


	/** 완료문서함 조회(기안자 기준)
	 * @param memberNo
	 * @return
	 */
	List<Approval> selectCompleteApprovalDrafter(int memberNo);


	/** 반려문서함 조회(승인자 기준)
	 * @param memberNo
	 * @return
	 */
	List<Approval> selectReturnApprovalApprover(int memberNo);


	/** 반려문서함 조회(기안자 기준)
	 * @param memberNo
	 * @return
	 */
	List<Approval> selectReturnApprovalDrafter(int memberNo);



	/** 협조문서함 조회
	 * @param departmentNo
	 * @return
	 */
	List<Approval> selectJoinApprovalList(int departmentNo);


	/** 기안서 상세조회(휴가)
	 * @param approvalNo
	 * @return
	 */
	Approval selectHolidayApproval(int approvalNo);
	

	/** 기안서 상세조회(퇴직)
	 * @param approvalNo
	 * @return
	 */
	Approval selectRetirementApproval(int approvalNo);


	/** 기안서 상세조회(폐점)
	 * @param approvalNo
	 * @return
	 */
	Approval selectCloseStoreApproval(int approvalNo);


	/** 기안서 상세조회(출점)
	 * @param approvalNo
	 * @return
	 */
	Approval selectOpenStoreApproval(int approvalNo);


	/** 기안서 상세조회(지출)
	 * @param approvalNo
	 * @return
	 */
	Approval selectExpenseApproval(int approvalNo);


	/** 기안서 상세조회(발주)
	 * @param approvalNo
	 * @return
	 */
	List<Approval> selectOrderApproval(int approvalNo);



	/** 결재자 목록 상세조회(비동기)
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
	 * @param paramMap
	 * @return
	 */
	int approve(Map<String, Object> paramMap);


	/** 반려버튼 클릭 시 반려
	 * @param paramMap
	 * @return
	 */
	int returnApprove(Map<String, Object> paramMap);


	/** 발주 주문서 insert
	 * @param approvalList
	 * @return
	 */
	int insertOrder(List<Approval> approvalList);



	/** 삭제버튼 클릭 시 삭제
	 * @param approvalNo
	 * @return
	 */
	int deleteApprove(int approvalNo);



	/** 반려취소(결재자)
	 * @param paramMap
	 * @return
	 */
	int cancleReturn(Map<String, Object> paramMap);



	/** 반려취소(기안서)
	 * @param paramMap
	 * @return
	 */
	int cancleReturnApp(Map<String, Object> paramMap);



	/** 반려사유 업데이트
	 * @param paramMap
	 */
	void returnApproveReason(Map<String, Object> paramMap);



	/** 기안서 반려상태로 업데이트
	 * @param paramMap
	 */
	void returnApproveCondition(Map<String, Object> paramMap);


	/** 반려사유 조회
	 * @param approvalNo
	 * @return
	 */
	String selectReturnReason(int approvalNo);



	/** 결재문서가 모두 승인이 났는지 확인 후 문서상태 변경
	 * @param approvalNo
	 * @return
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
	 * @return
	 */
	int approvalDeleteScheduling(int approvalNo);

	/** 결재대기함에 있는 모든 기안서의 갯수 조회
	 * @return
	 */
	int getWaitApprovalListCount(int memberNo);

	/** 결재진행함에 있는 모든 기안서의 갯수 조회
	 * @return
	 */
	int getProgressApprovalListCount(int memberNo);







}
