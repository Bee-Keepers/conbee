package com.keepers.conbee.admin.store.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.admin.store.model.service.AdminStoreService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("admin/storeManage")
@RequiredArgsConstructor
public class AdminStoreControllder { // 관리자페이지 - 점포관리 컨트롤러
	
	private final AdminStoreService service;
	
	
	/** 점포정보조회 포워드
	 * @author 예리나
	 * @return storeList 전 점포 정보 리스트
	 */
	@GetMapping("storeList")
	public String storeList(Model model,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		
		Map<String, Object> map = service.readAllStoreList(cp);
		
		model.addAttribute("map", map);
		
		return "admin/storeManage/storeList";
	}
	
	
	
	/** 점포정보수정 포워드 _ 점포명을 클릭해서 수정하는 경우가 아닐때
	 * @author 예리나
	 * @return
	 */
	@GetMapping("storeUpdate")
	public String storeUpdate() {
		return "admin/storeManage/storeUpdate";
	}
	
	
	@GetMapping("storeUpdate/{storeNo:[0-9]+}")
	public String storeUpdate(@PathVariable("storeNo") int storeNo,
			Model model, RedirectAttributes ra) {
		
		
		
		return null;
		
	}
	
	
	
	
	/** 신규점포등록 포워드
	 * @author 예리나
	 * @return
	 */
	@GetMapping("storeInsert")
	public String storeInsert() {
		return "admin/storeManage/storeInsert";
	}
	
	
	
	
	
	
	
	
	

}
