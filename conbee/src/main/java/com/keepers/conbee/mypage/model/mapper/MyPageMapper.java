package com.keepers.conbee.myPage.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MyPageMapper {

	int myPageStoreUpdate(Map<String, Object> map);
	
	


}
