package com.keepers.conbee.board.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.board.model.dto.Board;

@Mapper
public interface BoardMapper {

	/** 게시글 목록 조회 
	 * @param boardCode
	 * @return
	 */
	List<Board> selectBoardList(int boardCodeNo);

	/** 전체 게시글 수 조회
	 * @param boardCode
	 * @return
	 */
	int getListCount(int boardCodeNo);

}
