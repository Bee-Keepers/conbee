package com.keepers.conbee.stock.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.stock.model.dto.Order;
import com.keepers.conbee.stock.model.dto.OrderDetail;
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
	 * @param rowBounds 
	 * @return
	 */
	List<Stock> stockList(Stock stock, RowBounds rowBounds);

	/** 재고 이름 검색
	 * @param intputGoods
	 * @return
	 */
	List<Stock> goodsNameSelect(Map<String, Object> map);
	
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

	/** 재고 삭제
	 * @param paramMap
	 * @return
	 */
	int stockDelete(Map<String, Object> paramMap);

	/** 재고 품목 수정
	 * @param stock
	 * @return
	 */
	int stockUpdate(Stock stock);
	
	/**발주 신청/수정 화면 출력용
	 * @param storeNo
	 * @return
	 */
	List<Order> orderInsertUpdate(int storeNo);

	/** 발주 수정을 위한 기존의 발주 조회
	 * @param storeNo
	 * @return
	 */
	List<Integer> preGoodsNo(int storeNo);

	/** 발주 삭제
	 * @param order
	 * @return
	 */
	int orderDelete(Order order);

	/** 발주 수정
	 * @param orderUpdate
	 * @return
	 */
	int orderUpdate(Order orderUpdate);

	/** 발주 상세 조회
	 * @param order
	 * @return
	 */
	List<OrderDetail> orderSelect(Order order);

	/** 상품(재고) 상세 조회
	 * @param goodsNo
	 * @return
	 */
	Stock goodsDetail(int goodsNo);

	/** 상품 상세 조회
	 * @param goodsNo
	 * @return
	 */
	Stock goodsDetailSelect(int goodsNo);

	/** 상품 상세 수정
	 * @param stock
	 * @return
	 */
	int goodsDetailUpdate(Stock stock);

	/**
	 *  승인된 발주 입출고 내역에 삽입
	 * @param orderList 
	 */
	void orderApproval(List<Approval> orderList);

	/** 납기일 일치하는 승인완료된 발주들
	 * @return
	 */
	List<Approval> orderApprovalComplete();

	/** 재고 현황 검색
	 * @param stock
	 * @param rowBounds 
	 * @return
	 */
	List<Stock> stockSearch(Stock stock, RowBounds rowBounds);

	
	/** 새 상품 세 개 조회
	 * @return
	 */
	List<Stock> newGoodsThree();

	/** 본사 재고에 있는 품목 번호들
	 * @return
	 */
	List<Integer> goodsNoList();

	/** 본사 재고 조회
	 * @param goodsNo
	 * @return
	 */
	int orderAmountCheck(int goodsNo);

	/** 발주 대기중인 물건 수 조회
	 * @param order
	 * @return
	 */
	int orderAllAmount(Order order);

	/** 발주 마감 스케쥴러 작동 시 본사 재고 감소
	 * @param orderList
	 */
	void minusHeadAmount(List<Order> orderList);

	/** 본사 입고단가를 발주 단가로 수정
	 * @param approval
	 */
	void headStockInPrice(Approval approval);

	/** 상품 전체 조회
	 * @param rowBounds
	 * @return
	 */
	List<Stock> goodsList(RowBounds rowBounds);

	/** 상품 검색
	 * @param stock
	 * @param rowBounds
	 * @return
	 */
	List<Stock> goodsSearch(Stock stock, RowBounds rowBounds);



	





}
