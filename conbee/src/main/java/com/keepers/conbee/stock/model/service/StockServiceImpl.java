package com.keepers.conbee.stock.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.keepers.conbee.common.utility.Util;
import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.stock.model.dto.Order;
import com.keepers.conbee.stock.model.dto.OrderDetail;
import com.keepers.conbee.stock.model.dto.Stock;
import com.keepers.conbee.stock.model.mapper.StockMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
@Slf4j
public class StockServiceImpl implements StockService{

	private final StockMapper mapper;
	
	@Value("${my.stock.location}")
	private String folderPath; // 서버 저장 폴더 경로
	
	@Value("${my.stock.webpath}")
	private String webPath; // 웹 이미지 요청 경로
	
	
	// 상품 등록 시 대분류 누르면 소분류 나오는 기능
	@Override
	public List<String> scategoryList(String lcategory) {
		return mapper.scategoryList(lcategory);
	}
	
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
	
	// 재고 현황 전체 조회
	@Override
	public List<Stock> stockList(Stock stock) {
		
		List<Stock> stockList = mapper.stockList(stock);
		
		for(Stock s : stockList ) {
			double sum = s.getStockOutPrice() * (1- ((double)s.getStockDiscount() * 0.01));
			
			s.setPriceSum( (int)sum + "" );
			
		}
		
		return stockList;
	}
	
	// 재고 현황 등록
	@Override
	public int stockInsert(Stock stock) {
		return mapper.stockInsert(stock);
	}
	
	
	/**
	 * 자동 완성
	 */
	@Override
	public List<Stock> autoComplete(String inputQuery, int storeNo, String lcategoryName, String scategoryName) {
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("inputQuery", inputQuery);
		map.put("storeNo", storeNo);
		map.put("lcategoryName", lcategoryName);
		map.put("scategoryName", scategoryName);
		
		return mapper.autoComplete(map);
	}
	
	// 재고 등록 이름 검색 시 물품 조회
	@Override
	public List<Stock> goodsNameSelect(String intputGoods) {
		return mapper.goodsNameSelect(intputGoods);
	}
	
	// 발주 신청
	@Override
	public int orderInsert(List<Integer> goodsNo, List<Integer> orderAmount, int storeNo) {
		
		List<Integer> preGoodsNo = mapper.preGoodsNo(storeNo);
		List<Order> orderInsertList = new ArrayList<>();
		
		int result = 0;
		
		for(int i = 0; i<goodsNo.size(); i++) {
			if(preGoodsNo.contains(goodsNo.get(i))) {
				log.info("=-=-=-=-=-=" + goodsNo.get(i));
				Order orderUpdate = new Order();
				orderUpdate.setGoodsNo(goodsNo.get(i));
				orderUpdate.setOrderAmount(orderAmount.get(i));
				orderUpdate.setStoreNo(storeNo);
				result = mapper.orderUpdate(orderUpdate);
				if(result == 0) return 0;
			} else {
				Order order = new Order();
				order.setGoodsNo(goodsNo.get(i));
				order.setOrderAmount(orderAmount.get(i));
				order.setStoreNo(storeNo);
				orderInsertList.add(order);
			}
		}
		if(orderInsertList.size() != 0) {
			result = mapper.orderInsert(orderInsertList);
		}
		return result;
	}

	// 발주 내역 조회
	@Override
	public List<String> selectOrderList(int storeNo, String startDate, String endDate) {
		
		Map<String, Object> map = new HashMap<>();
		map.put("storeNo", storeNo);
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		
		return mapper.selectOrderList(map);
	}

	// 발주 마감 스케쥴러 동작
	@Override
	public void orderScheduling() {
		List<Order> orderList = mapper.selectOrderScheduling();
	  log.info("-=-=--=-=-= orderList : " + orderList);
		if(orderList.size() != 0) {
			mapper.orderScheduling(orderList);
		}
	}
	
	// 재고 삭제
	@Override
	public int stockDelete(Map<String, Object> paramMap) {
		
		return mapper.stockDelete(paramMap);
	}
	
	// 재고 수정
	@Override
	public int stockUpdate(Stock stock) {
		return mapper.stockUpdate(stock);
	}
	
	// 발주 신청/수정 화면 출력용
	@Override
	public List<Order> orderInsertUpdate(int storeNo) {
		return mapper.orderInsertUpdate(storeNo);
	}
	
	// 발주 삭제
	@Override
	public void orderDelete(Order order) {
		// 하루단위 발주에 입력되어있는 상품번호들 조회
		List<Integer> preGoodsNo = mapper.preGoodsNo(order.getStoreNo());
		
		// 비교해서 있으면 삭제 작업
		for(int i = 0; i<order.getGoodsNoList().size(); i++) {
			if(preGoodsNo.contains(order.getGoodsNoList().get(i))) {
				order.setGoodsNo(order.getGoodsNoList().get(i));
				mapper.orderDelete(order);
			}
		}
	}
	
	// 발주 상세 조회
	@Override
	public List<OrderDetail> orderSelect(Order order) {
		return mapper.orderSelect(order);
	}
	
	// 상품(재고) 상세 조회
	@Override
	public Stock goodsDetail(int goodsNo) {
		return mapper.goodsDetail(goodsNo);
	}
	
	// 상품 상세 조회
	@Override
	public Stock goodsDetailSelect(int goodsNo) {
		return mapper.goodsDetailSelect(goodsNo);
	}
	
	// 상품 상세 수정
	@Override
	public int goodsDetailUpdate(Stock stock, MultipartFile uploadGoodsImage) throws IllegalStateException, IOException {
		
		String backupImage = stock.getGoodsImage();
		String backupPath = stock.getGoodsImagePath();
		
		String rename = null;
		
		if(uploadGoodsImage.getSize() > 0) {
			rename = Util.fileRename(uploadGoodsImage.getOriginalFilename());
			stock.setGoodsImage(rename);
			stock.setGoodsImagePath(webPath);
		} 
		
		int result = mapper.goodsDetailUpdate(stock);
		
		if(result > 0) {
			if(rename != null) {
				uploadGoodsImage.transferTo( new File( folderPath + rename ) );
			}
		}
		return result;
	}
	
	// 승인된 발주 입출고 내역에 삽입
	@Override
	public void orderApproval(List<Approval> orderList) {
		mapper.orderApproval(orderList);
	}
	
	// 납기일 일치하는 승인완료된 발주들
	@Override
	public List<Approval> orderApprovalComplete() {
		return mapper.orderApprovalComplete();
	}
	
	// 재고 현황 검색
	@Override
	public List<Stock> stockSearch(Stock stock) {
		if(stock.getLcategoryName() == null && stock.getScategoryName() == null && stock.getGoodsName() == null) {
		stock.setLcategoryName("");
		stock.setScategoryName("");
		stock.setGoodsName("");
		}
		return mapper.stockSearch(stock);
	}
	
}
