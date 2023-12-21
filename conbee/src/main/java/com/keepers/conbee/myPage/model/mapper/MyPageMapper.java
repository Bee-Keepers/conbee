package com.keepers.conbee.myPage.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.board.model.dto.Board;
import com.keepers.conbee.member.model.dto.Member;

@Mapper
public interface MyPageMapper {

	int myPageStoreUpdate(Map<String, Object> map);
	
	

	Store myPageStore(int storeNo);
	
	

//	List<Board> selectWriteList(int memberNo);



	List<Board> commentList(int memberNo);




	List<Board> choiceList(int memberNo);



	int getListCount(Map<String, Object> paramMap);



	List<Member> selectWriteList(Map<String, Object> paramMap, RowBounds rowBounds);





	List<Member> selectcommentList(Map<String, Object> paramMap, RowBounds rowBounds);



	List<Member> selectchoiceNameList(Map<String, Object> paramMap, RowBounds rowBounds);
	
	
	/** 프로필 이미지 수정
	 * @param loginMember
	 * @return
	 */
	int updateMemberProfile(Member loginMember);


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



	/** 비밀번호 유효성 검사
	 * @param memberPw
	 * @return
	 */
//	int checkMemberPw(String memberPw);
	
	
	
	


}