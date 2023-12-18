package com.keepers.conbee.board.controller;


import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.keepers.conbee.board.model.dto.Comment;
import com.keepers.conbee.board.model.service.CommentService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 
 */
@RestController // 비동기 요청 응답
@Slf4j
@RequiredArgsConstructor
public class CommentController {
	
	private final CommentService service;
	
	/** 게시글 댓글 목록 조회
	 * @param boardNo
	 * @return
	 */
	@GetMapping(value="comment", produces="application/json")
	public List<Comment> select(int boardNo){
		return service.select(boardNo);
	}
	
	
	
	/** 댓글 등록
	 * @param comment
	 * @return
	 */
	@PostMapping("comment")
	public int insert(@RequestBody Comment comment) {
		return service.insert(comment);
	}
	
	
	
	
	/** 댓글 수정
	 * @param comment
	 * @return
	 */
	@PutMapping("comment")
	public int update(@RequestBody Comment comment) {
		return service.update(comment);
	}
	
	
	/** 댓글 삭제
	 * @param commentNo
	 * @return
	 */
	@DeleteMapping("comment")
	public int delete(@RequestBody int commentNo) {
		return service.delete(commentNo);
	}
	
	
	
	
	
	
	
	
	
	

}
