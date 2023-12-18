package com.keepers.conbee.revenue.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.keepers.conbee.revenue.model.dto.Revenue;

@Mapper
public interface RevenueMapper {

	/** 매출 상세 검색
	 * @param revenue
	 * @param rowBounds 
	 * @return
	 */
	List<Revenue> revenueSearch(Revenue revenue, RowBounds rowBounds);

	/** 입출고 내역 검색
	 * @param revenue
	 * @param rowBounds 
	 * @return
	 */
	List<Revenue> historySearch(Revenue revenue, RowBounds rowBounds);

}
