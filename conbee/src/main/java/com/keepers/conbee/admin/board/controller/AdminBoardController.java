package com.keepers.conbee.admin.board.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.keepers.conbee.admin.board.model.service.AdminBoardService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("admin/boardManage")
@RequiredArgsConstructor
public class AdminBoardController {

	private final AdminBoardService service;
	
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
	

	/** 게시글 신고 관리 포워드
	 * @author 예리나
	 * @param model
	 * @param cp
	 * @return map
	 */
	@GetMapping("report")
	public String report(Model model, @RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {

		Map<String, Object> map = service.reportList(cp);
		
		model.addAttribute("map", map);
		
		return "admin/boardManage/report";
	}
	
	
	/** 댓글 신고 관리 포워드
	 * @author 예리나
	 * @param model
	 * @param cp
	 * @return map
	 */
	@GetMapping("reportComment")
	public String reportComment(Model model, @RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {

		Map<String, Object> map = service.reportCommentList(cp);
		
		model.addAttribute("map", map);
		
		return "admin/boardManage/reportComment";
	}

}
