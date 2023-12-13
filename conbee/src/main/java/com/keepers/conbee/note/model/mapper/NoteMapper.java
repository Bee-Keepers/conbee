package com.keepers.conbee.note.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

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

	int notewrite(Note note);

	


	


}
