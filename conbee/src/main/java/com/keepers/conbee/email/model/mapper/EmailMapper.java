package com.keepers.conbee.email.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EmailMapper {

	/** 이메일 인증번호 보낸 걸 다시 보낼 때
	 * @param map
	 * @return
	 */
	int updateAuthKey(Map<String, String> map);

	/** 이메일 인증번호를 처음 보낼 때
	 * @param map
	 * @return
	 */
	int insertAuthKey(Map<String, String> map);

	/** 인증번호 체크
	 * @param paramMap
	 * @return
	 */
	int checkAuthKey(Map<String, Object> paramMap);

}
