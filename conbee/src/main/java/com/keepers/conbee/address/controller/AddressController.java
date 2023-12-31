package com.keepers.conbee.address.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.keepers.conbee.address.model.service.AddressService;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class AddressController {

	private final AddressService service;

	@GetMapping("address")
	public String address(@SessionAttribute("loginMember") Member loginMember, Model model ,
			@RequestParam(value="deptNo", required=false, defaultValue="-1") int deptNo,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			String query) { 
		
		Map<String, Object> map = new HashMap<>();
		
		log.debug(loginMember.getDepartmentNo()+"---");
		log.debug(deptNo + "====");
		
		if(loginMember.getDepartmentNo()==5) {
			map = service.address(deptNo, 2, query, cp);
		}
		else {
			map = service.address(deptNo, 1, query, cp);
		}		
		
		if(query != null) {
			model.addAttribute("query",query);
		}

//		model.addAttribute("grade",grade);
		model.addAttribute("deptNo", deptNo);
		model.addAttribute("map",map);
		return "address/address";
	}
	


}
