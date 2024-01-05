package com.keepers.conbee.revenue.model.service;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.revenue.model.dto.Revenue;
import com.keepers.conbee.revenue.model.mapper.RevenueManageMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RevenueManageServiceImpl implements RevenueManageService{
	
	private final RevenueManageMapper mapper;
	
	// 지점 매출 조회
	@Override
	public List<Revenue> revenueManageList(Revenue revenue) {
		return mapper.revenueManageList(revenue);
	}

	// 상세검색 지점 검색
	@Override
	public List<Store> storeSearch(String inputStoreName) {
		return mapper.storeSearch(inputStoreName);
	}
	
	// 지점 명 조회
	@Override
	public String storeName(int storeNo) {
		return mapper.storeName(storeNo);
	}
	
	// 입출고 내역 조회
	@Override
	public List<Revenue> historySearch(Revenue revenue, int cp) {
		RowBounds rowBounds = new RowBounds((cp-1)*20, 20);
		return mapper.historySearch(revenue, rowBounds);
	}
	
}
