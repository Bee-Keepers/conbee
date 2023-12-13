package com.keepers.conbee.note.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.keepers.conbee.board.model.dto.Board;
import com.keepers.conbee.note.service.NoteService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("note")
public class NoteController {
	
    private final NoteService service;

    @GetMapping("note-receive")
    public String notereceive(Board board, Model model) {
        return "note/note-receive";
    }

    
    @GetMapping("note-sent")
    public String notesent(Board board, Model model) {
        return "note/note-sent";
    }
    
    @GetMapping("note-keep")
    public String notekeep(Board board, Model model) {
        return "note/note-keep";
    }
    
    @GetMapping("note-write")
    public String notewrite(Board board, Model model) {
        return "note/note-write";
    }
    
    
    
    
    
    
    





}
