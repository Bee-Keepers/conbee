/* =========================================== */
/* 기안문 정보 받아오기 */

(()=>{

  // 기안문 정보 가져오기
  fetch("/approval/writeApproval/selectInfo")
  .then((resp) => {return resp.json(); })
  .then((writeInfo) => {

    // 팀이름
    const infoTeams = document.querySelectorAll(".infoTeam");
    infoTeams.forEach((infoTeam)=>{
      infoTeam.innerText = writeInfo.teamName;
    })

    // 이름
    const infoNames = document.querySelectorAll(".infoName");
    infoNames.forEach((infoName)=>{
      infoName.innerText = writeInfo.memberName;
    })

    const docWriteInfos = document.querySelectorAll(".docWriteInfo");
    docWriteInfos.forEach((docWriteInfo)=>{
      docWriteInfo.innerText = writeInfo.memberName + "(" + writeInfo.teamName + ")";
    })

  })
  .catch(e => console.log(e));

})();



/* =========================================================== */

// 임시저장 confirm 
const saveDoc = document.querySelectorAll('#saveHoliday, #saveRetirement, #saveStore, #saveExpense, #saveOrder');

saveDoc.forEach((doc)=>{
  doc.addEventListener("click",e=>{    
    const userConfirm = confirm("작성한 문서를 임시저장하시겠습니까?");

    if(!userConfirm){
      e.preventDefault();
      return;
    }
  })
})


/* =========================================================== */
const openDocOne = document.getElementById("docOne") // 휴가
const openDocTwo = document.getElementById("docTwo") // 퇴직
const openDocThree = document.getElementById("docThree") // 점포
const openDocFour = document.getElementById("docFour") // 지출
const openDocFive = document.getElementById("docFive") // 발주


// 모달 창 띄울 때 주소 넣기
// 모달 창 다시 켰을 때 reset하기
// 주소 굳이 넣어야..? => 나중에 삭제
openDocOne.addEventListener("click",()=>{
  history.pushState(null, null, 'writeApproval/docHoliday');
  inputHoliday.value="";
  inputHoliday2.value="";
  docHolidayStart.value="";
  docHolidayEnd.value="";
  docHolidayText.value="";
  block2.innerHTML="";
  block3.innerHTML="";
  updateTextCount();
  
})
openDocTwo.addEventListener("click",()=>{
  history.pushState(null, null, 'writeApproval/docRetirement');
  inputRetire.value="";
  inputRetire2.value="";
  retirementDate.value="";
  docRetirementText.value="";
})
openDocThree.addEventListener("click",()=>{
  history.pushState(null, null, 'writeApproval/docStore');
  inputStore.value="";
  inputStore2.value="";
  storeName.value="";
  openStore.checked=false;
  closeStore.checked=false;
  docStoreText.value="";

})
openDocFour.addEventListener("click",()=>{
  history.pushState(null, null, 'writeApproval/docExpense');
  inputExpense.value="";
  inputExpense2.value="";
  docExpenseText.value="";
  // 파일도 추가
})
openDocFive.addEventListener("click",()=>{
  history.pushState(null, null, 'writeApproval/docOrder');
})


/* 닫기 -> 주소 복원 */
// 닫기 버튼 클릭 
const closeDocs = document.querySelectorAll('button[name="closeDoc"]');

closeDocs.forEach(closeDoc=>{
  closeDoc.addEventListener("click",e=>{
    history.pushState(null, null, '/approval/writeApproval');
  })
})


/* =========================================================== */
/* 휴가 신청서 */
const submitHoliday = document.getElementById("submitHoliday");
const saveHoliday = document.getElementById("saveHoliday");
const inputHoliday = document.getElementById("inputHoliday");
const inputHoliday2 = document.getElementById("inputHoliday2");
const docHolidayStart = document.getElementById("docHolidayStart");
const docHolidayEnd = document.getElementById("docHolidayEnd");
const docHolidayText = document.getElementById("docHolidayText");
const block2 = document.getElementById("block2");
const block3 = document.getElementById("block3");

// 제목 입력 시 -> 템플릿 안 제목 같이 입력되기
inputHoliday.addEventListener("input",e=>{
  const val = inputHoliday.value.trim();
  inputHoliday2.value = val;
})

// 내용 글자수 표시
const textCountHoliday = document.getElementById("textCountHoliday");
const maxLength = 1000;

function updateTextCount() {
  let currentLength = docHolidayText.value.length;
  textCountHoliday.textContent = currentLength + ' / ' + maxLength + ' 글자';

  if (currentLength > maxLength) {
    textCountHoliday.style.color = 'red';
  } else {
    textCountHoliday.style.color = 'black';
  }
}

docHolidayText.addEventListener('input',e=>{
  updateTextCount();
})


