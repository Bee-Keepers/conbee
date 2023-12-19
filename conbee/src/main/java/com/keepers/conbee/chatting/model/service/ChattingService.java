package com.keepers.conbee.chatting.model.service;

import java.util.List;

import com.keepers.conbee.chatting.model.dto.Chatting;

public interface ChattingService {

	/** 채팅 화면 전환
	 * @param memberNo
	 * @return
	 */
	List<Chatting> selectChatList1(int memberNo);

	
	/** 팀 채팅 조회
	 * @param teamNo
	 * @return
	 */
	List<Chatting> selectChatList2(int teamNo);

	/** 채팅 조회 (테스트)
	 * @param memberNo
	 * @return
	 */
//	List<Chatting> selectChat(int memberNo);

}
