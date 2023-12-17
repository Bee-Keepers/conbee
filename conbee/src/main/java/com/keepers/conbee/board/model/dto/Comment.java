package com.keepers.conbee.board.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Comment {

	private int boardCommentNo;
	private String boardCommentDate;
	private String boardCommentContent;
	private String boardCommentDelFl;
	private int boardNo;
	private int boardCommentParent;  // == parentNo 부모 댓글 번호
	
	private String memberName;
	private String memberProfile;
	private String boardCodeNo;
	private String boardCodeName;
	private int memberNo;
	
}
