package com.keepers.conbee.admin.member.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.member.model.dto.Member;

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

	/** 점포 번호 유효성 검사
	 * @param storeNo
	 * @return
	 */
	List<Integer> checkStoreNo(int storeNo);

	/** 회원 주소 유효성 검사
	 * @param memberAddress
	 * @return
	 */
	int checkMemberAddress(String memberAddress);

	/** 신규 회원 등록
	 * @param inputMember
	 * @return
	 */
	int memberInsert(Member inputMember);

	
//	--------------------------------------------
	/** 멤버 전체 조회 카운트
	 * @return
	 */
	int getListCount();

	/** 멤버 전체 조회
	 * @param rowBounds
	 * @return
	 */
	List<Member> readAllMemberList(RowBounds rowBounds);

//	--------------------------------------------
	
	/** 검색과 일치한 멤버 조회
	 * @param paramMap
	 * @return
	 */
	int searchMemberListCount(Map<String, Object> paramMap);

	/** 검색한 멤버 목록 조회
	 * @param paramMap
	 * @param rowBounds
	 * @return
	 */
	List<Member> searchMemberList(Map<String, Object> paramMap, RowBounds rowBounds);

	/** 회원 등록 비밀번호 지정 및 암호화
	 * @param inputMember
	 */
	void password(Member inputMember);

	/** 점포 번호 얻어오기
	 * @param inputMember
	 * @return
	 */
	int setMemberNo(Member inputMember);

	/** 회원 탈퇴 버튼 작동
	 * @param map
	 * @return
	 */
	int changeMemberDelFl(Map<String, Object> map);

	/** 회원가입 시 부서 선택 후 팀 셀렉 기능
	 * @param departmentNo
	 * @return
	 */
	List<Member> teamList(String departmentNo);

	/** 회원 정보 수정
	 * @param updateMember
	 * @return
	 */
	int memberUpdateResult(Member updateMember);

	/** 회원 정보 수정 (점포번호 수정)
	 * @param updateMember
	 * @return
	 */
	int memberUpdateStoreNo(Member updateMember);

	/** 회원 정보 수정 멤버 조회
	 * @param updateMember
	 * @return
	 */
	int searchMemerNo(Member updateMember);

	/** 회원 정보 수정(회원 이름 / 회원 아이디 일치 여부 확인)
	 * @param updateMember
	 * @return
	 */
	int compareMember(Member updateMember);

	/** 회원 수정 - 검색 회원 조회
	 * @param memberId
	 * @return
	 */
	Member updateMemberInfo(String memberId);

	/** 회원 상세 조회
	 * @param getMember
	 * @return
	 */
	Member memberDetail(String memberId);

	

}
