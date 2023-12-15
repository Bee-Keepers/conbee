package com.keepers.conbee.address.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.keepers.conbee.address.model.service.AddressService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class AddressController {

	private final AddressService service;

	@GetMapping("address")
	public String address(Model model , @RequestParam(value = "grade" , required = false , defaultValue = "0") int grade,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			String query) { 
		Map<String, Object> map = service.address(grade, query, cp);
		
		if(query != null) {
			model.addAttribute("query",query);
		}
		model.addAttribute("grade",grade);
		model.addAttribute("map",map);
		return "address/address";
	}
	
	

}
