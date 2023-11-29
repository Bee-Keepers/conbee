package com.keepers.POS.member.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.POS.member.model.dto.Member;

@Mapper
public interface MemberMapper {

	/** 로그인
	 * @param inputMember
	 * @return loginMember
	 */
	Member login(Member inputMember);

}
