package com.keepers.conbee.myPage.model.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.board.model.dto.Board;
import com.keepers.conbee.common.utility.Util;
import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.myPage.model.mapper.MyPageMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MyPageServiceImpl implements MyPageService{
	
	private final MyPageMapper mapper;
	
	// 이미지 저장경로
	@Value("${my.member.webpath}")
	private String webpath;
	
	@Value("${my.member.location}")
	private String folderPath;
	
	
	@Override
	public int myPageStoreUpdate(int storeNo, String storeTel) {
		Map<String, Object> map = new HashMap<>();
		map.put("storeNo", storeNo);
		map.put("storeTel", storeTel);

		return mapper.myPageStoreUpdate(map);
	}

	@Override
	public Store myPageStore(int storeNo) {
		return mapper.myPageStore(storeNo);
	}
	
	@Override
	public List<Board> selectWriteList(int memberNo) {
		
		return mapper.selectWriteList(memberNo);
	}
	
	@Override
	public List<Board> commentList(int memberNo) {
		
		return mapper.commentList(memberNo);
	}
	
	@Override
	public List<Board> choiceList(int memberNo) {
		
		return mapper.choiceList(memberNo);
	}
	
	
	// 프로필 이미지 수정
	@Override
	public int updateMemberProfile(MultipartFile memberProfile, Member loginMember) throws IllegalStateException, IOException {
		
		// 백업
		String backup = loginMember.getMemberProfile();
		
		String rename=null;
		
		if(memberProfile.getSize()>0) { // 업로드 파일 o
			
			rename = Util.fileRename(memberProfile.getOriginalFilename());
			loginMember.setMemberProfile(webpath + rename); // 바뀐 파일명 loginMember에 세팅
		}
		else { // 업로드 파일 x
			loginMember.setMemberProfile(null);
		}
		
		int result = mapper.updateMemberProfile(loginMember);
		
		if(result>0) {
			if(memberProfile.getSize()>0) {
				memberProfile.transferTo(new File(folderPath + rename));
			}
		}
		else {
			loginMember.setMemberProfile(backup);
		}
		

		return result;
	}
}
