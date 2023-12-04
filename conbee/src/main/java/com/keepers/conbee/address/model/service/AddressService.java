package com.keepers.conbee.address.model.service;

import java.util.List;

import com.keepers.conbee.member.model.dto.Member;

public interface AddressService {

	List<Member> address(int grade);

}