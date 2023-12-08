package com.keepers.conbee.email.model.service;

import java.util.Map;

public interface EmailService {

	/** 이메일 발송
	 * @param htmlName
	 * @param email
	 * @return
	 */
	int sendEmail(String htmlName, String email);

	/** 인증번호 체크
	 * @param paramMap
	 * @return
	 */
	int checkAuthKey(Map<String, Object> paramMap);

	
}
