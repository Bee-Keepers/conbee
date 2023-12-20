package com.keepers.conbee.address.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.keepers.conbee.member.model.dto.Member;

@Mapper
public interface AddressMapper {

	List<Member> address(Map<String, Object> paramMap, RowBounds rowBounds);

	/** 주소록 총 개수 조회
	 * @param paramMap 
	 * @return
	 */
	int getListCount(Map<String, Object> paramMap);



}