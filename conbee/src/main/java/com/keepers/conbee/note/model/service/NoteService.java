package com.keepers.conbee.note.model.service;

import java.util.List;
import java.util.Map;

import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.note.model.dto.Note;

public interface NoteService {

	/** 이름으로 검색
	 * @param memberName
	 * @return
	 */
	List<Member> nameSearch(String memberName);
	
	/**
	 * 쪽지 발송
	 * @param note
	 * @return
	 */

	int noteWrite(Note note);

	/** 받은 쪽지 조회
	 * @param memberNo
	 * @param query 
	 * @param cp 
	 * @return
	 */
	Map<String, Object> selectNoteReceive(int memberNo, int cp);
	
	/** 받은 쪽지 조회(검색)
	 * @param memberNo
	 * @param query
	 * @param cp
	 * @return
	 */
	Map<String, Object> searchNoteReceive(int memberNo, String query, int cp);

	/** 쪽지 읽음
	 * @param messageNo
	 * @return
	 */
	int readCheck(int messageNo);

	/** 안 읽은 쪽지 수
	 * @param memberNo
	 * @return
	 */
	int unReadCount(int memberNo);
	
	/** 쪽지 저장
	 * @param messageNo
	 * @return
	 */
	int save(int messageNo);

	/** 쪽지 보관함
	 * @param memberNo
	 * @return
	 */
	List<Note> notekeep(int memberNo);
	
	/**
	 * 쪽지 삭제
	 * @param messageNoList
	 * @return
	 */

	int deleteNoteReceive(List<Integer> messageNoList);

	int deleteNoteSent(List<Integer> messageNoList);

	int deleteNoteKeep(List<Integer> messageNoList);
	
	/**
	 * 보낸 쪽지 조회
	 * @param memberNo
	 * @return
	 */
	Map<String, Object> selectNoteSent(int memberNo, int cp);
	
	
	/**
	 * 보낸 쪽지 조회(검색)
	 * @param memberNo
	 * @param query
	 * @param cp
	 * @return
	 */

	Map<String, Object> searchNoteSent(int memberNo, String query, int cp);
	
	
	
	
	
	
	/**
	 * 쪽지 보관함 조회
	 * @param memberNo
	 * @param cp
	 * @return
	 */

	Map<String, Object> selectNoteKeep(int memberNo, int cp);

	/**
	 * 쪽지 보관함 검색
	 * @param memberNo
	 * @param query
	 * @param cp
	 * @return
	 */
	Map<String, Object> searchNoteKeep(int memberNo, String query, int cp);

	




	



	



	
	
}
