package com.keepers.conbee.note.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.approval.model.dto.Pagination;
import com.keepers.conbee.approval.model.dto.Pagination10;
import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.note.model.dto.Note;
import com.keepers.conbee.note.model.mapper.NoteMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
	
	// 받은 쪽지함  조회
	@Override
	public Map<String, Object> selectNoteReceive(int memberNo, int cp) {
		
		int listCount = mapper.noteReceiveCount(memberNo);
		
		Pagination pagination = new Pagination(cp, listCount);
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset,limit);
		
		List<Note> noteList = mapper.selectNoteReceive(memberNo,rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("noteList", noteList);
		
		return map;
	}
	
	// 받은 쪽지함 조회(검색)
	@Override
	public Map<String, Object> searchNoteReceive(int memberNo, String query, int cp) {

		
		Map<String,Object> param = new HashMap<>();
		param.put("memberNo", memberNo);
		param.put("query", query);
		
		int listCount = mapper.searchNoteReceiveCount(param);
		
		Pagination pagination = new Pagination(cp, listCount);
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset,limit);
		
		List<Note> noteList = mapper.searchNoteReceive(param,rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("noteList", noteList);
		
		return map;
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
	
	// 보낸 쪽지함 조회 (페이지네이션)
	@Override
	public Map<String, Object> selectNoteSent(int memberNo, int cp) {
		
		int listCount = mapper.selectNoteSentCount(memberNo);
		
		Pagination pagination = new Pagination(cp, listCount);
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset,limit);
		
		List<Note> noteList = mapper.selectNoteSent(memberNo,rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("noteList", noteList);
		
		return map;
	}
	
	// 보낸쪽지함 검색
	@Override
	public Map<String, Object> searchNoteSent(int memberNo, String query, int cp) {

		
		Map<String,Object> param = new HashMap<>();
		param.put("memberNo", memberNo);
		param.put("query", query);
		
		int listCount = mapper.searchNoteSentCount(param);
		
		Pagination pagination = new Pagination(cp, listCount);
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset,limit);
		
		List<Note> noteList = mapper.searchNoteSent(param,rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("noteList", noteList);
		
		return map;
	
	
	}
	
	// 쪽지 보관함 조회
	@Override
	public Map<String, Object> selectNoteKeep(int memberNo, int cp) {
		
	int listCount = mapper.selectNoteKeepCount(memberNo);
		
		Pagination pagination = new Pagination(cp, listCount);
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset,limit);
		
		List<Note> noteList = mapper.selectNoteKeep(memberNo,rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("noteList", noteList);
		
		
		return map;

	}
	
	// 쪽지 보관함 검색
	@Override
	public Map<String, Object> searchNoteKeep(int memberNo, String query, int cp) {
		
		Map<String,Object> param = new HashMap<>();
		param.put("memberNo", memberNo);
		param.put("query", query);
		
		int listCount = mapper.searchNoteKeepCount(param);
		
		Pagination pagination = new Pagination(cp, listCount);
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset,limit);
		
		List<Note> noteList = mapper.searchNoteKeep(param,rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("noteList", noteList);
		
		return map;
	
	}
	
	
	
	

	
//-----------------------------------------------------------------------
	
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

	// 쪽지 보관함
		@Override
		public List<Note> notekeep(int memberNo) {
			return mapper.notekeep(memberNo);
		}

	
}
