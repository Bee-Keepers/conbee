// 발주 조회 지점 선택
const storeNoSelect = document.getElementById("storeNoSelect");
storeNoSelect.addEventListener("change", e=>{
  location.href = "/stock/order/list?storeNo=" + e.target.value;
});

// 지점 선택 옵션 저장
const url = new URL(location.href);
const urlParams = url.searchParams;

const options = document.querySelectorAll("#storeNoSelect>option");
for(let option of options){
    if(option.value == urlParams.get("storeNo")){
        option.selected = true;
        break;
    }
}