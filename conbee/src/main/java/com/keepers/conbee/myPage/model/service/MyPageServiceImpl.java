package com.keepers.conbee.myPage.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.myPage.model.mapper.MyPageMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MyPageServiceImpl implements MyPageService{
	
	private final MyPageMapper mapper;
	
	@Override
	public int myPageStoreUpdate(int storeNo, String storeTel) {
		Map<String, Object> map = new HashMap<>();
		map.put("storeNo", storeNo);
		map.put("storeTel", storeTel);

		return mapper.myPageStoreUpdate(map);
	}

	@Override
	public Store myPageStore(int storeNo) {
		return mapper.myPageStore(storeNo);
	}
}
