package com.keepers.conbee.member.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.member.model.dto.Member;

@Mapper
public interface MemberMapper {

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

	/** 비밀번호 암호화( 임시 삭제예정)
	 * @param inputMember
	 */
	void password(Member inputMember);




	
}
