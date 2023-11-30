package com.keepers.conbee.admin.store.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.admin.store.model.dto.Store;

@Mapper
public interface AdminStoreMapper {

	/** 점포정보조회 포워드
	 * @return
	 */
	List<Store> readAllStoreList();
	
	

}
