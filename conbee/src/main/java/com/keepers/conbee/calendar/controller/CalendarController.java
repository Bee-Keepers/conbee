package com.keepers.conbee.calendar.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.keepers.conbee.calendar.model.dto.Calendar;
import com.keepers.conbee.calendar.model.service.CalendarService;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("calendar")
public class CalendarController {
	

	private final CalendarService service;
	
	@GetMapping("staffcalendar")
    public String staffcalendar() {
        return "calendar/staffcalendar";
        
    }
	
	/** 비동기로 현재 회원과 같은 팀의 일정 모두 조회
	 * @param loginMember
	 * @return calendarList
	 */
	@GetMapping("selectCalendar")
	@ResponseBody
	public List<Calendar> selectCalendar(@SessionAttribute("loginMember") Member loginMember){
		return service.selectCalendar(loginMember);
	}
	
	
	
	/** 일정 추가
	 * @param cal (제목, 시작, 종료)
	 * @param loginMember (로그인한 회원 번호 얻어오기 위해 -> 누가 일정을 추가했는가)
	 * @return
	 */
	@PostMapping("staffcalendar")
	@ResponseBody
	public int staffcalendar(@RequestBody Calendar cal, @SessionAttribute("loginMember") Member loginMember) {
		
		// 로그인한 회원 번호를 cal에 추가
		cal.setMemberNo(loginMember.getMemberNo());
		
		return service.staffcalendar(cal);
	}
	
	
	@GetMapping("/storecalendar")
    public String storeCalendar() {
        return "calendar/storecalendar";
    } 
	
	
	
	
	

}
	

    



