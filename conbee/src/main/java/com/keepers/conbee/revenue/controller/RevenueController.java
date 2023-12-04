package com.keepers.conbee.revenue.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
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
		log.info("----------" + revenue);
		if(revenue.getStartDate() == null && revenue.getStartDate() == null && revenue.getGoodsName() == null && revenue.getLcategoryName() == null && revenue.getScategoryName() == null) {
			Date today = new Date();
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			revenue.setStartDate(dateFormat.format(today));
			revenue.setEndDate(dateFormat.format(today));
			revenue.setGoodsName("");
			revenue.setLcategoryName("");
			revenue.setScategoryName("");
			if(revenue.getStoreNo() == 0) {
				revenue.setStoreNo(loginMember.getStoreList().get(0).getStoreNo());
			}
		}
		List<Revenue> revenueList = service.revenueSearch(revenue);
		
		model.addAttribute("startDate", revenue.getStartDate());
		model.addAttribute("endDate", revenue.getEndDate());
		model.addAttribute("revenueList", revenueList);
		
		return "revenue/revenue";
	}
	
	@GetMapping("history")
	public String historyPage(Model model, Revenue revenue, @SessionAttribute("loginMember") Member loginMember) {
		
		log.info("----------" + revenue);
		if(revenue.getStartDate() == null && revenue.getStartDate() == null && revenue.getGoodsName() == null && revenue.getLcategoryName() == null && revenue.getScategoryName() == null) {
			Date today = new Date();
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			revenue.setStartDate(dateFormat.format(today));
			revenue.setEndDate(dateFormat.format(today));
			revenue.setGoodsName("");
			revenue.setLcategoryName("");
			revenue.setScategoryName("");
			if(revenue.getStoreNo() == 0) {
				revenue.setStoreNo(loginMember.getStoreList().get(0).getStoreNo());
			}
		}	
		List<Revenue> historyList = service.historySearch(revenue);
		model.addAttribute("startDate", revenue.getStartDate());
		model.addAttribute("endDate", revenue.getEndDate());
		model.addAttribute("historyList", historyList);
//		
		return "revenue/history";
	}
	

	
}
