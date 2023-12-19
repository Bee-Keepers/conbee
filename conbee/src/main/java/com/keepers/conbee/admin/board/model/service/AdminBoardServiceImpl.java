package com.keepers.conbee.admin.board.model.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import com.keepers.conbee.admin.board.model.dto.Report;
import com.keepers.conbee.admin.board.model.mapper.AdminBoardMapper;
import com.keepers.conbee.approval.model.dto.Pagination10;
import com.keepers.conbee.approval.model.dto.PaginationAdmin;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminBoardServiceImpl implements AdminBoardService{
	
	private final AdminBoardMapper mapper;
	
	
	/** 신고 관리 포워드(목록 불러오기)
	 *
	 */
	@Override
	public Map<String, Object> reportList(int cp) {
		
		// 신고된 게시글/댓글 수 불러오기
		int listCount = mapper.getReportListCount();
		
		/* cp, listCount를 이용해 Pagination 객체 생성*/
		Pagination10 pagination = new Pagination10(cp, listCount);
		
		// RowBounds 객체 생성
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		// 마이바티스 호출
		List<Report> reportList = mapper.readAllReportList(rowBounds);
		
		// Map에 담아 반환
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("reportList", reportList);
		
		return map;
	}
	
	
	/** 신고 관리 포워드(댓글 목록 불러오기)
	 *
	 */
	@Override
	public Map<String, Object> reportCommentList(int cp) {
		
		// 신고된 게시글/댓글 수 불러오기
		int listCount = mapper.getReportCommnetListCount();
		
		/* cp, listCount를 이용해 Pagination 객체 생성*/
		Pagination10 pagination = new Pagination10(cp, listCount);
		
		// RowBounds 객체 생성
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		// 마이바티스 호출
		List<Report> reportCommentList = mapper.readAllReportCommentList(rowBounds);
		
		// Map에 담아 반환
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("reportCommentList", reportCommentList);
		
		return map;
	}
	
	
	

}
