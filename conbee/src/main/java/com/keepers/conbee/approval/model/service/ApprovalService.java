package com.keepers.conbee.approval.model.service;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.member.model.dto.Member;

public interface ApprovalService {

	/**
	 * @param memberNo
	 * @return
	 */
	Member selectWriteInfo(int memberNo);

}
