/* 비동기로 임시저장 데이터 가져오기 */
const block3s = document.querySelectorAll(".block3"); 

const approvalOne = document.querySelectorAll(".approvalOne").forEach(function(one){

  one.addEventListener("click",function(){

    /* 폼 내용 초기화, 결재라인 초기화 */
    const formIds = ["docHoliday", "docRetirement", "docStore", "docExpense", "docOrder"];

    formIds.forEach(formId => {
      const form = document.getElementById(formId);
      form.reset();
    });

    block3s.forEach((block3) => {block3.innerHTML = ""});

    /* 파일 td 초기화 */
    // const fileTds=["docHolidayFileTd", "docRetirementFileTd", "docStoreFileTd", "docExpenseFileTd"];
    // fileTds.forEach(fileTd =>{
    //   const file = document.getElementById(fileTd);
    //   file.innerHTML='';

    // // });

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


    /* 임시저장한 데이터 넣기 */
    const approvalNo = this.getAttribute('data-one-id');
    const docCategoryNo = this.getAttribute('data-one-sort');

    fetch("/approval/tempSave/selectTempData?approvalNo=" + approvalNo + "&docCategoryNo=" + parseInt(docCategoryNo))
    .then(resp=>resp.json())
    .then((map)=>{
      
      console.log(map.tempApproval.approvalFileRoute + map.tempApproval.approvalFileReName);

      switch(parseInt(docCategoryNo)){

        case 0 :{ /* 휴가신청서 */

          document.getElementById("inputHoliday").value=map.tempApproval.approvalTitle;
          document.getElementById("inputHoliday2").value=map.tempApproval.approvalDocTitle;
          document.getElementById("docHolidayText").value=map.tempApproval.approvalContent;
          addTempCount("docHolidayText");

          // // 파일
          // const fileTd = document.getElementById("docHolidayFileTd");
          // document.getElementById("docHolidayFile").setAttribute("style","display:none;");
          // const fileLabel = document.createElement("label");
          // const fileSpan = document.createElement("span");
          // if(map.tempApproval.approvalFileOriginName!=null){
          //   fileSpan.innerText=map.tempApproval.approvalFileOriginName;
          // }

          // fileLabel.classList.add("fileLabel");
          // fileLabel.innerText="파일 선택";
          // fileLabel.style.backgroundColor='#efefef';
          // fileLabel.style.border='1px solid #767676';
          // fileLabel.style.padding='3px 5px';
          // fileLabel.style.borderRadius='3px';
          // fileLabel.setAttribute("for","docHolidayFile");
          // fileSpan.style.padding='3px 5px';
          // fileTd.append(fileLabel,fileSpan);


          // 휴가시작일, 휴가종료일
          if(map.tempApproval.docHolidayStart!=null){
            document.getElementById("docHolidayStart").value=map.tempApproval.docHolidayStart;
          }
          if(map.tempApproval.docHolidayEnd!=null){
            document.getElementById("docHolidayEnd").value=map.tempApproval.docHolidayEnd;
          }

          // 결재자
          addTempApprovers(map.tempApprover, 4);

        }; break;

        case 1 :{ /* 사직서 */
          document.getElementById("inputRetire").value=map.tempApproval.approvalTitle;
          document.getElementById("inputRetire2").value=map.tempApproval.approvalDocTitle;
          document.getElementById("docRetirementText").value=map.tempApproval.approvalContent;
          addTempCount("docRetirementText");

          addTempApprovers(map.tempApprover, 3);

        }; break;

        case 2 : { /* 출점 */
          document.getElementById("inputStore").value=map.tempApproval.approvalTitle;
          document.getElementById("inputStore2").value=map.tempApproval.approvalDocTitle;
          document.getElementById("docStoreText").value=map.tempApproval.approvalContent;
          addTempCount("docStoreText");

          addTempApprovers(map.tempApprover, 2);
        }; break;

        case 3 : { /* 폐점 */
          document.getElementById("inputStore").value=map.tempApproval.approvalTitle;
          document.getElementById("inputStore2").value=map.tempApproval.approvalDocTitle;
          document.getElementById("docStoreText").value=map.tempApproval.approvalContent;
          addTempCount("docStoreText");

          addTempApprovers(map.tempApprover, 2);
        }; break;

        case 4 : { /* 지출 */
          document.getElementById("inputExpense").value=map.tempApproval.approvalTitle;
          document.getElementById("inputExpense2").value=map.tempApproval.approvalDocTitle;
          document.getElementById("docExpenseText").value=map.tempApproval.approvalContent;
          addTempCount("docExpenseText");

          addTempApprovers(map.tempApprover, 1);
        }; break;
        
        case 5 : { /* 발주 */
          document.getElementById("inputOrder").value=map.tempApproval.approvalTitle;
          document.getElementById("inputOrder2").value=map.tempApproval.approvalDocTitle;
          
          addTempApprovers(map.tempApprover, 0);
        }; break;
        default : console.log("오류"); break;

      }
    })
    .catch(e=>console.log(e));
  })
})


