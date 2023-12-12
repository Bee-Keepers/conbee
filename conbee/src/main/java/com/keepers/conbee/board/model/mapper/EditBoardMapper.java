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

	/** 게시글 수정화면 전환(게시글 상세화면에서!)
	 * @param map
	 * @return
	 */
//	Board boardDetail(Map<String, Object> map);

}
