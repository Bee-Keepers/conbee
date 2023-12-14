package com.keepers.conbee.stock.controller;

import java.io.IOException;
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
import com.keepers.conbee.revenue.model.dto.Revenue;

import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import com.keepers.conbee.stock.model.dto.Order;
import com.keepers.conbee.stock.model.dto.OrderDetail;
import com.keepers.conbee.stock.model.dto.Stock;
import com.keepers.conbee.stock.model.service.StockService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("stock")
@RequiredArgsConstructor
@SessionAttributes({"loginMember"})
public class StockController {
	
	private final StockService service;
	
	
	/** 상품 리스트 전체 조회
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
	
	
	
		
	
	/** 발주 페이지
	 * @return
	 */
	@GetMapping("order/list")
	public String orderList(@SessionAttribute("loginMember") Member loginMember, @RequestParam(value = "storeNo", required = false, defaultValue = "-1") int storeNo, Model model,
			String startDate, String endDate, RedirectAttributes ra) {
				
		if(storeNo == -1) {
			storeNo = loginMember.getStoreList().get(0).getStoreNo();
		}
		if(endDate == null) {
			endDate = String.valueOf(LocalDate.now());
		}
		if(startDate == null) {
			startDate = String.valueOf(LocalDate.now().minusWeeks(1));
		}
		List<String> orderList = service.selectOrderList(storeNo, startDate, endDate);
		
		model.addAttribute("orderList", orderList);
		model.addAttribute("endDate", endDate);
		model.addAttribute("startDate", startDate);
		
		return "stock/order/orderList";
	}
	
	/** 발주 신청
	 * @return
	 */
	@GetMapping("order/insert")
	public String orderInsertPage(@SessionAttribute("loginMember") Member loginMember, @RequestParam(value = "storeNo", required = false, defaultValue = "-1") int storeNo, Model model,
			RedirectAttributes ra) {
		if(storeNo == -1) {
			storeNo = loginMember.getStoreList().get(0).getStoreNo();
		}
		
		List<Order> orderList = service.orderInsertUpdate(storeNo);
		
		model.addAttribute("orderList", orderList);

		return "stock/order/orderInsert";
	}
	
	/** 발주 신청
	 * @return
	 */
	@PostMapping("order/insert")
	public String orderInsert(@RequestParam List<Integer> goodsNo, @RequestParam List<Integer> orderAmount,
			int storeNo, RedirectAttributes ra) {
		
		int result = service.orderInsert(goodsNo, orderAmount, storeNo);
		
		// 발주 신청 결과에 따른 메세지
		if(result > 0) {
			ra.addFlashAttribute("message", "발주 신청 완료");
		} else {
			ra.addFlashAttribute("message", "발주 신청 실패");
		}
		return "redirect:insert?storeNo=" + storeNo;
	}
	/** 발주 삭제
	 * @return
	 */
	@DeleteMapping("order/delete")
	@ResponseBody
	public void orderDelete(@RequestBody Order order) {
		service.orderDelete(order);
	}
	
	
	/** 자동 완성
	 * @param inputQuery
	 * @param storeNo
	 * @param lcategoryName
	 * @param scategoryName
	 * @return
	 */
	@GetMapping("autoComplete")
	@ResponseBody
	public List<Stock> autoComplete(String inputQuery, String storeNo, String lcategoryName, String scategoryName) {
		List<Stock> stockList = service.autoComplete(inputQuery, Integer.parseInt(storeNo), lcategoryName, scategoryName);
		
		return stockList;
	}
	
	
	/** 물품 현황 전체 조회
	 * @param model
	 * @param loginMember
	 * @param stock
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
	@GetMapping("goodsNameSelect")
	@ResponseBody
	public List<Stock> goodsNameSelect( String intputGoods ){
		List<Stock> goodsNameSelect = service.goodsNameSelect(intputGoods);
		return goodsNameSelect;
	}
	
	/** 재고 삭제
	 * @param dataList
	 * @return
	 */
	@DeleteMapping("stockDelete")
	@ResponseBody
	public int stockDelete(@RequestBody Map<String, Object> paramMap) {
		return service.stockDelete(paramMap);
	}
	
	/** 재고 현황 수정
	 * @param stock
	 * @param ra
	 * @return
	 */
	@PostMapping("stockUpdate")
	public String stockUpdate( Stock stock, RedirectAttributes ra) {
		int result = service.stockUpdate(stock);
		if(result <= 0) {
			ra.addFlashAttribute("message", "수정 실패");
		}
		return "redirect:stockList";
	}
	
	// 발주 상세 조회
	@GetMapping("order/select")
	@ResponseBody
	public List<OrderDetail> orderSelect(Order order) {
		return service.orderSelect(order);
	}
	
	/** 상품(재고) 상세 조회
	 * @param goodsNo
	 * @return
	 */
	@GetMapping("goodsDetail")
	@ResponseBody
	public Stock goodsDetail( int goodsNo ) {
		return service.goodsDetail(goodsNo);
	}
	
	
	
	/** 재고 현황 검색
	 * @param stock
	 * @param model
	 * @param loginMember
	 * @return
	 */
	@GetMapping("stockSearch")
	public String stockSearch( Stock stock, Model model, @SessionAttribute("loginMember") Member loginMember ) {
		
		if(stock.getStoreNo() == -1) {
			stock.setStoreNo(loginMember.getStoreList().get(0).getStoreNo());
		}
			
		List<Stock> stockSearchList = service.stockSearch(stock);
		
		model.addAttribute("stockListSelect", stockSearchList);
		
		return "stock/stockList";
	}
	
	
}
