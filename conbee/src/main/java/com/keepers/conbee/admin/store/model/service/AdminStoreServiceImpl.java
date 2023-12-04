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
	
	
<<<<<<< HEAD
=======
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
	
	
	/** 점포 운영상태 변경
	 *
	 */
	@Override
	public int changeRunFl(int storeNo, String storeRunFl) {
		
		// 운영상태 바꾸기
		if(storeRunFl.equals("Y")) {
			storeRunFl = "N";
		} else {
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
		
		// 점주명 변경 수정
		mapper.storeUpdateName(updateStore);
		
		return mapper.storeUpdate(updateStore);
	}
	
	
	/** 신규점포등록
	 *
	 */
	@Override
	public int storeInsert(Store inputStore) {
		
		// 점주번호를 받지 않고 점주명만 받은 경우(점주 신규가입) -> 현재 점주 회원번호는 Null
		// mapper에서 점주 회원번호 생성, 점주명
		
		// 점주명 O, 회원번호 X인 경우(신규가입)
		if(inputStore.getMemberNo() == 0) {
			mapper.storeInsertName(inputStore);			

		} else {
			mapper.storeInsert(inputStore);
		}
		
		// 점주번호가 없는 경우(점주신규가입) -> 점주회원번호 0,
		// 점주번호가 없는 경우 
		
		// 점주번호가 이미 존재하는 경우 -> 점주명 업데이트
		
		// 점주번호가 없는 경우
		// 점주명 등록
		
		
		return 0;
	}
	
	
	
	
	
	
	
	
	
	
>>>>>>> origin/main
}
