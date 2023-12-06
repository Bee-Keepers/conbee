package com.keepers.conbee.admin.store.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.admin.store.model.service.AdminStoreService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("admin/storeManage")
@RequiredArgsConstructor
//@SessionAttributes({"readStore"})
public class AdminStoreControllder { // 관리자페이지 - 점포관리 컨트롤러
	
	private final AdminStoreService service;
	
	
	/*========================== 점포정보조회 =================================*/
	
	/** 점포정보조회 포워드
	 * @author 예리나
	 * @param model : 데이터 전달 객체
	 * @param paramMap : 검색어 넘어옴
	 * @param cp : 현재 페이지
	 * @return storeList 전 점포 정보 리스트
	 */
	@GetMapping("storeList")
	public String storeList(Model model, @RequestParam Map<String, Object> paramMap, 
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		
		// 검색이 아닌 일반 목록 조회인 경우
		if(paramMap.get("query") == null) {
			
			Map<String, Object> map = service.readAllStoreList(cp);
			model.addAttribute("map", map);
		} 
		// 검색어가 있는 경우
		else {
			
			Map<String, Object> map = service.searchStoreList(paramMap, cp);
			model.addAttribute("map", map);
		}
		
		return "admin/storeManage/storeList";
	}
	
	
	/** 점포번호순 조회 (비동기)
	 * @author 이예리나
	 * @param query
	 * @param cp
	 * @return
	 */
	@GetMapping(value="/storeList/sortStoreNo", produces="application/json")
	@ResponseBody
	public Map<String, Object> sortStoreNo (String query, int cp) {
		
		Map<String, Object> map = service.sortStoreNo(query, cp);
		
		return map;
	}
	
	/** 점포명순 조회 (비동기)
	 * @author 이예리나
	 * @param query
	 * @param cp
	 * @return
	 */
	@GetMapping(value="/storeList/sortStoreName", produces="application/json")
	@ResponseBody
	public Map<String, Object> sortStoreName(String query, int cp) {
		
		Map<String, Object> map = service.sortStoreName(query, cp);
		
		return map;
	}
	
	
	/** 폐점승인 정렬 (비동기)
	 * @author 이예리나
	 * @param query
	 * @param cp
	 * @return
	 */
	@GetMapping(value="/storeList/sortRunApproval", produces="application/json")
	@ResponseBody
	public Map<String, Object> sortRunApproval(String query, int cp) {
		
		Map<String, Object> map = service.sortRunApproval(query, cp);
		
		return map;
	}
	
	
	/** 운영여부 정렬 (비동기)
	 * @author 이예리나
	 * @param query
	 * @param cp
	 * @return
	 */
	@GetMapping(value="/storeList/sortStoreRunFl", produces="application/json")
	@ResponseBody
	public Map<String, Object> sortStoreRunFl(String query, int cp) {
		
		Map<String, Object> map = service.sortStoreRunFl(query, cp);
		
		return map;
	}
	
	
	
	/** 점포 운영상태 변경
	 * @author 이예리나
	 * @param storeNo
	 * @param storeRunFl
	 * @param ra
	 * @return
	 */
	@GetMapping("changeRunFl/{storeNo:[0-9]+}/{storeRunFl:[A-Z]}")
	public String changeRunFl(@PathVariable("storeRunFl") String storeRunFl, @PathVariable("storeNo") int storeNo, RedirectAttributes ra) {
		
		int result = service.changeRunFl(storeNo, storeRunFl);
		
		if(result == 100) {
			ra.addFlashAttribute("message", "관리자페이지에서의 운영 여부 변경은 폐쇄된 경우에만 운영으로 전환 가능합니다.");
		}
		else if(result > 0) {
			ra.addFlashAttribute("message", "권한 변경 완료");
		} else {
			ra.addFlashAttribute("message", "권한 변경 실패");
		}
		
		return "redirect:/admin/storeManage/storeList";
	}
	
	
	/*========================== 점포정보수정 =================================*/
	
