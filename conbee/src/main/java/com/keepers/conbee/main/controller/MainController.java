package com.keepers.conbee.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.keepers.conbee.member.model.dto.Member;

@Controller
public class MainController {
	
	@RequestMapping("/")
	public String mainPage(@SessionAttribute(value="loginMember", required = false) Member loginMember ) {
		if(loginMember != null) {
			return "common/main";
			
		} else {
			return "member/login";
		}
		
	}

}
