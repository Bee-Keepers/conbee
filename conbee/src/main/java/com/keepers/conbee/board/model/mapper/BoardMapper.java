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

	/** 게시판에(공지,자유 등) 이름 가져오기2
	 * @param boardCodeNo
	 * @return
	 */
	String selectBoardName2(int boardCodeNo);
	
	/** 북마크 여부 확인
	 * @param map
	 * @return
	 */
	int bookMark(Map<String, Object> map);

	
	
	/** 북마크 삭제
	 * @param paramMap
	 * @return
	 */
	int deleteBookMark(Map<String, Object> paramMap);
	
	
	/** 북마크 삽입
	 * @param paramMap
	 * @return
	 */
	int insertBookMark(Map<String, Object> paramMap);
	
	
	/** 북마크 수 조회
	 * @param integer
	 * @return
	 */
	int countBookMark(Integer integer);
	
	
	
	/** 게시글 조회수 증가
	 * @param boardNo
	 * @return
	 */
	int updateBoardHits(int boardNo);

	/** 게시판 검색 카운트
	 * @param paramMap
	 * @return
	 */
	int searchBoardListCount(Map<String, Object> paramMap);


	/** 게시판 검색
	 * @param paramMap
	 * @param rowBounds
	 * @return
	 */
	List<Board> searchBoardList(Map<String, Object> paramMap, RowBounds rowBounds);
	
	
	/* ================================= 예리나 ========================================== */
	
	
	/** 게시글 신고 기능
	 * @param paramMap
	 * @return
	 */
	int boardReport(Map<String, Object> paramMap);

	/** 댓글 신고 기능
	 * @param paramMap
	 * @return
	 */
	int commentReport(Map<String, Object> paramMap);

	/** 댓글 수 조회
	 * @return
	 */
	int getCommentCount();


	
	
	
	



	
}
