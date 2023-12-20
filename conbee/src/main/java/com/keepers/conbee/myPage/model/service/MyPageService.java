package com.keepers.conbee.myPage.model.service;

import java.util.List;
import java.util.Map;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.board.model.dto.Board;

public interface MyPageService {

	int myPageStoreUpdate(int storeNo, String storeTel);

	Store myPageStore(int storeNo);

	Map<String, Object> selectWriteList(int memberNo, String query, int cp);

	List<Board> commentList(int memberNo);

	List<Board> choiceList(int memberNo);

	Map<String, Object> selectcommentList(int memberNo, String commentName, int cp);

	Map<String, Object> selectchoiceNameList(int memberNo, String choiceName, int cp);


}