package com.keepers.POS.main.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.POS.main.model.dto.Goods;
import com.keepers.POS.main.model.mapper.MainMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class MainServiceImpl implements MainService {

	private final MainMapper mapper;
	
	// 상품 검색
	@Override
	public List<Goods> search(String inputPosSearch) {
		return mapper.search(inputPosSearch);
	}
}
