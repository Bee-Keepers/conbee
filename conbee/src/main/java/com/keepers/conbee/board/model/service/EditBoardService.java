package com.keepers.conbee.board.model.service;

import java.util.Map;


import com.keepers.conbee.board.model.dto.Board;

public interface EditBoardService {

	/** 게시글 작성
	 * @param board
	 * @return
	 */
	int boardWrite(Board board);

	/** 게시글 제목 얻어오기
	 * @param boardCodeNo
	 * @return
	 */
	String boardName(int boardCodeNo);


	
	
	
	
	
}


