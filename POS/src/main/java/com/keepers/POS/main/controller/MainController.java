package com.keepers.POS.main.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.keepers.POS.main.model.dto.Goods;
import com.keepers.POS.main.model.dto.History;
import com.keepers.POS.main.model.service.MainService;
import com.keepers.POS.member.model.dto.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/** @author 김민석
 * 
 */
@Slf4j
@Controller
@RequiredArgsConstructor
@SessionAttributes({"logimMember"})
public class MainController {
	
	private final MainService service;
	
	/** 메인 화면 전환
	 * @param loginMember : 로그인 객체
	 * @return
	 */
	@RequestMapping("/")
	public String mainPage(@SessionAttribute(value = "loginMember", required = false) Member loginMember) {
		
		// 로그인 된 경우
		if(loginMember != null) {
			return "main";
		}
		return "login";
	}
	
	
	
//	/** 
//	 * @return
//	 */
//	@RequestMapping("main")
//	public String loginPage() {
//		return "main";
//	}
	
	/**
	 * @param inputPosSearch
	 * @param storeName
	 * @return
	 */
	@GetMapping(value = "search", produces = "application/json")
	@ResponseBody
	public List<Goods> search(String inputPosSearch, String storeName) {
		
		List<Goods> goodsList = service.search(inputPosSearch, storeName);
		
		return goodsList;
	}
	
	
	
	@PostMapping("insert")
	public String insert(@SessionAttribute Member loginMember, @RequestParam("historyDiscount") List<Integer> historyDiscount, @RequestParam("historyUnitPrice") List<Integer> historyUnitPrice,
			@RequestParam("historyGoodsName") List<String> historyGoodsName, @RequestParam("historyAmount") List<Integer> historyAmount, @RequestParam("historyActualPrice") List<Integer> historyActualPrice, @RequestParam("goodsNo") List<Integer> goodsNo,
			@RequestParam("historyStoreName") String historyStoreName) {
		
		List<History> historyList = new ArrayList<>();
		for(int i = 0; i < historyDiscount.size(); i++) {
			History history = new History();
			history.setGoodsNo(goodsNo.get(i));
			history.setHistoryDiscount(historyDiscount.get(i));
			history.setHistoryUnitPrice(historyUnitPrice.get(i));
			history.setHistoryGoodsName(historyGoodsName.get(i));
			history.setHistoryAmount(historyAmount.get(i));
			history.setHistoryActualPrice(historyActualPrice.get(i));
			history.setHistoryStoreName(historyStoreName);
			historyList.add(history);
		}
		
		int result = service.insert(historyList);
		return "redirect:/";
	}

}
