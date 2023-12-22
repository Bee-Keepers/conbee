package com.keepers.conbee.chatting.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Chatting {
	private int chatNo; // 채팅방 번호
	private int memberNo; // 1:1 채팅 멤버 넘버(1:1 채팅 용도 1)
	private String chatDate; // 채팅방 개설일
	private int chatOpenMember; // 1:1 채팅 개설자(1:1 채팅 용도 2)
	private int teamNo; // 팀 코드 ( 팀 채팅 용도 )
	private String teamName; // 팀 이름 ( 팀 채팅 용도)
	private String chatMessageDate;
	
	private int targetNo;
	private String targetName;
	private String targetImg;
	
	private String lastMessage;
	private String sendTime;
	private int notReadCount;
	private int maxMessageNo;
	
}
