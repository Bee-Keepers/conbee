package com.keepers.conbee.mypage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.keepers.conbee.mypage.model.service.MypageService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("mypage")
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
public class MypageController {
	
	private final MypageService service;
	

}
