package com.keepers.conbee.mypage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.myPage.model.service.MyPageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("mypage")
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
@Slf4j
public class MyPageController {
    
    private final MyPageService service;
    
    /** 프로필 정보 조회
     * @param mypage
     * @return
     */
    @GetMapping("mypage-profile")
    public String mypageProfile(Member member, Model model) {
        return "mypage/mypage-profile";
    }

    
    @GetMapping("mypage-mywrite")
    public String mypageMywrite() {
        return "mypage/mypage-mywrite";
    }
    
    @GetMapping("mypage-comment")
    public String mypageComment() {
        return "mypage/mypage-comment";
    }
    
    @GetMapping("mypage-choice")
    public String mypageChoice() {
        return "mypage/mypage-choice";
    }
     
    @PostMapping("myPageUpdate")
    public String mypageUpdate() {
        
        return "mypage/mypage-update";
    }

}