package com.keepers.POS.main.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.POS.main.model.dto.Goods;

@Mapper
public interface MainMapper {

	/** 상품 검색
	 * @param inputPosSearch
	 * @return goodsList
	 */
	List<Goods> search(String inputPosSearch);

}
