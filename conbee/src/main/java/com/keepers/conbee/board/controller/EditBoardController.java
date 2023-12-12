package com.keepers.conbee.board.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.board.model.dto.Board;
import com.keepers.conbee.board.model.service.BoardService;
import com.keepers.conbee.board.model.service.EditBoardService;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("board")
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
public class EditBoardController {
	
	private final EditBoardService service;
	
	private final BoardService boardService; // 게시글 수정 시 상세조회 호출용
	

	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡ 1. 게시글 작성 ㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/	
	/** 게시글 작성 페이지 전환
	 * @return
	 */
	@GetMapping("boardWrite")
	public String boardWrite() {
		return "board/boardWrite";
	}
	

	/** 게시글 작성 화면
	 * @return
	 */
	@PostMapping("boardWrite")
	public String boardWrite(Board board, 
		@SessionAttribute("loginMember")Member loginMember,
		RedirectAttributes ra
		) {
//		board.setMemberNo(loginMember.getMemberNo());
//		board.setBoardCodeNo(boardCodeNo);
		
		
		int boardNo = service.boardWrite(board);
		
		if(boardNo > 0) {
			ra.addFlashAttribute("message", "게시글 작성 성공");
			return "board/boardList";
		}
		
		
		return "board/boardWrite";
	}
	
	
	
	
	
	
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡ수정 / 삭제ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
//	@GetMapping("boardUpdate/{boardCodeNo:[0-9]+}/{boardNo:[0-9]+}/update")
//	public String boardUpdate(
//		@PathVariable("boardCodeNo") int boardCodeNo,
//		@PathVariable("boardNo") int boardNo,
//		Model model) {
//		
//		Map<String, Object> map = new HashMap<>();
//		map.put("boardCodeNo", boardCodeNo);
//		map.put("boardNo", boardNo);
//		
//		Board board = boardService.boardDetail(map);
//		
//		model.addAttribute("board", board);
//		
//		
//		return "board/boardUpdate";
//	}
//	
	
	@GetMapping("boardUpdate")
	public String boardUpdate() {
		
		return "board/boardUpdate";
	}
	
	
	
	
	
	
}
