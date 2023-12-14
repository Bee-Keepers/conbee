/* 문서 회수 버튼 */
function reclaimBtn(){
  const userConfirm = confirm("문서를 회수하시겠습니까?");
  
  if(!userConfirm){
    return;
  }
  location.href="reclaim?approvalNo=" + currentApprovalNo;
}


let currentApprovalNo;

const approvalOne = document.querySelectorAll(".approvalOne").forEach(function(one){
  
  one.addEventListener("click",function(){

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
      console.log(currentApprovalNo);
      
      switch(parseInt(docCategoryNo)){
        case 0 :{ /* 휴가신청서 */
          // const setButton = document.querySelectorAll(".btn-warning");
          // setButton[4].value=approvalNo;
          document.querySelectorAll(".docApprovalNo")[4].innerText=approvalNo;
          document.querySelectorAll(".docApprovalDate")[4].innerText=map.requestApproval.approvalDate;
          document.getElementById("docHolidayTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("docHolidayStart").innerText=map.requestApproval.docHolidayStart;
          document.getElementById("docHolidayEnd").innerText=map.requestApproval.docHolidayEnd;
          document.getElementById("docHolidayText").innerText=map.requestApproval.approvalContent;
        }; break;

        case 1 :{ /* 사직서 */
          const setButton = document.querySelectorAll(".btn-warning");
          setButton[3].value=approvalNo;
          document.querySelectorAll(".docApprovalNo")[3].innerText=approvalNo;
          document.querySelectorAll(".docApprovalDate")[3].innerText=map.requestApproval.approvalDate;
          document.getElementById("docRetireTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("docRetireDate").innerText=map.requestApproval.docRetireDate;
          document.getElementById("docRetireText").innerText=map.requestApproval.approvalContent;

        }; break;

        case 2 : { /* 출점 */
          // const setButton = document.querySelectorAll(".btn-warning");
          // setButton[2].value=approvalNo;
          document.querySelectorAll(".docApprovalNo")[2].innerText=approvalNo;
          document.querySelectorAll(".docApprovalDate")[2].innerText=map.requestApproval.approvalDate;
          document.getElementById("docStoreTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("docStoreName").innerText=map.requestApproval.storeName;
          document.getElementById("docStoreNo").innerText="-"
          document.getElementById("docStoreState").innerText="출점"
          document.getElementById("docStoreText").innerText=map.requestApproval.approvalContent;
        }; break;

        case 3 : { /* 폐점 */
          // const setButton = document.querySelectorAll(".btn-warning");
          // setButton[2].value=approvalNo;
          document.querySelectorAll(".docApprovalNo")[2].innerText=approvalNo;
          document.querySelectorAll(".docApprovalDate")[2].innerText=map.requestApproval.approvalDate;
          document.getElementById("docStoreTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("docStoreName").innerText=map.requestApproval.storeName;
          document.getElementById("docStoreNo").innerText=map.requestApproval.storeNo;
          document.getElementById("docStoreState").innerText="폐점"
          document.getElementById("docStoreText").innerText=map.requestApproval.approvalContent;
        }; break;

        case 4 : { /* 지출 */
          // const setButton = document.querySelectorAll(".btn-warning");
          // setButton[1].value=approvalNo;
          document.querySelectorAll(".docApprovalNo")[1].innerText=approvalNo;
          document.querySelectorAll(".docApprovalDate")[1].innerText=map.requestApproval.approvalDate;
          document.getElementById("docExpenseTitle").innerText=map.requestApproval.approvalDocTitle;
          document.getElementById("docExpenseText").innerText=map.requestApproval.approvalContent;
        }; break;
        
        case 5 : { /* 발주 */
          // const setButton = document.querySelectorAll(".btn-warning");
          // setButton[0].value=approvalNo;
          document.querySelectorAll(".docApprovalNo")[0].innerText=approvalNo;
          document.querySelectorAll(".docApprovalDate")[0].innerText=map.requestApproval.approvalDate;
        }; break;
        default : console.log("오류"); break;

      }
    })
    .catch(e=>console.log(e));
  })
})