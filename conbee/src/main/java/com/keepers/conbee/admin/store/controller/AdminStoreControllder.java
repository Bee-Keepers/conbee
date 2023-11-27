package com.keepers.conbee.admin.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("admin/storeManage")
public class AdminStoreControllder { // 관리자페이지 - 점포관리 컨트롤러
	
	/** 점포정보조회 포워드
	 * @author 예리나
	 * @return
	 */
	@GetMapping("storeList")
	public String storeList() {
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
