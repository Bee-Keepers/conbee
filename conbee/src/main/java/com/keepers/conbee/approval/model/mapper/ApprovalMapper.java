package com.keepers.conbee.approval.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.member.model.dto.Member;

@Mapper
public interface ApprovalMapper {

	/**
	 * @param memberNo
	 * @return
	 */
	Member selectWriteInfo(int memberNo);

}
