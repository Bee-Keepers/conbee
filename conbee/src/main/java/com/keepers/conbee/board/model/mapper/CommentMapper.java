package com.keepers.conbee.board.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.board.model.dto.Comment;

@Mapper
public interface CommentMapper {

	/** 댓글 목록 조회
	 * @param boardNo
	 * @return
	 */
	List<Comment> select(int boardNo);

	/** 댓글 등록
	 * @param comment
	 * @return
	 */
	int insert(Comment comment);

	/** 댓글 수정
	 * @param comment
	 * @return
	 */
	int update(Comment comment);

	/** 댓글 삭제
	 * @param commentNo
	 * @return
	 */
	int delete(int commentNo);

	
	/** 신고댓글인지 확인
	 * @param commentNo
	 * @return
	 */
	int checkReportComment(int commentNo);

	/** 신고댓글인 경우 REPORT_COMMENT 테이블 업데이트
	 * @param commentNo
	 */
	void reportAnswerComment(int commentNo);

}
