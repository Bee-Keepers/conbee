package com.keepers.conbee.board.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.keepers.conbee.board.model.dto.Board;

@Mapper
public interface BoardMapper {

	/** 게시글 목록 조회 
	 * @param rowBounds 
	 * @param boardCode
	 * @return
	 */
	List<Board> selectBoardList(RowBounds rowBounds, int boardCodeNo);

	/** 전체 게시글 수 조회
	 * @param boardCode
	 * @return
	 */
	int getListCount(int boardCodeNo);

	/** 게시글 상세조회
	 * @param map
	 * @return
	 */
	Board boardDetail(Map<String, Object> map);

	/** 게시판에(공지,자유 등) 이름 가져오기
	 * @param boardCodeNo
	 * @return
	 */
	String selectBoardName(int boardCodeNo);

	/** 북마쿠 여부 확인
	 * @param map
	 * @return
	 */
	int bookMark(Map<String, Object> map);

	
}
