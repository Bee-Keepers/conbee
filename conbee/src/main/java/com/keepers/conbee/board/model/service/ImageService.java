package com.keepers.conbee.board.model.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

@Service
@PropertySource("classpath:/config.properties")
public class ImageService {
	
	// ck에디터 이미지 파일 첨부
	@Value("${my.board.location}")
	private String boardLocation;
	
	
}
