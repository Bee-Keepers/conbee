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
	public Map<String, Object> noteSent(int grade, String query, int cp,int i) {
		
		// 파라미터 전달용 map
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("grade", grade);
		paramMap.put("query", query);
		
		int listCount = mapper.getListCount(paramMap);
		
		Pagination pagination = new Pagination(cp, listCount, 9, 10);

		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();

		int limit = pagination.getLimit();

		RowBounds rowBounds = new RowBounds(offset, limit);
		
		
		List<Note> noteList = mapper.noteSent(paramMap, rowBounds);
		Map<String, Object> map = new HashMap<>();
		
		map.put("noteList", noteList);
		map.put("pagination", pagination);
		
		return map;
	}
	
	
}
