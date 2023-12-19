package com.keepers.conbee.myPage.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.board.model.dto.Board;

@Mapper
public interface MyPageMapper {

	int myPageStoreUpdate(Map<String, Object> map);
	
	

	Store myPageStore(int storeNo);
	
	

	List<Board> selectWriteList(int memberNo);



	List<Board> commentList(int memberNo);




	List<Board> choiceList(int memberNo);
	
	


}
