package com.keepers.POS.main.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Goods {

	private int goodsNo;
	private String goodsName;
	private String lcategoryName;
	private String scategoryName;
	private String stockOutPrice;
	private String stockDiscount;
	
}
