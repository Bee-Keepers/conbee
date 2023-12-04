package com.keepers.conbee.member.model.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.member.model.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional

public class MemberServiceImpl implements MemberService{

	private final MemberMapper mapper;
	private final BCryptPasswordEncoder bcrypt;
	
	// 로그인 서비스
	@Override
	public Member login(Member inputMember) {
		
//		// 비밀번호 123123으로 변경 후 암호화(임시 - 회원 등록 완성 시 삭제 예정)
//		inputMember.setMemberPw(bcrypt.encode("123123"));
//		mapper.password(inputMember);
		 
		
//		// 아이디가 일치하는 회원의 암호화 된 비밀번호 얻어오기
		Member loginMember = mapper.login(inputMember);
		
		// 조회 결과가 없을 경우(아이디 일치 회원 없음) return null
		if(loginMember == null) {
			return null;
		}
		
		// 회원가입 왼료 후 풀기
//		
//		// 입력받은 비밀번호(평문)와 조회한 비밀번호(암호문)가 같지 않으면 return null;
//		if(!bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw())) {
//			return null;
//		}
//		
//		
		// 비밀번호 일치 시 비밀번호 제거 후 loginMember return
		loginMember.setMemberPw(null);
		return loginMember;
	}
	
	
	// 빠른 로그인 
	@Override
	public Member quickLogin(String memberId) {
		return mapper.quickLogin(memberId);
	}
	
	
	
	
	
}
