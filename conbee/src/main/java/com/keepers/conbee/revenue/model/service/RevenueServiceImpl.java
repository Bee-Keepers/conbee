package com.keepers.conbee.revenue.model.service;

import java.text.SimpleDateFormat;
import java.util.Date;
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
		if(revenue.getStartDate() == null && revenue.getStartDate() == null && revenue.getGoodsName() == null && revenue.getLcategoryName() == null && revenue.getScategoryName() == null) {
			Date today = new Date();
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			revenue.setStartDate(dateFormat.format(today));
			revenue.setEndDate(dateFormat.format(today));
			revenue.setGoodsName("");
			revenue.setLcategoryName("");
			revenue.setScategoryName("");
		}
		return mapper.revenueSearch(revenue);
	}
	
	// 입출고 내역 검색
	@Override
	public List<Revenue> historySearch(Revenue revenue) {
		if(revenue.getStartDate() == null && revenue.getStartDate() == null && revenue.getGoodsName() == null && revenue.getLcategoryName() == null && revenue.getScategoryName() == null) {
			Date today = new Date();
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			revenue.setStartDate(dateFormat.format(today));
			revenue.setEndDate(dateFormat.format(today));
			revenue.setGoodsName("");
			revenue.setLcategoryName("");
			revenue.setScategoryName("");
			revenue.setHistoryDivide("전체");
		}
		return mapper.historySearch(revenue);
	}
}
