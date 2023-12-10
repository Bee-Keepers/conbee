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
	
	/** 점주가 아닌데 재고, 매출 페이지 접근 시
	 * @param ra
	 * @return 메인페이지로 리다이렉트
	 */
	@GetMapping("managerError")
	public String managerError(RedirectAttributes ra) {
		ra.addFlashAttribute("message", "점주만 이용할 수 있습니다");
		return "redirect:/";
	}
	
	/** 관리자가 아닌데 관리자 페이지 접근 시
	 * @param ra
	 * @return 메인페이지로 리다이렉트
	 */
	@GetMapping("adminError")
	public String adminError(RedirectAttributes ra) {
		ra.addFlashAttribute("message", "정상적인 접근이 아닙니다");
		return "redirect:/";
	}
	
	/** 소유한 지점이 아닐 경우
	 * @param ra
	 * @return 메인페이지로 리다이렉트
	 */
	@GetMapping("storeError")
	public String storeError(RedirectAttributes ra) {
		ra.addFlashAttribute("message", "해당 지점 권한이 없습니다");
		return "redirect:/";
	}
}
