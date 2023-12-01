package com.keepers.POS.main.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.POS.main.model.dto.Goods;
import com.keepers.POS.main.model.dto.History;

@Mapper
public interface MainMapper {

	/** 상품 검색
	 * @param map
	 * @return goodsList
	 */
	List<Goods> search(Map<String, Object> map);

	/** 입출고 내역 삽입
	 * @param historyList
	 * @return
	 */
	int insertHistory(List<History> historyList);

}
