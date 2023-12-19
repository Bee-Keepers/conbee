package com.keepers.conbee.myPage.model.service;

import java.util.List;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.board.model.dto.Board;

public interface MyPageService {

	int myPageStoreUpdate(int storeNo, String storeTel);

	Store myPageStore(int storeNo);

	List<Board> selectWriteList(int memberNo);

	List<Board> commentList(int memberNo);

	List<Board> choiceList(int memberNo);
}
