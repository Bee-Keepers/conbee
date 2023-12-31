package com.keepers.conbee.calendar.model.service;

import java.util.List;

import com.keepers.conbee.calendar.model.dto.Calendar;
import com.keepers.conbee.member.model.dto.Member;

public interface CalendarService {

	/** 같은 팀의 일정 모두 조회
	 * @param loginMember
	 * @return calendarList
	 */
	List<Calendar> selectCalendar(Member loginMember);
	
	
	/** 일정 추가
	 * @param cal
	 * @return result
	 */
	int staffcalendar(Calendar cal);


	/** 일정 수정
	 * @param calendar
	 * @return
	 */
	int updatecalendar(Calendar calendar);


	/** 일정 삭제
	 * @param calNo
	 * @return
	 */
	int deleteCalendar(int calNo);

	

}
 