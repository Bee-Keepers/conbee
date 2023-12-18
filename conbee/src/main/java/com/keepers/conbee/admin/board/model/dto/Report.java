package com.keepers.conbee.admin.board.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Report {
	
	// DB 컬럼
	private int reportNo;
	private int memberNo; // 신고자 회원번호
	private String reportTitle; // 신고 제목
	private String reportKind; // 1:스팸홍보/도배, 2:음란물, 3:불법정보, 4:욕설, 5:개인정보, 6:불쾌, 7:명예훼손, 8:불법촬영물
	private String reportAnswer; // 신고처리여부
	private int boardNo; // 신고된 게시글 번호
	private int boardCommentNo; // 신고된 댓글 번호
	
	private String writerName; // 신고된 게시글/댓글 작성자 이름
	private String memberName; // 신고자 이름
	private int reportCount; // 신고횟수
	
}
