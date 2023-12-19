package com.keepers.conbee.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.keepers.conbee.common.interceptor.ManagerInterceptor;

// 인터셉터가 언제 동작할지 설정하는 클래스

@Configuration
public class InterceptorConfig implements WebMvcConfigurer{

	// 필요한 bean 등록하는 메서드 작성
	
	@Bean // 메서드에서 반환된 객체를 bean으로 등록하는 어노테이션
	public ManagerInterceptor managerInterceptor() {
		return new ManagerInterceptor();
	}
	
	// 등록된 bean을 설정하는 메서드 작성
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		// registry : 인터셉터 등록 객체

		// Bean으로 등록된 StockInterceptor를 얻어와
		// 동작 가능한 인터셉터로 등록
		registry.addInterceptor(managerInterceptor())
		.addPathPatterns("/stock/**", "/revenue/**") // 가로챌 요청 주소 지정(/** == 모든 요청)
		.excludePathPatterns("/css/**", "/images/**", "/js/**", "/favicon.ico"); // 가로채지 않을 요청 주소 지정
		
		
		
	}
	
}
