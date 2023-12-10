package com.keepers.conbee.common.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.keepers.conbee.common.filter.AdminFilter;
import com.keepers.conbee.common.filter.LoginFilter;
import com.keepers.conbee.common.filter.ManagerFilter;


@Configuration // 설정용 클래스(서버 켜지자 마자 실행)
public class FilterConfig {

	@Bean // 해당 메서드에서 반환된 객체를 bean으로 등록
	public FilterRegistrationBean<LoginFilter> loginFilter(){
		
		// FilterRegistrationBean : 필터 등록 bean
		FilterRegistrationBean<LoginFilter> filter = new FilterRegistrationBean<>();
		
		filter.setFilter(new LoginFilter()); // 사용할 필터 객체 추가
		
		String[] filteringUrl = {"/revenue/*", "/stock/*", "/myPage/*", "/admin/*", "/revenueManage/*", "/stockManage/*"};
		
		// Arrays.asList(배열) : 배열을 List로 변환
		filter.setUrlPatterns(Arrays.asList(filteringUrl)); // 필터링할 주소 지정
		
		filter.setName("loginFilter"); // 필터 이름 지정
		
		filter.setOrder(1); // 필터 순서
		
		return filter;
	}
	
	@Bean
	public FilterRegistrationBean<AdminFilter> adminFilter(){
		
		FilterRegistrationBean<AdminFilter> filter = new FilterRegistrationBean<>();
		
		filter.setFilter(new AdminFilter());
		
		List<String> filteringUrl = new ArrayList<>();
		filteringUrl.add("/admin/*");
		
		filter.setUrlPatterns(filteringUrl);
		
		filter.setName("adminFilter");
		
		filter.setOrder(2);
		
		return filter;
	}
	
	@Bean // 해당 메서드에서 반환된 객체를 bean으로 등록
	public FilterRegistrationBean<ManagerFilter> stockFilter(){
		
		// FilterRegistrationBean : 필터 등록 bean
		FilterRegistrationBean<ManagerFilter> filter = new FilterRegistrationBean<>();
		
		filter.setFilter(new ManagerFilter()); // 사용할 필터 객체 추가
		
		String[] filteringUrl = {"/stock/*", "/revenue/*"};
		
		// Arrays.asList(배열) : 배열을 List로 변환
		filter.setUrlPatterns(Arrays.asList(filteringUrl)); // 필터링할 주소 지정
		
		filter.setName("managerFilter"); // 필터 이름 지정
		
		filter.setOrder(3); // 필터 순서
		
		return filter;
	}
	
	
}
