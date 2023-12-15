const storeNoSelect = document.getElementById("storeNoSelect");
const storeSearch = document.getElementById("storeSearch");
const storeSelect = document.getElementById("storeSelect");
// 지점 이름으로 검색
storeSearch.addEventListener("change", e=>{

    fetch("/revenueManage/storeSearch?inputStoreName=" + e.target.value)
    .then(resp=>resp.json())
    .then(list=>{
        storeSelect.innerHTML = "";
        console.log(list);
        if(list.length == 0){
            const option = document.createElement("option");
            option.innerText = "검색된 지점이 없습니다.";
            option.value = -1;
            storeSelect.append(option);
        } else{
            for(let opt of list){
                const option = document.createElement("option");
                option.value = opt.storeNo;
                option.innerText = opt.storeName;
                storeSelect.append(option);
            }
        }
    })
    .catch(e=>console.log(e));
});

// 상세검색 버튼 누르면 제출
const revenueSearchForm = document.getElementById("revenueSearchForm");
const revenueSearchBtn = document.getElementById("revenueSearchBtn");
revenueSearchBtn.addEventListener("click", ()=>{
    if(storeSelect.value == -1){
        alert('지점을 검색해 선택해주세요');
        return;
    }
  revenueSearchForm.submit();
});

/* 입고가 수정 누르면 빈칸 채우기 */
const stockUpdateBtn = document.getElementById("stockUpdateBtn");

stockUpdateBtn.addEventListener("click", () => {

  const checkbox = document.querySelector("input[type='checkbox']:checked");
  const row = checkbox.closest("tr");
  document.getElementById("goodsNoUpdate").value = row.children[1].innerText;
  document.getElementById("goodsName").value = row.children[2].innerText;
  document.getElementById("lcategoryNameUpdate").value = row.children[3].innerText;
  document.getElementById("scategoryNameUpdate").value = row.children[4].innerText;
  document.getElementById("stockInPrice").value = row.children[6].innerText;
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