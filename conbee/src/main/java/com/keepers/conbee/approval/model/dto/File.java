package com.keepers.conbee.approval.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class File {
	
	private int approvalNo; // 문서번호
	private int approvalFileNo; // 첨부파일 번호
	private String approvalFileRoute; // 첨부파일 경로

}
