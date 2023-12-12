// 승인/반려시 사용할 문서번호 전역변수 선언
let currentApprovalNo;

// 모달 헤더 전역변수 선언
const modalHeader = document.querySelectorAll(".modal-header");

// 요소 생성 코드
// createElement("input",{type:"text", name:"inputId"},["test", "aaa"])
function createElement(tag, obj, classList){
  const element = document.createElement(tag);

  for(let key in obj){
    element.setAttribute(key, obj[key]);
  }
  for(let clas of classList){
    element.classList.add(clas);
  }
  return element;
}

//======================================================================================

// 기안서 제목 클릭 시 작동되는 함수
function modal(approvalNo, docCategoryNo){

  // 기존 기안서 내용(모달바디) 지움
  const modalBody = document.querySelectorAll(".modal-body");
  for (let modal of modalBody){
    modal.remove();
  }

  console.log("모달클릭댐");
  console.log(approvalNo, docCategoryNo);

  // 기안서 상세조회 비동기 호출
  fetch('detailWaitApproval?approvalNo=' +approvalNo + '&docCategoryNo=' + docCategoryNo)
  .then(resp => resp.json())
  .then(approval => {

    currentApprovalNo = approvalNo;

    console.log(approval);

    if(docCategoryNo == 0){  // 휴가

      // 모달 속성 추가
      document.getElementById("clickModal").setAttribute("data-bs-toggle", "modal");
      document.getElementById("clickModal").setAttribute("data-bs-target", "#holidayModal");

      // 클릭 시 모달창 바로 뜨도록!
      const myModal = new bootstrap.Modal('#holidayModal', {
        keyboard: false
      });

      myModal.show();

      // 휴가기안서 템플릿 바디 생성
      const divModalBody = createElement("div", {"style" : "width: 800px; height: 800px;"},["modal-body"]);
      const divTemp = createElement("div", {}, ["temps", "my-2", "mx-3", "p-3"]);
      
      // 템플릿 제목
      const divTempTitle = createElement("div", {"style" : "font-size:30px; font-weight: bold; text-align: center;"}, ["pt-4"]);
      divTempTitle.innerHTML = '휴가 신청서';
      
      // 템플릿 정보/승인
      const divTempBox = createElement("div", {}, ["d-flex", "justify-content-between", "mt-3"]); 
      
      // 정보
      const divInfo = createElement("div", {}, ["tempInfo","my-2", "mx-3", "px-2"]); 

      // 테이블
      const tableTemp = createElement("table", {"style":"width: 300px; border: black;"}, ["table", "table-bordered"]);
      const tableBodyTemp = createElement("tbody", {}, [])

      // 테이블 문서번호 tr
      const trNo = createElement("tr", {}, []);
      const thNo = createElement("th", {}, []);
      thNo.innerHTML = '문서번호';
      const tdNo = createElement("td", {}, []);
      tdNo.innerHTML = approval.approvalNo;

      trNo.append(thNo);
      trNo.append(tdNo);

      // 부서
      const trDepartment = createElement("tr", {}, []);
      const thDepartment = createElement("th", {}, []);
      thDepartment.innerHTML = '부 서';
      const tdDepartment = createElement("td", {}, []);

      tdDepartment.innerHTML = approval.departmentName + '(' + approval.teamName + ')';

      trDepartment.append(thDepartment);
      trDepartment.append(tdDepartment);

      // 기안자
      const trName = createElement("tr", {}, []);
      const thName = createElement("th", {}, []);
      thName.innerHTML = '기안자';
      const tdName = createElement("td", {}, []);
      tdName.innerHTML = approval.memberName;

      trName.append(thName);
      trName.append(tdName);

      // 구분(항목)
      const trCategory = createElement("tr", {}, []);
      const thCategory = createElement("th", {}, []);
      thCategory.innerHTML = '구분(항목)';
      const tdCategory = createElement("td", {}, []);
      tdCategory.innerHTML = approval.docCategoryTitle;

      trCategory.append(thCategory);
      trCategory.append(tdCategory);

      // 협조 부서
      const trCorDepartment = createElement("tr", {}, []);
      const thCorDepartment = createElement("th", {}, []);
      thCorDepartment.innerHTML = '협조 부서';
      const tdCorDepartment = createElement("td", {}, []);
      tdCorDepartment.innerHTML = approval.departmentTitle;

      trCorDepartment.append(thCorDepartment);
      trCorDepartment.append(tdCorDepartment);

      // 기안일
      const trDate = createElement("tr", {}, []);
      const thDate = createElement("th", {}, []);
      thDate.innerHTML = '기안일';
      const tdDate = createElement("td", {}, []);
      tdDate.innerHTML = approval.approvalDate;

      trDate.append(thDate);
      trDate.append(tdDate);

      // 기안자 정보 테이블 합치기
      tableBodyTemp.append(trNo, trDepartment, trName, trCategory, trCorDepartment, trDate);
      tableTemp.append(tableBodyTemp);

      divInfo.append(tableTemp);
      divTempBox.append(divInfo); // 템플릿 정보/승인에 정보 추가


      /* 결재자 승인 */
      // 결재자 불러오기(비동기)
      fetch('selectWaitApprover?approvalNo=' +approval.approvalNo)
      .then(resp => resp.json())
      .then(approverList => {
        console.log(approval.approvalNo);
        console.log(approverList);
        // 승인 div
        const divApprov = createElement("div", {}, ["tempApprov", "my-2", "mx-3", "px-2", "d-flex"])

        // 결재자 수만큼 요소 만들기
        for(let approver of approverList){

          // 결재 테이블
          const tableApprov = createElement("table", {"style":"width: 80px; height:160px; border: black; text-align: center;"}, ["table", "table-bordered"])
          const tableBodyApprov = createElement("tbody", {}, [])
          
          const trApprovTitle = createElement("tr", {}, []);
          const thApprovTitle = createElement("th", {"style":"background-color: #f2f2f2; vertical-align: middle; height:30px;"}, []);
          thApprovTitle.innerHTML = '결재';
          trApprovTitle.append(thApprovTitle);

          // 도장/결재자명
          const trApprovContent = createElement("tr", {}, []);

          switch(approver.approverCondition){
            case 0 :  // 미승인
              const tdNonApprovContent = createElement("td", {"style":"height: 87px; vertical-align: middle;"}, []);  
              const divNonApprovContent = createElement("div", {}, []);
              
              divNonApprovContent.innerHTML=approver.memberName; // 결재자명

              tdNonApprovContent.append(divNonApprovContent);

              trApprovContent.append(tdNonApprovContent);
            break; 

            case 1 :  // 승인
              const tdApprovContent = createElement("td", {}, []);  
              const divApprovContent = createElement("div", {"style":"height: 46px;"}, []);
              const imgApprovContent = createElement("img", {"src":"/images/approval/stamp_approve.png", "width":"38px", "alt":"stamp"}, []);
              const divApprovContent2 = createElement("div", {}, []); // 결재자명
              
              divApprovContent2.innerHTML=approver.memberName; // 결재자명

              divApprovContent.append(imgApprovContent);
              tdApprovContent.append(divApprovContent, divApprovContent2);

              trApprovContent.append(tdApprovContent);

            break;

            case 2 :  // 반려
              const tdReturnContent = createElement("td", {}, []);  
              const divReturnContent = createElement("div", {"style":"height: 46px;"}, []);
              const imgReturnContent = createElement("img", {"src":"/images/approval/stamp_return.png", "width":"38px", "alt":"stamp"}, []);
              const divReturnContent2 = createElement("div", {}, []); // 결재자명
              
              divReturnContent2.innerHTML=approver.memberName; // 결재자명

              divReturnContent.append(imgReturnContent);
              tdReturnContent.append(divReturnContent, divReturnContent2);

              trApprovContent.append(tdReturnContent);
            
            break;
          } // 결재도장 switch문 끝

          // 승인 날짜
          const trApprovDate = createElement("tr", {"style":"font-size:10px; height:30px;"}, []);
          const tdApprovDate = createElement("td", {}, []);

          // 승인이 되어있으면 승인날짜 표시, 없으면 ''표시
          if(approver.approverCondition == 0){ // 미승인인 경우
            tdApprovDate.innerHTML = '미승인';
          } else {
            tdApprovDate.innerHTML = approver.approverDate;
          }

          trApprovDate.append(tdApprovDate);


          // 테이블에 tr들 모두 합치기
          tableBodyApprov.append(trApprovTitle, trApprovContent, trApprovDate);
          tableApprov.append(tableBodyApprov);
          divApprov.append(tableApprov);
        }

        // 템플릿정보/승인 div에 승인도장 추가
        divTempBox.append(divApprov);

      }) // 결재자 불러오기(비동기) 끝

      
      /* 본문 */
      const divTempContents = createElement("div", {}, ["tempContents", "my-2", "mx-3", "px-2"]);
      const tableTempContents = createElement("table", {"style":"width: 100%; border: black;"}, ["table", "table-bordered"]);
      const tableBodyTempContents = createElement("tbody", {}, [])

      // 콜그룹 생성
      const colgroupTempContents = createElement("colgroup", {}, []);
      const colTempContents = createElement("col", {"width": '20%'}, []);
      const colTempContents2 = createElement("col", {"width": '80%'}, []);
      colgroupTempContents.append(colTempContents, colTempContents2);
      tableTempContents.append(colgroupTempContents);

      // 문서 제목
      const trTempContentsTitle = createElement("tr", {}, []);
      const thTempContentsTitle = createElement("th", {}, []);
      thTempContentsTitle.innerHTML='제 목';
      const tdTempContentsTitle = createElement("td", {}, []);
      tdTempContentsTitle.innerHTML=approval.approvalTitle; 

      trTempContentsTitle.append(thTempContentsTitle, tdTempContentsTitle);

      // 휴가 시작일
      const trTempContentsStartDate = createElement("tr", {}, []);
      const thTempContentsStartDate = createElement("th", {}, []);
      thTempContentsStartDate.innerHTML='휴가 시작일';
      const tdTempContentsStartDate = createElement("td", {}, []);
      tdTempContentsStartDate.innerHTML=approval.docHolidayStart; 

      trTempContentsStartDate.append(thTempContentsStartDate, tdTempContentsStartDate);

      // 휴가 종료일
      const trTempContentsEndDate = createElement("tr", {}, []);
      const thTempContentsEndDate = createElement("th", {}, []);
      thTempContentsEndDate.innerHTML='휴가 종료일';
      const tdTempContentsEndDate = createElement("td", {}, []);
      tdTempContentsEndDate.innerHTML=approval.docHolidayEnd; 

      trTempContentsEndDate.append(thTempContentsEndDate, tdTempContentsEndDate);

      // 상세 내용
      const trTempContentsDetail = createElement("tr", {}, []);
      const thTempContentsDetail = createElement("th", {"style":"vertical-align: middle;"}, []);
      thTempContentsDetail.innerHTML='상세 내용';
      const tdTempContentsDetail = createElement("td", {}, []);
      tdTempContentsDetail.innerHTML=approval.approvalContent; 

      trTempContentsDetail.append(thTempContentsDetail, tdTempContentsDetail);


      // 첨부 파일 ()
      const trTempContentsFile = createElement("tr", {}, []);
      const thTempContentsFile = createElement("th", {}, []);
      thTempContentsFile.innerHTML='첨부파일';

      const tdTempContentsFile = createElement("td", {}, []);
      const aTempContentsFile = createElement("a", {"href":approval.approvalFileRoute + approval.approvalFileReName, "style":"text-decoration: none;","download":approval.approvalFileOriginName}, []);
      aTempContentsFile.innerHTML=approval.approvalFileOriginName;

      tdTempContentsFile.append(aTempContentsFile);
      trTempContentsFile.append(thTempContentsFile, tdTempContentsFile);

      // 본문 테이블에 tr들 합치기
      tableBodyTempContents.append(trTempContentsTitle, trTempContentsStartDate, trTempContentsEndDate, trTempContentsDetail, trTempContentsFile);
      tableTempContents.append(tableBodyTempContents);
      divTempContents.append(tableTempContents);

      // 전체 템플릿에 템플릿제목, 정보/승인, 본문 추가
      divTemp.append(divTempTitle, divTempBox, divTempContents); 
      divModalBody.append(divTemp);

      // 목록에 추가하기
      modalHeader[0].after(divModalBody);

      console.log(modalHeader[0]);

    }
    /* ---------------------------------------------------------- */
    else if(docCategoryNo == 1){ //퇴직

      // 모달 속성 추가
      document.getElementById("clickModal").setAttribute("data-bs-toggle", "modal");
      document.getElementById("clickModal").setAttribute("data-bs-target", "#retirementModal");

      // 클릭 시 모달창 바로 뜨도록!
      const myModal = new bootstrap.Modal('#retirementModal', {
        keyboard: false
      });

      myModal.show();

      // 사직서 템플릿 바디 생성
      const divModalBody = createElement("div", {"style" : "width: 800px; height: 800px;"},["modal-body"]);
      const divTemp = createElement("div", {}, ["temps", "my-2", "mx-3", "p-3"]);
      
      // 템플릿 제목
      const divTempTitle = createElement("div", {"style" : "font-size:30px; font-weight: bold; text-align: center;"}, ["pt-4"]);
      divTempTitle.innerHTML = '사직서';
      
      // 템플릿 정보/승인
      const divTempBox = createElement("div", {}, ["d-flex", "justify-content-between", "mt-3"]); 
      
      // 정보
      const divInfo = createElement("div", {}, ["tempInfo","my-2", "mx-3", "px-2"]); 

      // 테이블
      const tableTemp = createElement("table", {"style":"width: 300px; border: black;"}, ["table", "table-bordered"]);
      const tableBodyTemp = createElement("tbody", {}, [])

      // 테이블 문서번호 tr
      const trNo = createElement("tr", {}, []);
      const thNo = createElement("th", {}, []);
      thNo.innerHTML = '문서번호';
      const tdNo = createElement("td", {}, []);
      tdNo.innerHTML = approval.approvalNo;

      trNo.append(thNo);
      trNo.append(tdNo);

      // 부서
      const trDepartment = createElement("tr", {}, []);
      const thDepartment = createElement("th", {}, []);
      thDepartment.innerHTML = '부 서';
      const tdDepartment = createElement("td", {}, []);

      tdDepartment.innerHTML = approval.departmentName + '(' + approval.teamName + ')';

      trDepartment.append(thDepartment);
      trDepartment.append(tdDepartment);

      // 기안자
      const trName = createElement("tr", {}, []);
      const thName = createElement("th", {}, []);
      thName.innerHTML = '기안자';
      const tdName = createElement("td", {}, []);
      tdName.innerHTML = approval.memberName;

      trName.append(thName);
      trName.append(tdName);

      // 구분(항목)
      const trCategory = createElement("tr", {}, []);
      const thCategory = createElement("th", {}, []);
      thCategory.innerHTML = '구분(항목)';
      const tdCategory = createElement("td", {}, []);
      tdCategory.innerHTML = approval.docCategoryTitle;

      trCategory.append(thCategory);
      trCategory.append(tdCategory);

      // 협조 부서
      const trCorDepartment = createElement("tr", {}, []);
      const thCorDepartment = createElement("th", {}, []);
      thCorDepartment.innerHTML = '협조 부서';
      const tdCorDepartment = createElement("td", {}, []);
      tdCorDepartment.innerHTML = approval.departmentTitle;

      trCorDepartment.append(thCorDepartment);
      trCorDepartment.append(tdCorDepartment);

      // 기안일
      const trDate = createElement("tr", {}, []);
      const thDate = createElement("th", {}, []);
      thDate.innerHTML = '기안일';
      const tdDate = createElement("td", {}, []);
      tdDate.innerHTML = approval.approvalDate;

      trDate.append(thDate);
      trDate.append(tdDate);

      // 기안자 정보 테이블 합치기
      tableBodyTemp.append(trNo, trDepartment, trName, trCategory, trCorDepartment, trDate);
      tableTemp.append(tableBodyTemp);

      divInfo.append(tableTemp);
      divTempBox.append(divInfo); // 템플릿 정보/승인에 정보 추가


      /* 결재자 승인 */
      // 결재자 불러오기(비동기)
      fetch('selectWaitApprover?approvalNo=' +approval.approvalNo)
      .then(resp => resp.json())
      .then(approverList => {

        // 승인 div
        const divApprov = createElement("div", {}, ["tempApprov", "my-2", "mx-3", "px-2", "d-flex"])

        // 결재자 수만큼 요소 만들기
        for(let approver of approverList){

          // 결재 테이블
          const tableApprov = createElement("table", {"style":"width: 80px; height:160px; border: black; text-align: center;"}, ["table", "table-bordered"])
          const tableBodyApprov = createElement("tbody", {}, [])
          
          const trApprovTitle = createElement("tr", {}, []);
          const thApprovTitle = createElement("th", {"style":"background-color: #f2f2f2; vertical-align: middle; height:30px;"}, []);
          thApprovTitle.innerHTML = '결재';
          trApprovTitle.append(thApprovTitle);

          // 도장/결재자명
          const trApprovContent = createElement("tr", {}, []);

          switch(approver.approverCondition){
            case 0 :  // 미승인
              const tdNonApprovContent = createElement("td", {"style":"height: 87px; vertical-align: middle;"}, []);  
              const divNonApprovContent = createElement("div", {}, []);
              
              divNonApprovContent.innerHTML=approver.memberName; // 결재자명

              tdNonApprovContent.append(divNonApprovContent);

              trApprovContent.append(tdNonApprovContent);
            break; 

            case 1 :  // 승인
              const tdApprovContent = createElement("td", {}, []);  
              const divApprovContent = createElement("div", {"style":"height: 46px;"}, []);
              const imgApprovContent = createElement("img", {"src":"/images/approval/stamp_approve.png", "width":"38px", "alt":"stamp"}, []);
              const divApprovContent2 = createElement("div", {}, []); // 결재자명
              
              divApprovContent2.innerHTML=approver.memberName; // 결재자명

              divApprovContent.append(imgApprovContent);
              tdApprovContent.append(divApprovContent, divApprovContent2);

              trApprovContent.append(tdApprovContent);

            break;

            case 2 :  // 반려
              const tdReturnContent = createElement("td", {}, []);  
              const divReturnContent = createElement("div", {"style":"height: 46px;"}, []);
              const imgReturnContent = createElement("img", {"src":"/images/approval/stamp_return.png", "width":"38px", "alt":"stamp"}, []);
              const divReturnContent2 = createElement("div", {}, []); // 결재자명
              
              divReturnContent2.innerHTML=approver.memberName; // 결재자명

              divReturnContent.append(imgReturnContent);
              tdReturnContent.append(divReturnContent, divReturnContent2);

              trApprovContent.append(tdReturnContent);
            
            break;
          } // 결재도장 switch문 끝

          // 승인 날짜
          const trApprovDate = createElement("tr", {"style":"font-size:10px; height:30px;"}, []);
          const tdApprovDate = createElement("td", {}, []);

          // 승인이 되어있으면 승인날짜 표시, 없으면 ''표시
          if(approver.approverCondition == 0){ // 미승인인 경우
            tdApprovDate.innerHTML = '미승인';
          } else {
            tdApprovDate.innerHTML = approver.approverDate;
          }

          trApprovDate.append(tdApprovDate);


          // 테이블에 tr들 모두 합치기
          tableBodyApprov.append(trApprovTitle, trApprovContent, trApprovDate);
          tableApprov.append(tableBodyApprov);
          divApprov.append(tableApprov);
        }

        // 템플릿정보/승인 div에 승인도장 추가
        divTempBox.append(divApprov);

      }) // 결재자 불러오기(비동기) 끝

      
      /* 본문 */
      const divTempContents = createElement("div", {}, ["tempContents", "my-2", "mx-3", "px-2"]);
      const tableTempContents = createElement("table", {"style":"width: 100%; border: black;"}, ["table", "table-bordered"]);
      const tableBodyTempContents = createElement("tbody", {}, [])

      // 콜그룹 생성
      const colgroupTempContents = createElement("colgroup", {}, []);
      const colTempContents = createElement("col", {"width": '20%'}, []);
      const colTempContents2 = createElement("col", {"width": '80%'}, []);
      colgroupTempContents.append(colTempContents, colTempContents2);
      tableTempContents.append(colgroupTempContents);

      // 문서 제목
      const trTempContentsTitle = createElement("tr", {}, []);
      const thTempContentsTitle = createElement("th", {}, []);
      thTempContentsTitle.innerHTML='제 목';
      const tdTempContentsTitle = createElement("td", {}, []);
      tdTempContentsTitle.innerHTML=approval.approvalTitle; 

      trTempContentsTitle.append(thTempContentsTitle, tdTempContentsTitle);

      // 퇴직 예정일
      const trTempContentsRetireDate = createElement("tr", {}, []);
      const thTempContentsRetireDate = createElement("th", {}, []);
      thTempContentsRetireDate.innerHTML='퇴직 예정일';
      const tdTempContentsRetireDate = createElement("td", {}, []);
      tdTempContentsRetireDate.innerHTML=approval.docRetireDate; 

      trTempContentsRetireDate.append(thTempContentsRetireDate, tdTempContentsRetireDate);

      // 상세 내용
      const trTempContentsDetail = createElement("tr", {}, []);
      const thTempContentsDetail = createElement("th", {"style":"vertical-align: middle;"}, []);
      thTempContentsDetail.innerHTML='상세 내용';
      const tdTempContentsDetail = createElement("td", {}, []);
      tdTempContentsDetail.innerHTML=approval.approvalContent; 

      trTempContentsDetail.append(thTempContentsDetail, tdTempContentsDetail);

      // 첨부 파일 ()
      const trTempContentsFile = createElement("tr", {}, []);
      const thTempContentsFile = createElement("th", {}, []);
      thTempContentsFile.innerHTML='첨부파일';

      const tdTempContentsFile = createElement("td", {}, []);
      const aTempContentsFile = createElement("a", {"href":approval.approvalFileRoute + approval.approvalFileReName, "style":"text-decoration: none;","download":approval.approvalFileOriginName}, []);
      aTempContentsFile.innerHTML=approval.approvalFileOriginName;

      tdTempContentsFile.append(aTempContentsFile);
      trTempContentsFile.append(thTempContentsFile, tdTempContentsFile);

      // 본문 테이블에 tr들 합치기
      tableBodyTempContents.append(trTempContentsTitle, trTempContentsRetireDate, trTempContentsDetail, trTempContentsFile);
      tableTempContents.append(tableBodyTempContents);
      divTempContents.append(tableTempContents);

      // 전체 템플릿에 템플릿제목, 정보/승인, 본문 추가
      divTemp.append(divTempTitle, divTempBox, divTempContents); 
      divModalBody.append(divTemp);

      // 목록에 추가하기
      modalHeader[1].after(divModalBody);

      console.log(modalHeader[1]);

    }
    /* ---------------------------------------------------------- */
    else if(docCategoryNo == 2){ // 출점

      // 목록에 추가하기
      modalHeader[2].after(divModalBody);

    } 
    /* ---------------------------------------------------------- */
    else if(docCategoryNo == 3){ // 폐점
      console.log(object);

      // 목록에 추가하기
      modalHeader[3].after(divModalBody);

    } 
    
    /* ---------------------------------------------------------- */
    else if(docCategoryNo == 4){ // 지출

      // 모달 속성 추가
      document.getElementById("clickModal").setAttribute("data-bs-toggle", "modal");
      document.getElementById("clickModal").setAttribute("data-bs-target", "#expenseModal");

      // 클릭 시 모달창 바로 뜨도록!
      const myModal = new bootstrap.Modal('#expenseModal', {
        keyboard: false
      });

      myModal.show();

      // 템플릿 바디 생성
      const divModalBody = createElement("div", {"style" : "width: 800px; height: 800px;"},["modal-body", "d-flex", "flex-column"]);
      const divTemp = createElement("div", {}, ["temps", "my-2", "mx-3", "p-3"]);
      
      // 템플릿 제목
      const divTempTitle = createElement("div", {"style" : "font-size:30px; font-weight: bold; text-align: center;"}, ["pt-4"]);
      divTempTitle.innerHTML = '지 출 결 의 서';
      
      // 템플릿 정보/승인
      const divTempBox = createElement("div", {}, ["d-flex", "justify-content-between", "mt-3"]); 
      
      // 정보
      const divInfo = createElement("div", {}, ["tempInfo","my-2", "mx-3", "px-2"]); 

      // 테이블
      const tableTemp = createElement("table", {"style":"width: 300px; border: black;"}, ["table", "table-bordered"]);
      const tableBodyTemp = createElement("tbody", {}, [])

      // 테이블 문서번호 tr
      const trNo = createElement("tr", {}, []);
      const thNo = createElement("th", {}, []);
      thNo.innerHTML = '문서번호';
      const tdNo = createElement("td", {}, []);
      tdNo.innerHTML = approval.approvalNo;

      trNo.append(thNo);
      trNo.append(tdNo);

      // 부서
      const trDepartment = createElement("tr", {}, []);
      const thDepartment = createElement("th", {}, []);
      thDepartment.innerHTML = '부 서';
      const tdDepartment = createElement("td", {}, []);

      tdDepartment.innerHTML = approval.departmentName + '(' + approval.teamName + ')';

      trDepartment.append(thDepartment);
      trDepartment.append(tdDepartment);

      // 기안자
      const trName = createElement("tr", {}, []);
      const thName = createElement("th", {}, []);
      thName.innerHTML = '기안자';
      const tdName = createElement("td", {}, []);
      tdName.innerHTML = approval.memberName;

      trName.append(thName);
      trName.append(tdName);

      // 구분(항목)
      const trCategory = createElement("tr", {}, []);
      const thCategory = createElement("th", {}, []);
      thCategory.innerHTML = '구분(항목)';
      const tdCategory = createElement("td", {}, []);
      tdCategory.innerHTML = approval.docCategoryTitle;

      trCategory.append(thCategory);
      trCategory.append(tdCategory);

      // 협조 부서
      const trCorDepartment = createElement("tr", {}, []);
      const thCorDepartment = createElement("th", {}, []);
      thCorDepartment.innerHTML = '협조 부서';
      const tdCorDepartment = createElement("td", {}, []);
      tdCorDepartment.innerHTML = approval.departmentTitle;

      trCorDepartment.append(thCorDepartment);
      trCorDepartment.append(tdCorDepartment);

      // 기안일
      const trDate = createElement("tr", {}, []);
      const thDate = createElement("th", {}, []);
      thDate.innerHTML = '기안일';
      const tdDate = createElement("td", {}, []);
      tdDate.innerHTML = approval.approvalDate;

      trDate.append(thDate);
      trDate.append(tdDate);

      // 기안자 정보 테이블 합치기
      tableBodyTemp.append(trNo, trDepartment, trName, trCategory, trCorDepartment, trDate);
      tableTemp.append(tableBodyTemp);

      divInfo.append(tableTemp);
      divTempBox.append(divInfo); // 템플릿 정보/승인에 정보 추가


      /* 결재자 승인 */
      // 결재자 불러오기(비동기)
      fetch('selectWaitApprover?approvalNo=' +approval.approvalNo)
      .then(resp => resp.json())
      .then(approverList => {

        // 승인 div
        const divApprov = createElement("div", {}, ["tempApprov", "my-2", "mx-3", "px-2", "d-flex"])

        // 결재자 수만큼 요소 만들기
        for(let approver of approverList){

          // 결재 테이블
          const tableApprov = createElement("table", {"style":"width: 80px; height:160px; border: black; text-align: center;"}, ["table", "table-bordered"])
          const tableBodyApprov = createElement("tbody", {}, [])
          
          const trApprovTitle = createElement("tr", {}, []);
          const thApprovTitle = createElement("th", {"style":"background-color: #f2f2f2; vertical-align: middle; height:30px;"}, []);
          thApprovTitle.innerHTML = '결재';
          trApprovTitle.append(thApprovTitle);

          // 도장/결재자명
          const trApprovContent = createElement("tr", {}, []);

          switch(approver.approverCondition){
            case 0 :  // 미승인
              const tdNonApprovContent = createElement("td", {"style":"height: 87px; vertical-align: middle;"}, []);  
              const divNonApprovContent = createElement("div", {}, []);
              
              divNonApprovContent.innerHTML=approver.memberName; // 결재자명

              tdNonApprovContent.append(divNonApprovContent);

              trApprovContent.append(tdNonApprovContent);
            break; 

            case 1 :  // 승인
              const tdApprovContent = createElement("td", {}, []);  
              const divApprovContent = createElement("div", {"style":"height: 46px;"}, []);
              const imgApprovContent = createElement("img", {"src":"/images/approval/stamp_approve.png", "width":"38px", "alt":"stamp"}, []);
              const divApprovContent2 = createElement("div", {}, []); // 결재자명
              
              divApprovContent2.innerHTML=approver.memberName; // 결재자명

              divApprovContent.append(imgApprovContent);
              tdApprovContent.append(divApprovContent, divApprovContent2);

              trApprovContent.append(tdApprovContent);

            break;

            case 2 :  // 반려
              const tdReturnContent = createElement("td", {}, []);  
              const divReturnContent = createElement("div", {"style":"height: 46px;"}, []);
              const imgReturnContent = createElement("img", {"src":"/images/approval/stamp_return.png", "width":"38px", "alt":"stamp"}, []);
              const divReturnContent2 = createElement("div", {}, []); // 결재자명
              
              divReturnContent2.innerHTML=approver.memberName; // 결재자명

              divReturnContent.append(imgReturnContent);
              tdReturnContent.append(divReturnContent, divReturnContent2);

              trApprovContent.append(tdReturnContent);
            
            break;
          } // 결재도장 switch문 끝

          // 승인 날짜
          const trApprovDate = createElement("tr", {"style":"font-size:10px; height:30px;"}, []);
          const tdApprovDate = createElement("td", {}, []);

          // 승인이 되어있으면 승인날짜 표시, 없으면 ''표시
          if(approver.approverCondition == 0){ // 미승인인 경우
            tdApprovDate.innerHTML = '미승인';
          } else {
            tdApprovDate.innerHTML = approver.approverDate;
          }

          trApprovDate.append(tdApprovDate);


          // 테이블에 tr들 모두 합치기
          tableBodyApprov.append(trApprovTitle, trApprovContent, trApprovDate);
          tableApprov.append(tableBodyApprov);
          divApprov.append(tableApprov);
        }

        // 템플릿정보/승인 div에 승인도장 추가
        divTempBox.append(divApprov);

      }) // 결재자 불러오기(비동기) 끝

      
      /* 본문 */
      const divTempContents = createElement("div", {}, ["tempContents", "my-2", "mx-3", "px-2"]);
      const tableTempContents = createElement("table", {"style":"width: 100%; border: black;"}, ["table", "table-bordered"]);
      const tableBodyTempContents = createElement("tbody", {}, [])

      // 콜그룹 생성
      const colgroupTempContents = createElement("colgroup", {}, []);
      const colTempContents = createElement("col", {"width": '20%'}, []);
      const colTempContents2 = createElement("col", {"width": '80%'}, []);
      colgroupTempContents.append(colTempContents, colTempContents2);
      tableTempContents.append(colgroupTempContents);

      // 문서 제목
      const trTempContentsTitle = createElement("tr", {}, []);
      const thTempContentsTitle = createElement("th", {}, []);
      thTempContentsTitle.innerHTML='제 목';
      const tdTempContentsTitle = createElement("td", {}, []);
      tdTempContentsTitle.innerHTML=approval.approvalTitle; 

      trTempContentsTitle.append(thTempContentsTitle, tdTempContentsTitle);

      // 상세 내용
      const trTempContentsDetail = createElement("tr", {}, []);
      const thTempContentsDetail = createElement("th", {"style":"vertical-align: middle;"}, []);
      thTempContentsDetail.innerHTML='상세 내용';
      const tdTempContentsDetail = createElement("td", {}, []);
      tdTempContentsDetail.innerHTML=approval.approvalContent; 

      trTempContentsDetail.append(thTempContentsDetail, tdTempContentsDetail);

      // 첨부 파일 ()
      const trTempContentsFile = createElement("tr", {}, []);
      const thTempContentsFile = createElement("th", {}, []);
      thTempContentsFile.innerHTML='첨부파일';

      const tdTempContentsFile = createElement("td", {}, []);
      const aTempContentsFile = createElement("a", {"href":approval.approvalFileRoute + approval.approvalFileReName, "style":"text-decoration: none;","download":approval.approvalFileOriginName}, []);
      aTempContentsFile.innerHTML=approval.approvalFileOriginName;

      tdTempContentsFile.append(aTempContentsFile);
      trTempContentsFile.append(thTempContentsFile, tdTempContentsFile);

      // 본문 테이블에 tr들 합치기
      tableBodyTempContents.append(trTempContentsTitle, trTempContentsDetail, trTempContentsFile);
      tableTempContents.append(tableBodyTempContents);
      divTempContents.append(tableTempContents);

      // 전체 템플릿에 템플릿제목, 정보/승인, 본문 추가
      divTemp.append(divTempTitle, divTempBox, divTempContents); 
      divModalBody.append(divTemp);

      // 목록에 추가하기
      modalHeader[4].after(divModalBody);

    }


    /* ---------------------------------------------------------- */
    else if(docCategoryNo == 5){ // 발주
      console.log(object);

      // 목록에 추가하기
      modalHeader[5].after(divModalBody);
    }
  })
  .catch((e)=>console.log(e));
} 


//======================================================================================


// 결재 버튼 클릭 시 작동함수
function approveBtn(){
  if(currentApprovalNo == undefined) return;
  location.href="approve?approvalNo=" + currentApprovalNo;
}

// 반려 버튼 클릭 시 작동함수
function returnBtn(){
  if(currentApprovalNo == undefined) return;
  location.href="returnApprove?approvalNo=" + currentApprovalNo;
}
