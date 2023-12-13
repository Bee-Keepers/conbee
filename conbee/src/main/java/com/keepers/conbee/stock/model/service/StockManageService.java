package com.keepers.conbee.stock.model.service;

import java.util.List;
import java.util.Map;

import com.keepers.conbee.stock.model.dto.Stock;

public interface StockManageService {

	/** 상품 삭제
	 * @param goodsNo
	 * @return
	 */
	int goodsDelete(List<Integer> goodsNo);

	/** 상품 수정
	 * @param stock
	 * @return
	 */
	int goodsUpdate(Stock stock);

	/** 상품 조회
	 * @param paramMap
	 * @return
	 */
	Map<String, Object> goodsList(Map<String, Object> paramMap);

	/** 상품 등록
	 * @param stock
	 * @return
	 */
	int goodsInsert(Stock stock);

	/** 재고 전체 조회
	 * @param stock
	 * @return
	 */
	List<Stock> stockList(Stock stock);

	/** 재고 등록 이름 검색 시 물품 조회
	 * @param intputGoods
	 * @return
	 */
	List<Stock> goodsNameSelect(String intputGoods);

	/** 가게이름
	 * @param storeNo
	 * @return
	 */
	String storeName(int storeNo);

	/** 상품 검색
	 * @param stock
	 * @return
	 */
	List<Stock> goodsSearch(Stock stock);


}
