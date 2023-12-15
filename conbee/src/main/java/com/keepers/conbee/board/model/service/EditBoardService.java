package com.keepers.conbee.board.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import com.keepers.conbee.board.model.dto.Board;

public interface EditBoardService {

	/** 게시글 작성
	 * @param board
	 * @param image 
	 * @return
	 */
	int boardWrite(Board board);

	/** 게시글 제목 얻어오기
	 * @param boardCodeNo
	 * @return
	 */
	String boardName(int boardCodeNo);

	/** 게시글 삭제
	 * @param paramMap
	 * @return
	 */
	int deleteBoard(Map<String, Integer> paramMap);

	/** 게시글 수정
	 * @param board
	 * @param deleteOrder
	 * @return
	 */
	int updateBoard(Board board) throws IllegalStateException, IOException;
//
//	/** 이미지 가져오기
//	 * @param request
//	 * @return
//	 */
//	Map<String, Object> imageUpload(MultipartRequest request);
//
//
//	
//	
//	
	
	
}


