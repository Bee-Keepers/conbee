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

  fetch("/stockManage/goodsNameSelect?intputGoods=" + inputValue)
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

  const checkbox = document.querySelector("input[type='checkbox']:checked");

  if (checkbox == null) {
    alert('삭제할 품목을 체크하세요.');
    return;
  }
   
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
    data.storeNo = 0;

    console.log(idList);
    console.log(data);
    fetch( "/stockManage/stockDelete", {
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

/* 재고 제품 상세조회 */
const goodsDetailImage = document.getElementById("goodsDetailImage");
const goodsDetailBtn = document.querySelectorAll(".goodsDetailBtn");
const goodsDetailName = document.getElementById("goodsDetailName");
const goodsDetailStandard = document.getElementById("goodsDetailStandard");
const goodsDetail = document.getElementById("goodsDetail");
for(let item of goodsDetailBtn){
  
  item.addEventListener("click", () => {
  
    const goodsNo = item.previousElementSibling.innerText;
    fetch("/stockManage/goodsDetail?goodsNo=" + goodsNo)
    .then( resp => resp.json() )
    .then( goods => {
      if(goods.goodsImagePath == null || goods.goodsImage == null){
        goodsDetailImage.src = defaultImage;
      } else {
        goodsDetailImage.src = goods.goodsImagePath + goods.goodsImage;
      }
      goodsDetailName.innerText = goods.goodsName;
      goodsDetailStandard.innerText = goods.goodsStandard;
      goodsDetail.innerText = goods.goodsDetail;
    } )
    .catch(e=>console.log(e));
  });
};

const checkboxes = document.querySelectorAll(".checkbox");

// 체크박스 선택 시 모달 연결
checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    const isChecked = checkbox.checked;
    
    if (isChecked) {
      stockUpdateBtn.setAttribute("data-bs-target", "#stockUpdateModel");
    } else {
      stockUpdateBtn.setAttribute("data-bs-target", "");
    }
  });
});

const stockUpdateBtn = document.getElementById("stockUpdateBtn");
/* 재고 수정 버튼 클릭 시 데이터 조회 */
stockUpdateBtn.addEventListener("click", () => {

  const checkbox = document.querySelector("input[type='checkbox']:checked");

  if (checkbox == null) {
    alert('수정할 품목을 선택하세요.');
  }

  const row = checkbox.closest("tr");
  document.getElementById("goodsNoUpdate").value = row.children[1].innerText;
  document.getElementById("goodsName").value = row.children[2].innerText;
  document.getElementById("lcategoryNameUpdate").value = row.children[3].innerText;
  document.getElementById("scategoryNameUpdate").value = row.children[4].innerText;
  document.getElementById("stockInPriceUpdate").value = row.children[6].innerText;
  document.getElementById("stockOutPriceUpdate").value = row.children[7].innerText;
  document.getElementById("stockDiscountUpdate").value = row.children[9].innerText;
  document.getElementById("storeNoUpdate").value = row.children[11].innerText;
});

const lcategorySelect = document.getElementById("lcategorySelect");
const scategorySelect = document.getElementById("scategorySelect");

/* 검색창 내부 대,소분류 조회 */
const lcategoryFn = (lcategorySelect, scategorySelect) => {
  fetch(
    "/stockManage/scategoryList?lcategory=" + lcategorySelect.value
  )
  .then(resp => resp.json())
  .then(list => {
    if (list.length != 0) {
      for (let scategory of list) {
        const option = document.createElement("option");
        option.innerText = scategory;
        scategorySelect.append(option);
      }
    }
  })
  .catch(e => console.log(e));
};

// 검색 창 모달에서 대분류 선택 시 대분류 안에있는 소분류 불러오기
lcategorySelect.addEventListener("change", ()=>{
  scategorySelect.innerHTML = "";
  const option = document.createElement("option");
  option.innerText = "선택";
  option.setAttribute("value", "");
  scategorySelect.append(option);
  if(lcategorySelect.value != 0){
    lcategoryFn(lcategorySelect, scategorySelect);
  }
});

const stockInertReset = document.getElementById("stockInertReset");
/* 등록 초기화 버튼 클릭 시 데이터 초기화 */
stockInertReset.addEventListener("click", () => {
  document.getElementById("stockInertForm").reset();
});

const stockSearchReset = document.getElementById("stockSearchReset");
/* 등록 초기화 버튼 클릭 시 데이터 초기화 */
stockSearchReset.addEventListener("click", ()=>{
  document.getElementById("stockSearchForm").reset();
});