package com.keepers.POS.member.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Store {

	private int storeNo;
	private String storeName;
	private String storeTel;
	private String storeAddress;
	private String storeOpenDate;
}
