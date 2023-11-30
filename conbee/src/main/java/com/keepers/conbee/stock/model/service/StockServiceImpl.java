package com.keepers.conbee.stock.model.service;

import java.util.List;

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
	public int stockGoodsInsert(Stock stock) {
		return mapper.stockGoodsInsert(stock);
	}
	
	
}
