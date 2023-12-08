package com.keepers.conbee.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.keepers.conbee.board.model.service.BoardService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("board")
public class BoardController {
	
	private final BoardService service;
	
	@GetMapping("write")
	public String boardWrite() {
		
		
		return "board/write";
	}
	

}
