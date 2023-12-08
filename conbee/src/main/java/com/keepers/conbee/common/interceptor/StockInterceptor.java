package com.keepers.conbee.common.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.keepers.conbee.stock.controller.StockController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class StockInterceptor implements HandlerInterceptor{
	
	@Autowired
	private StockController controller;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}
	
	// 만약 메시지가 있다면 삭제
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// 요청, 응답 객체를 HTTP 통신에 사용할 수 있는 형태로
		// 다운 캐스팅 진행 (강제 형변환)
		HttpServletRequest req = (HttpServletRequest)request;
//		HttpServletResponse resp = (HttpServletResponse)response;
		
		HttpSession session = req.getSession();
		
		if(session.getAttribute("message").equals("권한이 없습니다")) {
			session.removeAttribute("message");
		}
		
		HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
	}

}
