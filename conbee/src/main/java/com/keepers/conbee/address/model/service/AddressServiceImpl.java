
package com.keepers.conbee.address.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.address.model.mapper.AddressMapper;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

	private final AddressMapper mapper;

	@Override
	public List<Member> address(int grade) {
		return mapper.address(grade);
	}
}