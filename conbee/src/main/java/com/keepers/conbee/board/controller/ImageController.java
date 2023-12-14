package com.keepers.conbee.board.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartRequest;

@Controller

public class ImageController {

	@PostMapping("/images/upload")
	@ResponseBody
	public Map<String, Object> imageUpload(MultipartRequest request){
		
		
		return 
	}
}
