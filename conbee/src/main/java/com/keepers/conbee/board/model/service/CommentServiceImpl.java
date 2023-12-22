package com.keepers.conbee.board.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.board.model.dto.Comment;
import com.keepers.conbee.board.model.mapper.CommentMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

	private final CommentMapper mapper;
	
	// 댓글 목록 조회
	@Override
	public List<Comment> select(int boardNo) {
		return mapper.select(boardNo);
	}
	
	
	// 댓글 등록
	@Override
	public int insert(Comment comment) {
		return mapper.insert(comment);
	}
	
	// 댓글 수정
	@Override
	public int update(Comment comment) {
		return mapper.update(comment);
	}
	
	
	// 댓글 삭제
	@Override
	public int delete(int commentNo) {
		
		// 신고댓글인지 확인
		int result = mapper.checkReportComment(commentNo);

		if(result > 0) {
			// 신고댓글인 경우 REPORT 테이블 업데이트
			mapper.reportAnswerComment(commentNo);
		}
		
		return mapper.delete(commentNo);
	}
}
