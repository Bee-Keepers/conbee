package com.keepers.conbee.stock.model.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class Order {

	private int orderAmount;
	private int goodsNo;
	private int storeNo;
	private int orderNo;
	private String orderDate;
	private int stockInPrice;
	private String storeName;
	private String goodsName;
	private int stockAmount;
	private String lcategoryName;
	private String scategoryName;
	
	private List<Integer> goodsNoList;
	
	
}
