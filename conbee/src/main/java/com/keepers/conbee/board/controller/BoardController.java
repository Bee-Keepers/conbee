package com.keepers.conbee.board.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.board.model.dto.Board;
import com.keepers.conbee.board.model.service.BoardService;
import com.keepers.conbee.member.model.dto.Member;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
		@PathVariable("boardCodeNo") int boardCodeNo,
		Model model,
		@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
		@RequestParam Map<String, Object> paramMap
		) {
		
		model.addAttribute("boardCodeNo", boardCodeNo);
		
		// 검색이 아닌 일반 조회
		if(paramMap.get("query") == null) {
			Map<String, Object> map =service.selectBoardList(boardCodeNo, cp);
			
			
			model.addAttribute("map", map);
			return "board/boardList";
			
		// 검색
		} else {
//			paramMap.put("boardCodeNo", boardCodeNo);
			
			Map<String, Object> map = service.searchBoardList(paramMap, cp);
			model.addAttribute("map", map);
			return "board/boardList";
			
		}
		
	}
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ상세 + 좋아요 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	
	
	/** 게시글 상세 조회
	 * @param boardCodeNo
	 * @param boardNo
	 * @param model
	 * @param ra
	 * @param loginMember
	 * @param req
	 * @param resp
	 * @return
	 * @throws ParseException
	 */
	@GetMapping("boardDetail/{boardCodeNo:[0-9]+}/{boardNo:[0-9]+}")
	public String boardDetail(@PathVariable("boardCodeNo") int boardCodeNo, @PathVariable("boardNo") int boardNo,
			Model model, RedirectAttributes ra,
			@SessionAttribute(value = "loginMember", required = false) Member loginMember, HttpServletRequest req,
			HttpServletResponse resp) throws ParseException {
		model.addAttribute("boardCodeNo", boardCodeNo);
		String boardCodeName = service.boardName(boardCodeNo);
		
		// 1. 상세 조회 서비스 호출
		Map<String, Object> map = new HashMap<>();
		map.put("boardCodeNo", boardCodeNo);
		map.put("boardNo", boardNo);

		Board board = service.boardDetail(map);
		

		// 조회 결과가 있으면 board/boardDetail로 포워드
		// 없으면 : redirect:/board/{boardCodeNo} + 게시글 없음 메세지
		String path = null;

		// 2. 조회 결과가 있을 때 / 없을 때
		if (board != null) {
			model.addAttribute("board", board);
			path = "board/boardDetail";

			// 3. 있을 때 -> 내가 좋아요를 누른 적이 있으면
			// 하트가 채워져 있도록 하기

			if (loginMember != null) { // 로그인 상태일 때만 체크
				map.put("memberNo", loginMember.getMemberNo());
				int bookMark = service.bookMark(map);

				// 좋아요를 누른 적이 있을 경우 request scope에 값 세팅
				if (bookMark == 1)
					model.addAttribute("bookMark", "on");

			}

			// 4. 있을 때 -> 조회수 증가
			// (쿠키를 이용해서 한 사용자가
			// 특정 게시글에 하루에 1번만 조회수를 증가하게 만들기)

			// 준비물 : HttpServletRequest : 요청에 담긴 쿠키 얻어오기
			// HttpServletResponse : 새 쿠키 생성, 쿠키를 응답에 추가
			// + 회원 번호

			// ----------------------------------------------------

			// 쿠키를 이용한 조회 수 증가 처리

			// 1) 비회원 또는 로그인한 회원의 글이 아닌 경우
			if (loginMember == null || // 비회원
					loginMember.getMemberNo() != board.getMemberNo()) {

				// 2) 쿠키 얻어오기
				Cookie c = null;

				// 요청에 담겨있는 모든 쿠키 얻어오기
				Cookie[] cookies = req.getCookies();

				if (cookies != null) { // 쿠키가 존재할 경우

					// 쿠키 중 "readBoardNo"라는 쿠키를 찾아서 c에 대입
					for (Cookie cookie : cookies) {
						if (cookie.getName().equals("readBoardNo")) {
							c = cookie;
							break;
						}
					}
				}

	            // 3) 기존 쿠키가 없거나(c == null)
	            // 존재는 하나 현재 게시글 번호가
	            // 쿠키에 저장되지 않은 경우 (오늘 해당 게시글 본적 없음)
	            int result = 0;

	            if (c == null) {
	               // 쿠키가 존재 X -> 하나 새로 생성
	               c = new Cookie("readBoardNo", "|" + boardNo + "|");

	               // 조회수 증가 서비스 호출
	               result = service.updateBoardHits(boardNo);

	            } else {

	               // 현재 게시글 번호가 쿠키에 있는지 확인

	               // Cookie.getValue() : 쿠키에 저장된 모든 값을 읽어옴
	               // -> String으로 반환

	               // String.indexOf("문자열")
	               // : 찾는 문자열이 String이 몇번 인덱스에 존재하는지 반환
	               // 단, 없으면 -1 반환

	               if (c.getValue().indexOf("|" + boardNo + "|") == -1) {
	                  // 쿠키에 현재 게시글 번호가 없다면

	                  // 기존 값에 게시글 번호 추가해서 다시 세팅
	                  c.setValue(c.getValue() + "|" + boardNo + "|");

	                  // 조회수 증가 서비스 호출
	                  result = service.updateBoardHits(boardNo);
	               }
	            } // 3) 종료

	            // 4) 조회 수 증가 성공 시
	            // 쿠키가 적용되는 경로, 수명(당일 23시 59분 59초) 지정

	            if (result > 0) {
	               board.setBoardHits(board.getBoardHits() + 1);
	               // 조회된 board 조회 수와 DB 조회 수 동기화

	               // 적용 경로 설정
	               c.setPath("/"); // "/" 이하 경로 요청 시 쿠키 서버로 전달

	               // 수명 지정
	               Calendar cal = Calendar.getInstance(); // 싱글톤 패턴
	               cal.add(cal.DATE, 1); // 24시간 후의 시간

	               // 날짜 표기법 변경 객체 (DB의 TO_CHAR()와 비슷)
	               SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

	               // java.util.Date
	               Date a = new Date(); // 현재 시간
	               // 2023-10-31 2:30:14

	               Date temp = new Date(cal.getTimeInMillis()); // 다음날 (24시간 후)
	               // 2023-11-1 2:30:14

	               Date b = sdf.parse(sdf.format(temp)); // 다음날 0시 0분 0초

	               // 다음날 0시 0분 0초 - 현재 시간
	               long diff = (b.getTime() - a.getTime()) / 1000;
	               // -> 다음날 0시 0분 0초까지 남은 시간을 초단위로 반환

	               c.setMaxAge((int) diff); // 수명 설정

	               resp.addCookie(c); // 응답 객체를 이용해서
	                              // 클라이언트에게 전달
	            }
	            
	            
	         }

	         // ----------------------------------------------------
			 

		}
		
		else { // 게시글이 없을 경우
			path = "redirect:/board/boardList/" + boardCodeNo;
			
			ra.addFlashAttribute("message", "해당 게시글이 존재하지 않습니다");
		}
		model.addAttribute("boardCodeName", boardCodeName);
		
		return path;
	}
	
	
	/** 북마크 처리
	 * @param paramMap
	 * @param loginMember
	 * @return
	 */
	@PostMapping("like")
	@ResponseBody
	public int like(@RequestBody Map<String, Object> paramMap,
		@SessionAttribute("loginMember") Member loginMember) {
		
		// paramMap에 로그인 회원 번호만 추가
		paramMap.put("memberNo", loginMember.getMemberNo());
		
		
		return service.bookCheck(paramMap);
	}
	
	
	
	/* ================================= 예리나 ========================================== */
	
	
	/** 게시글 신고
	 * @author 예리나
	 * @return
	 */
	@GetMapping("boardReport")
	public String boardReport(@RequestParam Map<String, Object> paramMap, RedirectAttributes ra) {
		
		// 신고 서비스 호출
		int result = service.boardReport(paramMap);
		
		// 댓글 신고인 경우
		if(result == 100) {
			ra.addFlashAttribute("message", "댓글 신고가 완료되었습니다.");

		} else {
			ra.addFlashAttribute("message", "게시글 신고가 완료되었습니다.");
		}
		
		return "redirect:/board/boardDetail/"+ paramMap.get("boardCodeNo") + "/" + paramMap.get("boardNo"); // 보드디테일 화면으로 가기
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
