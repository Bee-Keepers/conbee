package com.keepers.conbee.admin.store.model.service;

import java.util.Map;

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


}
