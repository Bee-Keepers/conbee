package com.keepers.conbee.member.model.service;

import com.keepers.conbee.member.model.dto.Member;

public interface MemberService {

	/** 로그인 서비스
	 * @param inputMember
	 * @return
	 */
	Member login(Member inputMember);

}
