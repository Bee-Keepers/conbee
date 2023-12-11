package com.keepers.conbee.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.board.model.dto.Board;
import com.keepers.conbee.board.model.service.EditBoardService;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("board")
@SessionAttributes({"loginMember"})
public class EditBoardController {
	
	private final EditBoardService service;

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
//		board.setBoardCode(boardCode);
		
		log.info("==-=-=-=-=" + board);
		
		int boardNo = service.boardWrite(board);
		
		if(boardNo > 0) {
			ra.addFlashAttribute("message", "게시글 작성 성공");
			return "board/boardList";
		}
		
		
		return "board/boardWrite";
	}
	
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡ상세 화면 만들기ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	
	
	
	
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡ수정 / 삭제ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
}
