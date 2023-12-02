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

	private String lcategoryName;
	private String scategoryName;
	
	private String goodsName;
	private int revenue;
	private int flag;
	
	private String startDate;
	private String endDate;
}
