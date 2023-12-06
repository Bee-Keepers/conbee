// 지점 선택 시
const storeSelect = document.getElementById("storeSelect");
storeSelect.addEventListener("change", ()=>{
  storeNo.value = storeSelect.value;
});