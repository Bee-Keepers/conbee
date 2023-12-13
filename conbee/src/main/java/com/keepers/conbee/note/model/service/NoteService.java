package com.keepers.conbee.note.model.service;

import java.util.List;

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

	int notewrite(Note note);
	
			



	


	
	
}
