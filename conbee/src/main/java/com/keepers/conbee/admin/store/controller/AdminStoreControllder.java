package com.keepers.conbee.admin.store.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.keepers.conbee.admin.store.model.dto.Store;
import com.keepers.conbee.admin.store.model.service.AdminStoreService;

import lombok.RequiredArgsConstructor;

@Slf4j
@Controller
@RequestMapping("admin/storeManage")
@RequiredArgsConstructor
<<<<<<< HEAD
=======
@SessionAttributes({"readStore"})
>>>>>>> origin/main
public class AdminStoreControllder { // 관리자페이지 - 점포관리 컨트롤러
	
	private final AdminStoreService service;
	
	
	/*========================== 점포정보조회 =================================*/
	
	/** 점포정보조회 포워드
	 * @author 예리나
	 * @return storeList 전 점포 정보 리스트
	 */
	@GetMapping("storeList")
	public String storeList(Model model,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		
		Map<String, Object> map = service.readAllStoreList(cp);
		
		model.addAttribute("map", map);
		
		return "admin/storeManage/storeList";
	}
	
	
	
<<<<<<< HEAD
=======
	/** 점포 운영상태 변경
	 * @author 이예리나
	 * @param storeNo
	 * @param storeRunFl
	 * @param ra
	 * @return
	 */
	@GetMapping("changeRunFl")
	public String changeRunFl(int storeNo, String storeRunFl, RedirectAttributes ra) {
		
		int result = service.changeRunFl(storeNo, storeRunFl);
		
		if(result > 0) {
			ra.addFlashAttribute("message", "권한 변경 완료");
		} else {
			ra.addFlashAttribute("message", "권한 변경 실패");
		}
		
		return "redirect:admin/storeManage/storeList";
	}
	
	
	/*========================== 점포정보수정 =================================*/
	
>>>>>>> origin/main
	/** 점포정보수정 포워드 _ 점포명을 클릭해서 수정하는 경우가 아닐때
	 * @author 예리나
	 * @return
	 */
	@GetMapping("storeUpdate")
	public String storeUpdate() {
		return "admin/storeManage/storeUpdate";
	}
	
	
<<<<<<< HEAD
=======
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
		
		if(result > 0) {
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
>>>>>>> origin/main
	@GetMapping("storeUpdate/{storeNo:[0-9]+}")
	public String storeUpdate(@PathVariable("storeNo") int storeNo,
			Model model, RedirectAttributes ra) {
		
		
		
		return null;
		
	}
	
	
<<<<<<< HEAD
=======
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
	
	
>>>>>>> origin/main
	
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
	public String storeInsert(Store inputStore, RedirectAttributes ra) {
		
		int result = service.storeInsert(inputStore);
		
		// 점포 등록 성공 시 점포정보조회 페이지로 리다이렉트
		if(result > 0) {
			ra.addFlashAttribute("message", "점포 등록이 성공하였습니다.");
			return "redirect:/admin/storeManage/storeList";
		}
		
		// 점포등록 실패시 등록페이지로 리다이렉트
		ra.addAttribute("message", "점포 등록이 실패하였습니다.");
		return "redirect:/admin/storeManage/storeInsert";		
	}
	
	
	
	
	
	
	

}
