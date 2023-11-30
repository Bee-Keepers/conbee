package com.keepers.POS.main.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.POS.main.model.dto.Goods;
import com.keepers.POS.main.model.dto.History;
import com.keepers.POS.main.model.mapper.MainMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class MainServiceImpl implements MainService {

	private final MainMapper mapper;
	
	// 상품 검색
	@Override
	public List<Goods> search(String inputPosSearch, String storeName) {
		Map<String, Object> map = new HashMap<>();
		map.put("inputPosSearch", inputPosSearch);
		map.put("storeName", storeName);
		return mapper.search(map);
	}
	
	@Override
	public int insert(List<History> historyList) {
		int resultStock = mapper.updateStock(historyList);
		int resultHistory = mapper.insertHistory(historyList);
		return 0;
	}
}
