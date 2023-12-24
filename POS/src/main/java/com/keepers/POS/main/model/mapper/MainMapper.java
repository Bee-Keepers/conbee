package com.keepers.POS.main.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.POS.main.model.dto.Goods;
import com.keepers.POS.main.model.dto.History;

@Mapper
public interface MainMapper {

	/** 상품 검색
	 * @param goods
	 * @return goodsList
	 */
	List<Goods> search(Goods goods);

	/** 입출고 내역 삽입
	 * @param historyList
	 * @return
	 */
	int insertHistory(List<History> historyList);

	/** 대분류 선택시 소분류 나옴
	 * @param lcategory
	 * @return
	 */
	List<String> scategoryList(String lcategory);

}
