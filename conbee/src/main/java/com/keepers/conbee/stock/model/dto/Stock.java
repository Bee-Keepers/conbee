package com.keepers.conbee.stock.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Stock {
	
	// 대분류
	private int lcategoryNo;
	private String lcategoryName;
	
	// 소분류
	private int scategoryNo;
	private String scategoryName;
	
	// 점포별 상품
	private int stockAmount;
	private int stockDiscount;
	private int stockOutPrice;
	private int stockInPrice;
	
	// 상품
	private int goodsNo;
	private String goodsName;
	private String goodsStandard;
	
	// 점포
	private int storeNo;
	private String storeName;
	private String storeAddress;
	private String storeTel;
	private String storeRunFl;
	private String storeOpenDate;
	private String storeCloseDate;
	
	// 발주
	private int orderNo;
	private String orderDate;
	private int orderAmount;
	
	// 입출고내역
	private int historyNo;
	private String historyDivide;
	private int historyAmount;
	private int historyActualPrice;
	private int historyUnitPrice;
	private int historyDiscount;
	private String historyDate;
	private String historyStoreName;
	private String historyGoodsName;
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
