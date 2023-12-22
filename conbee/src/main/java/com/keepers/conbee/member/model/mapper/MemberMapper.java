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

	/** 비밀번호 암호화
	 * @param inputMember
	 */
	void password(Member inputMember);

	/** 아이디 찾기(멤버 조회)
	 * @param inputInformation
	 * @return
	 */
	int findMember(Member inputInformation);

	/** 아이디 찾기 (찐)
	 * @param inputInformation
	 * @return
	 */
	String findMemberId(Member inputInformation);

	/** 비밀번호 찾기(회원 조회)
	 * @param inputInformation
	 * @return
	 */
	int findMemberPw(Member inputInformation);

	/** 비밀번호 찾기(찐)
	 * @param inputInformation
	 * @return
	 */
	Member findPw(Member inputInformation);

	/** 비밀번호 찾기 후 변경
	 * @param inputMember
	 * @return
	 */
	int findPwResult(Member inputMember);

	


	
}
