package com.keepers.conbee.calendar.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.calendar.model.dto.Calendar;
import com.keepers.conbee.member.model.dto.Member;

import io.micrometer.observation.Observation.Event;


@Mapper
public interface CalendarMapper {

	Object storeName(Event event);

	/** 같은 팀의 일정 모두 조회
	 * @param loginMember
	 * @return calendarList
	 */
	List<Calendar> selectCalendarList(Member loginMember);
	
	/** 일정 추가
	 * @param cal (제목, 시작, 종료, 회원번호)
	 * @return result
	 */
	int staffcalendar(Calendar cal);

	int updatecalendar(Calendar calendar);
	
	

	

}
