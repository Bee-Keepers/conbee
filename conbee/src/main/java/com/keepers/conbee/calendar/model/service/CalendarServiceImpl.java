package com.keepers.conbee.calendar.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keepers.conbee.calendar.model.dto.Calendar;
import com.keepers.conbee.calendar.model.mapper.CalendarMapper;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {

	private final CalendarMapper mapper;

	// 같은 팀의 일정 모두 조회
	@Override
	public List<Calendar> selectCalendar(Member loginMember) {
		return mapper.selectCalendarList(loginMember);
	}

	// 일정 추가
	@Override
	public int staffcalendar(Calendar cal) {
		return mapper.staffcalendar(cal);
	}

	@Override
	public int updatecalendar(Calendar calendar) {

		return mapper.updatecalendar(calendar);
	}
	
	// 일정 삭제
	@Override
	public int deleteCalendar(int calNo) {
		return mapper.deleteCalrendar(calNo);
	}

}
