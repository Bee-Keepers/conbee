package com.keepers.conbee.stock.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.stock.model.dto.Stock;
import com.keepers.conbee.stock.model.mapper.StockMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class StockServiceImpl implements StockService{

	private final StockMapper mapper;
	
	// 상품 등록 시 대분류 누르면 소분류 나오는 기능
	@Override
	public List<String> scategoryList(String lcategory) {
		return mapper.scategoryList(lcategory);
	}
	
	// 상품 등록
	@Override
	public int goodsInsert(Stock stock) {
		return mapper.goodsInsert(stock);
	}
	
	// 상품등록 전체 조회
	@Override
	public Map<String, Object> goodsList(Map<String, Object> paramMap) {
		List<Stock> stockList = mapper.goodsList(paramMap);
		Map<String, Object> map = new HashMap<>();
		map.put("stockList", stockList);
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
	
	/** 등록된 물품 수정
	 *
	 */
	@Override
	public int goodsUpdate(Stock stock) {
		return mapper.goodsUpdate(stock);
	}
	
	@Override
	public List<Stock> autoComplete(String inputQuery, int storeNo, String lcategoryName, String scategoryName) {
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("inputQuery", inputQuery);
		map.put("storeNo", storeNo);
		map.put("lcategoryName", lcategoryName);
		map.put("scategoryName", scategoryName);
		
		return mapper.autoComplete(map);
	}
	
	
}
