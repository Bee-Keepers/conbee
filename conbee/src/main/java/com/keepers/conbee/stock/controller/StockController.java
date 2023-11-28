package com.keepers.conbee.stock.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("stock")
public class StockController {
	
	@GetMapping("list")
	public String stockList() {
		return "stock/stockList";
	}
	
	@PostMapping("insert")
	public String stockInsert() {
		return null;
	}
	
	@GetMapping("update")
	public String stockUpdatePage() {
		return "";
	}
	
	@PostMapping("update")
	public String stockUpdate() {
		return null;
	}
	
	@PostMapping("delete")
	public String stockDelete() {
		return null;
	}

}
