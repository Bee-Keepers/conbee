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
	int checkStoreNo(Store storeNo);

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
	List<Map<String, Object>> readAllMemberList(RowBounds rowBounds);

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
	List<Map<String, Object>> searchMemberList(Map<String, Object> paramMap, RowBounds rowBounds);

	/** 회원 등록 비밀번호 지정 및 암호화
	 * @param inputMember
	 */
	void password(Member inputMember);

	/** 점포 번호 얻어오기
	 * @param inputMember
	 * @return
	 */
	int setMemberNo(Member inputMember);

	

}
