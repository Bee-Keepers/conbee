package com.keepers.conbee.note.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.board.model.dto.Board;
import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.note.model.dto.Note;
import com.keepers.conbee.note.model.service.NoteService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("note")
@SessionAttributes({"unReadCount"})
public class NoteController {
	
    private final NoteService service;

    @GetMapping("note-receive")
    public String noteReceive(Board board, Model model, @SessionAttribute("loginMember") Member loginMember) {
    	
    	List<Note> noteList = service.noteReceive(loginMember.getMemberNo());
    	
    	model.addAttribute("noteList", noteList);
    	
        return "note/note-receive";
    }

    
    @GetMapping("note-sent")
    public String noteSent(Board board, Model model, @SessionAttribute("loginMember") Member loginMember) {
    	
    	List<Note> noteList = service.noteSent(loginMember.getMemberNo());
    	
    	model.addAttribute("noteList", noteList);
    	
        return "note/note-sent";
    }

    
    @GetMapping("note-keep")
    public String notekeep(Board board, Model model) {
        return "note/note-keep";
    }
    
    
    @GetMapping("note-write")
    public String notewrite(Model model) {
        return "note/note-write";
    }
    


    
    @GetMapping("name-search")
    @ResponseBody
    public List<Member> nameSearch(String memberName){
    	return service.nameSearch(memberName);
    }

    /**
     * 쪽지발송
     * @param ra
     * @param note
     * @param loginMember
     * @return
     */
    
    @PostMapping("note-write")
    public  String notewrite(RedirectAttributes ra, Note note, @SessionAttribute("loginMember") Member loginMember) {
    	
    	note.setMemberNoSender(loginMember.getMemberNo());
    	
    	
    	int result = service.noteWrite(note);
    	
    	if(result>0) {
			ra.addFlashAttribute("message", "쪽지가 성공적으로 보내졌습니다");
		
		} else {
			ra.addFlashAttribute("message", "쪽지가 발송되지 않았습니다");	
		}
		
		
 
        return "redirect:note-sent";
    }

    
    /** 쪽지 읽음
     * @param messageNo
     * @return
     */
    @PutMapping("readCheck")
    @ResponseBody
    public int readCheck(@RequestBody int messageNo) {
    	return service.readCheck(messageNo);
    }
    
    // 안읽은 쪽지 수 조회
    @GetMapping("unReadCount")
    @ResponseBody
    public int unReadCount(int memberNo, Model model){
    	int unReadCount = service.unReadCount(memberNo);
    	model.addAttribute("unReadCount", unReadCount);
    	return unReadCount;
    }
  


}

