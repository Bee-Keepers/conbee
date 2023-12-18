/* ========================================================================================================= */
/* 초기화 */

const block3s = document.querySelectorAll(".block3"); 
const docFileTds = document.querySelectorAll(".docFileTd");
const initialFileTds=[];
docFileTds.forEach((docFileTd)=>{initialFileTds.push(docFileTd.innerHTML)});
let currentApprovalNo;


const rewriteApproval = document.querySelectorAll(".rewriteApproval").forEach(function(one){

  one.addEventListener("click",function(){

    /* 폼 내용 초기화, 결재라인 초기화 */
    const formIds = ["docHoliday", "docRetirement", "docStore", "docExpense", "docOrder"];

    formIds.forEach(formId => {
      const form = document.getElementById(formId);
      form.reset();
    });

    const orderTbody = document.getElementById("orderTbody");
    orderTbody.innerHTML="";

    block3s.forEach((block3) => {block3.innerHTML = ""});

    /* 파일 td 초기화 */
    docFileTds.forEach((docFileTd,index)=>{docFileTd.innerHTML=initialFileTds[index];});


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

      currentApprovalNo=approvalNo;
      const approvalNoInput = document.createElement("input");
      approvalNoInput.setAttribute("type","hidden");
      approvalNoInput.setAttribute("name","approvalNo");
      approvalNoInput.value=approvalNo;

      switch(parseInt(docCategoryNo)){

        case 0 :{ /* 휴가신청서 */
          document.getElementById("docHoliday").append(approvalNoInput);
          document.getElementById("inputHoliday").value=map.tempApproval.approvalTitle;
          document.getElementById("inputHoliday2").value=map.tempApproval.approvalDocTitle;
          inputToInput(document.getElementById("inputHoliday"), document.getElementById("inputHoliday2"));
          // 휴가시작일, 휴가종료일
          if(map.tempApproval.docHolidayStart!=null){
            document.getElementById("docHolidayStart").value=map.tempApproval.docHolidayStart;
          }
          if(map.tempApproval.docHolidayEnd!=null){
            document.getElementById("docHolidayEnd").value=map.tempApproval.docHolidayEnd;
          }
          document.getElementById("docHolidayText").value=map.tempApproval.approvalContent;
          addTempCount("docHolidayText");

          // 파일
          fileSection(map, 3, 'docHolidayFile');

          // 결재자
          addTempApprovers(map.tempApprover, 4);
        }; break;

        case 1 :{ /* 사직서 */
          document.getElementById("docRetirement").append(approvalNoInput);
          document.getElementById("inputRetire").value=map.tempApproval.approvalTitle;
          document.getElementById("inputRetire2").value=map.tempApproval.approvalDocTitle;
          inputToInput(document.getElementById("inputRetire"), document.getElementById("inputRetire2"));
          if(map.tempApproval.docRetireDate!=null){
            document.getElementById("docRetireDate").value=map.tempApproval.docRetireDate;
          }
          document.getElementById("docRetirementText").value=map.tempApproval.approvalContent;
          addTempCount("docRetirementText");

          fileSection(map, 2, 'docRetirementFile');
          addTempApprovers(map.tempApprover, 3);
        }; break;

        case 2 : { /* 출점 */
          document.getElementById("docStore").append(approvalNoInput);
          document.getElementById("inputStore").value=map.tempApproval.approvalTitle;
          document.getElementById("inputStore2").value=map.tempApproval.approvalDocTitle;
          inputToInput(document.getElementById("inputStore"), document.getElementById("inputStore2"));
          document.getElementById("docStoreText").value=map.tempApproval.approvalContent;
          document.getElementById("storeName").value=map.tempApproval.storeName;
          document.getElementById("openStore").checked="true";
          addTempCount("docStoreText");
          fileSection(map, 1, 'docStoreFile');
          addTempApprovers(map.tempApprover, 2);
        }; break;

        case 3 : { /* 폐점 */
          document.getElementById("docStore").append(approvalNoInput);
          document.getElementById("inputStore").value=map.tempApproval.approvalTitle;
          document.getElementById("inputStore2").value=map.tempApproval.approvalDocTitle;
          inputToInput(document.getElementById("inputStore"), document.getElementById("inputStore2"));
          document.getElementById("docStoreText").value=map.tempApproval.approvalContent;
          document.getElementById("storeName").value=map.tempApproval.storeName;
          document.getElementById("storeNo").value=map.tempApproval.storeNo;
          document.getElementById("closeStore").checked="true";
          addTempCount("docStoreText");
          fileSection(map, 1, 'docStoreFile');
          addTempApprovers(map.tempApprover, 2);
        }; break;

        case 6 : { /* 임시저장 시 출폐점을 선택하지 않은 경우 */
          document.getElementById("docStore").append(approvalNoInput);
          document.getElementById("inputStore").value=map.tempApproval.approvalTitle;
          document.getElementById("inputStore2").value=map.tempApproval.approvalDocTitle;
          inputToInput(document.getElementById("inputStore"), document.getElementById("inputStore2"));
          document.getElementById("docStoreText").value=map.tempApproval.approvalContent;
          document.getElementById("storeName").value=map.tempApproval.storeName;
          document.getElementById("defaultStore").checked="true";
          addTempCount("docStoreText");
          fileSection(map, 1, 'docStoreFile');
          addTempApprovers(map.tempApprover, 2);
        }

        case 4 : { /* 지출 */
          document.getElementById("docExpense").append(approvalNoInput);
          document.getElementById("inputExpense").value=map.tempApproval.approvalTitle;
          document.getElementById("inputExpense2").value=map.tempApproval.approvalDocTitle;
          inputToInput(document.getElementById("inputExpense"), document.getElementById("inputExpense2"));
          document.getElementById("docExpenseText").value=map.tempApproval.approvalContent;
          addTempCount("docExpenseText");
          fileSection(map, 0, 'docExpenseFile');
          addTempApprovers(map.tempApprover, 1);
        }; break;
        
        case 5 : { /* 발주 */
          document.getElementById("docOrder").append(approvalNoInput);
          document.getElementById("inputOrder").value=map.tempApproval.approvalTitle;
          document.getElementById("inputOrder2").value=map.tempApproval.approvalDocTitle;
          inputToInput(document.getElementById("inputOrder"), document.getElementById("inputOrder2"));
          // console.log(map.tempOrderList);

          createOrder();
          if(map.tempOrderList.length>0){
            document.getElementById("orderDate").value=map.tempOrderList[0].docOrderDate;
            for(let i=0; i<map.tempOrderList.length;i++){
              document.querySelectorAll(".ListGoodsNo")[i].value=map.tempOrderList[i].goodsNo;
              document.querySelectorAll(".ListGoodsName")[i].value=map.tempOrderList[i].docOrderGoodsName;
              document.querySelectorAll(".ListOrderAmount")[i].value=map.tempOrderList[i].docOrderAmount;
              document.querySelectorAll(".ListOrderUnitPrice")[i].value=map.tempOrderList[i].docOrderUnitPrice;
              document.querySelectorAll(".orderPrice")[i].value=map.tempOrderList[i].docOrderPrice;
              orderPriceFn();
            }
          }

          addTempApprovers(map.tempApprover, 0);
        }; break;
        default : console.log("오류"); break;

      }
    })
    .catch(e=>console.log(e));

  })
})


