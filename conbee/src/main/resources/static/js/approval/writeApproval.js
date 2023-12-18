/* ========================================================================================================= */
/* 초기화 */
let members=[];
const approverFulls = document.querySelectorAll(".approverFull");
const initialApproverSection = [];
initialApproverSection.push(approverFulls[0].innerHTML);
const textareas = document.querySelectorAll('textarea');
const block3s = document.querySelectorAll(".block3");
const docFiles = document.querySelectorAll(".docFile");

const openDoc = document.querySelectorAll('#docOne, #docTwo, #docThree, #docFour, #docFive');


openDoc.forEach((doc)=>{
  doc.addEventListener("click",(element)=>{

    switch(doc.id){
      case 'docFive' : document.getElementById("docOrder").reset();
      case 'docFour' : document.getElementById("docExpense").reset();
      case 'docThree' : document.getElementById("docStore").reset();
      case 'docTwo' : document.getElementById("docRetirement").reset();
      case 'docOne' : document.getElementById("docHoliday").reset();
    }

    approverFulls.forEach((approverFull)=>{approverFull.innerHTML=initialApproverSection[0];});
    members=[];
    textareas.forEach((textarea) => {docTextCount(textarea.id);});
    // block3s.forEach((block3) => {block3.innerHTML = ""});
    docFiles.forEach((docFile)=>{docFile.value=""});

    // 기안문 정보 가져오기
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
      infoNames.forEach((infoName)=>{infoName.innerText = writeInfo.memberName;});

      const docWriteInfos = document.querySelectorAll(".docWriteInfo");
      docWriteInfos.forEach((docWriteInfo)=>{
        docWriteInfo.innerText = writeInfo.memberName + "(" + writeInfo.departmentName + ")";
      })

    })
    .catch(e => console.log(e));
  })
});


/* 글자수 */
const maxLength = 1000;

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

/* 제목 입력 함수 */
function inputToInput(title1, title2){
  title1.addEventListener("input", (e) => {
    const val = title1.value.trim();
    title2.value = val;
  });
}

/* 파일 */
docFiles.forEach(function(docFile){
  docFile.addEventListener("change", function(){
    this.nextElementSibling.innerText=this.files[0].name;
  });
});

const fileResets = document.querySelectorAll(".fileReset");
fileResets.forEach(fileReset=>{
  fileReset.addEventListener("click", e=>{
    e.target.parentElement.previousElementSibling.previousElementSibling.value="";
    e.target.parentElement.previousElementSibling.innerText="선택된 파일 없음";
  });
});


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



/* =========================================================== */
/* 휴가 신청서 */
const submitHoliday = document.getElementById("submitHoliday");
const saveHoliday = document.getElementById("saveHoliday");
const inputHoliday = document.getElementById("inputHoliday");
const inputHoliday2 = document.getElementById("inputHoliday2");
const docHolidayStart = document.getElementById("docHolidayStart");
const docHolidayEnd = document.getElementById("docHolidayEnd");
const docHolidayText = document.getElementById("docHolidayText");

