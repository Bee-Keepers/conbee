package com.keepers.conbee.admin.store.model.service;

import org.springframework.stereotype.Service;

import com.keepers.conbee.admin.store.model.mapper.AdminStoreMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminStoreServiceImpl implements AdminStoreService{

	private final AdminStoreMapper mapper;
	
	
}
