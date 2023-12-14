package com.keepers.conbee.board.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartRequest;

import com.keepers.conbee.board.model.dto.Board;
import com.keepers.conbee.board.model.mapper.BoardMapper;
import com.keepers.conbee.board.model.mapper.EditBoardMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class EditBoardServiceImpl implements EditBoardService{

	private final EditBoardMapper mapper;
	private final BoardMapper boardMapper;
	
	// 게시글 작성
	@Override
	public int boardWrite(Board board)  {
		return mapper.boardWrite(board);
	}
	
	// 게시글 제목 얻어오기
	@Override
	public String boardName(int boardCodeNo) {
		return boardMapper.selectBoardName(boardCodeNo);
	}
	
	// 게시글 삭제
	@Override
	public int deleteBoard(Map<String, Integer> paramMap) {
		return mapper.deleteBoard(paramMap);
	}
	
	
	@Override
	public int updateBoard(Board board) throws IllegalStateException, IOException {
		
		// 1. 게시글 수정(제목, 내용 수정)
		int result = mapper.updateBoard(board);
		
		// 수정 실패 시 
		if(result == 0) return 0;
		
//		if( !deleteOrder.equals("")) {
			
			Map<String, Object> map = new HashMap<>();
//			map.put("deleteOrder", deleteOrder);
			map.put("boardNo", board.getBoardNo());
			
//			result = mapper.imageDelete(map);
			
//			if(result == 0) {
//				throw new BoardUpdateException("이미지 삭제 실패");
//			}
			
//		}
		
//		// 3. 새로 업로드된 이미지 분류 작업
//		List<BoardImg> uploadList = new ArrayList<>(); 
//		
//		// images에서 업로드된 파일 선별하기
//		for(int i = 0 ; i<images.size() ; i++) {
//			
//			// i번째 요소의 파일 크기가 0보다 크다 == 파일이 있다!
//			if(images.get(i).getSize() > 0) {
//			
//				BoardImg img = new BoardImg();
//				
//				img.setBoardNo(board.getBoardNo()); // 몇번 게시글의 이미지?
//				img.setImgOrder(i); // 몇번째 이미지? (인덱스)
//				
//				img.setImgOriginalName( images.get(i).getOriginalFilename() ); // 원본 파일명(다운로드)
//
//				// 웹 접근 경로
//				img.setImgPath(webPath);
//				
//				// 변경된 파일명
//				img.setImgRename(Util.fileRename( images.get(i).getOriginalFilename() ));
//				
//				// 실제 업로드된 파일을 img에 세팅
//				img.setUploadFile(images.get(i));
//				
//				// uploadList에 추가
//				uploadList.add(img);
//				
//				
//				// 있다 -> 변경 (update)
//				// (오라클은 다중 UPDATE 지원 X -> 하나씩 UPDATE)
//				result = mapper.updateBoardImg(img);
//				
//				// 수정 후 결과가 0  ==  UPDATE 수행 안됨
//				// 왜?? 기존 데이터 중 IMG_ORDER가 일치하는 행이 없어서
//				// == 기존에 추가된 이미지가 없었다
//				// == 없다 -> 추가된 상황
//				
//				// 없다 -> 추가 (insert)
//				if(result == 0) {
//					mapper.boardImgInsert(img);
//				}
//				
//			} // if 끝
//		} // for 끝
//		
//		
//		// 4. uploadList에 있는 이미지를 서버에 저장
//		if( !uploadList.isEmpty() ) {
//			result = 1;
//			
//			for(BoardImg img : uploadList) {
//				
//				img.getUploadFile().transferTo(new File(folderPath + img.getImgRename() ) );
//			}
//		}
		
		
		
		
		return result;
	}
	
	
//	
//	
//	@Override
//	public Map<String, Object> imageUpload(MultipartRequest request) {
//		return null;
//	}
//	
//	
//	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
