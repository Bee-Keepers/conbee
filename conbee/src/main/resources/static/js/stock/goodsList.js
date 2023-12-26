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


const lcategorySelect = document.getElementById("lcategorySelect");
const lcategoryInsert = document.getElementById("lcategoryInsert");
const scategorySelect = document.getElementById("scategorySelect");
const scategoryInsert = document.getElementById("scategoryInsert");
const lcategorySelectUpdate = document.getElementById("lcategorySelectUpdate");
const scategorySelectUpdate = document.getElementById("scategorySelectUpdate");
const lcategorySelectOptions = document.querySelectorAll("#lcategorySelect>option");

/* 상품 등록 전체 조회 */
const lcategoryFn = (lcategorySelect, scategorySelect)=>{
   fetch(
      "/stock/scategoryList?lcategory=" + lcategorySelect.value
   )
   .then(resp=>resp.json())
   .then(list=>{
      if(list.length != 0){
         for(let scategory of list){
            const option = document.createElement("option");
            option.innerText = scategory;
            scategorySelect.append(option);
         }
      }
   })
   .catch(e=>console.log(e));
};

/* 검색창 내부 대분류 선택 시 소분류 불러오기 */
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
    fetch("/stock/goodsDetails?goodsNo=" + goodsNo)
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
const search = url.search;
const pathName = url.pathname;
const goodsTable = document.getElementById("goodsTable");
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
   let tempURL;
   if(search == ""){
      tempURL= pathName + "Ajax?cp=" + cp;
   } else {
      tempURL = pathName + "Ajax" + search + "&cp=" + cp;
   }
   console.log(tempURL);
   fetch(tempURL)
   .then(resp=>resp.json())
   .then(list=>{
      if(list.length == 0){
         observer.disconnect();
         return;
      }
      for(let goods of list){
         const tr = createElement("tr",null,[]);

         const td1 = createElement("td",null,[]);
         const label = createElement("label",null,["w-100"]);
         const input = createElement("input",{"type":"checkbox","name":goods.goodsNo},["checkbox"]);
         label.append(input);
         td1.append(label);

         const td2 = createElement("td",null,[]);
         td2.innerText = goods.goodsNo;

         const td3 = createElement("td",{"data-bs-toggle":"modal", "data-bs-target":"#goodsDetailSelectBtn"},["goodsDetailSelectBtn"]);
         td3.innerText = goods.goodsName;

         const td4 = createElement("td",null,[]);
         td4.innerText = goods.goodsStandard;

         const td5 = createElement("td",null,[]);
         td5.innerText = goods.goodsPrice.toLocaleString("ko-KR");

         const td6 = createElement("td",null,[]);
         td6.innerText = goods.lcategoryName;

         const td7 = createElement("td",null,[]);
         td7.innerText = goods.scategoryName;

         tr.append(td1, td2, td3, td4, td5, td6, td7);

         goodsTable.append(tr);
      }
   })
   .catch(e=>console.log(e));
   });
 };

const observer = new IntersectionObserver( callback ,{
	threshold: 0.5
});


observer.observe(document.querySelector("#observedTag"));

