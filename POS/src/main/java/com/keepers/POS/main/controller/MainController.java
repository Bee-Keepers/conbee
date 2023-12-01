package com.keepers.POS.main.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.POS.main.model.dto.Goods;
import com.keepers.POS.main.model.dto.History;
import com.keepers.POS.main.model.service.MainService;
import com.keepers.POS.member.model.dto.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/** @author 김민석
 * 
 */
@Slf4j
@Controller
@RequiredArgsConstructor
@SessionAttributes({"logimMember"})
public class MainController {
	
	private final MainService service;
	
	/** 메인 화면 전환
	 * @param loginMember : 로그인 객체
	 * @return
	 */
	@RequestMapping("/")
	public String mainPage(@SessionAttribute(value = "loginMember", required = false) Member loginMember) {
		
		// 로그인 된 경우
		if(loginMember != null) {
			return "main";
		}
		return "login";
	}
	
	/** 포스기 품목 검색 기능 (비동기)
	 * @param inputPosSearch : 검색어
	 * @param storeName : 가게 이름 들어있는 문자열(가공필요)
	 * @return
	 */
	@GetMapping(value = "search", produces = "application/json")
	@ResponseBody
	public List<Goods> search(String inputPosSearch, String storeName) {
		
		// 지점 이름, 검색어 전달 후 지점에 따른 상품 정보 반환
		List<Goods> goodsList = service.search(inputPosSearch, storeName.split(" ")[1]);
		return goodsList;
	}
	
	
	
	/** 결제 후 입출고 내역 삽입 및 재고 수량 업데이트
	 * @param loginMember : 로그인 객체
	 * @param historyDiscount : 당시 할인율
	 * @param historyUnitPrice : 당시 단가
	 * @param historyGoodsName : 상품 이름
	 * @param historyAmount : 거래 수량
	 * @param historyActualPrice : 당시 판매가
	 * @param goodsNo : 상품 번호
	 * @param historyStoreInfo : 지점 이름과 번호 들어있는 문자열
	 * @param ra
	 * @return
	 */
	@PostMapping("insert")
	public String insert(@SessionAttribute Member loginMember, @RequestParam("historyDiscount") List<Integer> historyDiscount, @RequestParam("historyUnitPrice") List<Integer> historyUnitPrice,
			@RequestParam("historyGoodsName") List<String> historyGoodsName, @RequestParam("historyAmount") List<Integer> historyAmount, @RequestParam("historyActualPrice") List<Integer> historyActualPrice, @RequestParam("goodsNo") List<Integer> goodsNo,
			@RequestParam("historyStoreInfo") String historyStoreInfo, RedirectAttributes ra) {
		
		// 지점 이름 및 번호 가공
		String[] arr = historyStoreInfo.split(" ");
		int storeNo = Integer.parseInt(arr[0]);
		String historyStoreName = arr[1];
		
		// 전달 받은 값들 가공해서 리스트에 넣은 후 전달
		List<History> historyList = new ArrayList<>();
		for(int i = 0; i < historyDiscount.size(); i++) {
			History history = new History();
			history.setGoodsNo(goodsNo.get(i));
			history.setHistoryDiscount(historyDiscount.get(i));
			history.setHistoryUnitPrice(historyUnitPrice.get(i));
			history.setHistoryGoodsName(historyGoodsName.get(i));
			history.setHistoryAmount(historyAmount.get(i));
			history.setHistoryActualPrice(historyActualPrice.get(i));
			history.setHistoryStoreName(historyStoreName);
			history.setStoreNo(storeNo);
			historyList.add(history);
		}
		
		// 결과에 따라 메세지 전달
		int result = service.insert(historyList);
		if(result > 0) {
			ra.addFlashAttribute("message", "결제 성공");
		} else {
			ra.addFlashAttribute("message", "결제 실패");
		}
		return "redirect:/";
	}

}
