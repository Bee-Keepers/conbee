package com.keepers.conbee.mypage.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.mypage.model.mapper.MypageMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MypageServiceImpl implements MypageService{
	
	private final MypageMapper mapper;
	

}
