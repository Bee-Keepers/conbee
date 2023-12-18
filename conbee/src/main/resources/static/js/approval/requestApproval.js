/* ========================================================================================================= */
/* 초기화 */
let currentDocApprovalNo;


// 본문 내용 초기값 세팅
const docTempContents = document.querySelectorAll(".docTempContent");
// console.log(docTempContents);
const initialTempContent=[];
docTempContents.forEach((docTempContent)=>{initialTempContent.push(docTempContent.innerHTML)});

// 승인부분 초기값 세팅
const tempApprovs = document.querySelectorAll(".tempApprov");
const initialTempApprov=[];
tempApprovs.forEach((tempApprov)=>{initialTempApprov.push(tempApprov.innerHTML);});


/* ========================================================================================================= */
/* approvalDoc 클릭 시 화면 */

const approvalDoc = document.querySelectorAll(".approvalDoc").forEach(function(one){
  one.addEventListener("click",function(){


    // 본문 내용 리셋
    docTempContents.forEach((docTempContent,index)=>{docTempContent.innerHTML=initialTempContent[index];});

    // 승인부분 리셋
    tempApprovs.forEach((tempApprov,index)=>{tempApprov.innerHTML=initialTempApprov[index];});


    /* 기안문 정보 가져오기 */
    fetch("/approval/writeApproval/selectInfo")
    .then((resp) => {return resp.json(); })
    .then((writeInfo) => {
      // 팀이름(부장일 경우 부서이름)
      const infoTeams = document.querySelectorAll(".infoTeam");
      infoTeams.forEach((infoTeam)=>{
        if(writeInfo.teamName==null){infoTeam.innerText = writeInfo.departmentName;}
        else{infoTeam.innerText = writeInfo.departmentName + "(" + writeInfo.teamName + ")";}
      })
      // 이름
      const infoNames = document.querySelectorAll(".infoName");
      infoNames.forEach((infoName)=>{infoName.innerText = writeInfo.memberName;})
      
      const docWriteInfos = document.querySelectorAll(".docWriteInfo");
      docWriteInfos.forEach((docWriteInfo)=>{
        docWriteInfo.innerText = writeInfo.memberName + "(" + writeInfo.departmentName + ")";
      })
    })
    .catch(e => console.log(e));
    
    const approvalNo = this.getAttribute('data-one-id');
    const docCategoryNo = this.getAttribute('data-one-sort');

    /* 결재 요청 데이터 가져오기 */
    fetch("/approval/requestApproval/selectRequestData?approvalNo=" + approvalNo + "&docCategoryNo=" + parseInt(docCategoryNo))
    .then(resp=>resp.json())
    .then((map)=>{
      
      currentDocApprovalNo = approvalNo;
      
      switch(parseInt(docCategoryNo)){
        case 0 :{ /* 휴가신청서 */
          // 제목, 내용
          console.log(map);
          document.querySelectorAll(".finDocApprovalNo")[4].innerText=approvalNo;
          document.querySelectorAll(".finDocApprovalDate")[4].innerText=map.requestApproval.approvalDate;
          document.getElementById("finDocHolidayTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("finDocHolidayStart").innerText=map.requestApproval.docHolidayStart;
          document.getElementById("finDocHolidayEnd").innerText=map.requestApproval.docHolidayEnd;
          document.getElementById("finDocHolidayText").innerText=map.requestApproval.approvalContent;
 
          // 파일
          if(map.requestApproval.approvalFileOriginName!=null){
            docFileSection(map, 3);
          }
          // 결재
          createApproverSection(map, 4);

        }; break;

        case 1 :{ /* 사직서 */
          document.querySelectorAll(".finDocApprovalNo")[3].innerText=approvalNo;
          document.querySelectorAll(".finDocApprovalDate")[3].innerText=map.requestApproval.approvalDate;
          document.getElementById("finDocRetireTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("finDocRetireDate").innerText=map.requestApproval.docRetireDate;
          document.getElementById("finDocRetirementText").innerText=map.requestApproval.approvalContent;
          if(map.requestApproval.approvalFileOriginName!=null){
            docFileSection(map, 2);
          }
          createApproverSection(map, 3);
        }; break;

        case 2 : { /* 출점 */
          document.getElementById("openOrClose").innerText="업무(출점)";
          document.querySelectorAll(".finDocApprovalNo")[2].innerText=approvalNo;
          document.querySelectorAll(".finDocApprovalDate")[2].innerText=map.requestApproval.approvalDate;
          document.getElementById("finDocStoreTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("finDocStoreName").innerText=map.requestApproval.storeName;
          document.getElementById("finDocStoreNo").innerText="-"
          document.getElementById("finDocStoreState").innerText="출점"
          document.getElementById("finDocStoreText").innerText=map.requestApproval.approvalContent;
          if(map.requestApproval.approvalFileOriginName!=null){
            docFileSection(map, 1);
          }
          createApproverSection(map, 2);
        }; break;

        case 3 : { /* 폐점 */
          document.getElementById("openOrClose").innerText="업무(폐점)";
          document.querySelectorAll(".finDocApprovalNo")[2].innerText=approvalNo;
          document.querySelectorAll(".finDocApprovalDate")[2].innerText=map.requestApproval.approvalDate;
          document.getElementById("finDocStoreTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("finDocStoreName").innerText=map.requestApproval.storeName;
          document.getElementById("finDocStoreNo").innerText=map.requestApproval.storeNo;
          document.getElementById("finDocStoreState").innerText="폐점"
          document.getElementById("finDocStoreText").innerText=map.requestApproval.approvalContent;
          if(map.requestApproval.approvalFileOriginName!=null){
            docFileSection(map, 1);
          }
          createApproverSection(map, 2);
        }; break;

        case 4 : { /* 지출 */

          console.log(map.requestApproval);
          document.querySelectorAll(".finDocApprovalNo")[1].innerText=approvalNo;
          document.querySelectorAll(".finDocApprovalDate")[1].innerText=map.requestApproval.approvalDate;
          document.getElementById("finDocExpenseTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("finDocExpenseText").innerText=map.requestApproval.approvalContent;
          docFileSection(map, 0); // 지출은 파일 필수
          createApproverSection(map, 1);
        }; break;
        
        case 5 : { /* 발주 */

          console.log(map.requestApproval);
          console.log(map.orderList);
          document.querySelectorAll(".finDocApprovalNo")[0].innerText=approvalNo;
          document.querySelectorAll(".finDocApprovalDate")[0].innerText=map.requestApproval.approvalDate;
          document.getElementById("finDocOrderTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("finDocOrderDate").innerText=map.orderList[0].docOrderDate;
          console.log(map.orderList);

          const docOrderTbody = document.getElementById("finDocOrderTbody");
          let sum =0;
          for(let i=0; i<map.orderList.length;i++){
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const td5 = document.createElement("td");

            td1.innerText=map.orderList[i].goodsNo;
            td2.innerText=map.orderList[i].docOrderGoodsName;
            td2.style.textAlign="start";
            td3.innerText=map.orderList[i].docOrderAmount;
            td4.innerText=numberWithCommas(map.orderList[i].docOrderUnitPrice);
            td5.innerText=numberWithCommas(map.orderList[i].docOrderPrice);

            sum+=map.orderList[i].docOrderPrice;

            tr.append(td1, td2, td3, td4, td5);
            docOrderTbody.append(tr);
          }

          document.getElementById("finDocOrderSum").innerText=numberWithCommas(sum);
          document.getElementById("finDocOrderSum").style.textAlign="center";

          createApproverSection(map, 0);

        }; break;
        default : console.log("오류"); break;

      }
    })
    .catch(e=>console.log(e));
  })
})


/* ========================================================================================================= */
/* 공용 함수 */

// 1,000
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 문서 회수 버튼
function reclaimBtn(){
  const userConfirm = confirm("문서를 회수하시겠습니까?");

  if(!userConfirm){
    return;
  }
  location.href="reclaim?approvalNo=" + currentDocApprovalNo;
}


// 파일 함수
function docFileSection(map, docNo){
  const fileRoute = map.requestApproval.approvalFileRoute + map.requestApproval.approvalFileReName;
  const fileId = document.querySelectorAll(".finDocFile")[docNo];
  fileId.setAttribute("href",fileRoute);
  fileId.setAttribute("style","text-decoration: none;");
  fileId.setAttribute("download",map.requestApproval.approvalFileOriginName);
  fileId.innerHTML=map.requestApproval.approvalFileOriginName;
}


// 결재자 승인 부분 함수
function createApproverSection(map, docNo){
  // console.log(map.requestApprover);
  
  const hTr1 = document.querySelectorAll(".hTr1")[docNo];
  const hTr2 = document.querySelectorAll(".hTr2")[docNo];
  const hTr3 = document.querySelectorAll(".hTr3")[docNo];
  
  for(let i=0; i<map.requestApprover.length;i++){
    const th= document.createElement("th");
    th.style.height="33px";
    th.style.width="80px";
    th.innerText="결재";
    hTr1.append(th);
    
    const td= document.createElement("td");
    td.style.height="96px"
    const div = document.createElement("div");
    div.style.width="70px";
    const img = document.createElement("img");
    img.style.width="38px";
    const div2 = document.createElement("div2");
    div2.innerText=map.requestApprover[i].memberName;
    const td3 = document.createElement("td");
    td3.style.height="30px"
    
    if(map.requestApprover[i].approverCondition==1){
      img.setAttribute("src","/images/approval/stamp_approve.png");
      div.append(img);
      td3.innerText= map.requestApprover[i].approverDate;
    }
    else{
      td3.innerText= "미승인";
    }
    
    td.append(div,div2);
    hTr2.append(td);
    hTr3.append(td3);
  }
}
