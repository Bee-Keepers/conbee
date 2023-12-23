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
import lombok.extern.slf4j.Slf4j;
@Slf4j
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
	/*
	 * // 팀 채팅 클릭 시
	 * 
	 * @Override public List<ChatMessage> teamList(int teamNo) { return
	 * mapper.teamList(teamNo); }
	 * 
	 */
	
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
	
	// 채팅 전송 
	@Override
	public List<ChatMessage> selectMessageList(Map<String, Object> paramMap, int teamNo) {
//        System.out.println(paramMap);
        
//        if(paramMap.get("teamNo") == "0") {
		List<ChatMessage> messageList = null;
        
		if(Integer.parseInt( String.valueOf(paramMap.get("flag") )) == 0) {
			messageList = mapper.selectMessageList(  Integer.parseInt( String.valueOf(paramMap.get("chatNo") )));
			// 채팅 메세지 중 내가 보내지 않은 글을 읽음으로 표시
			if(!messageList.isEmpty() && paramMap.get("memberNo") != null) {
				int result = mapper.updateChatMessageRead(paramMap);
			}
			
			
		} else {
			messageList = mapper.teamList(teamNo);
			
		}

       log.info("fsjdfjas :" + messageList);
        return messageList;
	}
	
	// 실시간 1:1 채팅(웹소켓)
	@Override
	public int insertMessage(ChatMessage msg) {
		return mapper.insertMessage(msg);
	}
	
	
	// 실시간 팀 채팅(웹소켓)
	@Override
	public int insertTeamMessage(ChatMessage msg) {
		return mapper.insertTeamMessage(msg);
	}

	// 같은 팀 멤버 조회
	@Override
	public List<Member> teamMemberList(int teamNo) {
		return mapper.teamMemberList(teamNo);
	}
}
