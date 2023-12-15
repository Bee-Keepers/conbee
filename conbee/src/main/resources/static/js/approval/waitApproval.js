// 승인/반려시 사용할 문서번호 전역변수 선언
let currentApprovalNo;

// 승인/반려시 사용할 기안자 회원번호 전역변수 선언
let currentApprovalMemberNo;

// 기안문 문서타입 전역변수 선언
let currentApprovaldocCategoryNo;

// 기안문 문서명 전역변수 선언
let currentApprovaldocTitle;

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

  if(docCategoryNo == 5){ // 발주

    // 발주기안서 상세조회 비동기 호출
    fetch('detailWaitApprovalList?approvalNo=' +approvalNo + '&docCategoryNo=' + docCategoryNo)
    .then(resp => resp.json())
    .then(approval => {

      console.log(approval.length);

      currentApprovalNo = approval[0].approvalNo; // 기안서 문서번호 전역변수 대입
      currentApprovalMemberNo = approval[0].memberNo; // 기안자 회원번호 전역변수 대입
      currentApprovaldocCategoryNo = approval[0].docCategoryNo;
      currentApprovaldocTitle = '발주기안서';

      // 모달 속성 추가
      document.getElementById("clickModal").setAttribute("data-bs-toggle", "modal");
      document.getElementById("clickModal").setAttribute("data-bs-target", "#orderModal");

      // 클릭 시 모달창 바로 뜨도록!
      const myModal = new bootstrap.Modal('#orderModal', {
        keyboard: false
      });

      myModal.show();

      // 발주기안서 템플릿 바디 생성
      const divModalBody = createElement("div", {"style" : "width: 800px; height: 800px;"},["modal-body", "pdfCanvas"]);
      const divTemp = createElement("div", {}, ["my-2", "mx-3", "p-3"]);
      
      // 템플릿 제목
      const divTempTitle = createElement("div", {"style" : "font-size:30px; font-weight: bold; text-align: center;"}, ["pt-4"]);
      divTempTitle.innerHTML = '발 주 기 안 서';
      
      // 템플릿 정보/승인
      const divTempBox = createElement("div", {}, ["d-flex", "justify-content-between", "mt-3"]); 
      
      // 정보
      const divInfo = createElement("div", {}, ["tempInfo","my-2", "mx-3", "px-2"]); 

      // 테이블
      const tableTemp = createElement("table", {"style":"width: 300px; border: black;"}, ["table", "table-bordered"]);
      const tableBodyTemp = createElement("tbody", {}, [])

      // 테이블 문서번호 tr
      const trNo = createElement("tr", {}, []);
      const thNo = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thNo.innerHTML = '문서번호';
      const tdNo = createElement("td", {}, []);
      tdNo.innerHTML = approval[0].approvalNo;

      trNo.append(thNo);
      trNo.append(tdNo);

      // 부서
      const trDepartment = createElement("tr", {}, []);
      const thDepartment = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thDepartment.innerHTML = '부 서';
      const tdDepartment = createElement("td", {}, []);

      tdDepartment.innerHTML = approval[0].departmentName + '(' + approval[0].teamName + ')';

      trDepartment.append(thDepartment);
      trDepartment.append(tdDepartment);

      // 기안자
      const trName = createElement("tr", {}, []);
      const thName = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thName.innerHTML = '기안자';
      const tdName = createElement("td", {}, []);
      tdName.innerHTML = approval[0].memberName;

      trName.append(thName);
      trName.append(tdName);

      // 구분(항목)
      const trCategory = createElement("tr", {}, []);
      const thCategory = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thCategory.innerHTML = '구분(항목)';
      const tdCategory = createElement("td", {}, []);
      tdCategory.innerHTML = approval[0].docCategoryTitle;

      trCategory.append(thCategory);
      trCategory.append(tdCategory);

      // 협조 부서
      const trCorDepartment = createElement("tr", {}, []);
      const thCorDepartment = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thCorDepartment.innerHTML = '협조 부서';
      const tdCorDepartment = createElement("td", {}, []);
      tdCorDepartment.innerHTML = approval[0].departmentTitle;

      trCorDepartment.append(thCorDepartment);
      trCorDepartment.append(tdCorDepartment);

      // 기안일
      const trDate = createElement("tr", {}, []);
      const thDate = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thDate.innerHTML = '기안일';
      const tdDate = createElement("td", {}, []);
      tdDate.innerHTML = approval[0].approvalDate;

      trDate.append(thDate);
      trDate.append(tdDate);

      // 기안자 정보 테이블 합치기
      tableBodyTemp.append(trNo, trDepartment, trName, trCategory, trCorDepartment, trDate);
      tableTemp.append(tableBodyTemp);

      divInfo.append(tableTemp);
      divTempBox.append(divInfo); // 템플릿 정보/승인에 정보 추가


      /* 결재자 승인 */
      // 결재자 불러오기(비동기)
      fetch('selectWaitApprover?approvalNo=' +approval[0].approvalNo)
      .then(resp => resp.json())
      .then(approverList => {
        console.log(approval[0].approvalNo);
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
              const tdNonApprovContent = createElement("td", {"style":"height: 96px; vertical-align: middle;"}, []);  
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
      const tableHeadTempContents = createElement("thead", {}, [])

      // 콜그룹 생성
      const colgroupTempContents = createElement("colgroup", {}, []);
      const colTempContents = createElement("col", {"width": '15%'}, []);
      const colTempContents2 = createElement("col", {"width": '30%'}, []);
      const colTempContents3 = createElement("col", {"width": '10%'}, []);
      const colTempContents4 = createElement("col", {"width": '15%'}, []);
      const colTempContents5 = createElement("col", {"width": '15%'}, []);
      colgroupTempContents.append(colTempContents, colTempContents2, colTempContents3, colTempContents4, colTempContents5);
      tableHeadTempContents.append(colgroupTempContents);

      // 문서 제목
      const trTempContentsTitle = createElement("tr", {}, []);
      const thTempContentsTitle = createElement("th", {"style":"text-align : center;  background-color: #f2f2f2;"}, []);
      thTempContentsTitle.innerHTML='제 목';
      const tdTempContentsTitle = createElement("td", {"colspan":"4"}, []);
      tdTempContentsTitle.innerHTML=approval[0].approvalTitle; 

      trTempContentsTitle.append(thTempContentsTitle, tdTempContentsTitle);
      tableHeadTempContents.append(trTempContentsTitle);

      // 납기일
      const trTempContentsStartDate = createElement("tr", {}, []);
      const thTempContentsStartDate = createElement("th", {"style":"text-align : center; background-color: #f2f2f2;"}, []);
      thTempContentsStartDate.innerHTML='납기일';
      const tdTempContentsStartDate = createElement("td", {"colspan":"4"}, []);
      tdTempContentsStartDate.innerHTML=approval[0].docOrderDate; 

      trTempContentsStartDate.append(thTempContentsStartDate, tdTempContentsStartDate);
      tableHeadTempContents.append(trTempContentsStartDate);

      // 품목 내역 헤더
      const trTempContentsList = createElement("tr", {}, []);
      
      const thTempContentsList1 = createElement("th", {"style":"text-align : center; background-color: #f2f2f2;"}, []);
      thTempContentsList1.innerHTML='No.';
      
      const thTempContentsList2 = createElement("th", {"style":"text-align : center; background-color: #f2f2f2;"}, []);
      thTempContentsList2.innerHTML='품목명';
      
      const thTempContentsList3 = createElement("th", {"style":"text-align : center; background-color: #f2f2f2;"}, []);
      thTempContentsList3.innerHTML='수량';
      
      const thTempContentsList4 = createElement("th", {"style":"text-align : center; background-color: #f2f2f2;"}, []);
      thTempContentsList4.innerHTML='단가';
      
      const thTempContentsList5 = createElement("th", {"style":"text-align : center; background-color: #f2f2f2;"}, []);
      thTempContentsList5.innerHTML='금액';

      trTempContentsList.append(thTempContentsList1, thTempContentsList2, thTempContentsList3, thTempContentsList4, thTempContentsList5 );
      tableHeadTempContents.append(trTempContentsList);

      //------thead 끝
      //------tbody 시작

      const tableBodyTempContents = createElement("tbody", {}, []);
      let orderSum = 0; // 합계금액 저장할 변수

      // 발주서 내용 for문 돌리기
      for (let i = 0; i<approval.length; i++){
        const trGoodsList = createElement("tr", {}, ["orderRow"]);

        const tdGoodsListNo = createElement("td", {"style":"text-align : center"}, []);
        tdGoodsListNo.innerHTML=i+1 // No.

        const tdGoodsListName = createElement("td", {}, []);
        tdGoodsListName.innerHTML= approval[i].docOrderGoodsName; // 품목명

        const tdGoodsListAmount = createElement("td", {"style":"text-align: center;"}, []);
        tdGoodsListAmount.innerHTML= approval[i].docOrderAmount; // 수량

        const tdGoodsListOrderUnitPrice = createElement("td", {"style":"text-align: center;"}, []);
        tdGoodsListOrderUnitPrice.innerHTML= approval[i].docOrderUnitPrice; // 단가

        const tdGoodsListOrderPrice = createElement("td", {"style":"text-align: center;"}, []);
        tdGoodsListOrderPrice.innerHTML= approval[i].docOrderPrice; // 금액

        trGoodsList.append(tdGoodsListNo, tdGoodsListName, tdGoodsListAmount, tdGoodsListOrderUnitPrice, tdGoodsListOrderPrice);
        tableBodyTempContents.append(trGoodsList);

        orderSum += approval[i].docOrderPrice; // 합계에 금액 더함
      }

      //------tbody 끝 / 
      //------tfoot 시작

      const tableFootTempContents = createElement("tfoot", {}, []);

      const trGoodsListFooter = createElement("tr", {}, []);
      const thGoodsListFooter = createElement("th", {"colspan":"4", "style":"text-align: center;"}, []);
      thGoodsListFooter.innerHTML='합계'
      const tdGoodsListFooter = createElement("td", {}, []);
      tdGoodsListFooter.innerHTML= orderSum; // 합계

      trGoodsListFooter.append(thGoodsListFooter, tdGoodsListFooter);
      tableFootTempContents.append(trGoodsListFooter);

      //------tfoot 끝

      // 테이블 헤드, 바디, 푸터 테이블에 합치기
      tableTempContents.append(tableHeadTempContents, tableBodyTempContents, tableFootTempContents);
      divTempContents.append(tableTempContents);

      // 전체 템플릿에 템플릿제목, 정보/승인, 본문 추가
      divTemp.append(divTempTitle, divTempBox, divTempContents); 
      divModalBody.append(divTemp);

      // 목록에 추가하기
      modalHeader[5].after(divModalBody);

    })
    .catch((e)=>console.log(e));

  
    /* ---------------------------------------------------------- */
    
  } else{ // 발주 외 나머지 모든 기안서 
  // 기안서 상세조회 비동기 호출
  fetch('detailWaitApproval?approvalNo=' +approvalNo + '&docCategoryNo=' + docCategoryNo)
  .then(resp => resp.json())
  .then(approval => {

    currentApprovalNo = approval.approvalNo;
    currentApprovalMemberNo = approval.memberNo;
    currentApprovaldocCategoryNo = approval.docCategoryNo;

    console.log(approval);

    if(docCategoryNo == 0){  // 휴가

      currentApprovaldocTitle = '휴가 신청서';

      // 모달 속성 추가
      document.getElementById("clickModal").setAttribute("data-bs-toggle", "modal");
      document.getElementById("clickModal").setAttribute("data-bs-target", "#holidayModal");

      // 클릭 시 모달창 바로 뜨도록!
      const myModal = new bootstrap.Modal('#holidayModal', {
        keyboard: false
      });

      myModal.show();

      // 휴가기안서 템플릿 바디 생성
      const divModalBody = createElement("div", {"style" : "width: 800px; height: 800px;"},["modal-body", "pdfCanvas"]);
      const divTemp = createElement("div", {}, ["my-2", "mx-3", "p-3"]);
      
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
      const thNo = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thNo.innerHTML = '문서번호';
      const tdNo = createElement("td", {}, []);
      tdNo.innerHTML = approval.approvalNo;

      trNo.append(thNo);
      trNo.append(tdNo);

      // 부서
      const trDepartment = createElement("tr", {}, []);
      const thDepartment = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thDepartment.innerHTML = '부 서';
      const tdDepartment = createElement("td", {}, []);

      tdDepartment.innerHTML = approval.departmentName + '(' + approval.teamName + ')';

      trDepartment.append(thDepartment);
      trDepartment.append(tdDepartment);

      // 기안자
      const trName = createElement("tr", {}, []);
      const thName = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thName.innerHTML = '기안자';
      const tdName = createElement("td", {}, []);
      tdName.innerHTML = approval.memberName;

      trName.append(thName);
      trName.append(tdName);

      // 구분(항목)
      const trCategory = createElement("tr", {}, []);
      const thCategory = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thCategory.innerHTML = '구분(항목)';
      const tdCategory = createElement("td", {}, []);
      tdCategory.innerHTML = approval.docCategoryTitle;

      trCategory.append(thCategory);
      trCategory.append(tdCategory);

      // 협조 부서
      const trCorDepartment = createElement("tr", {}, []);
      const thCorDepartment = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thCorDepartment.innerHTML = '협조 부서';
      const tdCorDepartment = createElement("td", {}, []);
      tdCorDepartment.innerHTML = approval.departmentTitle;

      trCorDepartment.append(thCorDepartment);
      trCorDepartment.append(tdCorDepartment);

      // 기안일
      const trDate = createElement("tr", {}, []);
      const thDate = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
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
              const tdNonApprovContent = createElement("td", {"style":"height: 96px; vertical-align: middle;"}, []);  
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
      const thTempContentsTitle = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thTempContentsTitle.innerHTML='제 목';
      const tdTempContentsTitle = createElement("td", {}, []);
      tdTempContentsTitle.innerHTML=approval.approvalTitle; 

      trTempContentsTitle.append(thTempContentsTitle, tdTempContentsTitle);

      // 휴가 시작일
      const trTempContentsStartDate = createElement("tr", {}, []);
      const thTempContentsStartDate = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thTempContentsStartDate.innerHTML='휴가 시작일';
      const tdTempContentsStartDate = createElement("td", {}, []);
      tdTempContentsStartDate.innerHTML=approval.docHolidayStart; 

      trTempContentsStartDate.append(thTempContentsStartDate, tdTempContentsStartDate);

      // 휴가 종료일
      const trTempContentsEndDate = createElement("tr", {}, []);
      const thTempContentsEndDate = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thTempContentsEndDate.innerHTML='휴가 종료일';
      const tdTempContentsEndDate = createElement("td", {}, []);
      tdTempContentsEndDate.innerHTML=approval.docHolidayEnd; 

      trTempContentsEndDate.append(thTempContentsEndDate, tdTempContentsEndDate);

      // 상세 내용
      const trTempContentsDetail = createElement("tr", {}, []);
      const thTempContentsDetail = createElement("th", {"style":"text-align: center; background-color: #f2f2f2; vertical-align: middle;"}, []);
      thTempContentsDetail.innerHTML='상세 내용';
      const tdTempContentsDetail = createElement("td", {}, []);
      tdTempContentsDetail.innerHTML=approval.approvalContent; 

      trTempContentsDetail.append(thTempContentsDetail, tdTempContentsDetail);


      // 첨부 파일 ()
      const trTempContentsFile = createElement("tr", {}, []);
      const thTempContentsFile = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
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

      currentApprovaldocTitle = '사직서';

      // 모달 속성 추가
      document.getElementById("clickModal").setAttribute("data-bs-toggle", "modal");
      document.getElementById("clickModal").setAttribute("data-bs-target", "#retirementModal");

      // 클릭 시 모달창 바로 뜨도록!
      const myModal = new bootstrap.Modal('#retirementModal', {
        keyboard: false
      });

      myModal.show();

      // 사직서 템플릿 바디 생성
      const divModalBody = createElement("div", {"style" : "width: 800px; height: 800px;"},["modal-body", "pdfCanvas"]);
      const divTemp = createElement("div", {}, ["my-2", "mx-3", "p-3"]);
      
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
      const thNo = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thNo.innerHTML = '문서번호';
      const tdNo = createElement("td", {}, []);
      tdNo.innerHTML = approval.approvalNo;

      trNo.append(thNo);
      trNo.append(tdNo);

      // 부서
      const trDepartment = createElement("tr", {}, []);
      const thDepartment = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thDepartment.innerHTML = '부 서';
      const tdDepartment = createElement("td", {}, []);

      tdDepartment.innerHTML = approval.departmentName + '(' + approval.teamName + ')';

      trDepartment.append(thDepartment);
      trDepartment.append(tdDepartment);

      // 기안자
      const trName = createElement("tr", {}, []);
      const thName = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thName.innerHTML = '기안자';
      const tdName = createElement("td", {}, []);
      tdName.innerHTML = approval.memberName;

      trName.append(thName);
      trName.append(tdName);

      // 구분(항목)
      const trCategory = createElement("tr", {}, []);
      const thCategory = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thCategory.innerHTML = '구분(항목)';
      const tdCategory = createElement("td", {}, []);
      tdCategory.innerHTML = approval.docCategoryTitle;

      trCategory.append(thCategory);
      trCategory.append(tdCategory);

      // 협조 부서
      const trCorDepartment = createElement("tr", {}, []);
      const thCorDepartment = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thCorDepartment.innerHTML = '협조 부서';
      const tdCorDepartment = createElement("td", {}, []);
      tdCorDepartment.innerHTML = approval.departmentTitle;

      trCorDepartment.append(thCorDepartment);
      trCorDepartment.append(tdCorDepartment);

      // 기안일
      const trDate = createElement("tr", {}, []);
      const thDate = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
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
              const tdNonApprovContent = createElement("td", {"style":"height: 96px; vertical-align: middle;"}, []);  
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
      const thTempContentsTitle = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thTempContentsTitle.innerHTML='제 목';
      const tdTempContentsTitle = createElement("td", {}, []);
      tdTempContentsTitle.innerHTML=approval.approvalTitle; 

      trTempContentsTitle.append(thTempContentsTitle, tdTempContentsTitle);

      // 퇴직 예정일
      const trTempContentsRetireDate = createElement("tr", {}, []);
      const thTempContentsRetireDate = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thTempContentsRetireDate.innerHTML='퇴직 예정일';
      const tdTempContentsRetireDate = createElement("td", {}, []);
      tdTempContentsRetireDate.innerHTML=approval.docRetireDate; 

      trTempContentsRetireDate.append(thTempContentsRetireDate, tdTempContentsRetireDate);

      // 상세 내용
      const trTempContentsDetail = createElement("tr", {}, []);
      const thTempContentsDetail = createElement("th", {"style":"text-align: center; background-color: #f2f2f2; vertical-align: middle;"}, []);
      thTempContentsDetail.innerHTML='상세 내용';
      const tdTempContentsDetail = createElement("td", {}, []);
      tdTempContentsDetail.innerHTML=approval.approvalContent; 

      trTempContentsDetail.append(thTempContentsDetail, tdTempContentsDetail);

      // 첨부 파일 ()
      const trTempContentsFile = createElement("tr", {}, []);
      const thTempContentsFile = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
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

      currentApprovaldocTitle = '업무보고서(출점)';

      // 모달 속성 추가
      document.getElementById("clickModal").setAttribute("data-bs-toggle", "modal");
      document.getElementById("clickModal").setAttribute("data-bs-target", "#openStoreModal");

      // 클릭 시 모달창 바로 뜨도록!
      const myModal = new bootstrap.Modal('#openStoreModal', {
        keyboard: false
      });

      myModal.show();

      // 출점 요청서 템플릿 바디 생성
      const divModalBody = createElement("div", {"style" : "width: 800px; height: 800px;"},["modal-body", "pdfCanvas"]);
      const divTemp = createElement("div", {}, ["my-2", "mx-3", "p-3"]);
      
      // 템플릿 제목
      const divTempTitle = createElement("div", {"style" : "font-size:30px; font-weight: bold; text-align: center;"}, ["pt-4"]);
      divTempTitle.innerHTML = '업무 보고';
      
      // 템플릿 정보/승인
      const divTempBox = createElement("div", {}, ["d-flex", "justify-content-between", "mt-3"]); 
      
      // 정보
      const divInfo = createElement("div", {}, ["tempInfo","my-2", "mx-3", "px-2"]); 

      // 테이블
      const tableTemp = createElement("table", {"style":"width: 300px; border: black;"}, ["table", "table-bordered"]);
      const tableBodyTemp = createElement("tbody", {}, [])

      // 테이블 문서번호 tr
      const trNo = createElement("tr", {}, []);
      const thNo = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thNo.innerHTML = '문서번호';
      const tdNo = createElement("td", {}, []);
      tdNo.innerHTML = approval.approvalNo;

      trNo.append(thNo);
      trNo.append(tdNo);

      // 부서
      const trDepartment = createElement("tr", {}, []);
      const thDepartment = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thDepartment.innerHTML = '부 서';
      const tdDepartment = createElement("td", {}, []);

      tdDepartment.innerHTML = approval.departmentName + '(' + approval.teamName + ')';

      trDepartment.append(thDepartment);
      trDepartment.append(tdDepartment);

      // 기안자
      const trName = createElement("tr", {}, []);
      const thName = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thName.innerHTML = '기안자';
      const tdName = createElement("td", {}, []);
      tdName.innerHTML = approval.memberName;

      trName.append(thName);
      trName.append(tdName);

      // 구분(항목)
      const trCategory = createElement("tr", {}, []);
      const thCategory = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thCategory.innerHTML = '구분(항목)';
      const tdCategory = createElement("td", {}, []);
      tdCategory.innerHTML = approval.docCategoryTitle;

      trCategory.append(thCategory);
      trCategory.append(tdCategory);

      // 협조 부서
      const trCorDepartment = createElement("tr", {}, []);
      const thCorDepartment = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thCorDepartment.innerHTML = '협조 부서';
      const tdCorDepartment = createElement("td", {}, []);
      tdCorDepartment.innerHTML = approval.departmentTitle;

      trCorDepartment.append(thCorDepartment);
      trCorDepartment.append(tdCorDepartment);

      // 기안일
      const trDate = createElement("tr", {}, []);
      const thDate = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
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
              const tdNonApprovContent = createElement("td", {"style":"height: 96px; vertical-align: middle;"}, []);  
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
      const thTempContentsTitle = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thTempContentsTitle.innerHTML='제 목';
      const tdTempContentsTitle = createElement("td", {}, []);
      tdTempContentsTitle.innerHTML=approval.approvalTitle; 

      trTempContentsTitle.append(thTempContentsTitle, tdTempContentsTitle);

      // 매장명
      const trTempContentsStartDate = createElement("tr", {}, []);
      const thTempContentsStartDate = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thTempContentsStartDate.innerHTML='매장명';
      const tdTempContentsStartDate = createElement("td", {}, []);
      tdTempContentsStartDate.innerHTML=approval.storeName; 

      trTempContentsStartDate.append(thTempContentsStartDate, tdTempContentsStartDate);

      // 출/폐 여부
      const trTempContentsEndDate = createElement("tr", {}, []);
      const thTempContentsEndDate = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thTempContentsEndDate.innerHTML='출/폐 여부';
      const tdTempContentsEndDate = createElement("td", {}, []);
      tdTempContentsEndDate.innerHTML='출점'; 

      trTempContentsEndDate.append(thTempContentsEndDate, tdTempContentsEndDate);

      // 상세 내용
      const trTempContentsDetail = createElement("tr", {}, []);
      const thTempContentsDetail = createElement("th", {"style":"text-align: center; background-color: #f2f2f2; vertical-align: middle;"}, []);
      thTempContentsDetail.innerHTML='상세 내용';
      const tdTempContentsDetail = createElement("td", {}, []);
      tdTempContentsDetail.innerHTML=approval.approvalContent; 

      trTempContentsDetail.append(thTempContentsDetail, tdTempContentsDetail);


      // 첨부 파일 ()
      const trTempContentsFile = createElement("tr", {}, []);
      const thTempContentsFile = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
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
      modalHeader[2].after(divModalBody);

    } 
    /* ---------------------------------------------------------- */
    else if(docCategoryNo == 3){ // 폐점

      currentApprovaldocTitle = '업무보고서(폐점)';

      // 모달 속성 추가
      document.getElementById("clickModal").setAttribute("data-bs-toggle", "modal");
      document.getElementById("clickModal").setAttribute("data-bs-target", "#closeStoreModal");

      // 클릭 시 모달창 바로 뜨도록!
      const myModal = new bootstrap.Modal('#closeStoreModal', {
        keyboard: false
      });

      myModal.show();

      // 폐점 요청서 템플릿 바디 생성
      const divModalBody = createElement("div", {"style" : "width: 800px; height: 800px;"},["modal-body", "pdfCanvas"]);
      const divTemp = createElement("div", {}, ["my-2", "mx-3", "p-3"]);
      
      // 템플릿 제목
      const divTempTitle = createElement("div", {"style" : "font-size:30px; font-weight: bold; text-align: center;"}, ["pt-4"]);
      divTempTitle.innerHTML = '업무 보고';
      
      // 템플릿 정보/승인
      const divTempBox = createElement("div", {}, ["d-flex", "justify-content-between", "mt-3"]); 
      
      // 정보
      const divInfo = createElement("div", {}, ["tempInfo","my-2", "mx-3", "px-2"]); 

      // 테이블
      const tableTemp = createElement("table", {"style":"width: 300px; border: black;"}, ["table", "table-bordered"]);
      const tableBodyTemp = createElement("tbody", {}, [])

      // 테이블 문서번호 tr
      const trNo = createElement("tr", {}, []);
      const thNo = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thNo.innerHTML = '문서번호';
      const tdNo = createElement("td", {}, []);
      tdNo.innerHTML = approval.approvalNo;

      trNo.append(thNo);
      trNo.append(tdNo);

      // 부서
      const trDepartment = createElement("tr", {}, []);
      const thDepartment = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thDepartment.innerHTML = '부 서';
      const tdDepartment = createElement("td", {}, []);

      tdDepartment.innerHTML = approval.departmentName + '(' + approval.teamName + ')';

      trDepartment.append(thDepartment);
      trDepartment.append(tdDepartment);

      // 기안자
      const trName = createElement("tr", {}, []);
      const thName = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thName.innerHTML = '기안자';
      const tdName = createElement("td", {}, []);
      tdName.innerHTML = approval.memberName;

      trName.append(thName);
      trName.append(tdName);

      // 구분(항목)
      const trCategory = createElement("tr", {}, []);
      const thCategory = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thCategory.innerHTML = '구분(항목)';
      const tdCategory = createElement("td", {}, []);
      tdCategory.innerHTML = approval.docCategoryTitle;

      trCategory.append(thCategory);
      trCategory.append(tdCategory);

      // 협조 부서
      const trCorDepartment = createElement("tr", {}, []);
      const thCorDepartment = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thCorDepartment.innerHTML = '협조 부서';
      const tdCorDepartment = createElement("td", {}, []);
      tdCorDepartment.innerHTML = approval.departmentTitle;

      trCorDepartment.append(thCorDepartment);
      trCorDepartment.append(tdCorDepartment);

      // 기안일
      const trDate = createElement("tr", {}, []);
      const thDate = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
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
              const tdNonApprovContent = createElement("td", {"style":"height: 96px; vertical-align: middle;"}, []);  
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
      const thTempContentsTitle = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thTempContentsTitle.innerHTML='제 목';
      const tdTempContentsTitle = createElement("td", {}, []);
      tdTempContentsTitle.innerHTML=approval.approvalTitle; 

      trTempContentsTitle.append(thTempContentsTitle, tdTempContentsTitle);

      // 매장명
      const trTempContentsStartDate = createElement("tr", {}, []);
      const thTempContentsStartDate = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thTempContentsStartDate.innerHTML='매장명';
      const tdTempContentsStartDate = createElement("td", {}, []);
      tdTempContentsStartDate.innerHTML=approval.storeName; 

      trTempContentsStartDate.append(thTempContentsStartDate, tdTempContentsStartDate);

      // 매장번호
      const trTempContentsStoreNumber = createElement("tr", {}, []);
      const thTempContentsStoreNumber = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thTempContentsStoreNumber.innerHTML='매 장 번 호';
      const tdTempContentsStoreNumber = createElement("td", {}, []);
      tdTempContentsStoreNumber.innerHTML=approval.storeNo; 

      trTempContentsStoreNumber.append(thTempContentsStoreNumber, tdTempContentsStoreNumber);

      // 출/폐 여부
      const trTempContentsEndDate = createElement("tr", {}, []);
      const thTempContentsEndDate = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thTempContentsEndDate.innerHTML='출/폐 여부';
      const tdTempContentsEndDate = createElement("td", {}, []);
      tdTempContentsEndDate.innerHTML='폐점'; 

      trTempContentsEndDate.append(thTempContentsEndDate, tdTempContentsEndDate);

      // 상세 내용
      const trTempContentsDetail = createElement("tr", {}, []);
      const thTempContentsDetail = createElement("th", {"style":"text-align: center; background-color: #f2f2f2; vertical-align: middle;"}, []);
      thTempContentsDetail.innerHTML='상세 내용';
      const tdTempContentsDetail = createElement("td", {}, []);
      tdTempContentsDetail.innerHTML=approval.approvalContent; 

      trTempContentsDetail.append(thTempContentsDetail, tdTempContentsDetail);


      // 첨부 파일 ()
      const trTempContentsFile = createElement("tr", {}, []);
      const thTempContentsFile = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thTempContentsFile.innerHTML='첨부파일';

      const tdTempContentsFile = createElement("td", {}, []);
      const aTempContentsFile = createElement("a", {"href":approval.approvalFileRoute + approval.approvalFileReName, "style":"text-decoration: none;","download":approval.approvalFileOriginName}, []);
      aTempContentsFile.innerHTML=approval.approvalFileOriginName;

      tdTempContentsFile.append(aTempContentsFile);
      trTempContentsFile.append(thTempContentsFile, tdTempContentsFile);

      // 본문 테이블에 tr들 합치기
      tableBodyTempContents.append(trTempContentsTitle, trTempContentsStartDate, trTempContentsStoreNumber, trTempContentsEndDate, trTempContentsDetail, trTempContentsFile);
      tableTempContents.append(tableBodyTempContents);
      divTempContents.append(tableTempContents);

      // 전체 템플릿에 템플릿제목, 정보/승인, 본문 추가
      divTemp.append(divTempTitle, divTempBox, divTempContents); 
      divModalBody.append(divTemp);

      // 목록에 추가하기
      modalHeader[3].after(divModalBody);

    } 
    
    /* ---------------------------------------------------------- */
    else if(docCategoryNo == 4){ // 지출

      currentApprovaldocTitle = '지출결의서';

      // 모달 속성 추가
      document.getElementById("clickModal").setAttribute("data-bs-toggle", "modal");
      document.getElementById("clickModal").setAttribute("data-bs-target", "#expenseModal");

      // 클릭 시 모달창 바로 뜨도록!
      const myModal = new bootstrap.Modal('#expenseModal', {
        keyboard: false
      });

      myModal.show();

      // 템플릿 바디 생성
      const divModalBody = createElement("div", {"style" : "width: 800px; height: 800px;"},["modal-body", "d-flex", "flex-column", "pdfCanvas"]);
      const divTemp = createElement("div", {}, ["my-2", "mx-3", "p-3"]);
      
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
      const thNo = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thNo.innerHTML = '문서번호';
      const tdNo = createElement("td", {}, []);
      tdNo.innerHTML = approval.approvalNo;

      trNo.append(thNo);
      trNo.append(tdNo);

      // 부서
      const trDepartment = createElement("tr", {}, []);
      const thDepartment = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thDepartment.innerHTML = '부 서';
      const tdDepartment = createElement("td", {}, []);

      tdDepartment.innerHTML = approval.departmentName + '(' + approval.teamName + ')';

      trDepartment.append(thDepartment);
      trDepartment.append(tdDepartment);

      // 기안자
      const trName = createElement("tr", {}, []);
      const thName = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thName.innerHTML = '기안자';
      const tdName = createElement("td", {}, []);
      tdName.innerHTML = approval.memberName;

      trName.append(thName);
      trName.append(tdName);

      // 구분(항목)
      const trCategory = createElement("tr", {}, []);
      const thCategory = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thCategory.innerHTML = '구분(항목)';
      const tdCategory = createElement("td", {}, []);
      tdCategory.innerHTML = approval.docCategoryTitle;

      trCategory.append(thCategory);
      trCategory.append(tdCategory);

      // 협조 부서
      const trCorDepartment = createElement("tr", {}, []);
      const thCorDepartment = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thCorDepartment.innerHTML = '협조 부서';
      const tdCorDepartment = createElement("td", {}, []);
      tdCorDepartment.innerHTML = approval.departmentTitle;

      trCorDepartment.append(thCorDepartment);
      trCorDepartment.append(tdCorDepartment);

      // 기안일
      const trDate = createElement("tr", {}, []);
      const thDate = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
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
              const tdNonApprovContent = createElement("td", {"style":"height: 96px; vertical-align: middle;"}, []);  
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
      const thTempContentsTitle = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
      thTempContentsTitle.innerHTML='제 목';
      const tdTempContentsTitle = createElement("td", {}, []);
      tdTempContentsTitle.innerHTML=approval.approvalTitle; 

      trTempContentsTitle.append(thTempContentsTitle, tdTempContentsTitle);

      // 상세 내용
      const trTempContentsDetail = createElement("tr", {}, []);
      const thTempContentsDetail = createElement("th", {"style":"text-align: center; background-color: #f2f2f2; vertical-align: middle;"}, []);
      thTempContentsDetail.innerHTML='상세 내용';
      const tdTempContentsDetail = createElement("td", {}, []);
      tdTempContentsDetail.innerHTML=approval.approvalContent; 

      trTempContentsDetail.append(thTempContentsDetail, tdTempContentsDetail);

      // 첨부 파일 ()
      const trTempContentsFile = createElement("tr", {}, []);
      const thTempContentsFile = createElement("th", {"style":"text-align: center; background-color: #f2f2f2;"}, []);
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
  })
  .catch((e)=>console.log(e));
  }
} 


//======================================================================================


/* 결재 버튼 클릭 시 작동함수 */
function approveBtn(){
  if(currentApprovalNo == undefined) return;
  location.href="approve?approvalNo=" + currentApprovalNo;
}

// 반려 버튼 클릭 시 작동함수
function returnBtn(){
  if(currentApprovalNo == undefined) return;

  const returnReason = prompt("반려 사유");
  if(returnReason != null){ // 반려 사유 입력 후 반려 클릭 시

    location.href="returnApprove?approvalNo=" + currentApprovalNo + "&returnReason=" + returnReason;

  } else {
    return;
  }
}
 
/* 완료문서함에서 삭제 버튼 클릭 시 작동함수 */
function deleteBtn(memberNo){

  // console.log(currentApprovalMemberNo);
  if(currentApprovalNo == undefined) return;

  // 문서번호의 기안자의 회원번호가 로그인memberNo와 다르면 return. 같다면 confirm 후 삭제 진행
  if(currentApprovalMemberNo != memberNo){
    alert("기안자인 경우에만 문서를 삭제할 수 있습니다.");
    return;
  } 

  if(confirm("해당 기안서를 영구삭제 하시겠습니까?")){
    location.href="deleteApprove?approvalNo=" + currentApprovalNo;
  }
}

/* 반려사유 버튼 클릭 시 작동함수 */
function returnReasonBtn(){

  // 해당 문서의 반려사유를 불러와서 alert로 띄움
  fetch('selectReturnReason?approvalNo=' + currentApprovalNo)
  .then(resp => resp.text())
  .then(result => {
    alert(result);
  })
}

/* 반려문서함에서 삭제버튼 클릭 시 작동함수 */
function deleteAtReturnBtn(memberNo){
  if(currentApprovalNo == undefined) return;

  // 문서번호의 기안자의 회원번호가 로그인memberNo와 다르면 return. 같다면 confirm 후 삭제 진행
  if(currentApprovalMemberNo != memberNo){
    alert("기안자인 경우에만 문서를 삭제할 수 있습니다.");
    return;
  } 

  if(confirm("해당 기안서를 영구삭제 하시겠습니까?")){
    location.href="deleteApproveAtReturn?approvalNo=" + currentApprovalNo;
  }
}


//======================================================================================

/* 모달창 인쇄 JS */
let hiddenModalHeader = document.querySelectorAll('.modal-header');
let hiddenModalFooter = document.querySelectorAll('.modal-footer');

console.log(currentApprovaldocCategoryNo);

// 인쇄 하기 전
function beforePrint() {
  const modal = document.querySelectorAll('.modal');
  initBodyHtml = document.body.innerHTML;
  document.body.innerHTML = modal[currentApprovaldocCategoryNo].innerHTML;

  // hiddenModalHeader[currentApprovaldocCategoryNo].style.display = "block";
  // hiddenModalFooter[currentApprovaldocCategoryNo].style.display = "block";
}

/* 모달창 인쇄 */
function fnModalPrint() {
  const modal = document.querySelectorAll('.modal');

  console.log(currentApprovaldocCategoryNo);
  console.log(modal[currentApprovaldocCategoryNo]);

  // hiddenModalHeader[currentApprovaldocCategoryNo].style.display = "none";
  // hiddenModalFooter[currentApprovaldocCategoryNo].style.display = "none";

  window.print(modal[currentApprovaldocCategoryNo].innerHTML);
}

// 인쇄 하고난 후
function afterPrint() {
  // hiddenModalHeader[currentApprovaldocCategoryNo].style.display = "block";
  // hiddenModalFooter[currentApprovaldocCategoryNo].style.display = "block";
  document.body.innerHTML = initBodyHtml;
}

window.onbeforeprint = beforePrint;
window.onafterprint = afterPrint;


//======================================================================================

/* PDF로 저장하기 */
function downloadPdf(){

  const divToPrint = document.querySelector(".pdfCanvas");

	html2canvas(divToPrint, { scale: 1 }).then(canvas => {
		const imgData = canvas.toDataURL('image/png');
		const doc = new jsPDF('p', 'mm', 'a4');
		doc.addImage(imgData, 'PNG', 8, 0, 198, 198);
		const fileName = currentApprovaldocTitle + '.pdf';
		const options = {
			orientation: 'portrait',
			unit: 'mm',
			format: 'a4',
		};
		doc.save(fileName, options);
	});
}