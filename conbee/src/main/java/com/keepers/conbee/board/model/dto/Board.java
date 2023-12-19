package com.keepers.conbee.board.model.dto;

import java.util.List;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Board {
	
	private String memberName;
	
	// 게시판
	private int boardNo;
	private String boardTitle;
	private String boardContent;
	private String boardAttach; // 첨부 파일
	private int boardHits; // 조회수
	private int memberNo; // 작성자
	private int boardCodeNo; // 게시판 번호
	private String boardWriteDate; // 작성일
	private String memberProfile; 
	
	// 신고
	private int reportNo;
	private String reportTitle;
	private String reportContent;
	private String reportKind; // 신고 종류
	private int reportContentNo; // 신고 대상 번호
	private String reportAnswer; // 신고 처리 여부
	private String reportLocation; // 신고 대상 주소
	
	// 게시판 종류
	private String boardCodeName; // 게시판 이름
	
	// 게시판 댓글
	private int boardCommentNo; // 댓글 번호
	private String boardCommentDate; // 댓글 등록일
	private String boardCommentContent; // 댓글 내용
	private String boardCommentDelFl; // 댓글 삭제 여부
	private int boardCommentParent; // 부모 댓글?
	private int commentCount; // 댓글 수
	
	// 게시판 사진
	private int boardImageNo; // 사진 번호
	private String boardImageRename; // 사진 등록 이름 변경
	
	private List<Comment> commentList;
	
	
	
	

}
