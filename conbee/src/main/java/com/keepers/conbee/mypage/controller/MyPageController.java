package com.keepers.conbee.MyPage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.keepers.conbee.MyPage.model.service.MyPageService;

import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("mypage")
@SessionAttributes({"loginMember"})
@Slf4j
public class MyPageController {
	
	@Autowired
	private MyPageService service;
	
	@GetMapping("mypage-profile")
	public String mypage() {
		return "mypage/mypage-profile";
	}
	
	

}
