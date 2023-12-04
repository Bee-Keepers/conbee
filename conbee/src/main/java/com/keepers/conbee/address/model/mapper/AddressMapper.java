package com.keepers.conbee.address.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.member.model.dto.Member;

@Mapper
public interface AddressMapper {

	List<Member> address(int grade);

}