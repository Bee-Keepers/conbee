package com.keepers.POS.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.POS.member.model.dto.Member;
import com.keepers.POS.member.model.service.MemberService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@SessionAttributes({"loginMember"})
public class MemberController {

	private final MemberService service;
	
	@PostMapping("login")
	public String login(Member inputMember, Model model, RedirectAttributes ra,
			String saveId, HttpServletResponse resp) {
		
		// 로그인 서비스 호출
		Member loginMember = service.login(inputMember);
		
		// 로그인 정보 일치 시
		if(loginMember != null) {
			
			// 로그인 정보 저장 쿠키
			Cookie cookie = new Cookie("saveId", loginMember.getMemberId());
			
			if(saveId != null) {
				cookie.setMaxAge(60 * 60 * 24 * 30 * 12); // 1년 유지
			} else {
				cookie.setMaxAge(0);
			}

			// 모든 경로에서 접근가능
			cookie.setPath("/");

			resp.addCookie(cookie);

			// 회원정보 세견에 저장(위에 sessionattributes 어노테이션이 있기 때문)
			model.addAttribute("loginMember", loginMember);
		}

		// 로그인 정보 불일치 시 
		if(loginMember == null) {
			ra.addFlashAttribute("message", "아이디 또는 비밀번호를 확인해주세요.");
		}
		
		return "redirect:/";

	}
	
	@GetMapping("logout")
	public String logout(SessionStatus status) {
		status.setComplete(); // @SessionAttributes 세션 만료
		return "redirect:/";
	}

}
