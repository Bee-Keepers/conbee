package com.keepers.conbee.chatting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("chatting")
public class ChattingController {

	@GetMapping("chatting")
	private String chatting() {
		return "/chatting/chatting";
	}
}
