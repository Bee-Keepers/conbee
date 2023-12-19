package com.keepers.conbee.stock.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.stock.model.dto.Order;
import com.keepers.conbee.stock.model.dto.OrderDetail;
import com.keepers.conbee.stock.model.dto.Stock;
import com.keepers.conbee.stock.model.service.StockManageService;
import com.keepers.conbee.stock.model.service.StockService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("stockManage")
public class StockManageController {

	private final StockManageService service;
	private final StockService stockService;
	
	/** 상품 리스트 전체 조회
	 * @return
	 */
	@GetMapping("goodsList")
	public String stockGoodsList( Model model,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp
			) {
		
		List<Stock> goodsListSelect = service.goodsList(cp);
			
		model.addAttribute("goodsListSelect", goodsListSelect);
			
		return "stock/stockManage/goodsManageList";
	}
	
	/** 상품 리스트 전체 조회
	 * @return
	 */
	@GetMapping(value="goodsListAjax", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Stock> stockGoodsListAjax(@RequestParam(value = "cp", required = false, defaultValue = "1") int cp
			) {
		
		List<Stock> goodsList = service.goodsList(cp);
		return goodsList;
	}
	
	/** 상품 등록
	 * @return
	 */
	@PostMapping("goodsInsert")
	public String stockGoodsInsert(Stock stock, RedirectAttributes ra) {
		
		int result = stockService.goodsInsert(stock);
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
		return stockService.goodsDelete(goodsNo);
	}
	
	/** 상품 수정
	 * @param stock
	 * @param ra
	 * @return
	 */
//	@PostMapping("goodsUpdate")
//	public String goodsUpdate (Stock stock, RedirectAttributes ra
//			) {
//		int result = stockService.goodsUpdate(stock);
//		if(result <= 0) {
//			ra.addFlashAttribute("message", "수정 실패");
//		}
//		return "redirect:goodsList";
//	}
	
	/** 재고 전체 조회
	 * @return
	 */
	@GetMapping("stockList")
	public String stockList(Model model,
			Stock stock, @RequestParam(value = "cp", required = false, defaultValue = "1") int cp
			) {
		stock.setStoreNo(0);
		List<Stock> stockListSelect = service.stockList(stock, cp);
		
		model.addAttribute("stockListSelect", stockListSelect);
		
		return "stock/stockManage/stockList";
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
	
	/** 재고 현황 수정
	 * @param stock
	 * @param ra
	 * @return
	 */
	@PostMapping("stockUpdate")
	public String stockUpdate( Stock stock, RedirectAttributes ra) {
		int result = stockService.stockUpdate(stock);
		if(result <= 0) {
			ra.addFlashAttribute("message", "수정 실패");
		}
		return "redirect:stockList";
	}
	
	/** 재고 삭제
	 * @param dataList
	 * @return
	 */
	@DeleteMapping("stockDelete")
	@ResponseBody
	public int stockDelete(@RequestBody Map<String, Object> paramMap) {
		return stockService.stockDelete(paramMap);
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
	
	/** 상품(재고) 상세 조회
	 * @param goodsNo
	 * @return
	 */
	@GetMapping("goodsDetail")
	@ResponseBody
	public Stock goodsDetail( int goodsNo ) {
		return stockService.goodsDetail(goodsNo);
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
	
	/** 상품 상세 조회
	 * @param goodsNo
	 * @return
	 */
	@GetMapping("goodsDetailSelect")
	@ResponseBody
	public Stock goodsDetailSelect( int goodsNo ) {
		return stockService.goodsDetailSelect(goodsNo);
	}
	
	/** 상품 상세 수정
	 * @param stock
	 * @param ra
	 * @return
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@PostMapping("goodsDetailUpdate")
	public String goodsDetailUpdate( 
			Stock stock, 
			@RequestParam ("uploadGoodsImage") MultipartFile uploadGoodsImage,
			RedirectAttributes ra 
			) throws IllegalStateException, IOException {
		
		int result = stockService.goodsDetailUpdate(stock, uploadGoodsImage);
		
		if(result == 0) {
			ra.addFlashAttribute("message", "수정 실패");
		}
		
		return "redirect:goodsList";
	}
	
	/** 재고 현황 검색
	 * @param stock
	 * @param model
	 * @param loginMember
	 * @return
	 */
	@GetMapping("goodsSearch")
	public String goodsSearch( Stock stock, Model model ) {
		
		List<Stock> goodsSearchList = service.goodsSearch(stock);
		Map<String, Object> map = new HashMap<>();
		map.put("goodsListSelect", goodsSearchList);
		model.addAttribute("map", map);
		
		return "stock/stockManage/goodsManageList";
	}
	
	@GetMapping("updatePrice")
	public String updatePrice() {
		
		return "stock/stockManage/updatePrice";
	}
	
	/** 입고가 조정 상세검색
	 * @param stock
	 * @param model
	 * @return
	 */
	@GetMapping("stockSearch")
	public String stockSearch(Stock stock, Model model, @RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		List<Stock> stockListSelect = service.stockList(stock, cp);
		String storeName = service.storeName(stock.getStoreNo());
		
		model.addAttribute("stockListSelect", stockListSelect);
		model.addAttribute("storeName", storeName);
		return "stock/stockManage/updatePrice";
	}
	
	/** 입고가 수정
	 * @param stock
	 * @return
	 */
	@PostMapping("stockInPriceUpdate")
	public String stockInPriceUpdate(Stock stock, RedirectAttributes ra) {
		
		int result = service.stockInPriceUpdate(stock);
		if(result == 0) {
			ra.addAttribute("message", "수정 실패");
		}
		if(stock.getLcategoryName() == null) stock.setLcategoryName("");
		if(stock.getScategoryName() == null) stock.setScategoryName("");
		if(stock.getGoodsName() == null) stock.setGoodsName("");
		return "redirect:stockSearch?storeNo="+stock.getStoreNo()+"&lcategoryName="+stock.getLcategoryName()+"&scategoryName="+stock.getScategoryName()+"&goodsName="+ stock.getGoodsName();
	}
	/** 본사 재고 검색
	 * @param stock
	 * @param model
	 * @return
	 */
	@GetMapping("stockListSearch")
	public String stockListSearch( Stock stock, Model model) {
		List<Stock> stockList = service.stockListSearch(stock);
		model.addAttribute("stockListSelect", stockList);
		return "stock/stockManage/stockList";
	}
	
	
	/** 무한 스크롤 본사 재고 조회
	 * @param stock
	 * @param cp
	 * @return
	 */
	@GetMapping("stockListAjax")
	@ResponseBody
	public List<Stock> stockListAjax(Stock stock, @RequestParam(value = "cp", required = false, defaultValue = "1") int cp){
		List<Stock> stockListSelect = service.stockList(stock, cp);
		return stockListSelect;
	}
	
}
