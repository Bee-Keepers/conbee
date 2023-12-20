package com.keepers.conbee.email.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.keepers.conbee.email.model.service.EmailService;

import lombok.RequiredArgsConstructor;

// @RestController : 비동기 요청 및 응답 제어 용도의 컨트롤러
@RestController // @Controller + @ResponseBody
@RequestMapping("email")
@RequiredArgsConstructor
public class EmailController {

	private final EmailService service;
	
		
	@PostMapping("authKey")
	public int authKey(@RequestBody String email) {
		return service.sendEmail("authKey", email, null);
	}

	@PostMapping("checkAuthKey")
	public int checkAuthKey(@RequestBody Map<String, Object> paramMap) {
		return service.checkAuthKey(paramMap);
	}
	
}
