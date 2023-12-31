package com.keepers.conbee.myPage.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.board.model.dto.Board;
import com.keepers.conbee.member.model.dto.Member;

public interface MyPageService {

	int myPageStoreUpdate(int storeNo, String storeTel);

	Store myPageStore(int storeNo);

	Map<String, Object> selectWriteList(int memberNo, String query, int cp);

	List<Board> commentList(int memberNo);

	List<Board> choiceList(int memberNo);

	Map<String, Object> selectcommentList(int memberNo, String commentName, int cp);

	Map<String, Object> selectchoiceNameList(int memberNo, String choiceName, int cp);



	/** 프로필 이미지 수정
	 * @param memberProfile
	 * @param loginMember
	 * @return
	 */
	int updateMemberProfile(MultipartFile memberProfile, Member loginMember) throws IllegalStateException, IOException;
	
	
	/**
	 * 프로필 수정
	 * @param updateMember
	 * @return
	 */

	int myPageUpdate(Member updateMember);
	
	/**
	 * 이메일 유효성 검사
	 * @param memberEmail
	 * @return
	 */
	int checkmyPageEmail(String memberEmail);

	/** 전화번호 중복 검사
	 * @param memberTel
	 * @return
	 */
	int checkMemberTel(String memberTel);

	/** 비밀번호 중복 검사
	 * @param memberPw
	 * @return
	 */
//	int checkMemberPw(String memberPw);
}
