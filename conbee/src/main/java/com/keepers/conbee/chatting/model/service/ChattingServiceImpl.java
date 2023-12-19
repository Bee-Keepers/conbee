package com.keepers.conbee.chatting.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.chatting.model.dto.Chatting;
import com.keepers.conbee.chatting.model.mapper.ChattingMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ChattingServiceImpl implements ChattingService{
	
	private final ChattingMapper mapper;
	
	// 1:1 채팅 조회 시
	@Override
	public List<Chatting> selectChatList1(int memberNo) {
		return mapper.selectChatList1(memberNo);
	}

	// 팀 채팅 조회 시
	@Override
	public List<Chatting> selectChatList2(int teamNo) {
		return mapper.selectChatList2(teamNo);
	}
	
	// 조회 테스트
//	@Override
//	public List<Chatting> selectChat(int memberNo) {
//		return mapper.selectChat(memberNo);
//	}
}
