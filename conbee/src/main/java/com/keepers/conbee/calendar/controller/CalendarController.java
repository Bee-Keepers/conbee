package com.keepers.conbee.calendar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("calendar")
public class CalendarController {
	
	@GetMapping("calendar")
    public String calendar() {
        return "calendar/calendar";
    }
    
//	@PostMapping("calendar")
//	public String calendar() {
//	
//		
//		
//		
//		
//		
//		return "redirect:/calendar";
//	}

}
