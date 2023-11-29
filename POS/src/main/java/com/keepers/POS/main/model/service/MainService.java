package com.keepers.POS.main.model.service;

import java.util.List;

import com.keepers.POS.main.model.dto.Goods;

public interface MainService {

	/** 상품 검색
	 * @param inputPosSearch
	 * @return goodsList
	 */
	List<Goods> search(String inputPosSearch);

}
