package com.keepers.conbee.revenue.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.revenue.model.mapper.RevenueMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class RevenueServiceImpl implements RevenueService{

	private final RevenueMapper mapper;
}
