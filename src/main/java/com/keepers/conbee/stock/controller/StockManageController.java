package com.keepers.conbee.stock.controller;

import java.time.LocalDate;
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
import com.keepers.conbee.stock.model.dto.Order;
import com.keepers.conbee.stock.model.dto.OrderDetail;
import com.keepers.conbee.stock.model.dto.Stock;
import com.keepers.conbee.stock.model.service.StockManageService;
import com.keepers.conbee.stock.model.service.StockService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("stockManage")
public class StockManageController {

	private final StockManageService service;
	private final StockService stockService;
	
	/** 재고 현황 리스트 전체 조회
	 * @return
	 */
	@GetMapping("goodsList")
	public String stockGoodsList( Model model,
			@RequestParam Map<String, Object> paramMap
			) {
		
		Map<String, Object> map = service.goodsList(paramMap);
			
		model.addAttribute("map", map);
			
		return "stock/stockManage/goodsManageList";
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
	
	/** 물품 현황 전체 조회
	 * @return
	 */
	@GetMapping("stockList")
	public String stockList(Model model,
			Stock stock
			) {
		List<Stock> stockListSelect = service.stockList(stock);
		
		model.addAttribute("stockListSelect", stockListSelect);
		
		return "stock/stockManage/stockList";
	}
	
	/** 재고 등록 이름 검색 시 물품 조회
	 * @param goodsName
	 * @return
	 */
	@GetMapping("goodsNameSelect")
	@ResponseBody
	public List<Stock> goodsNameSelect( String intputGoods ){
		List<Stock> goodsNameSelect = service.goodsNameSelect(intputGoods);
		return goodsNameSelect;
	}
	
	/** 상품 등록 시 대분류 선택하면 소분류 조회기능
	 * @param lcategory
	 * @return
	 */
	@GetMapping("scategoryList")
	@ResponseBody
	public List<String> scategoryList(String lcategory){
		List<String> scategoryList = stockService.scategoryList(lcategory);
		return scategoryList;
	}
	
	/** 발주 페이지
	 * @return
	 */
	@GetMapping("order/list")
	public String orderList(@SessionAttribute("loginMember") Member loginMember, @RequestParam(value = "storeNo", required = false, defaultValue = "-1") int storeNo, Model model,
			String startDate, String endDate, RedirectAttributes ra) {
				
		if(endDate == null) {
			endDate = String.valueOf(LocalDate.now());
		}
		if(startDate == null) {
			startDate = String.valueOf(LocalDate.now().minusWeeks(1));
		}
		List<String> orderList = stockService.selectOrderList(storeNo, startDate, endDate);
		String storeName = service.storeName(storeNo);
		
		model.addAttribute("orderList", orderList);
		model.addAttribute("storeName", storeName);
		model.addAttribute("endDate", endDate);
		model.addAttribute("startDate", startDate);

		return "stock/stockManage/orderList";
	}

	// 발주 상세 조회
	@GetMapping("order/select")
	@ResponseBody
	public List<OrderDetail> orderSelect(Order order) {
		return stockService.orderSelect(order);
	}
}
