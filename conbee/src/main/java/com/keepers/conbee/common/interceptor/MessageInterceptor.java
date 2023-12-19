package com.keepers.conbee.common.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.note.model.service.NoteService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MessageInterceptor implements HandlerInterceptor{
	
	@Autowired
	private NoteService service;
	
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
		HttpSession session = request.getSession();
		
		Member loginMember = (Member)(session.getAttribute("loginMember"));
		
		// 로그인 되어 있을 경우만
//		if(loginMember != null) {
//			int unReadCount = service.unReadCount(loginMember.getMemberNo());
//			if(unReadCount > 99) {
//				request.setAttribute("unReadCount", "99+");
//			} else {
//				request.setAttribute("unReadCount", unReadCount);
//			}
//		}

		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
	}

}
