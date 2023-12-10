package com.keepers.conbee.board.model.service;

import com.keepers.conbee.board.model.dto.Board;

public interface EditBoardService {

	/** 게시글 작성
	 * @param board
	 * @return
	 */
	int boardWrite(Board board);

}
