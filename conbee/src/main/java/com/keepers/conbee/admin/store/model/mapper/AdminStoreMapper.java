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

	/** 점포명 중복 검사
	 * @param storeName
	 * @return
	 */
	int checkStoreName(String storeName);

	/** 점포 전화번호 중복 검사
	 * @param storeTel
	 * @return
	 */
	int checkStoreTel(String storeTel);

	/** 점포 주소 중복검사
	 * @param storeAddress
	 * @return
	 */
	int checkStoreAddress(String storeAddress);

	/** 점포정보수정
	 * @param updateStore
	 * @return
	 */
	int storeUpdate(Store updateStore);

	/** 점포정보수정-점주명
	 * @param updateStore
	 */
	int storeUpdateName(Store updateStore);

	/** 점포 번호 중복검사
	 * @param storeNo
	 * @return
	 */
	int checkStoreNo(String storeNo);

	/** 신규 점포 등록
	 * @param inputStore
	 * @return
	 */
	int storeInsert(Store inputStore);

	/** 기존회원 존재하는지 체크
	 * @param updateStore
	 * @return
	 */
	int matchMemberNo(Store updateStore);

	/** 신규점포등록 - 기존회원이 점주일 경우
	 * @param inputStore
	 */
	void storeInsertwMember(Store inputStore);

	/** 점포번호 정렬 리스트
	 * @param query
	 * @param rowBounds
	 * @return
	 */
	List<Store> sortStoreNo(String query, RowBounds rowBounds);

	/**점포명 정렬 리스트
	 * @param query
	 * @param rowBounds
	 * @return
	 */
	List<Store> sortStoreName(String query, RowBounds rowBounds);

	/** 폐점승인 정렬 리스트
	 * @param query
	 * @param rowBounds
	 * @return
	 */
	List<Store> sortRunApproval(String query, RowBounds rowBounds);

	/** 운영여부 정렬 (비동기)
	 * @param query
	 * @param rowBounds
	 * @return
	 */
	List<Store> sortStoreRunFl(String query, RowBounds rowBounds);
	
	

}
