
package com.keepers.conbee.approval.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.approval.model.dto.Approver;
import com.keepers.conbee.member.model.dto.Member;

@Mapper
public interface ApprovalMapper {


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
	
	

	/** 결재요청함
	 * @param memberNo
	 * @return
	 */
	List<Approval> selectRequestApproval(int memberNo);

	
	
	
	
	
	/* ============================= 예리나 ================================ */

	/** 결재대기함
	 * @param memberNo
	 * @return
	 */
	List<Approval> selectWaitApproval(int memberNo);


	/** 결재진행함 조회
	 * @param memberNo
	 * @return
	 */
	List<Approval> selectProgressApproval(int memberNo);


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






}
