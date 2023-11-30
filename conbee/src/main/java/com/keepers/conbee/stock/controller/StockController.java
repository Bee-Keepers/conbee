package com.keepers.conbee.stock.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestAttributes;

import com.keepers.conbee.stock.model.dto.Stock;
import com.keepers.conbee.stock.model.service.StockService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("stock")
@RequiredArgsConstructor
public class StockController {
	
	private final StockService service;
	
	/** 물품 현황 리스트 조회
	 * @return
	 */
	@GetMapping("list")
	public String stockList() {
		return "stock/stockList";
	}
	
	
	/** 상품 등록 리스트 조회
	 * @return
	 */
	@GetMapping("stockGoodsList")
	public String stockGoodsList() {
		return "stock/stockGoodsList";
	}
	
	/** 상품 등록
	 * @return
	 */
	@PostMapping("stockGoodsInsert")
	public String stockGoodsInsert(Stock stock,
			RequestAttributes ra
			) {
		
		int result = service.stockGoodsInsert(stock);
		
		if(result > 0) {
			
		}
		
		return "";
	}
	
	
	/** 상품 등록 시 대분류 선택하면 소분류 조회기능
	 * @param lcategory
	 * @return
	 */
	@GetMapping("scategoryList")
	@ResponseBody
	public List<String> scategoryList(String lcategory){
		List<String> scategoryList = service.scategoryList(lcategory);
		return scategoryList;
	}

}
