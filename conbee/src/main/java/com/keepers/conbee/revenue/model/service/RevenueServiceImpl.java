package com.keepers.conbee.revenue.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.revenue.model.dto.Revenue;
import com.keepers.conbee.revenue.model.mapper.RevenueMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class RevenueServiceImpl implements RevenueService{

	private final RevenueMapper mapper;
	
	// 매출 상세 검색
	@Override
	public List<Revenue> revenueSearch(Revenue revenue) {
		
		
		
		return mapper.revenueSearch(revenue);
	}
}