/* ========================================================================================================= */
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


/* ========================================================================================================= */

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


/* ========================================================================================================= */
/* 공용 */

// 파일
function fileSection(map, i, inputFileId){
  
  const fileName = document.querySelectorAll(".fileName")[i];
  if(map.tempApproval.approvalFileOriginName!=null){
    fileName.innerText=map.tempApproval.approvalFileOriginName;
  }

  document.getElementById(inputFileId).addEventListener("change",(e)=>{
    fileName.innerText=e.target.files[0].name;
  })

  document.querySelectorAll(".fileReset")[i].addEventListener("click",(e)=>{
    const inputFile =e.target.parentElement.previousElementSibling.previousElementSibling;
    if(inputFile){
      inputFile.value="";
    }
    fileName.innerText="선택된 파일 없음";
  })
}

/* 제목 입력 함수 */
function inputToInput(title1, title2){
  title1.addEventListener("input", (e) => {
    const val = title1.value.trim();
    title2.value = val;
  });
}

/* 삭제버튼 */
function deleteBtn(){
  const userConfirm = confirm("문서를 삭제하시겠습니까?");

  if(!userConfirm){
    return;
  }
  const currentUrl = window.location.href;
  location.href="deleteTempApproval?approvalNo=" + currentApprovalNo +"&currentUrl=" + currentUrl;

}

