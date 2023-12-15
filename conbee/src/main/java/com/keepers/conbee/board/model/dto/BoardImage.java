package com.keepers.conbee.board.model.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardImage {
	
	private int boardImageNo;
	private String boardImageRename;
	private int boardNo;
	private String boardImagePath;
	private String boardImgOriginalName;
	private int boardImgOrder;
	
	private MultipartFile uploadFile;

}
