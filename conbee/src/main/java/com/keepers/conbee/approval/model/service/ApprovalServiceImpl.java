package com.keepers.conbee.approval.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.approval.model.mapper.ApprovalMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ApprovalServiceImpl implements ApprovalService{
	
	
	private final ApprovalMapper mapper;
	

}
