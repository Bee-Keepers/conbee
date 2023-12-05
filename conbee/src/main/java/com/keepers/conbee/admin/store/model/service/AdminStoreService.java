package com.keepers.conbee.admin.store.model.service;

import java.util.Map;

import com.keepers.conbee.admin.store.model.dto.Store;

public interface AdminStoreService {

	/** 전체 점포 목록 조회
	 * @param cp
	 * @return
	 */
	Map<String, Object> readAllStoreList(int cp);

	/** 검색한 점포 목록 조회
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> searchStoreList(Map<String, Object> paramMap, int cp);

	/** 점포 운영상태 변경
	 * @param storeNo
	 * @param storeRunFl
	 * @return
	 */
	int changeRunFl(int storeNo, String storeRunFl);

	/** 선택한 점포 정보 얻어오기
	 * @param storeNo
	 * @return
	 */
	Store readStoreInfo(int storeNo);

	/** 점포명 중복검사
	 * @param storeName
	 * @return
	 */
	int checkStoreName(String storeName);

	/** 점포 전화번호 중복검사
	 * @param storeTel
	 * @return
	 */
	int checkStoreTel(String storeTel);

	/** 점포 주소 중복검사
	 * @param storeAddress
	 * @return
	 */
	int checkStoreAddress(String storeAddress);

	/** 점포정보 수정
	 * @param updateStore
	 * @return
	 */
	int storeUpdate(Store updateStore);

	/** 점포번호 중복검사
	 * @param storeNo
	 * @return
	 */
	int checkStoreNo(String storeNo);

	/** 신규 점포 등록
	 * @param inputStore
	 * @return
	 */
	int storeInsert(Store inputStore);

	/** 점포번호순 조회
	 * @param query
	 * @param cp
	 * @return
	 */
	Map<String, Object> sortStoreNo(String query, int cp);

	/**점포명순 조회
	 * @param query
	 * @param cp
	 * @return
	 */
	Map<String, Object> sortStoreName(String query, int cp);

	/** 폐점승인 정렬 (비동기)
	 * @param query
	 * @param cp
	 * @return
	 */
	Map<String, Object> sortRunApproval(String query, int cp);

	/** 운영여부 정렬 (비동기)
	 * @param query
	 * @param cp
	 * @return
	 */
	Map<String, Object> sortStoreRunFl(String query, int cp);


}
