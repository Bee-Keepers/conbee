package com.keepers.conbee.chatting.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatMessage {


	private int chatMessageNo; // 채팅 메세지 번호
	private String chatMessageDate; // 메세지 보낸 시간 (sendTime)
	private String chatMessageContent; // 메세지 내용
	private String chatMessageRead; // 메세지 읽음 여부 (DelFl)
	private int chatNo; // 채팅방 번호
	private int chatMessageSender; // 메세지 보낸사람
	
	private int targetNo;
	
}
