package com.keepers.conbee.address.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.keepers.conbee.address.model.service.AddressService;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class AddressController {

	private final AddressService service;

	@GetMapping("address")
	public String address(Model model , @RequestParam(value = "grade" , required = false , defaultValue = "0") int grade) { 
		List<Member> memberList = service.address(grade);
		model.addAttribute("memberList",memberList);
		return "address/address";
	}
	
	

}