// 결재 버튼 클릭
submitHoliday.addEventListener("click", e =>{


  // 제목
  if(inputHoliday.value.trim().length == 0){
    alert("제목을 입력해주세요");
    inputHoliday.focus();
    e.preventDefault();
    return;
  }

  if(inputHoliday2.value.trim().length == 0){
    alert("제목을 입력해주세요");
    inputHoliday2.focus();
    e.preventDefault();
    return;
  }

  // 날짜
  if(docHolidayStart.value===''){
    alert("휴가 시작일을 입력해주세요");
    docHolidayStart.focus();
    e.preventDefault();
    return;
  }
  if(docHolidayEnd.value===''){
    alert("휴가 종료일을 입력해주세요");
    docHolidayEnd.focus();
    e.preventDefault();
    return;
  }
  if(docHolidayStart.value>docHolidayEnd.value){ // 휴가 종료일이 시작일보다 앞일때
    alert("휴가 종료일을 정확하게 입력해주세요")
    docHolidayEnd.focus();
    e.preventDefault();
    return;
  }

  // 내용
  if(docHolidayText.value===''){
    alert("내용을 입력해주세요");
    docHolidayText.focus();
    e.preventDefault();
    return;
  }

  if(block3.innerHTML===''){
    alert("결재선을 추가해주세요");
    e.preventDefault();
    return;
  }

  const userConfirm = confirm("결재를 요청하시겠습니까?");

  if(!userConfirm){
    e.preventDefault();
    return;
  }
})

/* =========================================================== */
/* 사직서  */
const submitRetirement = document.getElementById("submitRetirement");
const saveRetirement = document.getElementById("saveRetirement");
const inputRetire = document.getElementById("inputRetire");
const inputRetire2 = document.getElementById("inputRetire2");
const retirementDate = document.getElementById("retirementDate");
const docRetirementText = document.getElementById("docRetirementText")

inputRetire.addEventListener("input",e=>{
  const val = inputRetire.value;
  inputRetire2.value = val;
})


// 결재 버튼 클릭
submitRetirement.addEventListener("click", e =>{
  
  // 제목
  if(inputRetire.value.trim().length == 0){
    alert("제목을 입력해주세요");
    inputRetire.focus();
    e.preventDefault();
    return;
  }

  if(inputRetire2.value.trim().length == 0){
    alert("제목을 입력해주세요");
    inputRetire2.focus();
    e.preventDefault();
    return;
  }

  // 날짜
  if(retirementDate.value===''){
    alert("퇴직 예정일을 입력해주세요");
    retirementDate.focus();
    e.preventDefault();
    return;
  }

  // 내용
  if(docRetirementText.value===''){
    alert("내용을 입력해주세요");
    docRetirementText.focus();
    e.preventDefault();
    return;
  }

  const userConfirm = confirm("결재를 요청하시겠습니까?");

  if(!userConfirm){
    e.preventDefault();
    return;
  }

})

/* =========================================================== */
/* 출/폐점 등록 요청서 */
const submitStore = document.getElementById("submitStore");
const saveStore = document.getElementById("saveStore");
const inputStore = document.getElementById("inputStore");
const inputStore2 = document.getElementById("inputStore2");
const storeName = document.getElementById("storeName");
const openStore = document.getElementById("openStore");
const closeStore = document.getElementById("closeStore");
const docStoreText = document.getElementById("docStoreText");

inputStore.addEventListener("input",e=>{
  const val = inputStore.value;
  inputStore2.value = val;
})

// 결재 버튼 클릭
submitStore.addEventListener("click", e =>{
  // 제목
  if(inputStore.value.trim().length == 0){
    alert("제목을 입력해주세요");
    inputStore.focus();
    e.preventDefault();
    return;
  }

  if(inputStore2.value.trim().length == 0){
    alert("제목을 입력해주세요");
    inputStore2.focus();
    e.preventDefault();
    return;
  }

  // storeName = storeName.value.trim();
  if(storeName.length == 0){
    alert("매장명을 입력해주세요");
    storeName.focus();
    e.preventDefault();
    return;
  }

  if(!(openStore.checked) && !(closeStore.checked)){
    alert("출/폐점 여부를 체크해주세요");
    e.preventDefault();
    return;
  }

  if(docStoreText.value===''){
    alert("내용을 입력해주세요");
    docStoreText.focus();
    e.preventDefault();
    return;
  }

  const userConfirm = confirm("결재를 요청하시겠습니까?");

  if(!userConfirm){
    e.preventDefault();
    return;
  }  

})

/* =========================================================== */
/* 지출결의서 */
const submitExpense = document.getElementById("submitExpense");
const saveExpense = document.getElementById("saveExpense");
const inputExpense = document.getElementById("inputExpense");
const inputExpense2 = document.getElementById("inputExpense2");
const docExpenseText = document.getElementById("docExpenseText");
// 첨부파일 추가

