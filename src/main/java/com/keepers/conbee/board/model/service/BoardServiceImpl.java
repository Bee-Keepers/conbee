package com.keepers.conbee.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.approval.model.dto.Pagination10;
import com.keepers.conbee.board.model.dto.Board;
import com.keepers.conbee.board.model.mapper.BoardMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService{
	
	private final BoardMapper mapper;
	
	// 전체 게시글 조회
	@Override
	public Map<String, Object> selectBoardList(int boardCodeNo, int cp) {
		
		int listCount = mapper.getListCount(boardCodeNo);
		
		/* cp, listCount를 이용해서 Pagination 객체 생성 */
		Pagination10 pagination = new Pagination10(cp, listCount);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Board> boardList = mapper.selectBoardList(rowBounds, boardCodeNo);
		
		
		String boardCodeName = mapper.selectBoardName(boardCodeNo);
		
		Map<String, Object> map = new HashMap<>();
		map.put("boardList", boardList);
		map.put("pagination", pagination);
		map.put("boardCodeName", boardCodeName);
		
		return map;
	}
	
	// 검색 목록 조회
	@Override
	public Map<String, Object> searchBoardList(Map<String, Object> paramMap, int cp) {
		return null;
	}
	
	
	// 북마크
	@Override
	public int bookMark(Map<String, Object> map) {
		
		
		return mapper.bookMark(map);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// 게시글 상세조회 작업중(EditBoardController)
	@Override
	public Board boardDetail(Map<String, Object> map) {
		return mapper.boardDetail(map);
	}
	
	
	
	
	
	

}
