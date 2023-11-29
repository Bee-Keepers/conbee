package com.keepers.POS.member.model.service;

import com.keepers.POS.member.model.dto.Member;

public interface MemberService {

	/** 로그인
	 * @param inputMember
	 * @return loginMember
	 */
	Member login(Member inputMember);

}