/* =========================================================== */
/* 임시저장 결재자 추가 함수 */

function addTempApprovers(tempApprovers, block3Num) {
  if (tempApprovers.length !== 0) {
    for (let i = 0; i < tempApprovers.length; i++) {
      const block3 = block3s[block3Num];
      const lineContainer = document.createElement("div");

      const lineSign = document.createElement("div");
      const lineBox = document.createElement("div");

      const approverInfo = document.createElement("div");
      const removeBtn = document.createElement("div");

      const departmentInfo = document.createElement("div");
      const teamInfo = document.createElement("div");
      const gradeNameInfo = document.createElement("div");
      const memberNoInfo = document.createElement("input");

      lineContainer.classList.add("lineContainer");

      lineSign.classList.add("lineSign");
      lineBox.classList.add("lineBox");

      approverInfo.classList.add("approverInfo");
      removeBtn.classList.add("removeBtn");

      departmentInfo.classList.add("departmentInfo");
      memberNoInfo.setAttribute("name", "approverMemNo");
      memberNoInfo.setAttribute("type", "hidden");

      if (i > 0) {
        lineSign.innerHTML = `<i class="bi bi-arrow-down"></i>`;
      }

      members.push(tempApprovers[i].memberNo);

      departmentInfo.innerText = tempApprovers[i].departmentName;
      if (tempApprovers[i].teamName !== null) {
        teamInfo.innerText = tempApprovers[i].teamName;
      }
      gradeNameInfo.innerText = tempApprovers[i].memberName + "  " + tempApprovers[i].gradeName;
      memberNoInfo.setAttribute("value", tempApprovers[i].memberNo);

      removeBtn.innerHTML = `<i class="bi bi-x-circle-fill"></i>`;
      removeBtn.classList.add("removeBtn");
      removeBtn.setAttribute("onclick", "remove(this)");

      approverInfo.append(departmentInfo, teamInfo, gradeNameInfo, memberNoInfo);
      lineBox.append(approverInfo, removeBtn);
      lineContainer.append(lineSign, lineBox);
      block3.append(lineContainer);
    }
  }
}

/* =========================================================== */
/* 글자수 */
const maxLength = 1000;
const textareas = document.querySelectorAll('textarea');

textareas.forEach(function(textarea){
  textarea.addEventListener("input",function(){
    docTextCount(textarea.id);
  })
})

function docTextCount(docTextId){
  const docText = document.getElementById(docTextId);
  const textCountArea = docText.nextElementSibling;

  const textCount = docText.value.length;
  textCountArea.textContent = textCount + ' / ' + maxLength + ' 글자';

  if(textCount > maxLength){textCountArea.style.color = 'red';}
  else{textCountArea.style.color = 'black';}
}

/* 임시저장 글자수 */
function addTempCount(textId){
  const tempContentCount = document.getElementById(textId).value.length;
  const docText = document.getElementById(textId);
  const textCountArea = docText.nextElementSibling;
  textCountArea.textContent = tempContentCount + ' / ' + maxLength + ' 글자';
}


/* =========================================================== */

/* 화살표 클릭시 팀 목록 토글 */
function toggleTeams(e){

  const teamsList = e.parentElement.nextElementSibling;
  const displayTeams = teamsList.style.display;

  teamsList.style.display=(displayTeams==='none')?'block':'none';

  /* 아이콘 회전 */
  displayTeams==='none'? e.children[0].classList.replace('origin','rotate') : e.children[0].classList.replace('rotate','origin');

}


