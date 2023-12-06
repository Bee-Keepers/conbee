package com.keepers.conbee.stock.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.stock.model.dto.Order;
import com.keepers.conbee.stock.model.dto.Stock;

@Mapper
public interface StockMapper {

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


	/** 상품 등록 전체조회
	 * @param paramMap
	 * @return
	 */
	List<Stock> goodsList(Map<String, Object> paramMap);

	/** 등록된 상품 삭제
	 * @param goodsNo
	 * @return
	 */
	int goodsDelete(int goodsNo);

	/** 등록된 물품 수정
	 * @param stock
	 * @return
	 */
	int goodsUpdate(Stock stock);

	/** 재고 현황 등록
	 * @param stock
	 * @return
	 */
	int stockInsert(Stock stock);
  
	/** 자동 완성
	 * @param map
	 * @return
	 */
	List<Stock> autoComplete(Map<String, Object> map);

	/** 재고 현황 전체 조회
	 * @param stock
	 * @return
	 */
	List<Stock> stockList(Stock stock);

	/** 재고 등록 이름 검색 시 물품 조회
	 * @param goodsName
	 * @param scategoryName 
	 * @param lcategoryName 
	 * @param goodsNo 
	 * @return
	 */
	List<String> goodsNameSelect(String intputGoods);
  
	/** 발주 신청
	 * @param orderList
	 * @return
	 */
	int orderInsert(List<Order> orderList);

	/** 발주 내역 조회
	 * @param map
	 * @return
	 */
	List<String> selectOrderList(Map<String, Object> map);

	/** 발주 마감 스케쥴러
	 * @param orderList 
	 * 
	 */
	void orderScheduling(List<Order> orderList);

	/** 발주 마감 위한 발주 조회 구문
	 * @return
	 */
	List<Order> selectOrderScheduling();

}
