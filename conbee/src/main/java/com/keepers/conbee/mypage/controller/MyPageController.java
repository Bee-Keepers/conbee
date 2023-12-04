package com.keepers.conbee.mypage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.keepers.conbee.mypage.model.service.MypageService;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("mypage")
@SessionAttributes({"loginMember"})
@Slf4j
public class MyPageController {
	
	@Autowired
	private MypageService service;
	
	
	

}
