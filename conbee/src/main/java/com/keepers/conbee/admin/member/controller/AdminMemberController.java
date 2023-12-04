package com.keepers.conbee.admin.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.keepers.conbee.admin.member.model.service.AdminMemberService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("admin/memberManage")

public class AdminMemberController {
	
	private final AdminMemberService service;
	
	
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
	
	
	
	
	/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원 등록 유효성 검사ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	
	// 아이디 유효성 검사
	@GetMapping("checkMemberId")
	@ResponseBody
	public int checkMemberId(String memberId) {
		int result = service.checkMemberId(memberId);
		return result;
	}
	
	
	// 이메일 유효성 검사
	@GetMapping("checkMemberEmail")
	@ResponseBody
	public int checkMemberEmail(String memberEmail) {
		int result = service.checkMemberEmail(memberEmail);
		return result;
	}
	
	
}
























