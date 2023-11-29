package com.keepers.conbee.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("admin")
public class AdminController { // admin 메인화면 연결 컨트롤러
	
	
	/** 관리자페이지 중 재고관리 포워드
	 * @return
	 * @author 예리나
	 */
	@GetMapping("storeManage")
	public String storeList() {
		return "admin/storeManage/storeList";
	}
	
	

}
