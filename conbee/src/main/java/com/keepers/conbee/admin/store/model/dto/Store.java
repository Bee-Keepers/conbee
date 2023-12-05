package com.keepers.conbee.admin.store.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Store { // 점포 DTO
	
	// DB와 동일한 필드
	private int storeNo;
	private String storeName;
	private String storeAddress;
	private String storeTel;
	private String storeRunFl;
	private String storeOpenDate;
	private String storeCloseDate;
	private int memberNo; // 점주 회원번호
	private String storeRunApproval; // 폐점승인여부('N'디폴트)
	
	private String memberName; // 점주명
	

}
