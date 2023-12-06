// 지점 변경 시 화면 변경
storeNoSelect.addEventListener("change", ()=>{
  location.href = "/stock/stockList?storeNo=" + storeNoSelect.value;
})

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

const serachName = document.getElementById("serachName");
const goodsNameList = document.getElementById("goodsNameList");

serachName.addEventListener("input", e=>{
  const inputValue = e.target.value.trim();

  if(inputValue.length == 0){
    goodsNameList.innerHTML = "";
    return;
  }

  fetch("/stock/goodsNameSelect?intputGoods=" + inputValue)
    .then(resp => resp.json())
    .then(list => {
      goodsNameList.innerHTML = ""; // 기존 자동완성 목록 초기화

      // 자동완성 결과를 기반으로 목록 생성
      list.forEach(item => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.textContent = item;
        goodsNameList.appendChild(listItem);
      });
    })
    .catch(e => console.log(e));
});

// 자동완성 목록에서 항목 선택 처리
goodsNameList.addEventListener("click", e => {
  const selectedValue = e.target.textContent;
  serachName.value = selectedValue;
  goodsNameList.innerHTML = ""; // 자동완성 목록 초기화 또는 숨김 처리

  // 선택된 항목에 대한 추가 동작 수행
  // 예: 선택한 상품명에 대한 추가 정보 로드 등
});
