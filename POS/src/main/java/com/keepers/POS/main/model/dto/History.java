package com.keepers.POS.main.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class History {

	private int historyActualPrice;
	private int historyUnitPrice;
	private int historyDiscount;
	private String historyStoreName;
	private String historyGoodsName;
	private int historyAmount;
	private int storeNo;
	private int goodsNo;
	private String historyDate;
	private String historyDivide;
	private int historyNo;
	
}
