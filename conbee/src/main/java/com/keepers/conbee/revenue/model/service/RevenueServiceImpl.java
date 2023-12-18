package com.keepers.conbee.revenue.model.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.session.RowBounds;
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
	public List<Revenue> revenueSearch(Revenue revenue, int cp) {
		if(revenue.getStartDate() == null && revenue.getStartDate() == null && revenue.getGoodsName() == null && revenue.getLcategoryName() == null && revenue.getScategoryName() == null) {
			Date today = new Date();
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			revenue.setStartDate(dateFormat.format(today));
			revenue.setEndDate(dateFormat.format(today));
			revenue.setGoodsName("");
			revenue.setLcategoryName("");
			revenue.setScategoryName("");
		}
		RowBounds rowBounds = new RowBounds((cp-1)*20, 20);
		return mapper.revenueSearch(revenue, rowBounds);
	}
	
	// 입출고 내역 검색
	@Override
	public List<Revenue> historySearch(Revenue revenue, int cp) {
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
		RowBounds rowBounds = new RowBounds((cp-1)*20, 20);
		return mapper.historySearch(revenue, rowBounds);
	}
}
