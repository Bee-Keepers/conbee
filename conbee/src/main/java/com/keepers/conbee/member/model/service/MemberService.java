package com.keepers.conbee.member.model.service;

import com.keepers.conbee.member.model.dto.Member;

public interface MemberService {

	/** 로그인 서비스
	 * @param inputMember
	 * @return
	 */
	Member login(Member inputMember);

	/** 빠른 로그인
	 * @param memberId
	 * @return
	 */
	Member quickLogin(String memberId);

	/** ID 찾기(멤버 조회)
	 * @param inputInformation
	 * @return
	 */
	int findMember(Member inputInformation);

	/** Id 찾기
	 * @param inputInformation
	 * @return
	 */
	String findMemberId(Member inputInformation);

	
	
	
	
	
	
	
	
	
	

}
