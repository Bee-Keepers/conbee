package com.keepers.conbee.note.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.note.model.service.NoteService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class NoteController {
	
    private final NoteService service;
    
    /** 프로필 정보 조회
     * @param mypage
     * @return
     */
    @GetMapping("note-list")
    public String notelist(Member member, Model model) {
        return "note/note-list";
    }


}
