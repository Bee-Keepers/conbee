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
	
	// 재고 조회
	@Override
	public List<Stock> stockList(Stock stock) {
		
		List<Stock> stockList = mapper.stockList(stock);
		
		for(Stock s : stockList ) {
			double sum = s.getStockOutPrice() * (1- ((double)s.getStockDiscount() * 0.01));
			
			s.setPriceSum( (int)sum + "" );
		}
		return stockList;
	}
	
	@Override
	public int stockInsert(Stock stock) {
		return mapper.stockInsert(stock);
	}
	
	// 재고 등록 이름 검색 시 물품 조회
	@Override
	public List<Stock> goodsNameSelect(String intputGoods) {
		return mapper.goodsNameSelect(intputGoods);
	}
	
	// 가게이름
	@Override
	public String storeName(int storeNo) {
		return mapper.storeName(storeNo);
	}
	
	// 상품 검색
	@Override
	public List<Stock> goodsSearch(Stock stock) {
		if(stock.getLcategoryName() == null && stock.getScategoryName() == null && stock.getGoodsName() == null) {
			stock.setLcategoryName("");
			stock.setScategoryName("");
			stock.setGoodsName("");
		}
		return mapper.goodsSearch(stock);
	}
	
	// 입고가 수정
	@Override
	public int stockInPriceUpdate(Stock stock) {
		return mapper.stockInPriceUpdate(stock);
	}
	// 본사 재고 검색
	@Override
	public List<Stock> stockListSearch(Stock stock) {
		if(stock.getLcategoryName() == null && stock.getScategoryName() == null && stock.getGoodsName() == null) {
			stock.setLcategoryName("");
			stock.setScategoryName("");
			stock.setGoodsName("");
		}
		return mapper.stockListSearch(stock);
	}
}
