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


	
}