/* 결재선1에서 부서 클릭 시 결재선2에 모든 멤버 나오기 */
function selectAllMember(e){

  const children = e.parentElement.parentElement.children;

  for (let i = 0; i < children.length; i++) {
    const children2 = children[i].children;
    for(let j=0; j<children2.length;j++){
      children[i].children[j].style.fontWeight='';
      children[i].children[j].style.textDecoration = '';
    }
  }

  e.style.fontWeight='bold';
  e.style.textDecoration = 'underline';

  const block2 = e.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild;
  block2.innerHTML="";

  
  fetch("/approval/writeApproval/selectAllMember?selectDepartment=" + e.dataset.value)
  .then(resp=>resp.json())
  .then((member)=>{
    if(member.length!=0){
      for(let i of member){
        const li = document.createElement("li");
        li.setAttribute("value",i.memberNo);
        li.innerText=i.memberName + "(" + (i.teamName ? i.teamName + " " : "") + i.gradeName + ")";
        li.setAttribute("ondblclick","addLine(this)");
        block2.append(li);
      }
    }
  })
  .catch(e=>console.log(e));
}


/* 결재선1에서 팀 클릭시 결재선2에 팀 멤버 나오기 */
function selectTeamMember(e){

  const children = e.parentElement.parentElement.children;

  for (let i = 0; i < children.length; i++) {
    children[i].style.fontWeight='';
    children[i].style.textDecoration = '';
    const children2 = children[i].children;
    for(let j=0; j<children2.length;j++){
      children[i].children[j].style.fontWeight='';
      children[i].children[j].style.textDecoration = '';
    }
  }

  e.style.fontWeight='bold';
  e.style.textDecoration = 'underline';

  const block2 = e.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild;
  block2.innerHTML="";

  fetch("/approval/writeApproval/selectTeamMember?selectTeam=" + e.value)
  .then(resp=>resp.json())
  .then((member)=>{
    if(member.length!=0){

      for(let i of member){
        const li = document.createElement("li");
        li.setAttribute("value",i.memberNo);
        li.innerText=i.memberName + "("  + (i.teamName ? i.teamName + " " : "") + i.gradeName + ")";
        li.setAttribute("ondblclick","addLine(this)");
        block2.append(li);
      }
    }
  })
  .catch(e=>console.log(e));

}


/* 팀원 더블클릭 시 결재라인에 추가 */

let members=[];

function addLine(e){

  const block3 = e.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild;
  const innerBoxes = block3.querySelectorAll(".lineContainer");


  if(innerBoxes.length<4){
    
    fetch("/approval/writeApproval/selectMember?memberNo=" + e.value)
    .then(resp=>resp.json())
    .then((member)=>{

      if(members.includes(member.memberNo)){
        alert("이미 추가된 결재자 입니다.");
        return;
      }

      const lineContainer = document.createElement("div");

      const lineSign = document.createElement("div");
      const lineBox = document.createElement("div");

      const approverInfo = document.createElement("div");
      const removeBtn = document.createElement("div");

      const departmentInfo = document.createElement("div");
      const teamInfo = document.createElement("div");
      const gradeNameInfo = document.createElement("div");
      const memberNoInfo = document.createElement("input");
      
      lineContainer.classList.add("lineContainer");

      lineSign.classList.add("lineSign");
      lineBox.classList.add("lineBox");
      
      approverInfo.classList.add("approverInfo");
      removeBtn.classList.add("removeBtn");

      departmentInfo.classList.add("departmentInfo");
      memberNoInfo.setAttribute("name","approverMemNo");
      memberNoInfo.setAttribute("type","hidden");

      if(members.length>0){
        lineSign.innerHTML=`<i class="bi bi-arrow-down"></i>`;
      }


      members.push(member.memberNo);


      departmentInfo.innerText=member.departmentName;
      if(member.teamName!=null){
        teamInfo.innerText=member.teamName;
      }
      gradeNameInfo.innerText= member.memberName+ "  " + member.gradeName;
      memberNoInfo.setAttribute("value",member.memberNo);


      removeBtn.innerHTML=`<i class="bi bi-x-circle-fill"></i>`;
      removeBtn.classList.add("removeBtn");
      removeBtn.setAttribute("onclick","remove(this)");
      
      
      approverInfo.append(departmentInfo,teamInfo,gradeNameInfo,memberNoInfo);
      lineBox.append(approverInfo,removeBtn)
      lineContainer.append(lineSign,lineBox);
      block3.append(lineContainer);

      // console.log(innerBoxes);
      // console.log(innerBoxes.length);
    })
    .catch(e=>console.log(e));
  }
  else alert("결재선을 추가할 수 없습니다.");
}


/* 결재선 삭제 */
function remove(e){

  let index = members.indexOf(parseInt(e.previousElementSibling.lastElementChild.value));
  members.splice(index,1);

  if(index==0 && members.length>0){
    e.parentElement.parentElement.nextElementSibling.firstElementChild.remove();
  }

  e.parentElement.parentElement.remove();
}
