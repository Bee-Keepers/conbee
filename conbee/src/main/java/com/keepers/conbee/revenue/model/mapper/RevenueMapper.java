package com.keepers.conbee.revenue.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.revenue.model.dto.Revenue;

@Mapper
public interface RevenueMapper {

	/** 매출 상세 검색
	 * @param revenue
	 * @return
	 */
	List<Revenue> revenueSearch(Revenue revenue);

}
