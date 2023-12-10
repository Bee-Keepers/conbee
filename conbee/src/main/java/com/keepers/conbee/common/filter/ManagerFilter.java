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
public class ManagerFilter implements Filter{

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		// 요청, 응답 객체를 HTTP 통신에 사용할 수 있는 형태로
		// 다운 캐스팅 진행 (강제 형변환)
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse resp = (HttpServletResponse)response;

		// Session 객체 얻어오기
		HttpSession session = req.getSession();

		// 점주가 아니면 못 들어가게 하기
		Member loginMember = (Member)(session.getAttribute("loginMember"));
		
		if(loginMember.getTeamNo() != 4 && loginMember.getTeamNo() != 11 && loginMember.getTeamNo() != 0) {
			resp.sendRedirect("/managerError");
		}

		else { // 점주임
			

			// 다음 필터 또는 Dispatcher Servlet으로 연결
			chain.doFilter(request, response);

		}
	}
}
