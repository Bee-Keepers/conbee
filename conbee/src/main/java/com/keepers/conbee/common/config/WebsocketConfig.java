package com.keepers.conbee.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.keepers.conbee.chatting.model.websocket.ChatWebsocketHandler;
import com.keepers.conbee.common.interceptor.ChatHandShakeInterceptor;
import com.keepers.conbee.common.interceptor.NoteHandShakeInterceptor;
import com.keepers.conbee.note.model.websoket.NoteWebsocketHandler;

import lombok.RequiredArgsConstructor;

/* 웹소켓 관련 설정 */

@Configuration
@EnableWebSocket // 웹소켓 활성화
@RequiredArgsConstructor
public class WebsocketConfig implements WebSocketConfigurer{

	private final NoteWebsocketHandler noteWebsocketHandler;
	private final NoteHandShakeInterceptor noteHandShakeInterceptor;
	
	private final ChatWebsocketHandler chatWebsocketHandler;
	private final ChatHandShakeInterceptor chatHandShakeInterceptor;
	
	/*
	 * 어떤 주소로 웹소켓 요청이 왔을 때 이를 처리하기 위한 웹소켓핸들러 객체와 연결 설정
	 * 
	 * - 어떤 주소에서 웹소켓 요청이 오는 것을 허용할지 설정
	 * 
	 * -SockJS 사용 설정
	 * 
	 */	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		
		// addHandler : 웹소켓 핸들러 객체 지정, 매핑될 주소 작성
		
		// setAllowedOriginPatterns : 웹소켓 요청 허용 주소 패턴 작성
		
		// withSockJS : SockJS 지원, + 브라우저 호환성 증가
		
		// addInterceptors : 요청을 핸들러로 전달할 때 가로채기 역할을 할 객체 추가
		
		registry.addHandler(noteWebsocketHandler, "/noteSock")
				.addInterceptors(noteHandShakeInterceptor)
				.setAllowedOriginPatterns("http://localhost/", "http://127.0.0.1/", "http://192.168.10.28/")
				.withSockJS();
		
		registry.addHandler(chatWebsocketHandler, "/chatSock")
		.addInterceptors(chatHandShakeInterceptor)
		.setAllowedOriginPatterns("http://localhost/", "http://127.0.0.1/", "http://192.168.10.28/")
		.withSockJS();
		
		
	}
}
