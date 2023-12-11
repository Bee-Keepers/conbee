package com.keepers.conbee.myPage2.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.admin.store.model.dto.Store;

@Mapper
public interface MyPageMapper {

	int myPageStoreUpdate(Map<String, Object> map);

	Store myPageStore(int storeNo);
	
	


}
