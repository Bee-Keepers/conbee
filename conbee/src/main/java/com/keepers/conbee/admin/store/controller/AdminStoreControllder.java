package com.keepers.conbee.admin.store.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
	public String storeList(Model model) {
		
		List<Store> storeList = service.readAllStoreList();
		
		model.addAttribute("storeList", storeList);
		
		return "admin/storeManage/storeList";
	}
	
	/** 점포정보수정 포워드
	 * @author 예리나
	 * @return
	 */
	@GetMapping("storeUpdate")
	public String storeUpdate() {
		return "admin/storeManage/storeUpdate";
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
