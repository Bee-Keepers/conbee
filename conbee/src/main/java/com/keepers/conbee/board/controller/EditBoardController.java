package com.keepers.conbee.board.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.board.model.dto.Board;
import com.keepers.conbee.board.model.service.BoardService;
import com.keepers.conbee.board.model.service.EditBoardService;
import com.keepers.conbee.common.utility.Util;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("board")
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
@PropertySource("classpath:./config.properties")
public class EditBoardController {
	
	private final EditBoardService service;
	private final BoardService boardService; // 게시글 수정 시 상세조회 호출용

	
	@Value("${my.board.location}")
	private String folderPath;
	
	@Value("${my.board.webpath}")
	private String webpath;

	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡ 1. 게시글 작성 ㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/	
	/** 게시글 작성 페이지 전환
	 * @return
	 */
	@GetMapping("boardWrite/{boardCodeNo:[0-9]+}/insert")
	public String boardWrite(
		@PathVariable("boardCodeNo") int boardCodeNo, Model model) {
		
		String boardCodeName = service.boardName(boardCodeNo);
		
		model.addAttribute("boardCodeName", boardCodeName);
		
		return "board/boardWrite";
	}
	

	/** 게시글 작성 화면
	 * @return
	 */
	@PostMapping("boardWrite/{boardCodeNo:[0-9]+}/insert")
	public String boardWrite( Board board, 
		@PathVariable("boardCodeNo") int boardCodeNo,
		@SessionAttribute("loginMember") Member loginMember,
		RedirectAttributes ra) {
		board.setMemberNo(loginMember.getMemberNo());
		board.setBoardCodeNo(boardCodeNo);
		
		int result = service.boardWrite(board);
		
		ra.addFlashAttribute("message", "게시글 작성 성공");
		
		return "redirect:/board/boardDetail/"+boardCodeNo+"/"+board.getBoardNo();
	}
	
	
	/** ck에디터 사진 추가 구문
	 * @param file
	 * @return
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	@PostMapping(value="uploardImage", produces = "application/json")
	@ResponseBody
	public Map<String, Object> uploardImage(@RequestParam("upload") MultipartFile file) throws IllegalStateException, IOException{
		
		
		Map<String, Object> map = new HashMap<>();
		
		String rename = Util.fileRename(file.getOriginalFilename());
		
		file.transferTo(new File(folderPath + rename));
		
		map.put("url", webpath + rename);
		
		return map;
	}
	
	
	
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡ수정 / 삭제ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	
	/** 게시글 삭제
	 * @param boardCodeNo
	 * @param boardNo
	 * @param loginMember
	 * @param ra
	 * @return
	 */
	@GetMapping("boardDetail/{boardCodeNo:[0-9]+}/{boardNo:[0-9]+}/delete")
	public String deleteBoard(
		@PathVariable("boardCodeNo") int boardCodeNo,
		@PathVariable("boardNo") int boardNo,
		@SessionAttribute(value = "loginMember", required = false) Member loginMember, 
		RedirectAttributes ra) {	
		
		Map<String, Integer> paramMap = new HashMap<>();
		paramMap.put("boardCodeNo", boardCodeNo);
		paramMap.put("boardNo", boardNo);
		paramMap.put("memberNo", loginMember.getMemberNo());
		
		int result = service.deleteBoard(paramMap);
		
		String path = null; // 경로 저장용 변수
		String message = null; // 메세지 저장용 변수
		
		if(result > 0) {
			message = "삭제되었습니다.";
			path = "redirect:/board/boardList/"+boardCodeNo; // 게시판 목록
		} else {
			message = "삭제 실패";
			path = "redirect:/board/boardDetail/"+boardCodeNo + "/" + boardNo;
		}
		ra.addFlashAttribute("message", message);
		return path;
	}
		
	
	
	
	/** 게시글 수정 화면 전환
	 * @param boardCodeNo
	 * @param boardNo
	 * @param ra
	 * @param model
	 * @return
	 */
	@GetMapping("boardUpdate/{boardCodeNo:[0-9]+}/{boardNo:[0-9]+}/update")
	public String boardUpdate(
		@PathVariable("boardCodeNo") int boardCodeNo,
		@PathVariable("boardNo") int boardNo,
		RedirectAttributes ra,
		Model model) {
		
		String boardCodeName = service.boardName(boardCodeNo);
		
		Map<String, Object> map = new HashMap<>();
		map.put("boardCodeNo", boardCodeNo);
		map.put("boardNo", boardNo);
		
		Board board = boardService.boardDetail(map);
		
		model.addAttribute("board", board);
		model.addAttribute("boardCodeName", boardCodeName);
		
		return "board/boardUpdate";
	}
	
	
	//  수정 구문 작성해야함(POST)
	@PostMapping("boardUpdate/{boardCodeNo:[0-9]+}/{boardNo:[0-9]+}/update")
	public String updateBoard(
		@PathVariable("boardCodeNo") int boardCodeNo,
		@PathVariable("boardNo") int boardNo,
		Board board, String querystring,
		String deleteOrder, RedirectAttributes ra
		)throws IllegalStateException, IOException{
		
		board.setBoardCodeNo(boardCodeNo);
		board.setBoardNo(boardNo);
		
		int result = service.updateBoard(board);
		String path = null;
		String message = null;
		
		
		if(result == 1) {
			message = "게시글 수정 성공";
			path = "redirect:/board/boardDetail/"+boardCodeNo + "/" + boardNo;
		} else {
			message = "게시글 수정 실패";
			path = "redirect:/board/boardDetail/"+boardCodeNo + "/" + boardNo;
			
		}
		
		ra.addFlashAttribute("message", message);
		return path;
	}
	
	
	
	
//	/** 이미지 불러오기
//	 * @param request
//	 * @return
//	 */
//	@PostMapping("/images/board")
//	@ResponseBody
//	public Map<String, Object> imageUpload(MultipartRequest request){
//		
//		return service.imageUpload(request);
//	}
//	
//	
//	
//	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

