// 제목 입력 시 -> 템플릿 안 제목 같이 입력되기
inputToInput(inputHoliday, inputHoliday2);

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
  if(members.length==0){
    // console.log(members);
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
const docRetireDate = document.getElementById("docRetireDate");
const docRetirementText = document.getElementById("docRetirementText")

inputToInput(inputRetire, inputRetire2);


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
  if(docRetireDate.value===''){
    alert("퇴직 예정일을 입력해주세요");
    docRetireDate.focus();
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
  if(members.length==0){
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
/* 출/폐점 등록 요청서 */
const submitStore = document.getElementById("submitStore");
// const saveStore = document.getElementById("saveStore");
const inputStore = document.getElementById("inputStore");
const inputStore2 = document.getElementById("inputStore2");
const storeName = document.getElementById("storeName");
const openStore = document.getElementById("openStore");
const closeStore = document.getElementById("closeStore");
const defaultStore = document.getElementById("defaultStore");
const storeNo = document.getElementById("storeNo");
const docStoreText = document.getElementById("docStoreText");

inputToInput(inputStore, inputStore2);



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

  if(storeName.length == 0){
    alert("매장명을 입력해주세요");
    storeName.focus();
    e.preventDefault();
    return;
  }

  if(storeNo.length == 0){ // 폐점일때로 제한
    alert("매장번호를 입력해주세요");
    storeNo.focus();
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

  if(members.length==0){
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
/* 지출결의서 */
const submitExpense = document.getElementById("submitExpense");
const saveExpense = document.getElementById("saveExpense");
const inputExpense = document.getElementById("inputExpense");
const inputExpense2 = document.getElementById("inputExpense2");
const docExpenseText = document.getElementById("docExpenseText");
const docExpenseFile = document.getElementById("docExpenseFile");

inputToInput(inputExpense, inputExpense2);

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

  if(docExpenseFile.value===''){
    alert("영수증 파일을 첨부해주세요");
    e.preventDefault();
    return;
  }

  if(members.length==0){
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
/* 발주기안서 */
const submitOrder = document.getElementById("submitOrder");
const saveOrder = document.getElementById("saveOrder");
const inputOrder = document.getElementById("inputOrder");
const inputOrder2 = document.getElementById("inputOrder2");
const orderDate = document.getElementById("orderDate");
//품목 리스트 추가

inputToInput(inputOrder, inputOrder2);

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
  const tbody = document.getElementById("orderTbody");
  if(tbody.firstElementChild.firstElementChild.firstElementChild.value===''){
      alert("발주 품목을 추가해주세요");
      e.preventDefault();
      return;
  }

  if(members.length==0){
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
function addLine(e){

  const block3 = e.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild;
  const innerBoxes = block3.querySelectorAll(".lineContainer");


  console.log(innerBoxes);
  console.log(innerBoxes.length);
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
      console.log(members);


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

/* 김민석 ----------------- DOC_ORDER 작업 -----------------------------------------------------------*/


// const docOrderGoodsName = document.getElementById("docOrderGoodsName");
// docOrderGoodsName.addEventListener("input", e=>{
//   orderInputFn(e);
// });
// function orderInputFn(e){
//   e.target.parentElement.previousElementSibling.innerHTML = "";
//   e.target.parentElement.nextElementSibling.nextElementSibling.innerHTML = "";
//   e.target.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = "";
//   e.target.parentElement.nextElementSibling.innerHTML = "";
//   if(e.target.value.trim().length ==0){
//     // e.target.nextElementSibling.remove();
//     return;
//   }

//   // 자동완성 초기화
//   if(e.target.nextElementSibling != null){
//     e.target.nextElementSibling.remove();
//   }
//   const div = createElement("div", null, ["list-group", "position-absolute", "zindex2000"]);
//   e.target.after(div);
//   fetch("/approval/docOrderName?goodsName=" + e.target.value)
//   .then(resp=>resp.json())
//   .then(goodsList=>{
//     for(let goods of goodsList){
//       const button = createElement("button", {"type" : "button"}, ["list-group-item"]);
//       button.innerText = goods.goodsName;
//       div.append(button);

//       // button 누르면 기안서 안으로 정보 들어가는 이벤트 달기
//       button.addEventListener("click", ()=>{
//         // 만약 goodsNo가 이미 존재하는 경우는 입력 안되게
//         const goodsNos = document.querySelectorAll(".orderRow>td:first-of-type>input");
//         for(let item of goodsNos){
//           if(item.value == goods.goodsNo){
//             alert("이미 존재하는 품목입니다");
//             e.target.value = "";
//             div.remove();
//             button.remove();
//             return;
//           }
//         }
//         e.target.value = goods.goodsName;
//         e.target.readOnly = true;
//         const input1 = createElement("input", {"type":"number", "name":"goodsNo", "value":goods.goodsNo, "readonly":true},[]);
//         const input2 = createElement("input", {"type":"number", "name":"docOrderUnitPrice", "value":goods.stockInPrice, "readonly":true},[]);
//         const input3 = createElement("input", {"type":"number", "name":"docOrderAmount", "value":0},[]);
//         input3.addEventListener("change", ()=>{
//           e.target.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerText =
//           input2.value * input3.value;
//           const orderPrice = document.querySelectorAll(".orderRow>td:last-of-type");
//           let temp = 0;
//           for(let price of orderPrice){
//             if(price.innerText != ""){
//               temp += parseInt(price.innerText);
//             }
//           }
//           orderSum.innerText = temp;
//         });
//         e.target.parentElement.previousElementSibling.innerHTML = "";
//         e.target.parentElement.nextElementSibling.nextElementSibling.innerHTML = "";
//         e.target.parentElement.nextElementSibling.innerHTML = "";
//         e.target.parentElement.previousElementSibling.append(input1);
//         e.target.parentElement.nextElementSibling.nextElementSibling.append(input2);
//         e.target.parentElement.nextElementSibling.append(input3);

//         e.target.parentElement.parentElement.nextElementSibling.children[1].children[0].disabled = false;

//         button.parentElement.remove();
//         button.remove();

//       });
      
//     }
//   })
//   .catch(e=>console.log(e));
// }

// const docOrderGoodsNames = document.querySelectorAll("input[name='docOrderGoodsName']");
// for(let docOrder of docOrderGoodsNames){
//   docOrder.addEventListener("input", e=>{
//     const tr = e.target.parentElement.parentElement;
//     const input = e.target;

//     // 초기화
//     tr.children[0].innerHTML = "";
//     tr.children[2].innerHTML = "";
//     tr.children[3].innerHTML = "";

//     // 글자 지울 시 남아있는 자동완성 삭제
//     if(e.target.value.trim().length == 0){
//       if(tr.children[1].children[1] != null){
//         tr.children[1].children[1].remove();
//       }
//       return;
//     }

//   fetch("/approval/docOrderName?goodsName=" + e.target.value)
//   .then(resp=>resp.json())
//   .then(goodsList=>{
//     const div = createElement("div", null, ["list-group", "position-absolute", "zindex2000"]);
//     e.target.after(div);
//     for(let goods of goodsList){
//       const button = createElement("button", {"type" : "button"}, ["list-group-item"]);
//       button.innerText = goods.goodsName;
//       div.append(button);

//       button.addEventListener("click", ()=>{
//         const goodsNos = document.querySelectorAll(".orderRow>td:first-of-type>input");
//         for(let item of goodsNos){
//           if(item.value == goods.goodsNo){
//             alert("이미 존재하는 품목입니다");
//             input.value = "";
//             div.remove();
//             button.remove();
//             return;
//           }
//         }
//       })
//     }
//   })
//   .catch(e=>console.log(e));

//   });
// }





const docOrder = document.getElementById("docOrder");
const orderSum = document.getElementById("orderSum");
// 발주기안서 테이블 생성
const orderTbody = document.getElementById("orderTbody");

for(let i = 0; i<10 ; i++){
  const orderTr = createElement("tr", null, ["orderRow"]);

  // 상품번호 컬럼 생성
  const td1 = document.createElement("td");
  const input1 = createElement("input", {"type":"number","name":"approvalList["+i+"].goodsNo"},[]);
  input1.readOnly = true;
  td1.append(input1);

  // 품목이름 컬럼 생성
  const td2 = document.createElement("td");
  const input2 = createElement("input", {"type":"text","name":"approvalList["+i+"].docOrderGoodsName"},[]);
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
  const input3 = createElement("input", {"type":"number","name":"approvalList["+i+"].docOrderAmount"},[]);
  input3.disabled = true;
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
  const input4 = createElement("input", {"type":"number","name":"approvalList["+i+"].docOrderUnitPrice"},[]);
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

docOrder.addEventListener("submit", ()=>{
  const docOrder = document.querySelectorAll("#orderTbody>tr>td>input");
  for(let item of docOrder){
    if(item.value.trim().length == 0){
      item.disabled = true;
    }
  }
});