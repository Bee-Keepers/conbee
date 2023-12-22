package com.keepers.conbee.note.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.note.model.dto.Note;

@Mapper
public interface NoteMapper {

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

	
	/** 받은 쪽지 개수 조회
	 * @param memberNo
	 * @return
	 */
	int noteReceiveCount(int memberNo);

	int searchNoteReceiveCount(Map<String, Object> param);
	
	/** 받은 쪽지 조회
	 * @param memberNo
	 * @param rowBounds 
	 * @return
	 */
	List<Note> selectNoteReceive(int memberNo, RowBounds rowBounds);

	List<Note> searchNoteReceive(Map<String, Object> param, RowBounds rowBounds);
	
	


	
	
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

	/** 저장 되어있는지 확인
	 * @param messageNo
	 * @return
	 */
	int alreadySave(int messageNo);
	
	
	/**
	 * 쪽지 삭제
	 * @param messageNoList
	 * @return
	 */

	int deleteNoteReceive(List<Integer> messageNoList);

	int deleteNoteSent(List<Integer> messageNoList);

	int deleteNoteKeep(List<Integer> messageNoList);
	
	
	
	
	/**
	 * 보낸 쪽지함 조회
	 * @param memberNo
	 * @return
	 */

	int selectNoteSentCount(int memberNo);

	List<Note> selectNoteSent(int memberNo, RowBounds rowBounds);
	
	
	
	/**
	 * 보낸 쪽지함 검색
	 * @param param
	 * @return
	 */
	int searchNoteSentCount(Map<String, Object> param);

	List<Note> searchNoteSent(Map<String, Object> param, RowBounds rowBounds);
	
	
	/**
	 * 쪽지 보관함 조회
	 * @param memberNo
	 * @return
	 */

	int selectNoteKeepCount(int memberNo);

	List<Note> selectNoteKeep(int memberNo, RowBounds rowBounds);
	
	/**
	 * 쪽지 보관함 검색
	 * @param param
	 * @return
	 */

	int searchNoteKeepCount(Map<String, Object> param);

	List<Note> searchNoteKeep(Map<String, Object> param, RowBounds rowBounds);
	
	


	
	

	


	


	

	





	




	

	

	
	
	

	


	


}
