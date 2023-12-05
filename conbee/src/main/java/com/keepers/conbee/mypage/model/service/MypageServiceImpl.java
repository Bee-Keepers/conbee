package com.keepers.conbee.MyPage.model.service;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Service;

import com.keepers.conbee.MyPage.model.mapper.MyPageMapper;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{
	
	private final MyPageMapper mapper;
	
	
	
	

}
