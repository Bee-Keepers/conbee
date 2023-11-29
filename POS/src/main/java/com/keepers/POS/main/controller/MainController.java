package com.keepers.POS.main.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.keepers.POS.main.model.dto.Goods;
import com.keepers.POS.main.model.dto.Member;
import com.keepers.POS.main.model.service.MainService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@SessionAttributes({"logimMember"})
public class MainController {
	
	private final MainService service;
	
	@RequestMapping("/")
	public String mainPage(@SessionAttribute(value = "loginMember", required = false) Member loginMember) {
		
		// 로그인 된 경우
		if(loginMember != null) {
			return "main";
		}
		return "login";
	}
	
	
	
	@RequestMapping("main")
	public String loginPage() {
		return "main";
	}
	
	@GetMapping(value = "search", produces = "application/json")
	@ResponseBody
	public List<Goods> search(String inputPosSearch) {
		
		List<Goods> goodsList = service.search(inputPosSearch);
		
		return goodsList;
	}
	
	
	
	
	@PostMapping("insert")
	public String insert() {
		
		return "redirect:/";
	}

}
