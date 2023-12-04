package com.keepers.conbee.admin.member.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.admin.member.model.mapper.AdminMemberMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminMemberServiceImpl implements AdminMemberService{

	private final AdminMemberMapper mapper;
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원 등록 유효성 검사ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	// 아이디 유효성 검사
	@Override
	public int checkMemberId(String memberId) {
		return mapper.checkMemberId(memberId);
	}
	
	// 이메일 유효성 검사
	@Override
	public int checkMemberEmail(String memberEmail) {
		return mapper.checkMemberEmail(memberEmail);
	}
	
	
	
	
	
	
	
	
}
