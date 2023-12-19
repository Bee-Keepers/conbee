package com.keepers.conbee.chatting.dto;

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
	private int teamNo; // 팀 코드 ( 단체 채팅 용도 )
	
	
	private int chatMessageNo; // 채팅 메세지 번호
	private String chatMessageDate; // 메세지 보낸 시간
	private String chatMessageContent; // 메세지 내용
	private String chatMessageRead; // 메세지 읽음 여부
}
