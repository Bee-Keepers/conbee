package com.keepers.conbee.board.model.service;

import java.io.IOException;
import java.util.Map;

import com.keepers.conbee.board.model.dto.Board;

public interface EditBoardService {

	/** 게시글 작성
	 * @param board
	 * @param image 
	 * @return
	 */
	int boardWrite(Board board);

	/** 게시글 제목 얻어오기
	 * @param boardCodeNo
	 * @return
	 */
	String boardName(int boardCodeNo);

	/** 게시글 삭제
	 * @param paramMap
	 * @return
	 */
	int deleteBoard(Map<String, Integer> paramMap);

	/** 게시글 수정
	 * @param board
	 * @param deleteOrder
	 * @return
	 */
	int updateBoard(Board board) throws IllegalStateException, IOException;
	
	
}


