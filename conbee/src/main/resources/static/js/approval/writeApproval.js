/* =========================================== */
/* 기안문 정보 받아오기 */

(()=>{

  // 기안문 정보 가져오기
  fetch("/approval/writeApproval/selectInfo")
  .then((resp) => {return resp.json(); })
  .then((writeInfo) => {

    // 팀이름(부장일 경우 부서이름)
    const infoTeams = document.querySelectorAll(".infoTeam");
    infoTeams.forEach((infoTeam)=>{

      if(writeInfo.teamName==null){
        infoTeam.innerText = writeInfo.departmentName;
      }
      else{
        infoTeam.innerText = writeInfo.departmentName + "(" + writeInfo.teamName + ")";
      }

    })

    // 이름
    const infoNames = document.querySelectorAll(".infoName");
    infoNames.forEach((infoName)=>{
      infoName.innerText = writeInfo.memberName;
    })

    const docWriteInfos = document.querySelectorAll(".docWriteInfo");
    docWriteInfos.forEach((docWriteInfo)=>{
      docWriteInfo.innerText = writeInfo.memberName + "(" + writeInfo.departmentName + ")";
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



// =========================================================== 템플릿 코드 하나로 정리 예정



/* =========================================================== */
/* 휴가 신청서 */
const submitHoliday = document.getElementById("submitHoliday");
const saveHoliday = document.getElementById("saveHoliday");
const inputHoliday = document.getElementById("inputHoliday");
const inputHoliday2 = document.getElementById("inputHoliday2");
const docHolidayStart = document.getElementById("docHolidayStart");
const docHolidayEnd = document.getElementById("docHolidayEnd");
const docHolidayText = document.getElementById("docHolidayText");
const docHoliday = document.getElementById("docHoliday");
const block1 = docHoliday.lastElementChild.lastElementChild.firstElementChild.lastElementChild.lastElementChild;
const block2 = docHoliday.lastElementChild.lastElementChild.firstElementChild.lastElementChild.lastElementChild;
const block3 = docHoliday.lastElementChild.lastElementChild.lastElementChild.lastElementChild;

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
// =========================================================== 템플릿 코드 하나로 정리 예정

/* =========================================================== */
const openDocOne = document.getElementById("docOne") // 휴가
const openDocTwo = document.getElementById("docTwo") // 퇴직
const openDocThree = document.getElementById("docThree") // 점포
const openDocFour = document.getElementById("docFour") // 지출
const openDocFive = document.getElementById("docFive") // 발주


const inputs = document.getElementsByTagName('input');

// 모달 창 띄울 때 주소 넣기 + 모달 창 다시 켰을 때 reset하기
// => 주소 넣기 삭제 
openDocOne.addEventListener("click",()=>{
  Array.from(inputs).forEach(e => e.value="");
  docHolidayText.value="";

  // block1 초기화 코드 추가
  block2.innerHTML="";
  block3.innerHTML="";
  members=[];
  updateTextCount();
  
})
openDocTwo.addEventListener("click",()=>{
  Array.from(inputs).forEach(e => e.value="");
  docRetirementText.value="";
  block2.innerHTML="";
  block3.innerHTML="";
})
openDocThree.addEventListener("click",()=>{
  Array.from(inputs).forEach(e => e.value="");
  openStore.checked=false;
  closeStore.checked=false;
  docStoreText.value="";
  block2.innerHTML="";
  block3.innerHTML="";

})
openDocFour.addEventListener("click",()=>{
  Array.from(inputs).forEach(e => e.value="");
  docExpenseText.value="";
  block2.innerHTML="";
  block3.innerHTML="";
  // 파일도 추가
})
openDocFive.addEventListener("click",()=>{
  block2.innerHTML="";
  block3.innerHTML="";
})


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

      console.log(innerBoxes);
      console.log(innerBoxes.length);
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