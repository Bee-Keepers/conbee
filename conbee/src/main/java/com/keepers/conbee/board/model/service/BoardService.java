package com.keepers.conbee.board.model.service;

import java.util.Map;

import com.keepers.conbee.board.model.dto.Board;

public interface BoardService {

	/** 게시글 조회(일반)
	 * @param boardCode
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectBoardList(int boardCodeNo, int cp);

	/** 검색한 게시글 조회
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> searchBoardList(Map<String, Object> paramMap, int cp);

	/** 게시글 상세 조회(컨트롤러 EditBoardController)
	 * @param map
	 * @return
	 */
	Board boardDetail(Map<String, Object> map);

	/** 북마크 여부확인
	 * @param map
	 * @return
	 */
	int bookMark(Map<String, Object> map);



}
