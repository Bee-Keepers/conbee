package com.keepers.conbee.myPage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.myPage.model.service.MyPageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("myPage")
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
@Slf4j
public class MyPageController {
    
    private final MyPageService service;
    
    /** 프로필 정보 조회
     * @param mypage
     * @return
     */
    @GetMapping("myPage-profile")
    public String mypageProfile(Member member, Model model) {
        return "myPage/myPage-profile";
    }

    
    @GetMapping("myPage-mywrite")
    public String mypageMywrite() {
        return "myPage/myPage-mywrite";
    }
    
    @GetMapping("myPage-comment")
    public String mypageComment() {
        return "myPage/myPage-comment";
    }
    
    @GetMapping("myPage-choice")
    public String mypageChoice() {
        return "myPage/myPage-choice";
    }
     
    @PostMapping("myPageUpdate")
    public String mypageUpdate() {
        
        return "myPage/myPage-update";
    }
    
    @GetMapping("myPage-store")
    public String myPageStore() {
        
        return "myPage/myPage-store";
    }
    @PostMapping("myPage-store")
    public String myPageStoreUpdate(String storeTel, int storeNo, RedirectAttributes ra) {
    	int result = service.myPageStoreUpdate(storeNo, storeTel);
    	if(result > 0) {
    		ra.addFlashAttribute("message", "수정 성공");
    	} else {
    		ra.addFlashAttribute("message", "수정 실패");
    	}
    	return "redirect:myPage-store";
    }

}
