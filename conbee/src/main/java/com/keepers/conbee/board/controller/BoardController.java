package com.keepers.conbee.board.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.keepers.conbee.board.model.service.BoardService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("board")
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
public class BoardController {
	
	private final BoardService service;
	

	
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡ 1. 게시글 리스트 조회/상세 ㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	/** 게시글 리스트 페이지 전환(게시글 조회
	 * @return
	 */
	@GetMapping("boardList/{boardCodeNo:[0-9]+}")
	public String boardList(
		@PathVariable("boardCodeNo") int boardCodeNo, Model model,
		@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
		@RequestParam Map<String, Object> paramMap
		) {
		
		if(paramMap.get("key") == null && paramMap.get("query") == null) {
			Map<String, Object> map =service.selectBoardList(boardCodeNo, cp);
			model.addAttribute("map", map);
		} else {
			paramMap.put("boardCodeNo", boardCodeNo);
			
			Map<String, Object> map = service.searchBoardList(paramMap, cp);
			model.addAttribute("map", map);
		}
		
		return "board/boardList";
	}
	
//	@GetMapping("boardList")
//	public String boardList() {
//		return "board/boardList";
//	}
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ상세 + 좋아요 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
