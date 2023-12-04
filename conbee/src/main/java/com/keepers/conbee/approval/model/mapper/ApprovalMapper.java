
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
	* @author 유진
	*/
	Member selectWriteInfo(int memberNo);

	/** 결재자 리스트 조회
	 * @param memberNo
	 * @return memberList
	 */
	List<Member> selectApproverList(int memberNo);
	
	/** 기안문 insert
	* @param approval
	* @return result
	* @author 유진
	*/
	int insertApproval(Approval approval);

	
	/** Doc insert
	 * @param approval
	 * @return result2
	 * @author 유진
	 */
	int insertApprovalDoc(Approval approval);

	/** 결재자 리스트 insert
	 * @param approverList
	 * @return result3
	 * @author 유진
	 */
	int insertApproverList(List<Approver> approverList);


}
