package com.keepers.conbee.stock.model.service;

import java.util.List;

import com.keepers.conbee.stock.model.dto.Stock;

public interface StockService {

	/** 상품 등록 시 대분류 누르면 소분류 나오는 기능
	 * @param lcategory
	 * @return
	 */
	List<String> scategoryList(String lcategory);

	/** 상품 등록
	 * @param stock
	 * @return
	 */
	int stockGoodsInsert(Stock stock);

}
