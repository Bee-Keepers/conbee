package com.keepers.conbee.note.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.note.model.dto.Note;
import com.keepers.conbee.note.model.mapper.NoteMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class NoteServiceImpl implements NoteService {

	private final NoteMapper mapper;
	
	// 주소록 검색
	@Override
	public List<Member> nameSearch(String memberName) {
		return mapper.nameSearch(memberName);
	}
	
	// 쪽지 발송
	@Override
	public int notewrite(Note note) {
		
		return mapper.notewrite(note);
	}

}
