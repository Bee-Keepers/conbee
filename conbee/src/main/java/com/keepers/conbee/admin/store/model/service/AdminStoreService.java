package com.keepers.conbee.admin.store.model.service;

import java.util.Map;

import com.keepers.conbee.admin.store.model.dto.Store;

public interface AdminStoreService {

	/** 전체 점포 목록 조회
	 * @param cp
	 * @return
	 */
	Map<String, Object> readAllStoreList(int cp);

	/** 검색한 점포 목록 조회
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> searchStoreList(Map<String, Object> paramMap, int cp);

	/** 점포 운영상태 변경
	 * @param storeNo
	 * @param storeRunFl
	 * @return
	 */
	int changeRunFl(int storeNo, String storeRunFl);

	/** 선택한 점포 정보 얻어오기
	 * @param storeNo
	 * @return
	 */
	Store readStoreInfo(int storeNo);

	/** 점포명 중복검사
	 * @param storeName
	 * @return
	 */
	int checkStoreName(String storeName);

	/** 점포 전화번호 중복검사
	 * @param storeTel
	 * @return
	 */
	int checkStoreTel(String storeTel);


}
