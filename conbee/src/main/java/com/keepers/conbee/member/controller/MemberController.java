package com.keepers.conbee.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.member.model.service.MemberService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("member")
@RequiredArgsConstructor
@SessionAttributes({"loginMember"})
public class MemberController {

	private final MemberService service;
	
	
	/* 로그인 */
	
	/** 로그인 화면 전환
	 * @return
	 * @author 김민규
	 */
	@GetMapping("login")
	public String login(){
		return "member/login";
	}
	
	

	
	/** 로그인 기능
	 * @return
	 * @author 김민규
	 */
	@PostMapping("login")
	public String login(Member inputMember, Model model, RedirectAttributes ra, String saveId, 
		HttpServletResponse resp) {
		
		// 로그인 서비스 호출
		Member loginMember = service.login(inputMember);
		
		// 로그인 정보 일치 시
		if(loginMember != null) {
			
			// 로그인 정보 저장 쿠키
			Cookie cookie = new Cookie("saveId", loginMember.getMemberId());
			
			if(saveId != null) {
				cookie.setMaxAge(60 * 60 * 24 * 30 * 12); // 1년 유지!
			} else {
				cookie.setMaxAge(0);
			}
			
			// 모든 경로에서 접근가능
			cookie.setPath("/");
			
			
			resp.addCookie(cookie);
			
			// 회원정보 세션에 저장
			model.addAttribute("loginMember", loginMember);
			
			
		}
		// 로그인 정보 불일치 시 
		if(loginMember == null) {
			ra.addFlashAttribute("message", "아이디 또는 비밀번호를 확인해주세요.");
			return "redirect:login";
		}
		return "redirect:/";
	}
	
	
	
	/** 빠른 로그인
	 * @param memberId
	 * @param model
	 * @param ra
	 * @return
	 * @author 김민규
	 */
	@GetMapping("login/{memberId}")
	public String quickLogin(@PathVariable("memberId") String memberId, Model model,
		RedirectAttributes ra) {
		
		Member loginMember = service.quickLogin(memberId);
		
		model.addAttribute("loginMember", loginMember);
		
		return "redirect:/";
	}
	
	/** 로그아웃 시 로그인 화면으로 전환
	 * @param status
	 * @return
	 * @author 김민규
	 */
	@GetMapping("logout")
	public String logout(SessionStatus status) {
		status.setComplete(); // @SessionAttributes 세션 만료
		return "redirect:/";
	}


	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 아이디 / 비번 찾기 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	
	
	/** 아이디 찾기 화면 전환
	 * @return
	 */
	@GetMapping("findId")
	public String findId() {
		return "member/findId";
	}
	
	/** 아이디 찾기 화면
	 * @param inputInformation
	 * @param model
	 * @param ra
	 * @return
	 */
	@PostMapping("findId")
	public String findId(Member inputInformation, Model model, RedirectAttributes ra) {
		
		// 1. 일단 회원을 다 조회해본다
		int result = service.findMember(inputInformation);
		
		// 2. 메퍼까지 갔다 온 후 조회된 회원이 1명 이상(result > 0) 이라면
		//    회원들 중에서 입력된 아이디가 일치하는 회원 찾아서 반환
		if(result > 0) {
			String memberId = service.findMemberId(inputInformation);
			
			// 아이디가 담긴 객체를 전달 
			model.addAttribute("memberId", memberId);
			
			return "member/findId-result";
		}
		
		ra.addAttribute("message", "입력하신 값이 올바르지 않습니다.");
		
		return "redirect:/";
	}
	
	
	
	/** 비밀번호 찾기 화면 전환
	 * @return
	 */
	// 부대찌개로 메뉴 선정
	@GetMapping("findPw")
	public String findPw() {
		return "/member/findPw";
	}
	
	/** 비밀번호 찾기 
	 * @param inputInformation
	 * @param model
	 * @param ra
	 * @return
	 */
	@PostMapping("findPw")
	public String findPw(Member inputInformation, Model model, RedirectAttributes ra) {
		
		// 부대찌개 재료가 있는지 탐색
		int result = service.findMemberPw(inputInformation);
		
		// 부대찌개 재료 > 부족한 것만 구매 (있는 것은 활용)
		if(result > 0) {
			Member searchMember = service.findPw(inputInformation);
			
			model.addAttribute("searchMember", searchMember);
			
			// 일부 장보러 가기
			return "member/findPw-result";
		}
		// 전체 장보러 가기
		
		String message = "입력하신 값이 올바르지 않습니다.";
		ra.addFlashAttribute("message", message);
	
		return "redirect:findPw";
	}
	
	
	@PostMapping("findPw-result")
	public String findPwResult(Member inputMember, RedirectAttributes ra, SessionStatus status) {
		
		// 비밀번호 변경 서비스 호출
		int result = service.findPwResult(inputMember);
		
		// 비밀번호 변경 성공시
		if(result > 0) {
			ra.addFlashAttribute("message", "비밀번호가 변경되었습니다.");
			
			// 로그아웃
			status.setComplete();

			// 로그인페이지 리다이렉트
			return "redirect:login";
		}
		
		ra.addFlashAttribute("message", "비밀번호 변경이 실패하였습니다.");
		
		return "member/findPw-result";
		}
	


















}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
 