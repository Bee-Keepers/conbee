package com.keepers.conbee.admin.member.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.admin.member.model.mapper.AdminMemberMapper;
import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.approval.model.dto.Pagination;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminMemberServiceImpl implements AdminMemberService{

	private final AdminMemberMapper mapper;
	private final BCryptPasswordEncoder bcrypt;
	
	
	/**
	 * 전체 멤버 조회
	 */
	@Override
	public Map<String, Object> readAllMemberList(int cp) {
		
		int listCount = mapper.getListCount();
		
		Pagination pagination = new Pagination(cp, listCount);
		
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		// 마이바티스 호출
		List<Map<String, Object>> memberList = mapper.readAllMemberList(rowBounds);
		
		// Map에 담아 반환
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("memberList", memberList);
		
		return map;
	}
	
	/**
	 * 검색한 멤버 조회
	 */
	@Override
	public Map<String, Object> searchMemberList(Map<String, Object> paramMap, int cp) {
		
		// 검색 조건이 일치하는 게시글 수 조회
		int listCount = mapper.searchMemberListCount(paramMap);
		
		Pagination pagination = new Pagination(cp, listCount);
		
		// RowBounds 객체 생성
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		// 마이바티스 호출
		List<Map<String, Object>> memberList = mapper.searchMemberList(paramMap, rowBounds);
		
		// Map에 담아 반환
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("memberList", memberList);
		
		return map;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * 회원가입
	 */
	@Override
	public int memberInsert(Member inputMember) {
		
		// 비밀번호 암호화
		// 암호화된 비밀번호 inputMember에 저장
		inputMember.setMemberPw(bcrypt.encode("123123"));
		
		int result = mapper.memberInsert(inputMember);
		
		// 위에 메서드를 받아올 때 int result 말고 Member DTO로 받아옴 (inputMember 정보가 등록된 멤버정보)
		// 받아온 Member DTO에서 setter로 memberNo 따로 변수로 빼기
		// inputMember의 점포번호의 점포에 memberNo를 update하는 구문 mapper 호출하기
		if(result > 0 && inputMember.getStoreNo() > 0) {
			result = mapper.setMemberNo(inputMember);
		}
		
		
		return result;
	}
	
	
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
	
	// 점포 번호 유효성 검사
	@Override
	public int checkStoreNo(Store storeNo) {
		return mapper.checkStoreNo(storeNo);
	}
	
	// 회원 주소 유효성 검사
	@Override
	public int checkMemberAddress(String memberAddress) {
		return mapper.checkMemberAddress(memberAddress);
	}
	
	
	
	
}
