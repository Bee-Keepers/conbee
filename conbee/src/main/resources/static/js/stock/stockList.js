const storeNoSelect = document.getElementById("storeNoSelect");
// 지점 변경 시 화면 변경
storeNoSelect.addEventListener("change", ()=>{
  location.href = "/stock/stockList?storeNo=" + storeNoSelect.value;
})

const url = new URL(location.href);
const urlParams = url.searchParams;
const options = document.querySelectorAll("#storeNoSelect>option");
// 지점 선택 옵션 저장
for(let option of options){
  if(option.value == urlParams.get("storeNo")){
    option.selected = true;
    break;
  }
}

const lcategoryName = document.getElementById("lcategoryName");
const scategoryName = document.getElementById("scategoryName");
const serachName = document.getElementById("serachName");
const goodsNameList = document.getElementById("goodsNameList");
// 등록 시 상품명 입력하면 대분류, 소분류 자동입력
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

      console.log(list);
      // 자동완성 결과를 기반으로 목록 생성
      list.forEach(item => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.innerText = item.goodsName;

        // 자동완성 목록에서 항목 선택 처리
        listItem.addEventListener("click", e => {
          const selectedValue = e.target.innerText;
          serachName.value = selectedValue;
          goodsNameList.innerHTML = ""; // 자동완성 목록 초기화 또는 숨김 처리
          lcategoryName.value = item.lcategoryName;
          scategoryName.value = item.scategoryName;
          // 선택된 항목에 대한 추가 동작 수행
          // 예: 선택한 상품명에 대한 추가 정보 로드 등
        });

        goodsNameList.appendChild(listItem);
      });
    })
    .catch(e => console.log(e));
});

const deleteBtn = document.getElementById("deleteBtn");

/* 체크박스 선택 후 삭제버튼 눌렀을 때 goodsNo값, storeNo값 넘어옴 */
deleteBtn.addEventListener('click', () => {
   
  if( confirm("삭제 하시겠습니까?") ){
    let obj = document.querySelectorAll(".checkbox");
    console.log(obj);
    let idList = new Array();
    for(let i = 0; i<obj.length; i++){
      if(obj[i].checked == true) {
        console.log(obj[i].name);
        idList.push(obj[i].name);
      }
    }
    let data = {};
    data.goodsNoList = idList.join();
    data.storeNo = storeNoSelect.value;

    console.log(idList);
    console.log(data);
    fetch( "/stock/stockDelete", {
      method : "DELETE",
      headers : {"Content-type" : "application/json"},
      body : JSON.stringify(data)
    })
    .then(resp => resp.text())
    .then(result => {
      if(result > 0){
       alert("삭제되었습니다");
        for(let i = 0; i<obj.length; i++){
          if(obj[i].checked == true) {
            obj[i].parentElement.parentElement.parentElement.remove();
            }
         }
      }else{
         alert("삭제 실패");
      }
    })
    .catch( e => console.log(e));
   }
});

/* 상품 목록 수정 데이터 가져오기 */
const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", () => {

  const checkbox = document.querySelector("input[type='checkbox']:checked");

  const row = checkbox.closest("tr");
  document.getElementById("goodsNo").value = row.children[1].innerText;
  document.getElementById("goodsName").value = row.children[2].innerText;
  document.getElementById("goodsStandard").value = row.children[3].innerText;
  document.getElementById("lcategorySelectUpdate").value = row.children[4].innerText;
  fetch(
    "/stock/scategoryList?lcategory=" + document.getElementById("lcategorySelectUpdate").value
  )
  .then(resp=>resp.json())
  .then(list=>{
    if(list.length != 0){
      scategorySelectUpdate.innerHTML = "";
      const option = document.createElement("option");
      option.innerText = "선택";
      option.setAttribute("value", "");
      scategorySelectUpdate.append(option);
      for(let scategory of list){
        const option = document.createElement("option");
        option.innerText = scategory;
        scategorySelectUpdate.append(option);
      }
      const options = document.querySelectorAll("#scategorySelectUpdate>option");
      for(let option of options){
        if(option.innerText == row.children[5].innerText){
          option.selected = true;
        }
      }
    }
  })
  .catch(e=>console.log(e));

});