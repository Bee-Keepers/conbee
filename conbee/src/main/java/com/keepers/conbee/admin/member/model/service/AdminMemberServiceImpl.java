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
import com.keepers.conbee.approval.model.dto.PaginationAdmin;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminMemberServiceImpl implements AdminMemberService{

	private final AdminMemberMapper mapper;
	private final BCryptPasswordEncoder bcrypt;
	
	
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡ 1. 회원 조회 ㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	
	/**
	 * 전체 멤버 조회
	 */
	@Override
	public Map<String, Object> readAllMemberList(int cp) {
		
		int listCount = mapper.getListCount();
		
		PaginationAdmin pagination = new PaginationAdmin(cp, listCount);
		
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		// 마이바티스 호출
		List<Member> memberList = mapper.readAllMemberList(rowBounds);
		
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
		
		// 검색 조건이 일치하는 멤버 수 조회
		int listCount = mapper.searchMemberListCount(paramMap);
		
		PaginationAdmin pagination = new PaginationAdmin(cp, listCount);
		
		// RowBounds 객체 생성
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		// 마이바티스 호출
		List<Member> memberList = mapper.searchMemberList(paramMap, rowBounds);
		
		// Map에 담아 반환
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("memberList", memberList);
		
		return map;
	}
	
	
	
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 2. 회원 등록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	
	/**
	 * 회원가입
	 */
	@Override
	public int memberInsert(Member inputMember) {
		
		// 비밀번호 암호화
		// 암호화된 비밀번호 inputMember에 저장
		inputMember.setMemberPw(bcrypt.encode(inputMember.getMemberPw()));
		
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
	public int checkStoreNo(int storeNo) {
		List<Integer> list = mapper.checkStoreNo(storeNo);
		if(list.contains(storeNo)) {
			return 1;
		}
		return  0;
	}
	
	// 회원 주소 유효성 검사
	@Override
	public int checkMemberAddress(String memberAddress) {
		return mapper.checkMemberAddress(memberAddress);
	}
	
	
	
	
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 3. 회원 탈퇴 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	
	// 회원 탈퇴 버튼
	@Override
	public int changeMemberDelFl(String memberDelFl, int memberNo) {
		
		// 회원 여부가 탈퇴 "Y"일 경우 "N" 복구로 변경 등
		if(memberDelFl.equals("Y")) {
			memberDelFl = "N";
		} else {
			memberDelFl ="Y";
		}
		
		// 처음에 받아온 memberNo와 memberEnrollDate를 한번에 두개의 값을 보낼 수 없기에 
		// Map에 두개를 담아서 한번에 전달하기
		Map<String, Object> map = new HashMap<>();
		map.put("memberDelFl", memberDelFl);
		map.put("memberNo", memberNo);
		
		return mapper.changeMemberDelFl(map);
	}
	
	
	
	
	/**
	 * 회원 수정
	 *
	 */
	@Override
	public int memberUpdateResult(Member updateMember) {

		int result = mapper.searchMemerNo(updateMember);

		// 기존 회원번호가 없을 경우 return
		if (result <= 0) {
			return 100;
		}

		// 회원 이름과 회원번호가 기등록과 다를 경우 return
		int result1 = mapper.compareMember(updateMember);

		// 기존 회원번호와 회원 이름이 일치하는 경우 없을 경우 return
		// (일치시 1, 불일치시 0)
		if (result1 <= 0) {
			return 50;
		}

		// 점포 번호 변경 수정
		
		mapper.memberUpdateStoreNo(updateMember);

		// 회원 정보 수정
		return mapper.memberUpdateResult(updateMember);
	}
	
	
	// 검색한 회원 조회
	@Override
	public Member updateMemberInfo(String memberId) {
		return mapper.updateMemberInfo(memberId);
	}
	
	
	//============================= 예리나 =====================================
	
	/** 회원가입 시 부서 선택 후 팀 셀렉 기능
	 *
	 */
	@Override
	public List<Member> teamList(String departmentNo) {
		
		// 팀명 받아오기
		List<Member> teamList = mapper.teamList(departmentNo);
		
		return teamList;
	}
	
	
	
	
}
