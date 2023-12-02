package com.keepers.conbee.admin.store.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.admin.store.model.mapper.AdminStoreMapper;
import com.keepers.conbee.approval.model.dto.Pagination;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminStoreServiceImpl implements AdminStoreService{

	private final AdminStoreMapper mapper;
	
	
	/** 점포정보조회 포워드
	 *
	 */
	@Override
	public Map<String, Object> readAllStoreList(int cp) {
		
		// 전체 점포수 얻어오기
		int listCount = mapper.getListCount();
		
		/* cp, listCount를 이용해 Pagination 객체 생성*/
		Pagination pagination = new Pagination(cp, listCount);
		
		// RowBounds 객체 생성
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		// 마이바티스 호출
		List<Map<String, Object>> storeList = mapper.readAllStoreList(rowBounds);
		
		// Map에 담아 반환
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("storeList", storeList);
		
		return map;
	}
	
	
	/** 검색한 점포 목록 조회
	 *
	 */
	@Override
	public Map<String, Object> searchStoreList(Map<String, Object> paramMap, int cp) {
		
		// 검색 조건이 일치하는 게시글 수 조회
		int listCount = mapper.searchStoreListCount(paramMap);
		
		/* cp, listCount를 이용해 Pagination 객체 생성*/
		Pagination pagination = new Pagination(cp, listCount);
		
		// RowBounds 객체 생성
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		// 마이바티스 호출
		List<Map<String, Object>> storeList = mapper.searchStoreList(paramMap, rowBounds);
		
		// Map에 담아 반환
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("storeList", storeList);
		
		return map;
	}
	
	
}
