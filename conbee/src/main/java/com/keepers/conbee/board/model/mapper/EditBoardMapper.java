package com.keepers.conbee.board.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.board.model.dto.Board;

@Mapper
public interface EditBoardMapper {

	
	/** 게시글 작성
	 * @param board
	 * @return
	 */
	int boardWrite(Board board);

}
