package com.keepers.conbee.board.model.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.board.model.dto.Board;
import com.keepers.conbee.board.model.mapper.BoardMapper;
import com.keepers.conbee.board.model.mapper.EditBoardMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class EditBoardServiceImpl implements EditBoardService{

	private final EditBoardMapper mapper;
	private final BoardMapper boardMapper;
	
	// 게시글 작성
	@Override
	public int boardWrite(Board board)  {
		return mapper.boardWrite(board);
	}
	
	// 게시글 제목 얻어오기
	@Override
	public String boardName(int boardCodeNo) {
		return boardMapper.selectBoardName(boardCodeNo);
	}
	
	// 게시글 삭제
	@Override
	public int deleteBoard(Map<String, Integer> paramMap) {
		
		// 신고게시글인지 확인
		int result = mapper.checkReportBoard(paramMap);

		if(result > 0) {
			// 신고글인 경우 REPORT 테이블 업데이트
			mapper.reportAnswerBoard(paramMap);
		}

		return mapper.deleteBoard(paramMap);
	}
	
	
	// 게시글 수정
	@Override
	public int updateBoard(Board board) throws IllegalStateException, IOException {
		
		// 1. 게시글 수정(제목, 내용 수정)
		int result = mapper.updateBoard(board);
		
		// 수정 실패 시 
		if(result == 0) return 0;
		
			
			Map<String, Object> map = new HashMap<>();
			map.put("boardNo", board.getBoardNo());
		return result;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
