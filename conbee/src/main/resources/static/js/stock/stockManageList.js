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



// ---------------------------------------------------------------------------------------------------------------------------------------------------



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

  fetch("/stockManage/goodsNameSelect?intputGoods=" + inputValue + "&storeValue=" + storeNameClick.value)
    .then(resp => resp.json())
    .then(list => {
      goodsNameList.innerHTML = ""; // 기존 자동완성 목록 초기화

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
          goodsPrice.value = item.goodsPrice;

        });

        goodsNameList.appendChild(listItem);
      });
    })
    .catch(e => console.log(e));
});

// ---------------------------------------------------------------------------------------------------------------------------------------------------


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
    let idList = new Array();
    for(let i = 0; i<obj.length; i++){
      if(obj[i].checked == true) {
        idList.push(obj[i].name);
      }
    }
    let data = {};
    data.goodsNoList = idList.join();
    data.storeNo = 0;

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
// ------------------------------------------------------------------------------------------------------

// 재고 수정버튼 클릭 시 데이터 조회
const stockUpdateTable = document.getElementById("stockUpdateTable");
const stockUpdateBtn = document.getElementById("stockUpdateBtn");
/* 재고 수정 버튼 클릭 시 데이터 조회 */
// stockUpdateBtn.addEventListener("click", () => {
  
//   // 체크된 박스 전체 조회
//   const checkbox = document.querySelectorAll("input[type='checkbox']:checked");

//   // 수정버튼 클릭 시 table 초기화
//   stockUpdateTable.innerHTML = "";
  
//   // 체크가 안되어 있을 경우
//   if (checkbox.length == 0) {
//     alert('수정할 품목을 선택하세요.');
//     return;
//   }

//   // 체크 되면 모달창 열림
//   const stockUpdateModel = new bootstrap.Modal('#stockUpdateModel', {
//     keyboard: false,
//     backdrop: 'static',
//     focus:false
//   })
//   stockUpdateModel.show();

//   // 모달 창 안에 체크된 데이터 출력
//   for(let rows of checkbox){
//     let row = rows.closest("tr");
//     const tr = document.createElement("tr");

//     const td0 = document.createElement("td");
//     const input0 = createElement("input", {"type" : "number", "name":"goodsNo"},["goodsNoUpdateView", "text-center"]);
//     input0.readOnly = true;
//     input0.value = row.children[1].innerText;
//     td0.append(input0);

//     const td = createElement("td", null, ["goodsNameUpdateView", "text-truncate"]);
//     td.innerText = row.children[2].innerText;

//     const td1 = document.createElement("td");
//     const input1 = createElement("input", {"type" : "number", "name":"stockOutPrice"},["form-control"]);
//     input1.value = row.children[7].innerText.replace(",", "");
//     td1.append(input1);

//     const td2 = document.createElement("td");
//     const input2 = createElement("input", {"type" : "number", "name":"stockDiscount"},["form-control"]);
//     input2.value = row.children[9].innerText.replace(",", "");
//     td2.append(input2);

//     tr.append(td0, td, td1, td2);
//     stockUpdateTable.append(tr);
//   }
// });

// --------------------------------------------------------------------------------------------------------

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

// 무한 스크롤

const urlSearch = url.search;
const search = url.search;
const pathName = url.pathname;
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
   let tempURL;
   if(search == ""){
      tempURL= pathName + "Ajax" +"?cp=" + cp;
   } else {
      tempURL = pathName + "Ajax" + search + "&cp=" + cp;
   }
   fetch(tempURL)
   .then(resp=>resp.json())
   .then(list=>{
      if(list.length == 0){
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

        //  const td8 = createElement("td",null,[]);
        //  console.log(goods.stockOutPrice);
        //  td8.innerText = goods.stockOutPrice.toLocaleString("ko-KR");
         
         const td9 = createElement("td",null,[]);
         td9.innerText = goods.stockAmount;
         
        //  const td10 = createElement("td",null,[]);
        //  td10.innerText = goods.stockDiscount;
         
        //  const td11 = createElement("td",null,[]);
        //  console.log(goods.priceSum);
        //  td11.innerText = parseInt(goods.priceSum).toLocaleString("ko-KR");

         const td12 = document.createElement("td")
         td12.style.display = "none";
         td12.innerText = goods.storeNo;

         tr.append(td1, td2, td3, td4, td5, td6, td7, td9, td12);
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


observer.observe(document.querySelector("#observedTag"));