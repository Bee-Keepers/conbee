package com.keepers.conbee.revenue.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.revenue.model.dto.Revenue;
import com.keepers.conbee.revenue.model.service.RevenueService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("revenue")
public class RevenueController {

	private final RevenueService service;
	
	@GetMapping("list")
	public String revenueSearch(Model model, Revenue revenue, @SessionAttribute("loginMember") Member loginMember) {
		
		if(revenue.getStoreNo() == 0) {
			revenue.setStoreNo(loginMember.getStoreList().get(0).getStoreNo());
		}
		
		List<Revenue> revenueList = service.revenueSearch(revenue);
		
		model.addAttribute("startDate", revenue.getStartDate());
		model.addAttribute("endDate", revenue.getEndDate());
		model.addAttribute("revenueList", revenueList);
		
		return "revenue/revenue";
	}
	
	@GetMapping("history")
	public String historyPage(Model model, Revenue revenue, @SessionAttribute("loginMember") Member loginMember) {
		
		if(revenue.getStoreNo() == 0) {
			revenue.setStoreNo(loginMember.getStoreList().get(0).getStoreNo());
		}
			
		List<Revenue> historyList = service.historySearch(revenue);
		
		model.addAttribute("startDate", revenue.getStartDate());
		model.addAttribute("endDate", revenue.getEndDate());
		model.addAttribute("historyList", historyList);
		
		return "revenue/history";
	}
	

	
}
