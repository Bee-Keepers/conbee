package com.keepers.conbee.note.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("note")
@SessionAttributes({"unReadCount"})
public class NoteController {
	
    private final NoteService service;

    // 받은 쪽지함
    @GetMapping("note-receive")
    public String noteReceive(Board board, Model model, @SessionAttribute("loginMember") Member loginMember,
    		@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			String query) {
    	
    	
    	// 검색이 아닌 경우
    	if(query == null) {    		
    		Map<String, Object> map = service.selectNoteReceive(loginMember.getMemberNo(), cp);
    		model.addAttribute("map",map);
    	}
    	// 검색인 경우
    	else {
    		Map<String, Object> map = service.searchNoteReceive(loginMember.getMemberNo(), query, cp);    		
    		model.addAttribute("map",map);
    	}
    	
//    	model.addAttribute("noteList", noteList);		
//		if(query != null) {
//			model.addAttribute("query",query);
//		}
    	
        return "note/note-receive";
    }

    // 보낸 쪽지함
    @GetMapping("note-sent")
    public String noteSent(Board board, Model model, @SessionAttribute("loginMember") Member loginMember,
    		@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			String query) {
    	
//    	log.debug(query);
    	
    	// 검색이 아닌 경우
    	if(query == null) {    		
    		Map<String, Object> map = service.selectNoteSent(loginMember.getMemberNo(), cp);
    		model.addAttribute("map",map);
    	}
    	// 검색인 경우
    	else {
    		Map<String, Object> map = service.searchNoteSent(loginMember.getMemberNo(), query, cp);    		
    		model.addAttribute("map",map);
    	}
    	
        return "note/note-sent";
    }
    
    
    /** 쪽지 보관함
     * @param model
     * @param loginMember
     * @return
     */
    @GetMapping("note-keep")
    public String noteKeep(Board board, Model model, @SessionAttribute("loginMember") Member loginMember,
    		@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			String query) {
    	
    	// 검색이 아닌 경우
    	if(query == null) {    		
    		Map<String, Object> map = service.selectNoteKeep(loginMember.getMemberNo(), cp);
    		model.addAttribute("map",map);
    	}
    	// 검색인 경우
    	else {
    		Map<String, Object> map = service.searchNoteKeep(loginMember.getMemberNo(), query, cp);    		
    		model.addAttribute("map",map);
    	}
    	
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
    public int readCheck(@RequestBody int messageNo, @SessionAttribute("loginMember") Member loginMember, Model model) {
    	int result = service.readCheck(messageNo);
    	if(result <= 0) return result;
    	int unReadCount = service.unReadCount(loginMember.getMemberNo());
    	model.addAttribute("unReadCount", unReadCount);
    	return unReadCount;
    }
    
    // 안읽은 쪽지 수 조회
    @GetMapping("unReadCount")
    @ResponseBody
    public int unReadCount(int memberNo, Model model){
    	int unReadCount = service.unReadCount(memberNo);
    	model.addAttribute("unReadCount", unReadCount);
    	return unReadCount;
    }
  
    // 쪽지 저장
    @PutMapping("save")
    @ResponseBody
    public int save(@RequestBody int messageNo) {
    	return service.save(messageNo);
    }
    
    
    // 쪽지 삭제
    @GetMapping("deleteNoteReceive")
    public String deleteNoteReceive(@RequestParam("messageNoList") List<Integer> messageNoList, RedirectAttributes ra) {
    	
    	int result = service.deleteNoteReceive(messageNoList);
    	
    	if(result>0) {    		
    		ra.addFlashAttribute("message", "쪽지가 삭제되었습니다");
    	}
    	
    	return "redirect:note-receive";
    }
    
    @GetMapping("deleteNoteSent")
    public String deleteNoteSent(@RequestParam("messageNoList") List<Integer> messageNoList, RedirectAttributes ra) {
    	
    	int result = service.deleteNoteSent(messageNoList);
    	
    	if(result>0) {    		
    		ra.addFlashAttribute("message", "쪽지가 삭제되었습니다");
    	}
    	
    	
    	return "redirect:note-sent";
    }
	
    @GetMapping("deleteNoteKeep")
    public String deleteNoteKeep(@RequestParam("messageNoList") List<Integer> messageNoList, RedirectAttributes ra) {
    	
    	int result = service.deleteNoteKeep(messageNoList);
    	
    	if(result>0) {    		
    		ra.addFlashAttribute("message", "쪽지가 삭제되었습니다");
    	}
    	
    	
    	return "redirect:note-keep";
    }
    
 
	


}

