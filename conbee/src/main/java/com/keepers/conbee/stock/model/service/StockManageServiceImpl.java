package com.keepers.conbee.stock.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.stock.model.dto.Stock;
import com.keepers.conbee.stock.model.mapper.StockManageMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class StockManageServiceImpl implements StockManageService{

	private final StockManageMapper mapper;

	// 상품 등록
	@Override
	public int goodsInsert(Stock stock) {
		return mapper.goodsInsert(stock);
	}

	// 상품등록 전체 조회
	@Override
	public Map<String, Object> goodsList(Map<String, Object> paramMap) {
		List<Stock> goodsListSelect = mapper.goodsList(paramMap);
		Map<String, Object> map = new HashMap<>();
		map.put("goodsListSelect", goodsListSelect);
		return map;
	}

	// 등록된 상품 삭제
	@Override
	public int goodsDelete(List<Integer> goodsNo) {

		int result = 1;

		for(int i=0; i<goodsNo.size(); i++) {
			result = mapper.goodsDelete((int)(goodsNo.get(i)));
			if(result <= 0) {
				return 0;
			}
		}
		return result;
	}

	// 등록된 상품 수정
	@Override
	public int goodsUpdate(Stock stock) {
		return mapper.goodsUpdate(stock);
	}
}
