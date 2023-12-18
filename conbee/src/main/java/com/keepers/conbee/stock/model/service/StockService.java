package com.keepers.conbee.stock.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.stock.model.dto.Order;
import com.keepers.conbee.stock.model.dto.OrderDetail;
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
//	int goodsUpdate(Stock stock);


	/** 자동 완성
	 * @param inputQuery
	 * @param storeNo
	 * @param scategoryName 
	 * @param lcategoryName 
	 * @return
	 */
	List<Stock> autoComplete(String inputQuery, int storeNo, String lcategoryName, String scategoryName);

	/** 재고 현황 전체 조회
	 * @param stock
	 * @return
	 */
	List<Stock> stockList(Stock stock);

	/** 재고 등록
	 * @param stock
	 * @return
	 */
	int stockInsert(Stock stock);

	/** 재고 등록 이름 검색 시 물품 조회
	 * @param goodsName
	 * @param scategoryName 
	 * @param lcategoryName 
	 * @param goodsNo 
	 * @return
	 */
	List<Stock> goodsNameSelect(String intputGoods);

	/** 발주 신청
	 * @param goodsNo
	 * @param orderAmount
	 * @param storeNo
	 * @return
	 */
	int orderInsert(List<Integer> goodsNo, List<Integer> orderAmount, int storeNo);

	/** 발주 내역 조회
	 * @param storeNo
	 * @param endDate 
	 * @param startDate 
	 * @return
	 */
	List<String> selectOrderList(int storeNo, String startDate, String endDate);

	void orderScheduling();

	/** 재고 삭제
	 * @param stockNo
	 * @return
	 */
	int stockDelete(Map<String, Object> paramMap);

	/** 재고 품목 수정
	 * @param stock
	 * @return
	 */
	int stockUpdate(Stock stock);

	/** 발주 신청/수정 화면 출력용 orderList
	 * @param storeNo
	 * @return orderList
	 */
	List<Order> orderInsertUpdate(int storeNo);

	/** 발주 삭제
	 * @param order
	 * @return
	 */
	void orderDelete(Order order);

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
	 * @param uploadGoodsImage 
	 * @param goodsImage 
	 * @return
	 */
	int goodsDetailUpdate(Stock stock, MultipartFile uploadGoodsImage)  throws IllegalStateException, IOException;

	/**
	 * 승인된 발주 입출고 내역에 삽입
	 * @param orderList 
	 */
	void orderApproval(List<Approval> orderList);

	/** 납기일 일치하는 승인완료된 발주들
	 * @return
	 */
	List<Approval> orderApprovalComplete();

	/** 재고 현황 검색
	 * @param stock
	 * @return
	 */
	List<Stock> stockSearch(Stock stock);

	/** 신상품 세 개 조회
	 * @return
	 */
	List<Stock> newGoodsThree();



}
