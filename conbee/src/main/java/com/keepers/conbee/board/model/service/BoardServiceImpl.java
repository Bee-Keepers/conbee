package com.keepers.conbee.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.approval.model.dto.Pagination;
import com.keepers.conbee.board.model.dto.Board;
import com.keepers.conbee.board.model.mapper.BoardMapper;

//import edu.kh.project.board.model.dto.Pagination;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService{
	
	private final BoardMapper mapper;
	
	@Override
	public Map<String, Object> selectBoardList(int boardCodeNo, int cp) {
		
		int listCount = mapper.getListCount(boardCodeNo);
		
		/* cp, listCount를 이용해서 Pagination 객체 생성 */
		Pagination pagination = new Pagination(cp, listCount);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Board> boardList = mapper.selectBoardList(boardCodeNo);
		
		Map<String, Object> map = new HashMap<>();
		map.put("boardList", boardList);
		map.put("pagination", pagination);
		
		
		return map;
	}
	
	@Override
	public Map<String, Object> searchBoardList(Map<String, Object> paramMap, int cp) {
		// TODO Auto-generated method stub
		return null;
	}
	

}
