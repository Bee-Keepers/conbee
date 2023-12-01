package com.keepers.POS.member.model.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
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
	
	private List<Store> storeList;
}