/* =========================================================== */
/* 임시저장 */

function addSaveListener(saveId, extraAction = () => {}) {
  document.getElementById(saveId).addEventListener("click", e => {
    extraAction();

    const userConfirm = confirm("작성한 문서를 임시저장하시겠습니까?");
    if (!userConfirm) {
      e.preventDefault();
    }
  });
}

addSaveListener("saveHoliday");
addSaveListener("saveRetirement");
addSaveListener("saveStore", () => {
  const storeNo = document.getElementById("storeNo");
  if (storeNo.value == "") {
    storeNo.value = 200;
  }
});
addSaveListener("saveExpense");
addSaveListener("saveOrder");

/* ========================================================================================================= */
/* 유효성 검사 내부 코드 */

/* 휴가 신청서 */
const submitUpdateHoliday = document.getElementById("submitHoliday");
submitUpdateHoliday.addEventListener("click",(e)=>{
  console.log("확인확인");
  if(document.getElementById("inputHoliday").value.trim().length==0){
    console.log("확인");
    alert("제목을 입력해주세요");
    document.getElementById("inputHoliday").focus();
    e.preventDefault();
    return;
  }
  if(document.getElementById("inputHoliday2").value.trim().length == 0){
    alert("제목을 입력해주세요");
    document.getElementById("inputHoliday2").focus();
    e.preventDefault();
    return;
  }
  if(document.getElementById("docHolidayStart").value===''){
    alert("휴가 시작일을 입력해주세요");
    document.getElementById("docHolidayStart").focus();
    e.preventDefault();
    return;
  }
  if(document.getElementById("docHolidayEnd").value===''){
    alert("휴가 종료일을 입력해주세요");
    document.getElementById("docHolidayEnd").focus();
    e.preventDefault();
    return;
  }
  if(document.getElementById("docHolidayStart").value>document.getElementById("docHolidayEnd").value){ 
    alert("휴가 종료일을 정확하게 입력해주세요")
    document.getElementById("docHolidayEnd").focus();
    e.preventDefault();
    return;
  }
  if(document.getElementById("docHolidayText").value===''){
    alert("내용을 입력해주세요");
    document.getElementById("docHolidayText").focus();
    e.preventDefault();
    return;
  }
  if(block3s[4].innerHTML===''){
    alert("결재선을 추가해주세요");
    e.preventDefault();
    return;
  }
  const userConfirm = confirm("결재를 요청하시겠습니까?");
  if(!userConfirm){
    e.preventDefault();
    return;
  }
});
/* 사직서  */
const submitRetirement = document.getElementById("submitRetirement");
submitRetirement.addEventListener("click", (e) =>{
  if(document.getElementById("inputRetire").value.trim().length == 0){
    alert("제목을 입력해주세요");
    document.getElementById("inputRetire").focus();
    e.preventDefault();
    return;
  }
  if(document.getElementById("inputRetire2").value.trim().length == 0){
    alert("제목을 입력해주세요");
    document.getElementById("inputRetire2").focus();
    e.preventDefault();
    return;
  }
  if(document.getElementById("retirementDate").value===''){
    alert("퇴직 예정일을 입력해주세요");
    document.getElementById("retirementDate").focus();
    e.preventDefault();
    return;
  }
  if(document.getElementById("docRetirementText").value===''){
    alert("내용을 입력해주세요");
    document.getElementById("docRetirementText").focus();
    e.preventDefault();
    return;
  }
  if(block3s[3].innerHTML===''){
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
/* 출/폐점 등록 요청서 */
const submitStore = document.getElementById("submitStore");
submitStore.addEventListener("click", e =>{
  if(inputStore = document.getElementById("inputStore").value.trim().length == 0){
    alert("제목을 입력해주세요");
    inputStore = document.getElementById("inputStore").focus();
    e.preventDefault();
    return;
  }
  if(document.getElementById("inputStore2").value.trim().length == 0){
    alert("제목을 입력해주세요");
    document.getElementById("inputStore2").focus();
    e.preventDefault();
    return;
  }
  if(document.getElementById("storeName").length == 0){
    alert("매장명을 입력해주세요");
    document.getElementById("storeName").focus();
    e.preventDefault();
    return;
  }
  if(storeNo = document.getElementById("storeNo").length == 0){ // 폐점일때로 제한
    alert("매장번호를 입력해주세요");
    storeNo = document.getElementById("storeNo").focus();
    e.preventDefault();
    return;
  }
  if(!(document.getElementById("openStore").checked) && !(document.getElementById("closeStore").checked)){
    alert("출/폐점 여부를 체크해주세요");
    e.preventDefault();
    return;
  }
  if(document.getElementById("docStoreText").value===''){
    alert("내용을 입력해주세요");
    document.getElementById("docStoreText").focus();
    e.preventDefault();
    return;
  }
  if(block3s[2].innerHTML===''){
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
/* 지출결의서 */
const submitExpense = document.getElementById("submitExpense");
submitExpense.addEventListener("click", e =>{
  if(document.getElementById("inputExpense").value.trim().length == 0){
    alert("제목을 입력해주세요");
    document.getElementById("inputExpense").focus();
    e.preventDefault();
    return;
  }
  if(document.getElementById("inputExpense2").value.trim().length == 0){
    alert("제목을 입력해주세요");
    document.getElementById("inputExpense2").focus();
    e.preventDefault();
    return;
  }
  if(document.getElementById("docExpenseText").value===''){
    alert("내용을 입력해주세요");
    document.getElementById("docExpenseText").focus();
    e.preventDefault();
    return;
  }
  if(document.getElementById("docExpenseFile").value===''){
    alert("영수증 파일을 첨부해주세요");
    e.preventDefault();
    return;
  }
  if(block3s[1].innerHTML===''){
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
/* 발주기안서 */
const submitOrder = document.getElementById("submitOrder");
submitOrder.addEventListener("click", e =>{
  if(document.getElementById("inputOrder").value.trim().length == 0){
    alert("제목을 입력해주세요");
    document.getElementById("inputOrder").focus();
    e.preventDefault();
    return;
  }
  if(document.getElementById("inputOrder2").value.trim().length == 0){
    alert("제목을 입력해주세요");
    document.getElementById("inputOrder2").focus();
    e.preventDefault();
    return;
  }
  if(document.getElementById("orderDate").value===''){
    alert("납기일을 입력해주세요");
    document.getElementById("orderDate").focus();
    e.preventDefault();
    return;
  }
  const tbody = document.getElementById("orderTbody");
  if(tbody.firstElementChild.firstElementChild.firstElementChild.value===''){
      alert("발주 품목을 추가해주세요");
      e.preventDefault();
      return;
  }
  if(block3s[0].innerHTML===''){
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



/* ====================================== */

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


function createOrder(){

  const docOrder = document.getElementById("docOrder");
  const orderSum = document.getElementById("orderSum");
  // 발주기안서 테이블 생성
  const orderTbody = document.getElementById("orderTbody");
  
  for(let i = 0; i<10 ; i++){
    const orderTr = createElement("tr", null, ["orderRow"]);
  
    // 상품번호 컬럼 생성
    const td1 = document.createElement("td");
    const input1 = createElement("input", {"type":"number","name":"approvalList["+i+"].goodsNo","class":"ListGoodsNo"},[]);
    input1.readOnly = true;
    td1.append(input1);
  
    // 품목이름 컬럼 생성
    const td2 = document.createElement("td");
    const input2 = createElement("input", {"type":"text","name":"approvalList["+i+"].docOrderGoodsName","class":"ListGoodsName"},[]);
    const div = createElement("div", null, ["list-group", "position-absolute", "zindex2000"]);
  
    // 품목이름 자동완성
    input2.addEventListener("input", e=>{
      const tr = e.target.parentElement.parentElement;
      const input = e.target;
  
      // 자동완성 박스 초기화
      div.innerHTML = "";
  
      // 초기화
      tr.children[0].children[0].value = "";
      tr.children[2].children[0].value = "";
      tr.children[2].children[0].disabled = true;
      tr.children[3].children[0].value = "";
      tr.children[4].children[0].value = "";
  
      // 글자 지울 시 남아있는 자동완성 삭제
      if(e.target.value.trim().length == 0){
        orderPriceFn();
        return;
      }
  
    fetch("/approval/docOrderName?goodsName=" + e.target.value)
    .then(resp=>resp.json())
    .then(goodsList=>{
  
      for(let goods of goodsList){
        const button = createElement("button", {"type" : "button"}, ["list-group-item"]);
        button.innerText = goods.goodsName;
        div.append(button);
  
        // 버튼 클릭 시 컬럼들 값 채워지기
        button.addEventListener("click", ()=>{
          const goodsNos = document.querySelectorAll(".orderRow>td:first-of-type>input");
          for(let item of goodsNos){
            if(item.value == goods.goodsNo){
              alert("이미 존재하는 품목입니다");
              input.value = "";
              div.innerHTML = "";
              return;
            }
          }
          e.target.value = goods.goodsName;
          e.target.readOnly = true;
  
          tr.children[0].children[0].value = goods.goodsNo;
          tr.children[2].children[0].value = 0;
          tr.children[2].children[0].disabled = false;
          // tr.children[3].children[0].value = goods.stockInPrice;
  
          div.innerHTML = "";
        })
      }
    })
    .catch(e=>console.log(e));
  
    });
    input2.addEventListener("dblclick" , e=>{
      e.target.readOnly = false;
    });
    td2.append(input2, div);
    
    // 수량 컬럼 생성
    const td3 = document.createElement("td");
    const input3 = createElement("input", {"type":"number","name":"approvalList["+i+"].docOrderAmount", "class":"ListOrderAmount"},[]);
    // input3.disabled = true;
    input3.addEventListener("input", e=>{
      if(e.target.value < 0){
        e.target.value = 0;
      }
      input5.value = e.target.value * input4.value;
      orderPriceFn();
    });
    td3.append(input3);
    
    // 단가 컬럼 생성
    const td4 = document.createElement("td");
    const input4 = createElement("input", {"type":"number","name":"approvalList["+i+"].docOrderUnitPrice", "class":"ListOrderUnitPrice"},[]);
    // input4.readOnly = true;
    td4.append(input4);
  
    // 금액 컬럼 생성
    const td5 = document.createElement("td");
    const input5 = createElement("input", {"type":"number","name":"approvalList["+i+"].docOrderPrice"},[]);
    input5.classList.add("orderPrice");
    input5.readOnly = true;
    td5.append(input5);
  
    orderTr.append(td1, td2, td3, td4, td5);
    orderTbody.append(orderTr);
  }
  
  function orderPriceFn(){
    const orderPrice = document.getElementsByClassName("orderPrice");
    console.log(orderPrice);
    let temp = 0;
    for(let price of orderPrice){
      if(price.value != ""){
        temp += Number(price.value);
      }
      console.log(temp);
    }
    orderSum.value = temp;
  }
}

function orderPriceFn(){
  const orderPrice = document.getElementsByClassName("orderPrice");
  let temp = 0;
  for(let price of orderPrice){
    if(price.value != ""){
      temp += Number(price.value);
    }
    console.log(temp);
  }
  orderSum.value = temp;
}

docOrder.addEventListener("submit", ()=>{
  const docOrder = document.querySelectorAll("#orderTbody>tr>td>input");
  for(let item of docOrder){
    if(item.value.trim().length == 0){
      item.disabled = true;
    }
  }
});
