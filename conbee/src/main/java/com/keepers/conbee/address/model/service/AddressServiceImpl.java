package com.keepers.conbee.address.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.address.model.mapper.AddressMapper;
import com.keepers.conbee.approval.model.dto.Pagination;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

	private final AddressMapper mapper;

	@Override
	public Map<String, Object> address(int grade, String query, int cp) {
		
		// 파라미터 전달용 map
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("grade", grade);
		paramMap.put("query", query);
		
		int listCount = mapper.getListCount(paramMap);
		
		Pagination pagination = new Pagination(cp, listCount, 9, 10);

		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();

		int limit = pagination.getLimit();

		RowBounds rowBounds = new RowBounds(offset, limit);
		
		
		List<Member> memberList = mapper.address(paramMap, rowBounds);
		Map<String, Object> map = new HashMap<>();
		
		map.put("memberList", memberList);
		map.put("pagination", pagination);
		
		return map;
	}
}