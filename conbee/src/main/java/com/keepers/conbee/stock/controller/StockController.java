package com.keepers.conbee.stock.controller;

import java.io.Console;
import java.text.SimpleDateFormat;
import java.util.Date;
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
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.revenue.model.dto.Revenue;
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
	
	/** 재고 현황 리스트 전체 조회
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
	
	/** 상품 수정
	 * @param stock
	 * @param ra
	 * @return
	 */
	@PostMapping("goodsUpdate")
	public String goodsUpdate (Stock stock, RedirectAttributes ra
			) {
		int result = service.goodsUpdate(stock);
		if(result <= 0) {
			ra.addFlashAttribute("message", "수정 실패");
		}
		return "redirect:goodsList";
	}
		
	
	/** 발주 페이지
	 * @return
	 */
	@GetMapping("order/list")
	public String orderList(Stock stock) {
		
		return "stock/order/orderList";
	}
	
	/** 발주 신청 화면 전환
	 * @return
	 */
	@GetMapping("order/insert")
	public String orderInsertPage() {
		
		return "stock/order/orderInsert";
	}
	
	/** 발주 신청
	 * @return
	 */
	@PostMapping("order/insert")
	public String orderInsert() {
		
		return "stock/order/orderInsert";
	}
	
	
	@GetMapping("autoComplete")
	@ResponseBody
	public List<Stock> autoComplete(String inputQuery, String storeNo, String lcategoryName, String scategoryName) {
		List<Stock> stockList = service.autoComplete(inputQuery, Integer.parseInt(storeNo), lcategoryName, scategoryName);
		
		return stockList;
	}
	
	
	/** 물품 현황 전체 조회
	 * @return
	 */
	@GetMapping("stockList")
	public String stockList(Model model,
			@SessionAttribute("loginMember") Member loginMember,
			Stock stock
			) {
		if(stock.getStoreNo() == 0) {
			int storeNo = loginMember.getStoreList().get(0).getStoreNo();
			stock.setStoreNo(storeNo);
		}
		List<Stock> stockListSelect = service.stockList(stock);
		
		model.addAttribute("stockListSelect", stockListSelect);
		
		return "stock/stockList";
	}
	
	/** 재고 현황 등록
	 * @param stock
	 * @param ra
	 * @return
	 */
	@PostMapping("stockInsert")
	public String stockInsert( Stock stock, RedirectAttributes ra) {
		int result = service.stockInsert(stock);
		if(result <= 0) {
			ra.addFlashAttribute("message", "등록 실패");
		}
		return "redirect:stockList";
	}
	
	
	
	/** 재고 등록 이름 검색 시 물품 조회
	 * @param goodsName
	 * @return
	 */
	@GetMapping("/goodsNameSelect")
	@ResponseBody
	public List<String> goodsNameSelect( String intputGoods ){
		List<String> goodsNameSelect = service.goodsNameSelect(intputGoods);
		return goodsNameSelect;
	}
	
	
	
	
}
