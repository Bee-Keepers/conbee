package com.keepers.conbee.calendar.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Calendar {
	
	private int calNo;
	private String calAllDay;
	private String calStartTime;
	private String calEndTime;
	private String calTitle;
	private String calDetail;
	private String calcolor;

}
