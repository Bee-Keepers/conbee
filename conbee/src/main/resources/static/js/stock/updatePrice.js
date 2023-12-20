const storeNoSelect = document.getElementById("storeNoSelect");
const storeSearch = document.getElementById("storeSearch");
const storeSelect = document.getElementById("storeSelect");

// 요소 생성 코드
// createElement("input",{type:"text", name:"inputId"},["test", "aaa"])
function createElement(tag, obj, classList){
  const element = document.createElement(tag);

  for(let key in obj){
    element.setAttribute(key, obj[key]);
  }
  for(let clas of classList){
    element.classList.add(clas);
  }
  return element;
}

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

// 무한 스크롤
const url = new URL(location.href);
const urlSearch = url.search;
const tableTbody = document.getElementById("tableTbody");
let cp = 1;
const cpFn = ()=>{
   cp += 1;
};
let callback = (entries, observer) => {
   entries.forEach(entry => {
    // 타겟 요소가 루트 요소와 교차하는 점이 없으면 콜백을 호출했으되, 조기에 탈출한다.
    if (entry.intersectionRatio <= 0) return
 
    // 혹은 isIntersecting을 사용할 수 있습니다.
    if (!entry.isIntersecting) return
 
    // ... 콜백 로직
    cpFn();
   let params;
   if(urlSearch == ""){
      params = "?cp=" + cp;
   } else{
      params = urlSearch + "&cp=" + cp;
   }
   fetch("/stockManage/stockListSearchAjax"+ params)
   .then(resp=>resp.json())
   .then(list=>{
    console.log(list);
      if(list.length < 20){
         observer.disconnect();
      }
      for(let goods of list){
         const tr = createElement("tr",null,[]);

         const td1 = createElement("td",null,[]);
         const label = createElement("label", null,["w-100"]);
         const input = createElement("input", {"type":"checkbox","name":goods.goodsNo},["checkbox"]);
         label.append(input);
         td1.append(label);

         const td2 = createElement("td",null,[]);
         td2.innerText = goods.goodsNo;
         
         const td3 = createElement("td",{"data-bs-toggle":"modal","data-bs-target":"#goodsDateilModel"},["goodsDetailBtn"]);
         td3.innerText = goods.goodsName;

         const td4 = createElement("td",null,[]);
         td4.innerText = goods.lcategoryName;

         const td5 = createElement("td",null,[]);
         td5.innerText = goods.scategoryName;

         const td6 = createElement("td",null,[]);
         td6.innerText = goods.goodsStandard;

         const td7 = createElement("td",null,[]);
         td7.innerText = goods.stockInPrice.toLocaleString("ko-KR");

         const td8 = createElement("td",null,[]);
         td8.innerText = goods.stockOutPrice.toLocaleString("ko-KR");

         const td9 = createElement("td",null,[]);
         td9.innerText = goods.stockAmount;

         const td10 = createElement("td",null,[]);
         td10.innerText = goods.stockDiscount;

         const td11 = createElement("td",null,[]);
         td11.innerText = parseInt(goods.priceSum).toLocaleString("ko-KR");

         const td12 = document.createElement("td")
         td12.style.display = "none";
         td12.innerText = goods.storeNo;

         tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9, td10, td11, td12);
         td3.addEventListener("click", () => {
  
          const goodsNo = td3.previousElementSibling.innerText;
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
         tableTbody.append(tr);
      }
   })
   .catch(e=>console.log(e));
   });
 };

const observer = new IntersectionObserver( callback ,{
	threshold: 0.5
});
if(document.querySelector("#observedTag") != null){
  observer.observe(document.querySelector("#observedTag"));
}