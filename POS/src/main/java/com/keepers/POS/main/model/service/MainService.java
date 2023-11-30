package com.keepers.POS.main.model.service;

import java.util.List;

import com.keepers.POS.main.model.dto.Goods;
import com.keepers.POS.main.model.dto.History;

public interface MainService {

	/** 상품 검색
	 * @param inputPosSearch
	 * @param storeName 
	 * @return goodsList
	 */
	List<Goods> search(String inputPosSearch, String storeName);

	/** 입출고 내역 삽입
	 * @param historyList
	 * @return
	 */
	int insert(List<History> historyList);

}
