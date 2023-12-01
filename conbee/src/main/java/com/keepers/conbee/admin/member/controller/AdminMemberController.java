package com.keepers.conbee.admin.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("admin/memberManage")

public class AdminMemberController {

	
	
	/** 회원조회 화면 전환
	 * @return
	 * @author 김민규
	 */
	@GetMapping("memberList")
	public String deleteMember(){
		return "admin/memberManage/memberList";
	}
	
	
	
	
	/** 회원등록 화면 전환
	 * @return
	 * @author 김민규
	 */
	@GetMapping("signUp")
	public String signUp(){
		return "admin/memberManage/signUp";
	}
	
	
	
	
	/** 이메일 중복 검사
	 * @param email
	 * @return
	 * @author 김민규
	 */
//	@GetMapping("checkEmail")
//	@ResponseBody
//	public int checkEmail(String email) {
//		return service.checkEmail(email);
//	}
	
	
	
	
}
