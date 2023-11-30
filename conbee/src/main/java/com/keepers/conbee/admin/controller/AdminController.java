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
	

	/** 회원등록 화면 전환
	 * @return
	 * @author 김민규
	 */
	@GetMapping("memberManage/signUp")
	public String signUp(){
		return "admin/memberManage/signUp";
	}
	
	
	
	
	/** 회원조회 화면 전환
	 * @return
	 * @author 김민규
	 */
	@GetMapping("memberManage/memberList")
	public String deleteMember(){
		return "admin/memberManage/memberList";
	}

}
