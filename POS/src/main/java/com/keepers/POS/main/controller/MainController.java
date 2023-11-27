package com.keepers.POS.main.controller;

import org.springframework.stereotype.Controller;

import com.keepers.POS.main.model.service.MainService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class MainController {
	
	private final MainService service;

}
