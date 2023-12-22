package com.keepers.conbee.common.scheduling;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.stock.model.service.StockService;

import lombok.extern.slf4j.Slf4j;



/** @author minseok
 * 발주 마감 시간이 되면 발주 테이블에 모인 발주 품목들
 * 입출고 내역에 insert 하는 스케쥴러
 */
@Component
@Slf4j
public class OrderScheduling {
	
	@Autowired
	private StockService service;
	
	// 자정마다 동작
//	@Scheduled(cron = "0 0 0 * * *")
	@Scheduled(cron = "0 0 * * * *")
	public void orderScheduling() {
		log.info("발주 마감 스케쥴러 동작");
		service.orderScheduling();
		
	}
	@Scheduled(cron = "0 0 0 * * *")
	public void orderScheduling2() {
		log.info("본사 발주 승인 스케쥴러 동작");
		
		// 납기일 일치하는 본사 발주 목록들
		List<Approval> orderList = service.orderApprovalComplete();
		if(orderList.size() == 0) {
			log.info("조회된 결과가 없습니다");
			return;
		}
		
		// 본사 입고단가를 발주 단가로 수정
		service.headStockInPrice(orderList);
		
		// 입출고 내역에 삽입
		service.orderApproval(orderList);
		
	}
	

}
