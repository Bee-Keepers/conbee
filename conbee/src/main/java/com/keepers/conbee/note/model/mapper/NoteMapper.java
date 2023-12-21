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

	/** 받은 쪽지 조회
	 * @param memberNo
	 * @return
	 */
	List<Note> noteReceive(int memberNo);

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
	
	/**
	 * 보낸 쪽지 조회
	 * @param memberNo
	 * @return
	 */

	List<Note> noteSent(int memberNo);

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
	
	

	
	
	

	


	


}
