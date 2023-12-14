
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
	 * @return approval list
	 */
	List<Approval> selectTempSave(int memberNo);
	
	
	/** 임시저장함 데이터 받아오기
	 * @param approvalNo
	 * @param docCategoryNo 
	 * @return
	 */
	Map<String, Object> selectTempData(int approvalNo, int docCategoryNo);
	
	
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

	
	/** 결재요청함 조회
	 * @param memberNo
	 * @param cp 
	 * @return approval list
	 */
	public Map<String, Object> selectRequestApproval(int memberNo, int cp);
	
	
	/** 회수문서함 조회
	 * @param memberNo
	 * @return approval list
	 */
	List<Approval> selectReclaimApproval(int memberNo);
	
	
	
	/* ============================= 예리나 ================================ */

	/** 결재대기함 조회
	 * @param memberNo
	 * @return
	 */
	List<Approval> selectWaitApproval(int memberNo);

	/** 결재진행함 조회
	 * @param memberNo
	 * @return
	 */
	List<Approval> selectProgressApproval(int memberNo);

	/** 완료문서함 조회
	 * @param memberNo
	 * @return
	 */
	List<Approval> selectCompleteApproval(int memberNo);

	/** 반려문서함 조회
	 * @param memberNo
	 * @return
	 */
	List<Approval> selectReturnApprovalList(int memberNo);

	/** 협조문서함 조회
	 * @param departmentNo
	 * @return
	 */
	List<Approval> selectJoinApprovalList(int departmentNo);

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
	 * @return
	 */
	int returnApprove(int approvalNo, int memberNo);


	/** 발주기안서 상세조회(비동기)
	 * @param approvalNo
	 * @param docCategoryNo
	 * @return
	 */
	List<Approval> waitApprovalList(int approvalNo, int docCategoryNo);











} 

