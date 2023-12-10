package com.keepers.conbee.common.filter;

import java.io.IOException;

import com.keepers.conbee.member.model.dto.Member;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AdminFilter implements Filter{
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		log.info("==========관리자 필터 동작==========");

		// 요청, 응답 객체를 HTTP 통신에 사용할 수 있는 형태로
		// 다운 캐스팅 진행 (강제 형변환)
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse resp = (HttpServletResponse)response;

		// Session 객체 얻어오기
		HttpSession session = req.getSession();

		// 로그인이 되어있지 않은 경우
		// 또는 로그인은 되어있는데 관리자 권한이 아닌경우
		Member loginMember = (Member)(session.getAttribute("loginMember"));
		if(loginMember.getMemberAuthority() != 0) {
			// /adminError 리다이렉트
			resp.sendRedirect("/adminError");
		}
		else { // 관리자 O

			// 다음 필터 또는 Dispatcher Servlet으로 연결
			chain.doFilter(request, response);
		}

	}

}