	/** 점포정보수정 포워드 _ 점포명을 클릭해서 수정하는 경우가 아닐때
	 * @author 예리나
	 * @return
	 */
	@GetMapping("storeUpdate")
	public String storeUpdate() {
		
		
		return "admin/storeManage/storeUpdate";
	}
	
	
	/** 점포정보 수정
	 * @author 예리나
	 * @param updateStore : 수정할 점포 정보가 담긴 커맨드 객체
	 * @param ra
	 * @param 현재 조회되고있는 점포 정보가 담긴 객체(session)
	 * @return
	 */
	@PostMapping("storeUpdate/info")
	public String storeUpdate(Store updateStore, RedirectAttributes ra,
			@SessionAttribute("readStore") Store readStore) {
		
		int result = service.storeUpdate(updateStore);
		
		String message = null;
		
		
		if(result == 100) { // 기존 회원번호가 없는 경우
			message = "입력하신 정보와 일치하는 회원이 없습니다. 회원가입을 우선 진행해주세요.";
		}
		
		else if(result > 0) { // 점포수정 완료된 경우
			message = "점포 정보가 수정되었습니다.";
			readStore.setStoreName(updateStore.getStoreName());
			readStore.setMemberName(updateStore.getMemberName());
			readStore.setMemberNo(updateStore.getMemberNo());
			readStore.setStoreTel(updateStore.getStoreTel());
			readStore.setStoreAddress(updateStore.getStoreAddress());
			
		} else {
			message = "점포 정보 수정이 실패하였습니다.";
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:/admin/storeManage/storeUpdate";
	}
	
	
	
	
	/** 점포정보수정_점포번호 입력 시 나머지 점포정보 불러오기
	 * @author 이예리나
	 * @param storeNo
	 * @param model
	 * @return
	 */
	@PostMapping("storeUpdate")
	public String storeUpdate(int storeNo, Model model, RedirectAttributes ra) {
		
		// 해당 점포 정보 얻어오기
		Store readStore = service.readStoreInfo(storeNo);
		
		// 점포 정보가 있을 경우
		if(readStore != null) {
			model.addAttribute("readStore", readStore);
			return "admin/storeManage/storeUpdate";
			
		// 점포 정보가 없을 경우
		} else {
			ra.addFlashAttribute("message", "입력하신 점포번호의 매장이 존재하지 않습니다.");
		}
			
		return "redirect:/admin/storeManage/storeUpdate";
	}
	
	
	/** 점포정보수정 포워드 _ 점포명 클릭 시 점포정보전달
	 * @author 이예리나
	 * @param storeNo
	 * @param model
	 * @param ra
	 * @return
	 */
	@GetMapping("storeUpdate/{storeNo:[0-9]+}")
	public String storeUpdate(@PathVariable("storeNo") int storeNo,
			Model model) {
		
		// 해당 점포 정보 얻어오기
		Store readStore = service.readStoreInfo(storeNo);
		
		model.addAttribute("readStore", readStore);
		
		return "admin/storeManage/storeUpdate";
		
	}
	
	
	/** 매장명 중복 검사
	 * @author 이예리나
	 * @param storeName
	 * @return
	 */
	@GetMapping("checkStoreName")
	@ResponseBody
	public int checkStoreName(String storeName) {
		int result = service.checkStoreName(storeName);
		return result;
	}
	
	
	/** 매장 전화번호 중복 검사
	 * @author 이예리나
	 * @param storeTel
	 * @return
	 */
	@GetMapping("checkStoreTel")
	@ResponseBody
	public int checkStoreTel(String storeTel) {
		int result = service.checkStoreTel(storeTel); 
		
		return result;
	}
	

	
	/** 매장 주소 중복 검사
	 * @author 이예리나
	 * @param storeAddress
	 * @return
	 */
	@GetMapping("checkStoreAddress")
	@ResponseBody
	public int checkStoreAddress(String storeAddress) {
		int result = service.checkStoreAddress(storeAddress); 
		
		return result;
	}
	
	/** 점포번호 중복검사
	 * @author 이예리나
	 * @param storeNo
	 * @return
	 */
	@GetMapping("checkStoreNo")
	@ResponseBody
	public int checkStoreNo(String storeNo) {
		int result = service.checkStoreNo(storeNo); 
		
		return result;
	}
	
	
	
	/*========================== 신규점포등록 =================================*/
	
	/** 신규점포등록 포워드
	 * @author 예리나
	 * @return
	 */
	@GetMapping("storeInsert")
	public String storeInsert() {
		return "admin/storeManage/storeInsert";
	}
	
	/** 신규 점포 등록
	 * @author 이예리나
	 * @param inputStore
	 * @param ra
	 * @return
	 */
	@PostMapping("storeInsert/insert")
	public String storeInsert(@RequestParam(value = "memberNo", required = false, defaultValue = "0") int memberNo,
			@RequestParam(value = "memberName", required = false) String memberName,
			String storeName, String storeTel, String storeAddress, RedirectAttributes ra) {
		
		Store inputStore = new Store();
		
		inputStore.setMemberName(memberName);
		inputStore.setMemberNo(memberNo);
		inputStore.setStoreName(storeName);
		inputStore.setStoreTel(storeTel);
		inputStore.setStoreAddress(storeAddress);
		
		int result = service.storeInsert(inputStore);
		
		String path = null;
		
		// 기존 회원 X, 회원번호 O의 경우(가입X 회원) 회원가입페이지로 리다이렉트
		if(result == 100) {
			ra.addFlashAttribute("message", "기존 회원인 경우에만 점주 정보를 입력해주세요.");
			path = "redirect:/admin/storeManage/storeInsert";
		}
		
		// 점포 등록 성공 시 점포정보조회 페이지로 리다이렉트
		else if(result > 0) {
			ra.addFlashAttribute("message", "점포 등록이 성공하였습니다.");
			path = "redirect:/admin/storeManage/storeList";
		} 
		
		// 점포등록 실패시 등록페이지로 리다이렉트
		else {
			ra.addAttribute("message", "점포 등록이 실패하였습니다.");
			path = "redirect:/admin/storeManage/storeInsert";
		}

		
		return path;		
	}
	

}
