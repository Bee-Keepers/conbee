package com.keepers.conbee.admin.member.model.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMemberMapper {

	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원 등록 유효성 검사ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	/** 아이디 유효성 검사
	 * @param memberId
	 * @return
	 */
	int checkMemberId(String memberId);

	/** 이메일 유효성 검사
	 * @param memberEmail
	 * @return
	 */
	int checkMemberEmail(String memberEmail);


}
