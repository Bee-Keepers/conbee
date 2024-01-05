package com.keepers.conbee.revenue.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.revenue.model.dto.Revenue;
import com.keepers.conbee.revenue.model.service.RevenueManageService;
import com.keepers.conbee.revenue.model.service.RevenueService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("revenueManage")
public class RevenueManageController {
	
	private final RevenueManageService service;
	
	/** 매출 검색 및 조회
	 * @param revenue
	 * @param model
	 * @return
	 */
	@GetMapping("revenueList")
	public String revenueManageList(Revenue revenue, Model model) {
		String storeName = service.storeName(revenue.getStoreNo());
		List<Revenue> revenueList = service.revenueManageList(revenue);
		model.addAttribute("revenueList", revenueList);
		model.addAttribute("storeName", storeName);
		model.addAttribute("startDate", revenue.getStartDate());
		model.addAttribute("endDate", revenue.getEndDate());
		return "revenue/revenueManage/revenueManage";
	}
	
	/** 입출고 내역 검색 및 조회
	 * @param model
	 * @param revenue
	 * @param cp
	 * @return
	 */
	@GetMapping("history")
	public String historyPage(Model model, Revenue revenue, @RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		String storeName = service.storeName(revenue.getStoreNo());
		List<Revenue> historyList = service.historySearch(revenue, cp);
		model.addAttribute("storeName", storeName);
		model.addAttribute("startDate", revenue.getStartDate());
		model.addAttribute("endDate", revenue.getEndDate());
		model.addAttribute("historyList", historyList);
		
		return "revenue/revenueManage/revenueHistory";
	}
	
	/** 비동기 지점 검색
	 * @param inputStoreName
	 * @return
	 */
	@GetMapping(value="storeSearch", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Store> storeSearch(String inputStoreName){
		
		List<Store> storeList = service.storeSearch(inputStoreName);
		
		return storeList;
	}

	/** 무한 스크롤 입출고 내역
	 * @param revenue
	 * @param cp
	 * @return
	 */
	@GetMapping(value = "historyListAjax", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Revenue> historyListAjax(Revenue revenue, 
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp){
		
		return service.historySearch(revenue, cp);
	}
	
}
