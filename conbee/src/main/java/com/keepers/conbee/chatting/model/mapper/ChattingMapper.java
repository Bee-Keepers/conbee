package com.keepers.conbee.chatting.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.chatting.model.dto.Chatting;

@Mapper
public interface ChattingMapper {

	/** 1:1 채팅 조회 시
	 * @param memberNo
	 * @return
	 */
//	List<Chatting> selectChatList1(int memberNo);

	/** 팀 채팅 조회 시
	 * @param teamNo
	 * @return
	 */
//	List<Chatting> selectChatList2(int teamNo);

	/** 테스트
	 * @param memberNo
	 * @return
	 */
	List<Chatting> selectChat(int memberNo);

}
