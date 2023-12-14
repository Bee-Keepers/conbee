
package com.keepers.conbee.approval.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.approval.model.dto.ApprovalFile;
import com.keepers.conbee.approval.model.dto.Approver;
import com.keepers.conbee.approval.model.dto.CommandDTO;
import com.keepers.conbee.approval.model.dto.Pagination;
import com.keepers.conbee.approval.model.mapper.ApprovalMapper;
import com.keepers.conbee.common.utility.Util;
import com.keepers.conbee.member.model.dto.Member;
import com.keepers.conbee.stock.model.dto.Stock;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
@PropertySource("classpath:/config.properties")
public class ApprovalServiceImpl implements ApprovalService{

	
	private final ApprovalMapper mapper;
	
	/* ============================= 유진 ================================ */

	@Value("${my.approval.location}")
	private String folderPath; //서버 저장 폴더 경로
	
	@Value("${my.approval.webpath}")
	private String webPath; //웹 요청 경로
	

	// 임시저장함 조회
	@Override
	public Map<String, Object> selectTempSave(int memberNo, int cp) {
		
		int listCount = mapper.searchTempSaveCount(memberNo);
		
		Pagination pagination = new Pagination(cp, listCount);
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset,limit);
		
		List<Approval> tempSaveList = mapper.selectTempSave(memberNo,rowBounds);
		
		log.debug(tempSaveList+"======");
		
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("tempSaveList", tempSaveList);
	
