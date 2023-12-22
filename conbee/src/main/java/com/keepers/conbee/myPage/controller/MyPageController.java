package com.keepers.conbee.myPage.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.email.model.service.EmailService;
import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.member.model.service.MemberService;
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
    private final EmailService emailService;
    private final MemberService memberService;
    
    
    /** 프로필 정보 조회
     * @param 
     * @return
     */
    @GetMapping("myPage-profile")
    public String myPageProfile(Member member, Model model) {
        return "myPage/myPage-profile";
    }

    
    @GetMapping("myPage-mywrite")
    public String myPageMywrite(@SessionAttribute("loginMember") Member loginMember, Model model ,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value="writeName", required = false) String writeName) {
    	
    	Map<String, Object> map = service.selectWriteList(loginMember.getMemberNo(), writeName,cp);

		model.addAttribute("map",map);
        return "myPage/myPage-mywrite";
    }
    

    @GetMapping("myPage-comment")
    public String myPageComment(@SessionAttribute("loginMember") Member loginMember, Model model ,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value="commentName", required = false) String commentName) {
    	
    	Map<String, Object> map = service.selectcommentList(loginMember.getMemberNo(), commentName,cp);

		model.addAttribute("map",map);
        return "myPage/myPage-comment";
    }
    
    
    @GetMapping("myPage-choice")
    public String myPageChoice(@SessionAttribute("loginMember") Member loginMember, Model model ,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value="choiceName", required = false) String choiceName) {
    	
    	Map<String, Object> map = service.selectchoiceNameList(loginMember.getMemberNo(), choiceName,cp);

    	log.info("모델 체크 :  "+ map);
		model.addAttribute("map",map);
        log.info("모델 체크 :  "+ model);
		return "myPage/myPage-choice";
        
    }
    
    /**
     * 회원 정보 수정
     * @return
     */
    @GetMapping("myPageUpdate")
    public String myPageUpdate() {
    	return "myPage/myPage-update";
    }
     
    @PostMapping("myPageUpdate")
    public String myPageUpdate(Member updateMember,
			@SessionAttribute("loginMember") Member loginMember,
			RedirectAttributes ra) {
    	
    	updateMember.setMemberNo(loginMember.getMemberNo());
    	
    	int result = service.myPageUpdate(updateMember);
    	
    	String message= null;
		
		if(result>0) {
			message = "회원 정보가 수정 되었습니다";
			loginMember.setMemberTel(updateMember.getMemberTel());
			loginMember.setMemberEmail(updateMember.getMemberEmail());
			loginMember.setMemberAddress(updateMember.getMemberAddress());
//			loginMember.setMemberPw(updateMember.getMemberPw());
		}else {
			message = "회원정보가 수정 실패";
		}
		
		
		ra.addFlashAttribute("message",message);
		
		return "redirect:myPage-profile";
    }
    
    
    
    @GetMapping("myPage-store")
    public String myPageStore(@SessionAttribute("loginMember") Member loginMember, Model model) {
    	int storeNo = loginMember.getStoreNoList().get(0);
    	Store store = service.myPageStore(storeNo);
    	
    	model.addAttribute("store", store);
    	
        return "myPage/myPage-store";
    }
    
    @GetMapping("myPage-store/select")
    @ResponseBody
    public Store myPageStoreSelect(int storeNo) {
    	Store store = service.myPageStore(storeNo);
    	
    	return store;
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
    
    // 이메일 중복 검사
 	@GetMapping("checkmyPageEmail")
 	@ResponseBody
 	public int checkmyPageEmail(String memberEmail) {
 		int result = service.checkmyPageEmail(memberEmail);
 		return result;
 	}
 	
 	// 전화번호 유효성 검사
 	@GetMapping("checkMemberTel")
 	@ResponseBody
 	public int checkMemberTel(String memberTel) {
 		int result = service.checkMemberTel(memberTel);
 		return result;
 	}
// 	
// 	// 비밀번호 유효성 검사
// 	@GetMapping("memberPwCheck")
// 	@ResponseBody
// 	public int checkMemberPw(String memberPw) {
// 		int result = service.checkMemberPw(memberPw);
// 		return result;
// 	}
//   
 
 	@PostMapping("member/findPw")
 	public String findPwResult(Member inputMember, RedirectAttributes ra, SessionStatus status) {
 		int result = memberService.findPwResult(inputMember);
 		// 비밀번호 변경 성공시
 			if(result > 0) {
 				ra.addFlashAttribute("message", "비밀번호가 변경되었습니다.");
 				
 				// 로그아웃
 				status.setComplete();

 				// 로그인페이지 리다이렉트
 				return "redirect:login";
 			}
 			
 			ra.addFlashAttribute("message", "비밀번호 변경이 실패하였습니다.");
 			
 			return "member/findPw";
 	}
 	
    
     /** 프로필 이미지 수정
     * @param memberProfile
     * @param loginMember
     * @param ra
     * @return
     */
    @PostMapping("memberProfile")
    public String profile(@RequestParam("memberProfile") MultipartFile memberProfile, @SessionAttribute("loginMember") Member loginMember,
    		RedirectAttributes ra) throws IllegalStateException, IOException {
    	
    	int result = service.updateMemberProfile(memberProfile, loginMember);
    	
		// 서비스 결과에 따라 응답 제어
		String message = null;
		
		if(result > 0) {
			message = "프로필 이미지가 변경되었습니다.";
			
		} else {
			message = "프로필 변경 실패!";
			
		}
		
		ra.addFlashAttribute("message", message);
		
		// 프로필 페이지로 리다이렉트
		return "redirect:myPageUpdate";
    }
    
    
    
    

}