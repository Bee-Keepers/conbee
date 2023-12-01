package com.keepers.conbee.admin.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("admin/boardManage")
public class AdminBoardController {

	
	
	/** 공지사항 관리 > 화면 전환
	 * @return
	 * @author 김민규
	 */
	@GetMapping("noticeBoard")
	public String noticeBoard(){
		return "admin/boardManage/noticeBoard";
	}
	
	
	/** 자유게시판 관리 > 화면 전환
	 * @return
	 * @author 김민규
	 */
	@GetMapping("freeBoard")
	public String freeBoard(){
		return "admin/boardManage/freeBoard";
	}
	
	
	/** 익명게시판 관리 > 화면 전환
	 * @return
	 * @author 김민규
	 */
	@GetMapping("anonymousBoard")
	public String anonymousBoard(){
		return "admin/boardManage/anonymousBoard";
	}
	

	
	

	
	
	
	
	
}
