package com.keepers.conbee.note.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Note {
	
	private int messageNo;
	private String messageContent;
	private String messageDate;
	private String messageDelFl;
	private int memberNoSender;
	private String messageReadFl;
	private int memberNoReciplent;
	
	private String memberName;

}
