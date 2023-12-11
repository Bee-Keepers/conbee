package com.keepers.conbee.common.scheduling;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

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
	@Scheduled(cron = "0 0 0 * * *")
	public void orderScheduling() {
		log.info("Order 스케쥴러 동작");
		service.orderScheduling();
		
	}
//	@Scheduled(cron = "0 0 0 * * *")
//	public void orderScheduling2() {
//		log.info("Order 스케쥴러 동작");
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
//		String today = sdf.format(new Date()); // 2023-12-12
//		
//		// 1,3
//		service.orderScheduling();
//		
//	}
	

}
