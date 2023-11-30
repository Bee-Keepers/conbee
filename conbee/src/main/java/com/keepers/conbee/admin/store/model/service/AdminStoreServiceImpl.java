package com.keepers.conbee.admin.store.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.admin.store.model.mapper.AdminStoreMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminStoreServiceImpl implements AdminStoreService{

	private final AdminStoreMapper mapper;
	
	/** 점포정보조회 포워드
	 *
	 */
	@Override
	public List<Store> readAllStoreList() {
		return mapper.readAllStoreList();
	}
	
	
}
