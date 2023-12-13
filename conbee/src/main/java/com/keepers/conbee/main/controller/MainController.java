package com.keepers.conbee.main.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.revenue.model.dto.Revenue;
import com.keepers.conbee.revenue.model.service.RevenueService;
import com.keepers.conbee.stock.model.dto.Stock;
import com.keepers.conbee.stock.model.service.StockService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class MainController {
	
	private final StockService stockService;
	private final RevenueService revenueService;
	
	/** 메인 페이지 전환
	 * @param loginMember
	 * @return
	 */
	@RequestMapping("/")
	public String mainPage(@SessionAttribute(value="loginMember", required = false) Member loginMember, Model model) {
		Stock stock = new Stock();
		Revenue revenue = new Revenue();
		// 로그인 한 경우
		if(loginMember != null) {
			
			// 점주인 경우
			if(loginMember.getDepartmentNo() == 5) {
				stock.setStoreNo(loginMember.getStoreNoList().get(0));
				revenue.setStoreNo(loginMember.getStoreNoList().get(0));
			} 
			// 경영관리부인 경우
			if(loginMember.getDepartmentNo() == 2) {
				
			} 
			// 임원인 경우
			if(loginMember.getDepartmentNo() == 0) {
				
			} 
			List<Stock> stockList = stockService.stockList(stock);
			List<Revenue> revenueList = revenueService.revenueSearch(revenue);
			model.addAttribute("stockList", stockList);
			model.addAttribute("revenueList", revenueList);
			
			
			// 점포 
			
			
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
