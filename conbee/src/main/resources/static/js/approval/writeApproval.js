const modal = document.getElementById("doc1");
const docOne = document.getElementById("docOne");

docOne.addEventListener("click",()=>{
  modal.style.display="block";
})



/* docHoliday =============================================== */
/* 제목 입력 시 -> 템플릿 안 제목 같이 입력되기 */
const inputHoliday = document.getElementById("inputHoliday");
const inputHoliday2 = document.getElementById("inputHoliday2");

inputHoliday.addEventListener("input",e=>{
  // console.log("확인");
  const val = inputHoliday.value;
  inputHoliday2.value = val;
})

/* inputRetire =============================================== */
/* 제목 입력 시 -> 템플릿 안 제목 같이 입력되기 */
const inputRetire = document.getElementById("inputRetire");
const inputRetire2 = document.getElementById("inputRetire2");

inputRetire.addEventListener("input",e=>{
  const val = inputRetire.value;
  inputRetire2.value = val;
})

/* inputStore =============================================== */
/* 제목 입력 시 -> 템플릿 안 제목 같이 입력되기 */
const inputStore = document.getElementById("inputStore");
const inputStore2 = document.getElementById("inputStore2");

inputStore.addEventListener("input",e=>{
  const val = inputStore.value;
  inputStore2.value = val;
})

/* inputStore =============================================== */
/* 제목 입력 시 -> 템플릿 안 제목 같이 입력되기 */
const inputExpense = document.getElementById("inputExpense");
const inputExpense2 = document.getElementById("inputExpense2");

inputExpense.addEventListener("input",e=>{
  const val = inputExpense.value;
  inputExpense2.value = val;
})