		return map;
	}
	
	
	// 임시저장함 데이터 조회
	@Override
	public Map<String, Object> selectTempData(int approvalNo, int docCategoryNo) {
		
		Map<String, Object> tempData = new HashMap<>();
		
		Approval tempApproval = new Approval();
		tempApproval.setDocCategoryNo(docCategoryNo); // 필요?
		
		// 1. 기안문 데이터 + 파일 데이터 + DOC 데이터 
		switch(docCategoryNo) {
		case 0 : tempApproval = mapper.selectTempHoliday(approvalNo); break; // 휴가
		case 1 : tempApproval = mapper.selectTempRetirement(approvalNo); break; // 퇴직
		case 2,3 : tempApproval = mapper.selectTempStore(approvalNo); break; // 점포
		case 4 : tempApproval = mapper.selectTempExpense(approvalNo); break; // 점포
		// case 5 : 발주 추가
		}
		tempData.put("tempApproval", tempApproval);
		
//		log.debug(tempApproval+"==="); // 각 컬럼이 null이면 걍 null이 되는 것 같음. 컬럼값이 있는 건 잘 받아옴
		
		// 2. 결재자 리스트
		List<Approver> tempApprover = mapper.selectTempAppover(approvalNo);
		tempData.put("tempApprover", tempApprover);

		return tempData;
	}
	
	
	// 기안문 작성자 정보 조회
	@Override
	public Member selectInfo(int memberNo) {
		return mapper.selectInfo(memberNo);
	}
	
	// 부서 모든 멤버 조회
	@Override
	public List<Member> selectAllMember(String selectDepartment) {
		return mapper.selectAllMember(selectDepartment);
	}

	// 팀 멤버 조회
	@Override
	public List<Member> selectTeamMember(String selectTeam) {
		return mapper.selectTeamMember(selectTeam);
	}
	
	// 멤버 조회
	@Override
	public Member selectMember(int memberNo) {
		return mapper.selectMember(memberNo);
	}


	// 기안문 insert
	@Override
	public int insertApproval(Approval approval, List<Approver> approverList, MultipartFile approvalFile, CommandDTO command) 
			throws IllegalStateException, IOException {
	
		int result;
		
		
		// 1) 전자결재 테이블 삽입
		int resultApproval = mapper.insertApproval(approval);
		if(resultApproval == 0) return 0;
		

		// 임시저장 시 파일 삽입 안됨
		// 2) 파일 테이블 삽입
		ApprovalFile uploadFile = new ApprovalFile();
		int resultApprovalFile;
		
		log.debug(approvalFile +"===================");

		if(!approvalFile.isEmpty()) {
		
			uploadFile.setApprovalNo(approval.getApprovalNo());
			uploadFile.setApprovalFileRoute(webPath);
			uploadFile.setApprovalFileOriginName(approvalFile.getOriginalFilename());
			uploadFile.setApprovalFileRename(Util.fileRename(approvalFile.getOriginalFilename()));
			
			uploadFile.setUploadFile(approvalFile);
			
			resultApprovalFile = mapper.insertApprovalFile(uploadFile);
			if(resultApprovalFile>0) {
				uploadFile.getUploadFile().transferTo(new File(folderPath + uploadFile.getApprovalFileRename()));
			}
		}

		
		
		// 3) 휴가/퇴직/출폐점/발주 결재문서 테이블 삽입	
		// => 임시 저장시 삽입됨 임시저장 문서 재작성시 insert or update 에 따라 수정하기
		if(approval.getDocCategoryNo()!=4 && approval.getDocCategoryNo()!=5) {			
			resultApproval = mapper.insertApprovalDoc(approval);
			if(resultApproval==0) return 0;
		}				
		
		
		List<Approval> approvalList = command.getApprovalList();
		// 4) 발주 삽입
		if(approval.getDocCategoryNo()==5 && approvalList!=null) {
			
			for(Approval app : approvalList) {
				app.setApprovalNo(approval.getApprovalNo());
				app.setDocOrderDate(approval.getDocOrderDate());
			}
			resultApproval = mapper.insertOrder(approvalList);
			if(resultApproval>0) resultApproval=1;
			
		}
		
		
		// 5) 결재자 리스트 테이블 삽입
		if(!approverList.isEmpty()) {			
			for(Approver approver:approverList) {
				approver.setApprovalNo(approval.getApprovalNo()); //문서번호
			}
			
			resultApproval = mapper.insertApproverList(approverList);
			if(resultApproval>0) resultApproval=1;
		}
		
	
		if(resultApproval==1) result = 1;
		else result =0;
	
	    return result;
	}
	

	// 결재요청함 조회
	@Override
	public Map<String, Object> selectRequestApproval(int memberNo, int cp) {
		
		int listCount = mapper.searchRequestApprovalCount(memberNo);
		
		/* cp, listCount를 이용해 Pagination 객체 생성*/
		Pagination pagination = new Pagination(cp, listCount);
		
		// RowBounds 객체 생성
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		
		int limit = pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Approval> requestApprovalList = mapper.selectRequestApproval(memberNo, rowBounds);
		
		Map<String , Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("requestApprovalList",requestApprovalList);
		
		return map;
	}
	

	// 결재요청함 데이터 조회
	@Override
	public Map<String, Object> selectRequestData(int approvalNo, int docCategoryNo) {
		
		Map<String, Object> requestData = new HashMap<>();
		
		Approval requestApproval = new Approval();
		
		// 1. 기안문 데이터 + 파일 데이터 + DOC 데이터 
		switch(docCategoryNo) {
		case 0 : requestApproval = mapper.selectRequestHoliday(approvalNo); break; // 휴가
		case 1 : requestApproval = mapper.selectRequestRetirement(approvalNo); break; // 퇴직
		case 2,3 : requestApproval = mapper.selectRequestStore(approvalNo); break; // 점포
		case 4 : requestApproval = mapper.selectRequestExpense(approvalNo); break; // 점포
		// case 5 : 발주 추가
		}
		requestData.put("requestApproval", requestApproval);
		
		// 2. 결재자 리스트
		List<Approver> requestApprover = mapper.selectRequestAppover(approvalNo);
		requestData.put("requestApprover", requestApprover);
		
		
		return requestData;
	}
	
	
	
	// 회수문서함 조회
	@Override
	public List<Approval> selectReclaimApproval(int memberNo) {
		return mapper.selectReclaimApproval(memberNo);
	}

	// 문서 회수하기
	@Override
	public int reclaimApproval(int approvalNo) {
		return mapper.reclaimApproval(approvalNo);
	}
	

	/* ============================= 예리나 ================================ */
	
	/** 결재대기함 조회
	 *
	 */
	@Override
	public List<Approval> selectWaitApproval(int memberNo) {
		return mapper.selectWaitApproval(memberNo);
	}

	
	/** 결재진행함 조회
	 *
	 */
	@Override
	public List<Approval> selectProgressApproval(int memberNo) {
		return mapper.selectProgressApproval(memberNo);
	}
	
	/** 완료문서함 조회
	 *
	 */
	@Override
	public List<Approval> selectCompleteApproval(int memberNo) {
		
		// 1) 결재승인권한자가 조회하는 완료문서 리스트
		List<Approval> completeApprovalListByApprover = mapper.selectCompleteApprovalApprover(memberNo);
		
		// 2) 기안자가 조회하는 결재완료문서 리스트
		List<Approval> completeApprovalListByDrafter = mapper.selectCompleteApprovalDrafter(memberNo);
		
		// 리스트 합치기
		completeApprovalListByApprover.addAll(completeApprovalListByDrafter);
		
		return completeApprovalListByApprover;
	}
	
	
	
	/** 반려문서함 조회
	 *
	 */
	@Override
	public List<Approval> selectReturnApprovalList(int memberNo) {
		
		// 1) 자신이 반려한 문서 리스트 조회
		List<Approval> returnApprovalListByApprover = mapper.selectReturnApprovalApprover(memberNo);
		
		// 2) 기안자가 자신이 기안한 문서가 반려된 경우 리스트 조회
		List<Approval> returnApprovalListByDrafter = mapper.selectReturnApprovalDrafter(memberNo);

		// 리스트 합치기
		returnApprovalListByApprover.addAll(returnApprovalListByDrafter);
		
		
		return returnApprovalListByApprover;
	}
	
	/** 협조문서함 조회
	 *
	 */
	@Override
	public List<Approval> selectJoinApprovalList(int departmentNo) {
		return mapper.selectJoinApprovalList(departmentNo);
	}
	
	
	/** 기안서 상세조회(비동기)
	 *
	 */
	@Override
	public Approval waitApproval(int approvalNo, int docCategoryNo) {
		
		// 문서타입별 mapper 호출
		switch(docCategoryNo) {
		case 0 : return mapper.selectHolidayApproval(approvalNo); // 휴가
		case 1 : return mapper.selectRetirementApproval(approvalNo); // 퇴직
		case 2 : return mapper.selectOpenStoreApproval(approvalNo); // 출점
		case 3 : return mapper.selectCloseStoreApproval(approvalNo); // 폐점
		case 4 : return mapper.selectExpenseApproval(approvalNo); // 지출
		}
		
		// 문서타입 없을 경우 null 반환
		return null;
	}
	
	
	/** 발주기안서 상세조회(비동기)
	 *
	 */
	@Override
	public List<Approval> waitApprovalList(int approvalNo, int docCategoryNo) {
		return mapper.selectOrderApproval(approvalNo);
	}
	
	
	
	/** 결재자 목록 상세조회(비동기)
	 *
	 */
	@Override
	public List<Approver> waitApprover(int approvalNo) {
		return mapper.waitApprover(approvalNo);
	}
	
	
	
	
	/** 발주기안서 품목명 입력시 자동완성 기능
	 *
	 */
	@Override
	public List<Stock> docOrderName(String goodsName) {
		return mapper.docOrderName(goodsName);
	}
	

	/** 결재버튼 클릭 시 승인
	 *
	 */
	@Override
	public int approve(int approvalNo, int memberNo) {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("approvalNo", approvalNo);
		paramMap.put("memberNo", memberNo);
		
		return mapper.approve(paramMap);
	}
	
	
	/** 반려버튼 클릭 시 반려
	 *
	 */
	@Override
	public int returnApprove(int approvalNo, int memberNo) {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("approvalNo", approvalNo);
		paramMap.put("memberNo", memberNo);
		
		return mapper.returnApprove(paramMap);
	}
	
	

}

