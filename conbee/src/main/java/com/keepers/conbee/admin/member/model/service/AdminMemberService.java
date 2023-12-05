package com.keepers.conbee.admin.member.model.service;

import java.util.Map;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.member.model.dto.Member;

public interface AdminMemberService {

	
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

	/** 전체 멤버 조회
	 * @param cp
	 * @return
	 */
	Map<String, Object> readAllMemberList(int cp);

	/** 검색한 멤버 조회
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> searchMemberList(Map<String, Object> paramMap, int cp);


}
