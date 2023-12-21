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

	/** 게시글 북마크 여부확인
	 * @param map
	 * @return
	 */
	int bookMark(Map<String, Object> map);
	
	/** 북마크 처리
	 * @param paramMap
	 * @return
	 */
	int bookCheck(Map<String, Object> paramMap);

	/** 게시글 조회수 증가
	 * @param boardNo
	 * @return
	 */
	int updateBoardHits(int boardNo);

	/** 게시글 이름 불러오기
	 * @param boardCodeNo
	 * @return
	 */
	String boardName(int boardCodeNo);
	
	
	
	/** 댓글 수 조회
	 * @return
	 */
	int getCommentCount();
	
	
	
	/* ================================= 예리나 ========================================== */
	
	
	/** 게시글 신고
	 * @param paramMap
	 * @return
	 */
	int boardReport(Map<String, Object> paramMap);





}
