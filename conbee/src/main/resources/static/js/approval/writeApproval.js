/* 기안문 정보 받아오기 */

(()=>{

  // 기안문 정보 가져오기
  fetch("/approval/writeApproval/docWriteInfos")
  .then((resp) => {
    // console.log(resp);
    return resp.json();
  })
  .then((map) => {

    // console.log(map);
    const docWriteInfosMap = new Map(Object.entries(map));

    const infoTeams = document.querySelectorAll(".infoTeam");
    infoTeams.forEach((infoTeam)=>{
      infoTeam.innerText = docWriteInfosMap.get('infoTeam');
    })

    const infoNames = document.querySelectorAll(".infoName");
    // console.log(infoNames);
    // console.log(docWriteInfosMap.get('infoName'));
    infoNames.forEach((infoName)=>{
      infoName.innerText = docWriteInfosMap.get('infoName');
    })

    const docWriteInfos = document.querySelectorAll(".docWriteInfo");
    docWriteInfos.forEach((docWriteInfo)=>{
      docWriteInfo.innerText = docWriteInfosMap.get('infoName') + "(" + docWriteInfosMap.get('infoTeam') + ")";
    })

  })

  .catch(e => console.log(e));

})();




/* =========================================================== */
/* 공통 */


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

// 내용 글자수 표시
const textareas = document.querySelectorAll(".docText");
const textCounts = document.querySelectorAll(".textCount");
const maxLength = 1000;

textareas.forEach((textarea)=>{

  textarea.addEventListener('input', function() {
      let currentLength = textarea.value.length;

      textCounts.forEach((textCount)=>{
        textCount.textContent = currentLength + ' / ' + maxLength + ' 글자';

        // 글자수 초과시 빨간색
        if (currentLength > maxLength) {
          textCount.style.color='red';
        } else {
          textCount.style.color='black';
        }
      })
  
  });
})

/* =========================================================== */
const openDocOne = document.getElementById("docOne")
const openDocTwo = document.getElementById("docTwo")
const openDocThree = document.getElementById("docThree")
const openDocFour = document.getElementById("docFour")
const openDocFive = document.getElementById("docFive")


// 모달 창 띄울 때 주소 넣기 + reset
openDocOne.addEventListener("click",()=>{
  history.pushState(null, null, 'writeApproval/docHoliday');
  inputHoliday.value="";
  inputHoliday2.value="";
  docHolidayStart.value="";
  docHolidayEnd.value="";
  docHolidayText.value="";
})
openDocTwo.addEventListener("click",()=>{
  history.pushState(null, null, 'writeApproval/docRetirement');
})
openDocThree.addEventListener("click",()=>{
  history.pushState(null, null, 'writeApproval/docStore');
})
openDocFour.addEventListener("click",()=>{
  history.pushState(null, null, 'writeApproval/docExpense');
})
openDocFive.addEventListener("click",()=>{
  history.pushState(null, null, 'writeApproval/docOrder');
})


/* 닫기 -> 주소 복원 */
//----------------------------> 닫기 전에 임시저장 confirm 코드 추가 예정
// 닫기 버튼 클릭 
const closeDoc = document.querySelectorAll('button[name="closeDoc"]');
closeDoc.forEach(function(e){
  e.addEventListener("click",()=>{
    history.pushState(null, null, '/approval/writeApproval');
  })
})

// 모달 외부 클릭
const modals = document.querySelectorAll('.modal');

modals.forEach(function(modal){
  modal.addEventListener("click", function(m){

    if(m.target === modal){
      history.pushState(null, null, '/approval/writeApproval');
    }
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

//제목 입력 시 -> 템플릿 안 제목 같이 입력되기
inputHoliday.addEventListener("input",e=>{
  const val = inputHoliday.value.trim();
  inputHoliday2.value = val;
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

  const userConfirm = confirm("결재를 요청하시겠습니까?");

  if(!userConfirm){
    e.preventDefault();
    return;
  }


})

/* =========================================================== */
/* 사직서  */
const inputRetire = document.getElementById("inputRetire");
const inputRetire2 = document.getElementById("inputRetire2");

inputRetire.addEventListener("input",e=>{
  const val = inputRetire.value;
  inputRetire2.value = val;
})

/* =========================================================== */
/* 출/폐점 등록 요청서 */
const inputStore = document.getElementById("inputStore");
const inputStore2 = document.getElementById("inputStore2");

inputStore.addEventListener("input",e=>{
  const val = inputStore.value;
  inputStore2.value = val;
})

/* =========================================================== */
/* 지출결의서 */
const inputExpense = document.getElementById("inputExpense");
const inputExpense2 = document.getElementById("inputExpense2");

inputExpense.addEventListener("input",e=>{
  const val = inputExpense.value;
  inputExpense2.value = val;
})

/* =========================================================== */
/* 발주기안서 */



/* =========================================================== */



