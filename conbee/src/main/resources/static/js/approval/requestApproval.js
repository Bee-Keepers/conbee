let currentApprovalNo;

/* 초기화 */
const tempApprovs = document.querySelectorAll(".tempApprov");
const initialTempApprov=[];
tempApprovs.forEach((tempApprov)=>{initialTempApprov.push(tempApprov.innerHTML);});

const approvalOne = document.querySelectorAll(".approvalOne").forEach(function(one){
  
  one.addEventListener("click",function(){



    tempApprovs.forEach((tempApprov,index)=>{tempApprov.innerHTML=initialTempApprov[index]});

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
      
      currentApprovalNo = approvalNo;
      
      switch(parseInt(docCategoryNo)){
        case 0 :{ /* 휴가신청서 */
          document.querySelectorAll(".docApprovalNo")[4].innerText=approvalNo;
          document.querySelectorAll(".docApprovalDate")[4].innerText=map.requestApproval.approvalDate;
          document.getElementById("docHolidayTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("docHolidayStart").innerText=map.requestApproval.docHolidayStart;
          document.getElementById("docHolidayEnd").innerText=map.requestApproval.docHolidayEnd;
          document.getElementById("docHolidayText").innerText=map.requestApproval.approvalContent;
          const fileRoute = map.requestApproval.approvalFileRoute + map.requestApproval.approvalFileReName;
          const fileId = document.getElementById("docHolidayFile");
          fileId.setAttribute("href",fileRoute);
          fileId.setAttribute("style","text-decoration: none;");
          fileId.setAttribute("download",map.requestApproval.approvalFileOriginName);
          fileId.innerHTML=map.requestApproval.approvalFileOriginName;

          console.log(map.requestApprover);

          const hTr1 = document.getElementById("hTr1");
          const hTr2 = document.getElementById("hTr2");
          const hTr3 = document.getElementById("hTr3");

          for(let i=0; i<map.requestApprover.length;i++){
            const th= document.createElement("th");
            th.style.width="80px";
            th.style.backgroundColor="#f2f2f2";
            th.innerText="결재";
            hTr1.append(th);

            const td= document.createElement("td");
            const div = document.createElement("div");
            const img = document.createElement("img");
            const div2 = document.createElement("div2");
            div.style.width="70px";

            img.setAttribute("src","/images/approval/stamp_approve.png");
            img.style.width="38px";
            div2.innerText=map.requestApprover[i].memberName;
            div.append(img);
            td.append(div,div2);
            hTr2.append(td);

            const td3 = document.createElement("td");
            td3.innerText= map.requestApprover[i].approverDate;
            hTr3.append(td3);
          }



        }; break;

        case 1 :{ /* 사직서 */
          const setButton = document.querySelectorAll(".btn-warning");
          setButton[3].value=approvalNo;
          document.querySelectorAll(".docApprovalNo")[3].innerText=approvalNo;
          document.querySelectorAll(".docApprovalDate")[3].innerText=map.requestApproval.approvalDate;
          document.getElementById("docRetireTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("docRetireDate").innerText=map.requestApproval.docRetireDate;
          document.getElementById("docRetireText").innerText=map.requestApproval.approvalContent;
          const fileRoute = map.requestApproval.approvalFileRoute + map.requestApproval.approvalFileReName;
          const fileId = document.getElementById("docRetirementFile");
          fileId.setAttribute("href",fileRoute);
          fileId.setAttribute("style","text-decoration: none;");
          fileId.setAttribute("download",map.requestApproval.approvalFileOriginName);
          fileId.innerHTML=map.requestApproval.approvalFileOriginName;
          


        }; break;

        case 2 : { /* 출점 */
          document.querySelectorAll(".docApprovalNo")[2].innerText=approvalNo;
          document.querySelectorAll(".docApprovalDate")[2].innerText=map.requestApproval.approvalDate;
          document.getElementById("docStoreTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("docStoreName").innerText=map.requestApproval.storeName;
          document.getElementById("docStoreNo").innerText="-"
          document.getElementById("docStoreState").innerText="출점"
          document.getElementById("docStoreText").innerText=map.requestApproval.approvalContent;
          const fileRoute = map.requestApproval.approvalFileRoute + map.requestApproval.approvalFileReName;
          const fileId = document.getElementById("docStoreFile");
          fileId.setAttribute("href",fileRoute);
          fileId.setAttribute("style","text-decoration: none;");
          fileId.setAttribute("download",map.requestApproval.approvalFileOriginName);
          fileId.innerHTML=map.requestApproval.approvalFileOriginName;
        }; break;

        case 3 : { /* 폐점 */
          document.querySelectorAll(".docApprovalNo")[2].innerText=approvalNo;
          document.querySelectorAll(".docApprovalDate")[2].innerText=map.requestApproval.approvalDate;
          document.getElementById("docStoreTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("docStoreName").innerText=map.requestApproval.storeName;
          document.getElementById("docStoreNo").innerText=map.requestApproval.storeNo;
          document.getElementById("docStoreState").innerText="폐점"
          document.getElementById("docStoreText").innerText=map.requestApproval.approvalContent;
          const fileRoute = map.requestApproval.approvalFileRoute + map.requestApproval.approvalFileReName;
          const fileId = document.getElementById("docStoreFile");
          fileId.setAttribute("href",fileRoute);
          fileId.setAttribute("style","text-decoration: none;");
          fileId.setAttribute("download",map.requestApproval.approvalFileOriginName);
          fileId.innerHTML=map.requestApproval.approvalFileOriginName;
        }; break;

        case 4 : { /* 지출 */
          document.querySelectorAll(".docApprovalNo")[1].innerText=approvalNo;
          document.querySelectorAll(".docApprovalDate")[1].innerText=map.requestApproval.approvalDate;
          document.getElementById("docExpenseTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("docExpenseText").innerText=map.requestApproval.approvalContent;
          const fileRoute = map.requestApproval.approvalFileRoute + map.requestApproval.approvalFileReName;
          const fileId = document.getElementById("docExpenseFile");
          fileId.setAttribute("href",fileRoute);
          fileId.setAttribute("style","text-decoration: none;");
          fileId.setAttribute("download",map.requestApproval.approvalFileOriginName);
          fileId.innerHTML=map.requestApproval.approvalFileOriginName;
        }; break;
        
        case 5 : { /* 발주 */
          document.querySelectorAll(".docApprovalNo")[0].innerText=approvalNo;
          document.querySelectorAll(".docApprovalDate")[0].innerText=map.requestApproval.approvalDate;
        }; break;
        default : console.log("오류"); break;

      }
    })
    .catch(e=>console.log(e));
  })
})

/* 문서 회수 버튼 */
function reclaimBtn(){
  const userConfirm = confirm("문서를 회수하시겠습니까?");

  if(!userConfirm){
    return;
  }
  location.href="reclaim?approvalNo=" + currentApprovalNo;
}