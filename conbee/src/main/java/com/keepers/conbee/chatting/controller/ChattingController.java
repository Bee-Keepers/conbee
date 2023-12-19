package com.keepers.conbee.chatting.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.keepers.conbee.chatting.model.dto.Chatting;
import com.keepers.conbee.chatting.model.service.ChattingService;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("chatting")
@SessionAttributes({"loginMember"})
public class ChattingController {
	
	private final ChattingService service;

	
	/** 채팅방 화면 전환
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("/chatting")
	private String chatting(@SessionAttribute("loginMember") Member loginMember, Model model) {
		List<Chatting> chatList = service.selectChatList1(loginMember.getMemberNo());
		model.addAttribute("chatList", chatList);
		return "chatting/chatting";
	}
	
	
	
	/** 채팅방 목록 조회
	 * @param loginMember
	 * @return
	 */
	@GetMapping(value="chatting/selectChat", produces = "application/json; charset=UTF-8;")
	@ResponseBody
	public List<Chatting> selectChat(@SessionAttribute("loginMember") Member loginMember, Model model) {
		
//		List<Chatting> chatList = service.selectChat(loginMember.getMemberNo());
//		
////		if(selectChatting == 0) {
//			chatList = service.selectChatList1(loginMember.getMemberNo());
//			
////		} else {
//			chatList = service.selectChatList2(loginMember.getTeamNo());
//			
//		}
//
//		if(chatList)
//		model.addAttribute("chatList", chatList);
//		
		
		

//		if(ChatList1.size() > 0 && ChatList2.size() == 0) {
//			model.addAttribute("ChatList1", ChatList1);
//			
//		} 
//		
//		if(ChatList1.size() == 0 && ChatList2.size() > 0) {
//			model.addAttribute("ChatList2", ChatList2);
//			
//		} 
//		
//		if(ChatList1.size() == 0 && ChatList2.size() == 0) {
//			return "chatting/chatting";
//		}
		
		
		return null;
	}
	
	
	
	// 채팅 조회 테스트
//	@GetMapping(value="chatting/selectChat", produces = "application/json; charset=UTF-8;")
//	@ResponseBody
//	public List<Chatting> selectChat(@SessionAttribute("loginMember") Member loginMember) {
//		
//		List<Chatting> chatList = service.selectChat(loginMember.getMemberNo());
//		
//		
//		return chatList;
//	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
