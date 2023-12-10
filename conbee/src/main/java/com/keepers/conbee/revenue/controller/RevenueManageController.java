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

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("revenueManage")
public class RevenueManageController {
	
	private final RevenueManageService service;
	
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
	
	@GetMapping("history")
	public String historyPage(Model model, Revenue revenue) {
		
		List<Revenue> historyList = service.historySearch(revenue);
		
		model.addAttribute("startDate", revenue.getStartDate());
		model.addAttribute("endDate", revenue.getEndDate());
		model.addAttribute("historyList", historyList);
		
		return "revenue/revenueManage/revenueHistory";
	}
	
	@GetMapping(value="storeSearch", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Store> storeSearch(String inputStoreName){
		
		List<Store> storeList = service.storeSearch(inputStoreName);
		
		return storeList;
	}

}
