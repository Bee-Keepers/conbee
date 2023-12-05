
package com.keepers.conbee.approval.model.service;

import java.util.List;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.member.model.dto.Member;

public interface ApprovalService {

	/** 기안문 작성자 정보 조회
	* @param memberNo
	* @return member
	* @author 유진
	*/
	Member selectWriteInfo(int memberNo);

	/** 결재자 리스트 정보 조회
	 * @param memberNo
	 * @return member list
	 * @author 유진
	 */
	List<Member> selectApproverList(int memberNo);
  
  
	/** 기안문 insert
	* @param approval
	* @return result
	* @author 유진
	*/
	int insertApproval(Approval approval);

	/**
	 * @param memberNo
	 * @return
	 */
	List<Approval> selectRequestApproval(int memberNo);


} 

