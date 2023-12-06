package com.keepers.conbee.myPage.model.service;

import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.myPage.model.mapper.MyPageMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional
public class MyPageServiceImpl implements MyPageService{
	
	private final MyPageMapper mapper;
	

}
