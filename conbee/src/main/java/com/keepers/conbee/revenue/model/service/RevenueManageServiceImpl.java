package com.keepers.conbee.revenue.model.service;

import java.util.List;

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
	
	@Override
	public List<Revenue> revenueManageList(Revenue revenue) {
		return mapper.revenueManageList(revenue);
	}

	@Override
	public List<Store> storeSearch(String inputStoreName) {
		return mapper.storeSearch(inputStoreName);
	}
	@Override
	public String storeName(int storeNo) {
		return mapper.storeName(storeNo);
	}
	
	@Override
	public List<Revenue> historySearch(Revenue revenue) {
		return mapper.historySearch(revenue);
	}
	
}
