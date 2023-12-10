package com.keepers.conbee.stock.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.stock.model.dto.Stock;

@Mapper
public interface StockManageMapper {

	
	/** 상품 수정
	 * @param stock
	 * @return
	 */
	int goodsUpdate(Stock stock);

	/** 상품 삭제
	 * @param i
	 * @return
	 */
	int goodsDelete(int goodsNo);

	/** 상품 조회
	 * @param paramMap
	 * @return
	 */
	List<Stock> goodsList(Map<String, Object> paramMap);

	/** 상품 등록
	 * @param stock
	 * @return
	 */
	int goodsInsert(Stock stock);

}
