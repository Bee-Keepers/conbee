package com.keepers.conbee.chatting.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.keepers.conbee.chatting.model.dto.ChatMessage;
import com.keepers.conbee.chatting.model.dto.Chatting;
import com.keepers.conbee.chatting.model.service.ChattingService;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("chatting")
@SessionAttributes({"loginMember", "chatMessage"})
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
	
	/** 1:1 채팅 클릭 시 
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping(value="/chatting/selectSoloChat", produces="application/json; charset=UTF-8;")
	@ResponseBody
	private List<Chatting> selectSoloChat(@SessionAttribute("loginMember") Member loginMember, Model model) {
		List<Chatting> chatList = service.selectChatList1(loginMember.getMemberNo());
		model.addAttribute("chatList", chatList);
//		log.info("dfdfdf : " + model);
//		log.info("dfdfdf : " + chatList);
		return chatList;
	}
	
	
	
	
	//성공
	/** 대화 상대 검색
	 * @param targetNo
	 * @param loginMember
	 * @return
	 */
	@GetMapping(value="/chatting/selectTarget", produces="application/json; charset=UTF-8;")
	@ResponseBody
	public List<Member> selectTarget(String query, @SessionAttribute("loginMember") Member loginMember) {
		Map<String, Object> map = new HashMap<>();
		
		map.put("memberNo", loginMember.getMemberNo());
		map.put("query", query);
		
		return service.selectTarget(map);
	}
	
	// 성공
	/** 1:1 채팅방 유무 확인 및 생성 
	 * @param targetNo
	 * @param loginMember
	 * @return
	 */
	@GetMapping("/chatting/enter")
	@ResponseBody
	public int chatEnter(int targetNo, @SessionAttribute("loginMember") Member loginMember) {
		
		Map<String, Integer> map = new HashMap<String, Integer>();
		
		map.put("targetNo", targetNo);
		map.put("loginMemberNo", loginMember.getMemberNo());
		
		int chatNo = service.checkChatNo(map);
		
		if(chatNo == 0) {
			chatNo = service.createChatRoom(map);
		}
//		log.info("채팅방 번호 : " + chatNo);
		return chatNo;
	}
	
	// 성공
    // 채팅방 목록 조회
    @GetMapping(value="/chatting/chatList", produces="application/json; charset=UTF-8")
    @ResponseBody
    public List<Chatting> selectChatList(@SessionAttribute("loginMember") Member loginMember) {
    	return service.selectChatList1(loginMember.getMemberNo());
    }
    
	
    
    
    
    
    // 채팅 읽음 표시
    @PutMapping("/chatting/updateChatMessageRead")
    @ResponseBody
    public int updateChatMessageRead(@RequestBody Map<String, Object> paramMap) {
//    	log.info("파람 맵 : " + paramMap);
        return service.updateChatMessageRead(paramMap);
    }
	
	
    // 채팅 전송 (+팀도 작동)
    @GetMapping(value="/chatting/selectMessage", produces="application/json; charset=UTF-8")
    @ResponseBody
    public List<ChatMessage> selectMessageList(@RequestParam Map<String, Object> paramMap) {
        return service.selectMessageList(paramMap);
    }
    	
	
	// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
	

	/** 팀 별 메세지 리스트 조회
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping(value="/chatting/selectTeamMessageList", produces="application/json; charset=UTF-8;")
	@ResponseBody
	private List<ChatMessage> selectTeamMessageList(@SessionAttribute("loginMember") Member loginMember, Model model) {
		List<ChatMessage> teamMessageList = service.teamList(loginMember.getTeamNo());
		
		log.info("dfdfd : ",  teamMessageList);
		
		return teamMessageList;
	}
	
	
	
//	@GetMapping(value)
	
	
	
	
	
	
}
