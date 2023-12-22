package com.keepers.conbee.board.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.board.model.dto.Board;

@Mapper
public interface EditBoardMapper {

	
	/** 게시글 작성
	 * @param board
	 * @return
	 */
	int boardWrite(Board board);

	/** 게시글 삭제
	 * @param paramMap
	 * @return
	 */
	int deleteBoard(Map<String, Integer> paramMap);

	/** 게시글 수정
	 * @param board
	 * @return
	 */
	int updateBoard(Board board);

	/** 삭제시 신고글인 경우 REPORT 업데이트
	 * @param paramMap
	 * @return
	 */
	void reportAnswerBoard(Map<String, Integer> paramMap);

	/** 삭제되는 게시글이 신고된 게시글인지 확인
	 * @param paramMap
	 * @return
	 */
	int checkReportBoard(Map<String, Integer> paramMap);


}
