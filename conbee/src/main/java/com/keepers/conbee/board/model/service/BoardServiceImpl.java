package com.keepers.conbee.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.approval.model.dto.Pagination10;
import com.keepers.conbee.approval.model.dto.PaginationAdmin;
import com.keepers.conbee.board.model.dto.Board;
import com.keepers.conbee.board.model.mapper.BoardMapper;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService{
	
	private final BoardMapper mapper;
	
	// 전체 게시글 조회
	@Override
	public Map<String, Object> selectBoardList(int boardCodeNo, int cp) {
		
		int listCount = mapper.getListCount(boardCodeNo);
		
		/* cp, listCount를 이용해서 Pagination 객체 생성 */
		Pagination10 pagination = new Pagination10(cp, listCount);
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Board> boardList = mapper.selectBoardList(rowBounds, boardCodeNo);
		
		
		String boardCodeName = mapper.selectBoardName(boardCodeNo);
		
		Map<String, Object> map = new HashMap<>();
		map.put("boardList", boardList);
		map.put("pagination", pagination);
		map.put("boardCodeName", boardCodeName);
		
		return map;
	}
	
	// 검색 목록 조회
	// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 작업 예정 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
	@Override
	public Map<String, Object> searchBoardList(Map<String, Object> paramMap, int cp) {
		int listCount = mapper.searchBoardListCount(paramMap);
		
		PaginationAdmin pagination = new PaginationAdmin(cp, listCount);
		
		// RowBounds 객체 생성
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		// 마이바티스 호출
		List<Board> boardList = mapper.searchBoardList(paramMap, rowBounds);
		
		int boardCodeNo = Integer.parseInt(paramMap.get("boardCodeNo").toString()); 
		String boardCodeName = mapper.selectBoardName2(boardCodeNo);
		// Map에 담아 반환
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("boardList", boardList);
		map.put("boardCodeName", boardCodeName);
		
		return map;
	}
	
	
	// 게시글 북마크 여부 확인
	@Override
	public int bookMark(Map<String, Object> map) {
		return mapper.bookMark(map);
	}
	
	// 북마크 처리
	@Override
	public int bookCheck(Map<String, Object> paramMap) {
		
		int result = 0; 
		
		if( (Integer)(paramMap.get("check")) == 1 ) {
			result = mapper.deleteBookMark(paramMap);
		} else {
			result = mapper.insertBookMark(paramMap);
		}
		
		if(result == 0) return -1;
		
		return mapper.countBookMark( (Integer)(paramMap.get("boardNo")));
	}
	
	
	// 조회수 증가
	@Override
	public int updateBoardHits(int boardNo) {
		
		
		return mapper.updateBoardHits(boardNo);
	}
	
	
	
	
	// 게시글 상세조회 
	@Override
	public Board boardDetail(Map<String, Object> map) {
		
		
		
		return mapper.boardDetail(map);
	}
	
	
	// 게시판 이름 조회
	@Override
	public String boardName(int boardCodeNo) {
		return mapper.selectBoardName2(boardCodeNo);
	}
	
	
	
	// 댓글 수 조회
	@Override
	public int getCommentCount() {
		return mapper.getCommentCount();
	}
	
	
	
	
	/* ================================= 예리나 ========================================== */
	
	/** 게시글 신고 기능
	 *
	 */
	@Override
	public int boardReport(Map<String, Object> paramMap) {
		
		String reportTitle = null;
		
		String reportContentNum = (String) paramMap.get("reportContent");
		
		// REPORT_TITLE 넣기
		switch(reportContentNum){
		case "1" : reportTitle = "스팸홍보/도배글";				   break;
		case "2" : reportTitle = "음란물";						   break;
		case "3" : reportTitle = "불법정보 포함"; 				   break;
		case "4" : reportTitle = "욕설/생명경시/혐오/차별적 표현"; break;
		case "5" : reportTitle = "개인정보 노출"; 				   break;
		case "6" : reportTitle = "불쾌한 표현"; 				   break;
		case "7" : reportTitle = "명예훼손/저작권 침해"; 		   break;
		case "8" : reportTitle = "불법촬영물 포함";				   break;
		}
		
		paramMap.put("reportTitle", reportTitle);
		
		// 댓글 신고인 경우
		if( !paramMap.get("boardCommentNo").equals("")) {
			int result = mapper.commentReport(paramMap);
			return 100;
		}
		
		return mapper.boardReport(paramMap);
	}
	
	

}
