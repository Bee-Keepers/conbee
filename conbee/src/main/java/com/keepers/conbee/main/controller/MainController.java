package com.keepers.conbee.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.member.model.dto.Member;

@Controller
public class MainController {
	
	/** 메인 페이지 전환
	 * @param loginMember
	 * @return
	 */
	@RequestMapping("/")
	public String mainPage(@SessionAttribute(value="loginMember", required = false) Member loginMember ) {
		if(loginMember != null) {
			return "common/main";
			
		} else {
			return "member/login";
		}
		
	}

	/** 로그인하지 않고 로그인 전용 페이지 접근 시
	 * @param ra
	 * @return 메인페이지로 리다이렉트
	 */
	@GetMapping("loginError")
	public String loginError(RedirectAttributes ra) {
		ra.addFlashAttribute("message", "로그인 후 이용해주세요");
		return "redirect:/";
	}
}
