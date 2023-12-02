package com.keepers.conbee.revenue.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
	public String revenueList() {
		return "stock/revenue/revenue";
	}
	
//	@PostMapping("list")
//	public String revenueSearchList(Model model, String lcategoryName, String scategoryName,
//			String goodsName, int revenue, int flag, String startDate, String endDate) {
//		
//		
//		
//		return "stock/revenue/revenue";
//	}
	@PostMapping("list")
	public String revenueSearchList(Model model, Revenue revenue) {
		
		
		
		return "stock/revenue/revenue";
	}
}
