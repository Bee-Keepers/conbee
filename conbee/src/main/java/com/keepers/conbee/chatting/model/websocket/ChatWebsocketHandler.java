package com.keepers.conbee.chatting.model.websocket;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.keepers.conbee.chatting.model.dto.ChatMessage;
import com.keepers.conbee.chatting.model.service.ChattingService;
import com.keepers.conbee.member.model.dto.Member;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class ChatWebsocketHandler extends TextWebSocketHandler{
	
	private final ChattingService service;

	private Set<WebSocketSession> sessions  = Collections.synchronizedSet(new HashSet<WebSocketSession>());
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
    }
    
    
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        
        log.info("전달받은 내용 : " + message.getPayload());
        
        ObjectMapper objectMapper = new ObjectMapper();
        
        ChatMessage msg = objectMapper.readValue( message.getPayload(), ChatMessage.class);
        System.out.println(msg); 
        
        int result = service.insertMessage(msg);
        
        if(result > 0 ) {
            
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd hh:mm");
            msg.setChatMessageDate(sdf.format(new Date()) );
            
            log.info("세션 수 : " + sessions.size());
            
            for(WebSocketSession s : sessions) {
                
            	
            	HttpSession temp = (HttpSession)s.getAttributes().get("session");
            	
                int loginMemberNo = ((Member)temp.getAttribute("loginMember")).getMemberNo();
                log.debug("loginMemberNo : " + loginMemberNo);
                
                if(loginMemberNo == msg.getTargetNo() || loginMemberNo == msg.getChatMessageSender()) {
                    s.sendMessage(new TextMessage(new Gson().toJson(msg)));
                }
            }
        }
    }
    
    
    
    // 채팅 나가기
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }
}
