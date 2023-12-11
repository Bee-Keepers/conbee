package com.keepers.conbee.approval.model.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ApprovalFile {
	
	private int approvalNo; // 문서번호
	private int approvalFileNo; // 첨부파일 번호
	private String approvalFileRoute; // 첨부파일 경로
	private String approvalFileOriginName; // 원본 파일 이름
	private String approvalFileRename; // 변경 파일 이름
	
	private MultipartFile uploadFile;

}
