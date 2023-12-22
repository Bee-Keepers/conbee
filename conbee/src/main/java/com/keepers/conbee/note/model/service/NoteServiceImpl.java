package com.keepers.conbee.note.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.approval.model.dto.Pagination;
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
	public int noteWrite(Note note) {
		
		return mapper.noteWrite(note);
	}
	
	@Override
	public List<Note> noteReceive(int memberNo) {
		return mapper.noteReceive(memberNo);
	}
	
	// 쪽지 읽음
	@Override
	public int readCheck(int messageNo) {
		return mapper.readCheck(messageNo);
	}

	// 안 읽은 쪽지 수
	@Override
	public int unReadCount(int memberNo) {
		return mapper.unReadCount(memberNo);
	}
	
	// 보낸쪽지함
	@Override
	public List<Note> noteSent(int memberNo) {

		return mapper.noteSent(memberNo);
		
	}
	
	// 쪽지 저장
	@Override
	public int save(int messageNo) {
		int result = mapper.alreadySave(messageNo);
		
		// 만약 이미 저장된 메시지라면
		if(result > 0) {
			return -1;
		}
		
		return mapper.save(messageNo);
	}

	// 쪽지 보관함
	@Override
	public List<Note> notekeep(int memberNo) {
		return mapper.notekeep(memberNo);
	}
	
	// 쪽지 삭제
	@Override
	public int deleteNoteReceive(List<Integer> messageNoList) {
		
		return mapper.deleteNoteReceive(messageNoList);
	}
	
	@Override
	public int deleteNoteSent(List<Integer> messageNoList) {
		return mapper.deleteNoteSent(messageNoList);
	}
	
	@Override
	public int deleteNoteKeep(List<Integer> messageNoList) {
		
		return mapper.deleteNoteKeep(messageNoList);
	}
	
	// 보낸 쪽지 저장
	@Override
	public int savesent(int messageNo) {
		
		return mapper.savesent(messageNo);
	}
	
}
