package com.keepers.conbee.admin.store.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.keepers.conbee.admin.store.model.dto.Store;

@Mapper
public interface AdminStoreMapper {

	/** 점포정보조회 포워드
	 * @param rowBounds 
	 * @return
	 */
	List<Map<String, Object>> readAllStoreList(RowBounds rowBounds);

	/** 전체 점포 수 확인
	 * @return
	 */
	int getListCount();
	
	

}
