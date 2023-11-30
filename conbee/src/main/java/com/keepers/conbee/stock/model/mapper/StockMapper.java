package com.keepers.conbee.stock.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.stock.model.dto.Stock;

@Mapper
public interface StockMapper {

	/** 상품 등록 시 대분류 누르면 소분류 나오는 기능
	 * @param lcategory
	 * @return
	 */
	List<String> scategoryList(String lcategory);

	/** 상품 등록
	 * @param stock
	 * @return
	 */
	int stockGoodsInsert(Stock stock);

}
