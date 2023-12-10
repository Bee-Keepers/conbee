package com.keepers.conbee.revenue.model.service;

import java.util.List;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.revenue.model.dto.Revenue;

public interface RevenueManageService {

	/** 지점 매출 조회
	 * @param revenue
	 * @return
	 */
	List<Revenue> revenueManageList(Revenue revenue);

	/** 상세검색 지점 검색
	 * @param inputStoreName
	 * @return
	 */
	List<Store> storeSearch(String inputStoreName);

	/** 지점 명 조회
	 * @param storeNo
	 * @return
	 */
	String storeName(int storeNo);

	/** 입출고 내역 조회
	 * @param revenue
	 * @return
	 */
	List<Revenue> historySearch(Revenue revenue);

}
