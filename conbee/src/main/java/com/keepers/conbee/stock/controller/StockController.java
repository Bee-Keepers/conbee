package com.keepers.conbee.stock.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.stock.model.dto.Stock;
import com.keepers.conbee.stock.model.service.StockService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
	@GetMapping("goodsList")
	public String stockGoodsList( Model model,
			@RequestParam Map<String, Object> paramMap
			) {
		
		Map<String, Object> map = service.goodsList(paramMap);
			
		model.addAttribute("map", map);
			
		return "stock/goodsList";
	}
	
	/** 상품 등록
	 * @return
	 */
	@PostMapping("goodsInsert")
	public String stockGoodsInsert(Stock stock, RedirectAttributes ra) {
		
		int result = service.goodsInsert(stock);
		if(result <= 0) {
			ra.addFlashAttribute("message", "등록 실패");
		}
		return "redirect:goodsList";
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
	
	
	/** 상품 삭제
	 * @param goodsNo
	 * @return
	 */
	@DeleteMapping("goodsDelete")
	@ResponseBody
	public int goodsDelete(@RequestBody List<Integer> goodsNo) {
		return service.goodsDelete(goodsNo);
	}
	
	@PostMapping("goodsUpdate")
	public String goodsUpdate (Stock stock, RequestAttributes ra) {
		
		int result = service.goodsUpdate(stock);
		
		if(result > 0) {
			return "redirect:goodsList";
		}
		
		return null;
	
	/** 발주 페이지
	 * @return
	 */
	@GetMapping("order/list")
	public String orderPage() {
		return "stock/order/order";
	}
	

}
