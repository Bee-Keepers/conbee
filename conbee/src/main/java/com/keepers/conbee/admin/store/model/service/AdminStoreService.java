package com.keepers.conbee.admin.store.model.service;

import java.util.List;

import com.keepers.conbee.admin.store.model.dto.Store;

public interface AdminStoreService {

	/** 점포정보조회 포워드
	 * @return
	 */
	List<Store> readAllStoreList();

}
