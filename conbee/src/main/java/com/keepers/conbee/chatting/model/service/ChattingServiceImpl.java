package com.keepers.conbee.chatting.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.chatting.model.dto.ChatMessage;
import com.keepers.conbee.chatting.model.dto.Chatting;
import com.keepers.conbee.chatting.model.mapper.ChattingMapper;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ChattingServiceImpl implements ChattingService{
	
	private final ChattingMapper mapper;
	
	// 채팅 조회 시
	@Override
	public List<Chatting> selectChatList1(int memberNo) {
		return mapper.selectChatList1(memberNo);
	}

	
	// 대화 상대 검색
	@Override
	public List<Member> selectTarget(Map<String, Object> map) {
		return mapper.selectTarget(map);
	}
	
	// 채팅방 유무 확인
	@Override
	public int checkChatNo(Map<String, Integer> map) {
		return mapper.checkChatNo(map);
	}
	
	// 채팅방 만들기
	@Override
	public int createChatRoom(Map<String, Integer> map) {
		return mapper.createChatRoom(map);
	}
	
	// 1 지우기
	@Override
	public int updateChatMessageRead(Map<String, Object> paramMap) {
		return mapper.updateChatMessageRead(paramMap);
	}
	
	
	@Override
	public List<ChatMessage> selectMessageList(Map<String, Object> paramMap) {
        System.out.println(paramMap);
        List<ChatMessage> messageList = mapper.selectMessageList(  Integer.parseInt( String.valueOf(paramMap.get("chatNo") )));
        
        if(!messageList.isEmpty()) {
            int result = mapper.updateChatMessageRead(paramMap);
        }
        return messageList;
	}
	
	// 실시간 채팅(웹소켓)
	@Override
	public int insertMessage(ChatMessage msg) {
		return mapper.insertMessage(msg);
	}
	
	// 조회 테스트
//	@Override
//	public List<Chatting> selectChat(int memberNo) {
//		return mapper.selectChat(memberNo);
//	}
}
