
package com.keepers.conbee.approval.model.service;

import java.util.List;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.approval.model.dto.Approver;
import com.keepers.conbee.member.model.dto.Member;

public interface ApprovalService {
	
	
	/** 기안문 작성자 정보 조회
	 * @param memberNo
	 * @return member
	 * @author 유진
	 */
	Member selectInfo(int memberNo);
	
	/** 부서 모든 멤버 조회
	 * @param selectDepartment
	 * @return member list
	 * @author 유진
	 */
	List<Member> selectAllMember(String selectDepartment);

	/** 팀 멤버 조회
	 * @param selectTeam
	 * @return member list
	 * @author 유진
	 */
	List<Member> selectTeamMember(String selectTeam);

	/** 멤버 조회
	 * @param memberNo
	 * @return member
	 * @author 유진
	 */
	Member selectMember(int memberNo);


	/** 기안문 insert
	* @param approval
	* @return result
	* @author 유진
	 * @param approverList 
	*/
	int insertApproval(Approval approval, List<Approver> approverList);

	
	/** 결재요청함 조회
	 * @param memberNo
	 * @return approval list
	 * @author 유진
	 */
	List<Approval> selectRequestApproval(int memberNo);





} 

