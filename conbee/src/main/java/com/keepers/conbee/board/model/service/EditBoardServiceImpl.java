package com.keepers.conbee.board.model.service;

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
	public int boardWrite(Board board) {
		return mapper.boardWrite(board);
	}
	
	// 게시글 제목 얻어오기
	@Override
	public String boardName(int boardCodeNo) {
		return boardMapper.selectBoardName(boardCodeNo);
	}
	
}
