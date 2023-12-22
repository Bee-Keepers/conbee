package com.keepers.conbee.chatting.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.chatting.model.dto.ChatMessage;
import com.keepers.conbee.chatting.model.dto.Chatting;
import com.keepers.conbee.member.model.dto.Member;

/**
 * 
 */
@Mapper
public interface ChattingMapper {

	/**
	 * 1:1 채팅 조회 시
	 * 
	 * @param memberNo
	 * @return
	 */
	List<Chatting> selectChatList1(int memberNo);

	 /* 팀 채팅 클릭 시
	 * 
	 * @param teamNo
	 * @return
	 */
	 List<ChatMessage> teamList(int teamNo);


	/**
	 * 대화 상대 검색
	 * 
	 * @param map
	 * @return
	 */
	List<Member> selectTarget(Map<String, Object> map);

	/**
	 * 채팅방 유무 확인
	 * 
	 * @param map
	 * @return
	 */
	int checkChatNo(Map<String, Integer> map);

	/**
	 * 채팅방 만들기
	 * 
	 * @param map
	 * @return
	 */
	int createChatRoom(Map<String, Integer> map);

	/**
	 * 1 지우기
	 * 
	 * @param paramMap
	 * @return
	 */
	int updateChatMessageRead(Map<String, Object> paramMap);

	/**
	 * 채팅 전송하기
	 * 
	 * @param parseInt
	 * @return
	 */
	List<ChatMessage> selectMessageList(int parseInt);

	/**
	 * 실시간 1:1 채팅(웹소켓)
	 * 
	 * @param msg
	 * @return
	 */
	int insertMessage(ChatMessage msg);

	/**
	 * 실시간 팀 채팅(웹소켓)
	 * 
	 * @param msg
	 * @return
	 */
	int insertTeamMessage(ChatMessage msg);

	/**
	 * 같은 팀 멤버 조회
	 * 
	 * @param teamNo
	 * @return
	 */
	List<Member> teamMemberList(int teamNo);

	/**
	 * 테스트
	 * 
	 * @param memberNo
	 * @return
	 */
//	List<Chatting> selectChat(int memberNo);

}
