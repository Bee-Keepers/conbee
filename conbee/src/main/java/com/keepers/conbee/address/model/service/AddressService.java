package com.keepers.conbee.address.model.service;

import java.util.Map;

public interface AddressService {

	/** 주소록
	 * @param grade
	 * @param query 
	 * @param cp
	 * @return
	 */
	Map<String, Object> address(int grade, String query, int cp);

}