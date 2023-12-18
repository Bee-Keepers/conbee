package com.keepers.conbee.admin.board.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.keepers.conbee.admin.board.model.dto.Report;

@Mapper
public interface AdminBoardMapper {

	/** 신고된 게시글 수 불러오기
	 * @return
	 */
	int getReportListCount();
	
	/** 신고된 게시글/댓글 수 불러오기
	 * @return
	 */
	int getReportCommnetListCount();

	
	/** 신고된 게시글 목록 불러오기
	 * @param rowBounds
	 * @return
	 */
	List<Report> readAllReportList(RowBounds rowBounds);

	/**신고된 댓글 목록 불러오기
	 * @param rowBounds
	 * @return
	 */
	List<Report> readAllReportCommentList(RowBounds rowBounds);


}
