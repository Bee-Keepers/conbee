
package com.keepers.conbee.approval.model.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.keepers.conbee.approval.model.dto.Approval;
import com.keepers.conbee.approval.model.dto.ApprovalFile;
import com.keepers.conbee.approval.model.dto.Approver;
import com.keepers.conbee.approval.model.mapper.ApprovalMapper;
import com.keepers.conbee.member.model.dto.Member;

import lombok.RequiredArgsConstructor;

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
	public List<Approval> selectTempSave(int memberNo) {
		return mapper.selectTempSave(memberNo);
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
	public int insertApproval(Approval approval, List<Approver> approverList, MultipartFile approvalFile) throws IllegalStateException, IOException {
	
		int result;
		
		// 1) 전자결재 테이블 삽입
		int resultApproval = mapper.insertApproval(approval);
		if(resultApproval == 0) return 0;
		
		
		
		// 2) 파일 테이블 삽입
		ApprovalFile uploadFile = new ApprovalFile();

		uploadFile.setApprovalNo(approval.getApprovalNo());
		
		if(!approvalFile.isEmpty()) {
			
			uploadFile.setApprovalFileRoute(webPath);
			uploadFile.setUploadFile(approvalFile);
			
		}
		
		int resultApprovalFile = mapper.insertApprovalFile(uploadFile);
		if(resultApprovalFile!=0) {
			uploadFile.getUploadFile().transferTo(new File(folderPath));
		}
		else resultApproval=0;
		
		
		// 3) 휴가/퇴직/출폐점/발주 결재문서 테이블 삽입	
		if(approval.getDocCategoryNo()!=4) {			
			resultApproval = mapper.insertApprovalDoc(approval);
			if(resultApproval==0) return 0;
		}				
		
		// 4) 결재자 리스트 테이블 삽입
		for(Approver approver:approverList) {
			approver.setApprovalNo(approval.getApprovalNo()); //문서번호
		}

		int resultApprover = mapper.insertApproverList(approverList);
		if(resultApprover>0) resultApprover=1;
				
	
		if(resultApproval==1 && resultApprover==1) result = 1;
		else result =0;
	
	    return result;
	}
	

	// 결재요청함 조회
	@Override
	public List<Approval> selectRequestApproval(int memberNo) {
		return mapper.selectRequestApproval(memberNo);
	}
	
	// 회수문서함 조회
	@Override
	public List<Approval> selectReclaimApproval(int memberNo) {
		return mapper.selectReclaimApproval(memberNo);
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
	

}

