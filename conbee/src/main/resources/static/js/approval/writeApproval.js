
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


/* =========================================================== */
/* 모달 창 띄울 때 주소 넣기 */
// const openDocOne = 
// const closeDoc = document.querySelectorAll('button[name="closeDoc"]');
// console.log(closeDoc);

// document.getElementById("docOne").addEventListener("click",()=>{
//   history.pushState(null, null, 'writeApproval/docHoliday');
// })


// /* 닫기 -> 주소 복원 */
// closeDoc.forEach(function(e){
//   closeDoc.addEventListener("click",()=>{
//     history.pushState(null, null, '/approval/writeApproval');
//   })
// })



// closeDoc.addEventListener("click",()=>{
//   history.pushState(null, null, '/approval/writeApproval');
// })



/* =========================================================== */
/* 결재, 임시저장 버튼 클릭 -> 요청 */





