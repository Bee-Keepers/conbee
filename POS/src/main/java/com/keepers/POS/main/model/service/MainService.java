package com.keepers.POS.main.model.service;

import java.util.List;

import com.keepers.POS.main.model.dto.Goods;
import com.keepers.POS.main.model.dto.History;

public interface MainService {

	/** 상품 검색
	 * @param inputPosSearch
	 * @param storeNo 
	 * @return goodsList
	 */
	List<Goods> search(Goods goods);


	/** 입출고 내역 삽입
	 * @param historyDiscount
	 * @param historyUnitPrice 
	 * @param historyGoodsName
	 * @param historyAmount
	 * @param historyActualPrice
	 * @param goodsNo
	 * @param historyStoreName
	 * @param storeNo
	 * @return
	 */
	int insert(List<Integer> historyDiscount, List<Integer> historyUnitPrice, List<String> historyGoodsName,
			List<Integer> historyAmount, List<Integer> historyActualPrice, List<Integer> goodsNo,
			String storeName, int storeNo);


	/** 대분류 선택 시 소분류 선택
	 * @param lcategory
	 * @return
	 */
	List<String> scategoryList(String lcategory);

}
