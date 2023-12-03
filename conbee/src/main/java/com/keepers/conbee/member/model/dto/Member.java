package com.keepers.conbee.member.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Member {
	private int memberNo;
	private String memberId;
	private String memberPw;
	private String memberEmail;
	private String memberName;
	private String memberAddress;
	private int memberTel;
	private String memberProfile;
	private int memberAuthority;
	private String memberEnrollDate;
	private String memberDelFl;
	
	
	
	private int teamNo;
	private int departmentNo;
	private int gradeNo;
}
