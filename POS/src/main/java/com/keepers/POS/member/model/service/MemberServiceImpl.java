package com.keepers.POS.member.model.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.POS.member.model.dto.Member;
import com.keepers.POS.member.model.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

	private final MemberMapper mapper;
	private final BCryptPasswordEncoder bcrypt;
	
	@Override
	public Member login(Member inputMember) {
		
		// 아이디가 일치하는 회원의 암호화 된 비밀번호 얻어오기
		Member loginMember = mapper.login(inputMember);

		// 조회 결과가 없을 경우(아이디 일치 회원 없음) return null
		if(loginMember == null) {
			return null;
		}

		// 입력받은 비밀번호(평문)와 조회한 비밀번호(암호문)가 같지 않으면 return null;
		if(!bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw())) {
			return null;
		}
		
		// 비밀번호 일치 시 비밀번호 제거 후 loginMember return
		loginMember.setMemberPw(null);
		return loginMember;
	}
	
	
}
