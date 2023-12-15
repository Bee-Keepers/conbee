package com.keepers.conbee.common.scheduling;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.approval.model.service.ApprovalService;

import lombok.extern.slf4j.Slf4j;


@Component
@Slf4j
public class ApprovalScheduling {
	
	@Autowired
	private ApprovalService service;

	
	/** 결재완료 된 기안서가 180일 지난 후 자동 삭제되는 스케쥴링
	 * @author 이예리나
	 * 
	 */
	@Scheduled(cron = "0 0 0 * * *") // 매일 자정 실행
//	@Scheduled(cron = "0,15,30,45 * * * * *") // 15초마다 실행 테스트
	public void approvalDeleteScheduling() {
		
		log.info("기안일 180일 초과 기안서 삭제 스케쥴러 동작");
		
		// 기안일이 180일 지난 기안서 리스트 불러오기
		List<Approval> dateOverApprovalList = service.selectDateOverApproval();
		
		// 180일 지난 기안서가 존재할 경우
		if(dateOverApprovalList.size() != 0) {

			// 불러온 기안서 삭제
			for( Approval approve : dateOverApprovalList) {
				int result = service.approvalDeleteScheduling(approve.getApprovalNo());
			}
			
			log.info("기안일 180일 초과 기안서 삭제 스케쥴러 동작 완료");
		}

	}
	
	
}