inputExpense.addEventListener("input",e=>{
  const val = inputExpense.value;
  inputExpense2.value = val;
})

// 결재 버튼 클릭
submitExpense.addEventListener("click", e =>{
  // 제목
  if(inputExpense.value.trim().length == 0){
    alert("제목을 입력해주세요");
    inputExpense.focus();
    e.preventDefault();
    return;
  }

  if(inputExpense2.value.trim().length == 0){
    alert("제목을 입력해주세요");
    inputExpense2.focus();
    e.preventDefault();
    return;
  }

  if(docExpenseText.value===''){
    alert("내용을 입력해주세요");
    docExpenseText.focus();
    e.preventDefault();
    return;
  }


  // 첨부파일 유효성 검사 추가

  const userConfirm = confirm("결재를 요청하시겠습니까?");

  if(!userConfirm){
    e.preventDefault();
    return;
  }  

})

/* =========================================================== */
/* 발주기안서 */
const submitOrder = document.getElementById("submitOrder");
const saveOrder = document.getElementById("saveOrder");
const inputOrder = document.getElementById("inputOrder");
const inputOrder2 = document.getElementById("inputOrder2");
const orderDate = document.getElementById("orderDate");
//품목 리스트 추가


inputOrder.addEventListener("input",e=>{
  const val = inputOrder.value;
  inputOrder2.value = val;
})

// 결재 버튼 클릭
submitOrder.addEventListener("click", e =>{
  
  // 제목
  if(inputOrder.value.trim().length == 0){
    alert("제목을 입력해주세요");
    inputOrder.focus();
    e.preventDefault();
    return;
  }

  if(inputOrder2.value.trim().length == 0){
    alert("제목을 입력해주세요");
    inputOrder2.focus();
    e.preventDefault();
    return;
  }

  // 날짜
  if(orderDate.value===''){
    alert("납기일을 입력해주세요");
    orderDate.focus();
    e.preventDefault();
    return;
  }

  // 품목리스트 추가예정

  const userConfirm = confirm("결재를 요청하시겠습니까?");

  if(!userConfirm){
    e.preventDefault();
    return;
  }

})

/* =========================================================== */


/* 부서 이름 클릭시 팀 목록 토글 */
function toggleTeams(e){

  const teamsList = e.parentElement.nextElementSibling;
  const displayTeams = teamsList.style.display;

  teamsList.style.display=(displayTeams==='none')?'block':'none';
  // if(displayTeams==='block'){
  //   setTimeout(() => {
  //     const block2 = document.getElementById("block2");
  //     block2.innerHTML = "";
  //   }, 0);
  // }
}


/* 결재선1에서 부서 클릭 시 결재선2에 모든 멤버 나오기 */
function selectAllMember(e){
  const block2 = document.getElementById("block2");
  block2.innerHTML="";

  // console.log(e.dataset.value);
  
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
  const block2 = document.getElementById("block2");
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

let count = 0;

function addLine(e){

  const block3 = document.getElementById("block3");
  const innerBoxes = block3.querySelectorAll(".lineBox");

  // 결재자 중복선택 방지 코드 작성 예정

  if(innerBoxes.length<4){
    
    const lineBox = document.createElement("div");
    const approverInfo = document.createElement("div");
    
    const departmentInfo = document.createElement("div");
    const teamInfo = document.createElement("div");
    const gradeInfo = document.createElement("div");
    const nameInfo = document.createElement("div");
    //const orderInfo = document.createElement("input");
    const memberNoInfo = document.createElement("input");
    const remove = document.createElement("div");
    

    lineBox.classList.add("lineBox");
    //orderInfo.setAttribute("name",`approverList[${count}].approverOrder`);
    //orderInfo.setAttribute("type","hidden");
    memberNoInfo.setAttribute("name","approverMemNo");
    memberNoInfo.setAttribute("type","hidden");

    fetch("/approval/writeApproval/selectMember?memberNo=" + e.value)
    .then(resp=>resp.json())
    .then((member)=>{
      departmentInfo.innerText=member.departmentName;
      if(member.teamName!=null){
        teamInfo.innerText=member.teamName;
      }
      gradeInfo.innerText=member.gradeName;
      nameInfo.innerText=member.memberName;
      memberNoInfo.setAttribute("value",member.memberNo);
    })
    .catch(e=>console.log(e));



    remove.innerHTML=`<i class="bi bi-x-circle-fill"></i>`;
    remove.classList.add("remove");
    remove.setAttribute("onclick","remove(this)");
  
  
    approverInfo.append(departmentInfo,teamInfo,gradeInfo,nameInfo,memberNoInfo);
    lineBox.append(approverInfo);
    lineBox.append(remove);
    block3.append(lineBox);

    console.log(lineBox);
    count++;
  }

  else alert("결재선을 추가할 수 없습니다.");
}

/* 결재선 삭제 */
function remove(e){
  e.parentElement.remove();
}