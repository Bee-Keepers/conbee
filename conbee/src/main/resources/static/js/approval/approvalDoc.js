/* docHoliday =============================================== */

/* 제목 입력 시 -> 템플릿 안 제목 같이 입력되기 */
const inputTitle = document.getElementById("inputTitle");
const inputTitle2 = document.getElementById("inputTitle2");

inputTitle.addEventListener("input",e=>{
  const val = inputTitle.value;
  inputTitle2.value = val;
})