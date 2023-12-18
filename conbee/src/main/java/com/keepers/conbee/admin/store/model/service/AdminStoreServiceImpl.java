package com.keepers.conbee.admin.store.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.admin.store.model.mapper.AdminStoreMapper;
import com.keepers.conbee.approval.model.dto.Pagination;
import com.keepers.conbee.approval.model.dto.PaginationAdmin;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
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
		PaginationAdmin pagination = new PaginationAdmin(cp, listCount);
		
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
	
	
	
	/** 점포번호순 조회
	 *
	 */
	@Override
	public Map<String, Object> sortStoreNo(String query, int cp) {
		
		// query를 mapper에 매개변수로 넘길 수 있도록 map에 넣기
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("query", query);
		
		// 검색 조건이 일치하는 게시글 수 조회
		int listCount = mapper.searchStoreListCount(paramMap);
		
		/* cp, listCount를 이용해 Pagination 객체 생성*/
		Pagination pagination = new Pagination(cp, listCount);
		
		// RowBounds 객체 생성
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		int limit = pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Store> storeList = mapper.sortStoreNo(query, rowBounds);
		
		// Map에 담아 반환
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("storeList", storeList);
		
		return map;
	}
	
	
	/** 점포명순 조회
	 *
	 */
	@Override
	public Map<String, Object> sortStoreName(String query, int cp) {
		
		// query를 mapper에 매개변수로 넘길 수 있도록 map에 넣기
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("query", query);
		
		// 검색 조건이 일치하는 게시글 수 조회
		int listCount = mapper.searchStoreListCount(paramMap);
		
		/* cp, listCount를 이용해 Pagination 객체 생성*/
		Pagination pagination = new Pagination(cp, listCount);
		
		// RowBounds 객체 생성
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		int limit = pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Store> storeList = mapper.sortStoreName(query, rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("storeList", storeList);
		
		return map;
	}
	
	
	
	/** 폐점승인 정렬 (비동기)
	 *
	 */
	@Override
	public Map<String, Object> sortRunApproval(String query, int cp) {

		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("query", query);
		
		int listCount = mapper.searchStoreListCount(paramMap);
		
		Pagination pagination = new Pagination(cp, listCount);
		
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		int limit = pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Store> storeList = mapper.sortRunApproval(query, rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("storeList", storeList);
		
		return map;
	}
	
	
	/** 운영여부 정렬 (비동기)
	 *
	 */
	@Override
	public Map<String, Object> sortStoreRunFl(String query, int cp) {
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("query", query);
		
		int listCount = mapper.searchStoreListCount(paramMap);
		
		Pagination pagination = new Pagination(cp, listCount);
		
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		int limit = pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Store> storeList = mapper.sortStoreRunFl(query, rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("storeList", storeList);
		
		return map;
	}
	
	
	
	/** 점포 운영상태 변경
	 *
	 */
	@Override
	public int changeRunFl(int storeNo, String storeRunFl) {
		
		// 운영상태 바꾸기
		if(storeRunFl.equals("Y")) { // 운영중인 경우
			//storeRunFl = "N";
			return 100;
			
		} else { // 폐쇄인 경우 운영으로 바꿈
			storeRunFl = "Y";
		}
		
		Map<String, Object> map = new HashMap<>();
		map.put("storeNo", storeNo);
		map.put("storeRunFl", storeRunFl);
		
		return mapper.changeRunFl(map);
	}
	
	
	/** 선택한 점포 정보 얻어오기
	 *
	 */
	@Override
	public Store readStoreInfo(int storeNo) {
		return mapper.readStoreInfo(storeNo);
	}
	
	
	/** 점포명 중복 검사
	 *
	 */
	@Override
	public int checkStoreName(String storeName) {
		return mapper.checkStoreName(storeName);
	}
	
	/** 점포 전화번호 중복검사
	 *
	 */
	@Override
	public int checkStoreTel(String storeTel) {
		return mapper.checkStoreTel(storeTel);
	}
	
	/**점포 주소 중복검사
	 *
	 */
	@Override
	public int checkStoreAddress(String storeAddress) {
		return mapper.checkStoreAddress(storeAddress);
	}
	
	
	/** 점포 번호 중복검사
	 *
	 */
	@Override
	public int checkStoreNo(String storeNo) {
		return mapper.checkStoreNo(storeNo);
	}
	
	/** 점포정보 수정
	 *
	 */
	@Override
	public int storeUpdate(Store updateStore) {
		
		// 입력한 점주번호가 기존 회원번호에 없을 경우 return하고 회원가입하고오라고하기!
		int result = mapper.matchMemberNo(updateStore);
		
		// 기존 회원번호가 없을 경우 return
		if(result <= 0) {
			return 100;
		}
		
		// 점주명 변경 수정
		mapper.storeUpdateName(updateStore);
		
		// 점포 정보 수정
		return mapper.storeUpdate(updateStore);
	}
	
	
	/** 신규점포등록
	 *
	 */
	@Override
	public int storeInsert(Store inputStore) {
		
		int result = 0;
		
		// 입력된 회원번호가 있는 경우
		if(inputStore.getMemberNo() != 0) {
			
			// 입력한 점주번호가 기존 회원번호에 있는지 확인
			result = mapper.matchMemberNo(inputStore);
			
			// 기존 회원번호가 없을 경우 return
			if(result <= 0) {
				return 100;
			} 
			
			// 신규점포등록 - 기존회원이 점주일 경우
			else {
				// 점포정보 insert
				mapper.storeInsertwMember(inputStore);
				
				// 회원정보 insert
				return mapper.storeUpdateName(inputStore);
			}
		} 
		
		// 입력된 회원번호가 없는 경우
		// 점포정보 인서트
		return mapper.storeInsert(inputStore);
	}
	
	
	
	
	
	
	
	
	
	
}
