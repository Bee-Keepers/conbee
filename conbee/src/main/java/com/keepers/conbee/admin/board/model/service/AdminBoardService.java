package com.keepers.conbee.admin.board.model.service;

import java.util.Map;

public interface AdminBoardService {

	/** 신고 관리 포워드(목록 불러오기)
	 * @param cp
	 * @return
	 */
	Map<String, Object> reportList(int cp);

	/** 신고 관리 댓글 포워드(목록 불러오기)
	 * @param cp
	 * @return
	 */
	Map<String, Object> reportCommentList(int cp);

}
