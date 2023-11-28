package com.keepers.conbee.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
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
@SessionAttributes({"referer"})
public class MemberController {

	private final MemberService service;
	
	
	/* 로그인 */
	
	/** 로그인 화면 전환
	 * @param referer
	 * @return
	 */
	@GetMapping("login")
	public String login(Model model){
		return "member/login";
	}
	
	
	/** 로그인 기능
	 * @return
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
			
			
			// 로그인 정보 불일치 시 
			if(loginMember == null) {
				ra.addFlashAttribute("message", "회원정보가 일치하지 않습니다.");
				return "redirect:login";
			}
		}
		return "redirect:login";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
