package com.keepers.conbee.stock.model.service;

import java.util.List;
import java.util.Map;

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
	int goodsInsert(Stock stock);

	/** 상품 등록 전체 조회
	 * @param paramMap 
	 * @return
	 */
	Map<String, Object> goodsList(Map<String, Object> paramMap);

	/** 등록된 상품 삭제
	 * @param goodsNo
	 * @return
	 */
	int goodsDelete(List<Integer> goodsNo);

	/** 등록된 물품 수정
	 * @param stock
	 * @return
	 */
	int goodsUpdate(Stock stock);

	/** 자동 완성
	 * @param inputQuery
	 * @param storeNo
	 * @param scategoryName 
	 * @param lcategoryName 
	 * @return
	 */
	List<Stock> autoComplete(String inputQuery, int storeNo, String lcategoryName, String scategoryName);



}
