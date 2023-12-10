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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.stock.model.dto.Stock;
import com.keepers.conbee.stock.model.service.StockManageService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("stockManage")
public class StockManageController {

	private final StockManageService service;
	
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
}
