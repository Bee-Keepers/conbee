package com.keepers.conbee.member.model.dto;

import java.util.List;

import com.keepers.conbee.admin.store.model.dto.Store;

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
	private String memberTel;
	private String memberProfile;
	private int memberAuthority;
	private String memberEnrollDate;
	private String memberDelFl;
	private String memberDelApproval;
	
	private List<Member> memberList;
	private int teamNo;
	private int departmentNo;
	private int gradeNo;
	private int storeNo;
	private List<Store> storeList;
	private List<Integer> storeNoList;
	
	//전자결재 작업 중 추가 유진
	private String teamName;
	private String gradeName;
	private String departmentName;
	
}
