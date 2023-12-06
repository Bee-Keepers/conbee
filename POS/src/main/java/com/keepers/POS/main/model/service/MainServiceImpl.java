package com.keepers.POS.main.model.service;

import java.util.ArrayList;
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
	
	// 포스기 결제 시 입출고 내역 입력
	@Override
	public int insert(List<Integer> historyDiscount, List<Integer> historyUnitPrice, List<String> historyGoodsName, List<Integer> historyAmount,
			List<Integer> historyActualPrice, List<Integer> goodsNo, String historyStoreName, int storeNo) {

		// 전달 받은 값들 가공해서 리스트에 넣은 후 전달
		List<History> historyList = new ArrayList<>();
		for(int i = 0; i < historyDiscount.size(); i++) {
			History history = new History();
			history.setGoodsNo(goodsNo.get(i));
			history.setHistoryDiscount(historyDiscount.get(i));
			history.setHistoryUnitPrice(historyUnitPrice.get(i));
			history.setHistoryGoodsName(historyGoodsName.get(i));
			history.setHistoryAmount(historyAmount.get(i));
			history.setHistoryActualPrice(historyActualPrice.get(i));
			history.setHistoryStoreName(historyStoreName);
			history.setStoreNo(storeNo);
			historyList.add(history);
		}
		return mapper.insertHistory(historyList);
	}
}
