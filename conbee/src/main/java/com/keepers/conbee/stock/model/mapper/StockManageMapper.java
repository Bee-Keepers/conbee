package com.keepers.conbee.stock.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.keepers.conbee.stock.model.dto.Stock;

@Mapper
public interface StockManageMapper {

	
	/** 상품 수정
	 * @param stock
	 * @return
	 */
	int goodsUpdate(Stock stock);

	/** 상품 삭제
	 * @param i
	 * @return
	 */
	int goodsDelete(int goodsNo);

	/** 상품 조회
	 * @param rowBounds 
	 * @return
	 */
	List<Stock> goodsList(RowBounds rowBounds);

	/** 상품 등록
	 * @param stock
	 * @return
	 */
	int goodsInsert(Stock stock);

	/** 재고 전체 조회  
	 * @param stock
	 * @param rowBounds 
	 * @return
	 */
	List<Stock> stockList(Stock stock, RowBounds rowBounds);

	/** 재고 등록 이름 검색 시 물품 조회
	 * @param intputGoods
	 * @return
	 */
	List<Stock> goodsNameSelect(String intputGoods);

	/** 지점 이름
	 * @param storeNo
	 * @return
	 */
	String storeName(int storeNo);

	/** 상품 검색
	 * @param stock
	 * @param rowBounds 
	 * @return
	 */
	List<Stock> goodsSearch(Stock stock, RowBounds rowBounds);

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
	 * @param rowBounds 
	 * @return
	 */
	List<Stock> stockListSearch(Stock stock, RowBounds rowBounds);

	/** 상품 총 수 조회
	 * @return
	 */
	int goodsListCount();
	
    /** 재고 수정
     * @param stock
     * @return
     */
    int stockUpdateManage(Stock stock);

	/** 상품 중복 등록 검색
	 * @param goodsName
	 * @return
	 */
	String checkGoogsInsert(String goodsName);



}
