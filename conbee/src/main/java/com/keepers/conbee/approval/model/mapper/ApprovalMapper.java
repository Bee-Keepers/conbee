package com.keepers.conbee.approval.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.member.model.dto.Member;

@Mapper
public interface ApprovalMapper {

	/** 기안문 작성자 정보 조회
	 * @param memberNo
	 * @return member
	 * @author 유진
	 */
	Member selectWriteInfo(int memberNo);

	/** 기안문 insert
	 * @param approval
	 * @return result
	 * @author 유진
	 */
	int insertApproval(Approval approval);

}
 