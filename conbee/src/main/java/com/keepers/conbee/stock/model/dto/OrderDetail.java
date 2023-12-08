package com.keepers.conbee.stock.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class OrderDetail {

	private int goodsNo;
	private String goodsName;
	private String lcategoryName;
	private String scategoryName;
	private int orderAmount;
}
