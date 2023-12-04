package com.keepers.conbee.board.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Board {
	
	// 게시판
	private int boardNo;
	private String boardTitle;
	private String boardContent;
	private String boardAttach;
	private int board_Hits;
	private int memberNo;
	private int BoardCodeNo;
	private int BoardDate;
	
	// 신고
	private int reportNo;
	private String reportTitle;
	private String reportContent;
	private String reportKind;
	private int reportContentNo; 
	private String reportAnswer; // 신고 처리 여부
	private String reportLocation;
	
	// 게시판 종류
	private int boardCodeNo; // 게시판 번호
	private String boardCodeName;
	
	// 게시판 댓글
	private int boardCommentNo;
	private int boardCommentDate;
	private String boardCommentContent;
	private String boardCommentDelFl;
	private int boardCommentParent;
	
	// 게시판 사진
	private int boardImageNo;
	private String boardImageRename;
	
	// 즐겨찾기
	
	
	
	
	

}
