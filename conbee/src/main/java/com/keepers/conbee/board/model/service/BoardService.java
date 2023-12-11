package com.keepers.conbee.board.model.service;

import java.util.Map;

public interface BoardService {

	/** 게시글 조회(일반)
	 * @param boardCode
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectBoardList(int boardCodeNo, int cp);

	Map<String, Object> searchBoardList(Map<String, Object> paramMap, int cp);

}
