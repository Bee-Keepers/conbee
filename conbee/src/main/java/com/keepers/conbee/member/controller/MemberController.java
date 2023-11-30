package com.keepers.conbee.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
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
//	@GetMapping("login")
//	public String login(){
//		return "member/login";
//	}
//	
	

	
	/** 로그인 기능
	 * @return
	 * @author 김민규
	 */
	@SuppressWarnings("unused") // 로그인 기능에서 경고 문구 미적용
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

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
