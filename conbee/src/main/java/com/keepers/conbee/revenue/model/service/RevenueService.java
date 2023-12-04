package com.keepers.conbee.revenue.model.service;

import java.util.List;

import com.keepers.conbee.revenue.model.dto.Revenue;

public interface RevenueService {

	/** 매출 상세 검색
	 * @param revenue
	 * @return
	 */
	List<Revenue> revenueSearch(Revenue revenue);

	/** 입출고 내역 검색
	 * @param revenue
	 * @return
	 */
	List<Revenue> historySearch(Revenue revenue);

}
