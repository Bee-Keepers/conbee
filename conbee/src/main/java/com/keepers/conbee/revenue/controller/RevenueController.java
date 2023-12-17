package com.keepers.conbee.revenue.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.revenue.model.dto.Revenue;
import com.keepers.conbee.revenue.model.service.RevenueService;
import com.keepers.conbee.stock.model.dto.Stock;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("revenue")
public class RevenueController {

	private final RevenueService service;
	
	@GetMapping("list")
	public String revenueSearch(Model model, Revenue revenue, @SessionAttribute("loginMember") Member loginMember,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		if(revenue.getStoreNo() == -1) {
			revenue.setStoreNo(loginMember.getStoreList().get(0).getStoreNo());
		}
		
		List<Revenue> revenueList = service.revenueSearch(revenue, cp);
		
		model.addAttribute("startDate", revenue.getStartDate());
		model.addAttribute("endDate", revenue.getEndDate());
		model.addAttribute("revenueList", revenueList);
		
		return "revenue/revenue";
	}
	
	@GetMapping("history")
	public String historyPage(Model model, Revenue revenue, @SessionAttribute("loginMember") Member loginMember,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		
		if(revenue.getStoreNo() == -1) {
			revenue.setStoreNo(loginMember.getStoreList().get(0).getStoreNo());
		}
			
		List<Revenue> historyList = service.historySearch(revenue, cp);
		
		model.addAttribute("startDate", revenue.getStartDate());
		model.addAttribute("endDate", revenue.getEndDate());
		model.addAttribute("historyList", historyList);
		
		return "revenue/history";
	}
	
	@GetMapping(value = "historyListAjax", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Revenue> historyListAjax(Revenue revenue, 
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp){
		
		return service.historySearch(revenue, cp);
	}
	
	
	

	
}
