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
const openDocOne = document.getElementById("docOne")
const openDocTwo = document.getElementById("docTwo")
const openDocThree = document.getElementById("docThree")
const openDocFour = document.getElementById("docFour")
const openDocFive = document.getElementById("docFive")


// 모달 창 띄울 때 주소 넣기
openDocOne.addEventListener("click",()=>{
  history.pushState(null, null, 'writeApproval/docHoliday');
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
/* 결재, 임시저장 버튼 클릭 -> 요청 */


/* 제목 입력 시 -> 템플릿 안 제목 같이 입력되기 */

/* docHoliday */
const inputHoliday = document.getElementById("inputHoliday");
const inputHoliday2 = document.getElementById("inputHoliday2");

inputHoliday.addEventListener("input",e=>{
  const val = inputHoliday.value;
  inputHoliday2.value = val;
})

/* inputRetire */
const inputRetire = document.getElementById("inputRetire");
const inputRetire2 = document.getElementById("inputRetire2");

inputRetire.addEventListener("input",e=>{
  const val = inputRetire.value;
  inputRetire2.value = val;
})

/* inputStore */
const inputStore = document.getElementById("inputStore");
const inputStore2 = document.getElementById("inputStore2");

inputStore.addEventListener("input",e=>{
  const val = inputStore.value;
  inputStore2.value = val;
})

/* inputStore */
const inputExpense = document.getElementById("inputExpense");
const inputExpense2 = document.getElementById("inputExpense2");

inputExpense.addEventListener("input",e=>{
  const val = inputExpense.value;
  inputExpense2.value = val;
})


