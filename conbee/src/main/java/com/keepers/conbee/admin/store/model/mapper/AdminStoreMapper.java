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

	/** 검색한 정보와 일치하는 점포갯수
	 * @param paramMap
	 * @return
	 */
	int searchStoreListCount(Map<String, Object> paramMap);

	/** 검색한 정보와 일치하는 점포목록
	 * @param paramMap
	 * @param rowBounds
	 * @return
	 */
	List<Map<String, Object>> searchStoreList(Map<String, Object> paramMap, RowBounds rowBounds);

	/** 점포 운영상태 변경
	 * @param map
	 * @return
	 */
	int changeRunFl(Map<String, Object> map);

	/** 선택한 점포 정보 얻어오기
	 * @param storeNo
	 * @return
	 */
	Store readStoreInfo(int storeNo);
	
	

}
