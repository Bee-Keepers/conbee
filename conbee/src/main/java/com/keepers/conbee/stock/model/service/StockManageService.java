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
	 * @return
	 */
	List<Stock> goodsList(int cp);

	/** 상품 등록
	 * @param stock
	 * @return
	 */
	int goodsInsert(Stock stock);

	/** 재고 전체 조회
	 * @param stock
	 * @param cp 
	 * @return
	 */
	List<Stock> stockList(Stock stock, int cp);

	/** 재고 등록 이름 검색 시 물품 조회
	 * @param intputGoods
	 * @param storeValue 
	 * @return
	 */
	List<Stock> goodsNameSelect(String intputGoods, int storeValue);

	/** 가게이름
	 * @param storeNo
	 * @return
	 */
	String storeName(int storeNo);

	/** 상품 검색
	 * @param stock
	 * @param cp 
	 * @return
	 */
	List<Stock> goodsSearch(Stock stock, int cp);

	/** 재고 등록
	 * @param stock
	 * @return
	 */
	int stockInsert(Stock stock);

	/** 입고가 수정
	 * @param stock
	 * @return
	 */
	int stockInPriceUpdate(Stock stock);
	/** 본사 재고 검색
	 * @param stock
	 * @param cp 
	 * @return
	 */
	List<Stock> stockListSearch(Stock stock, int cp);

    /** 재고 수정
     * @param goodsNoList
     * @param stockOutPriceList
     * @param stockDiscountList
     * @param storeNo
     * @return
     */
    int stockUpdateManage(List<Integer> goodsNoList, List<Integer> stockOutPriceList, List<Integer> stockDiscountList);

	/** 상품 중복 등록 검색
	 * @param goodsName
	 * @return
	 */
	String checkGoogsInsert(String goodsName);



}
