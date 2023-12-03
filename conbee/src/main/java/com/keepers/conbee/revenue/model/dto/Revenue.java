package com.keepers.conbee.revenue.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Revenue {
	
	private int storeNo;
	private int goodsNo;

	private int historyNo;
	private String historyDivide;
	private int historyAmount;
	private int historyActualPrice;
	private int historyUnitPrice;
	private int historyDiscount;
	private String historyDate;
	private String historyStoreName;
	private String historyGoodsName;
	
	private int totalPrice;
	// 상세 검색용 필드
	private String lcategoryName;
	private String scategoryName;
	
	private String goodsName;
	private int revenue;
	private int flag;
	
	private String startDate;
	private String endDate;
	
	
}
