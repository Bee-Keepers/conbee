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
      "/stockManage/scategoryList?lcategory=" + lcategorySelect.value
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

// 등록 창 모달에서 대분류 선택 시 대분류 안에있는 소분류 불러오기
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
/* 검색창 내부 대분류 선택 시 소분류 불러오기 */
lcategoryInsert.addEventListener("change", ()=>{
   scategoryInsert.innerHTML = "";
   const option = document.createElement("option");
   option.innerText = "선택";
   option.setAttribute("value", "");
   scategoryInsert.append(option);
   if(lcategoryInsert.value != 0){
      lcategoryFn(lcategoryInsert, scategoryInsert);
   }
});
/* 수정창 내부 대분류 선택 시 소분류 불러오기 */
lcategorySelectUpdate.addEventListener("change", ()=>{
   scategorySelectUpdate.innerHTML = "";
   const option = document.createElement("option");
   option.innerText = "선택";
   option.setAttribute("value", "");
   scategorySelectUpdate.append(option);
   if(lcategorySelectUpdate.value != 0){
      lcategoryFn(lcategorySelectUpdate, scategorySelectUpdate);
   }
});

const deleteBtn = document.getElementById("deleteBtn");

/* 체크박스 선택 후 삭제버튼 눌렀을 때 goodsNo값 넘어옴 */
deleteBtn.addEventListener('click', () => {

   const checkbox = document.querySelector("input[type='checkbox']:checked");

   if (checkbox == null) {
      alert('삭제할 상품을 선택해주세요.');
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
      fetch( "/stockManage/goodsDelete", {
         method : "DELETE",
         headers : {"Content-type" : "application/json"},
         body : JSON.stringify(idList)
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


const goodsDetailBtn = document.querySelectorAll(".goodsDetailBtn");
const goodsDetailName = document.getElementById("goodsDetailName");
const goodsDetailStandard = document.getElementById("goodsDetailStandard");
const goodsDetail = document.getElementById("goodsDetail");
/* 상품(재고) 상세 조회 */
for(let item of goodsDetailBtn){

   item.addEventListener("click", () => {
   
      const goodsNo = item.previousElementSibling.innerText;
      fetch("/stockManage/goodsDetail?goodsNo=" + goodsNo)
      .then( resp => resp.json() )
      .then( goods => {
         goodsDetailName.innerText = goods.goodsName;
         goodsDetailStandard.innerText = goods.goodsStandard;
         goodsDetail.innerText = goods.goodsDetail;
      } )
      .catch(e=>console.log(e));
   });
};

const goodsDetailSelectBtn = document.querySelectorAll(".goodsDetailSelectBtn");
const stockImage = document.querySelector(".stockImage");
const goodsDetailNameUpdate = document.getElementById("goodsDetailNameUpdate");
const goodsDetailStandardUpdate = document.getElementById("goodsDetailStandardUpdate");
const goodsDetailUpdate = document.getElementById("goodsDetailUpdate");
const goodsDetailImageUpdate = document.getElementById("goodsDetailImageUpdate");
const goodsImage = document.querySelector(".goodsImage");
const goodsDetailPriceUpdate = document.getElementById("goodsDetailPriceUpdate");

/* 상품 상세 조회 및 수정 */
function goodsDetailFn(goodsItem){
   goodsItem.addEventListener("click", () => {
      const goodsNo = goodsItem.previousElementSibling.innerText;
      fetch("/stockManage/goodsDetailSelect?goodsNo=" + goodsNo)
      .then( resp => resp.json() )
      .then( goodsSelect => {
         if(goodsSelect.goodsImagePath == null || goodsSelect.goodsImage == null){
            goodsDetailImageUpdate.src = defaultImage;
         } else {
            goodsDetailImageUpdate.src = goodsSelect.goodsImagePath + goodsSelect.goodsImage;
         }
         goodsDetailNameUpdate.value = goodsSelect.goodsName;
         goodsDetailStandardUpdate.value = goodsSelect.goodsStandard;
         goodsDetailPriceUpdate.value = goodsSelect.goodsPrice;
         goodsDetailUpdate.value = goodsSelect.goodsDetail;
         lcategorySelectUpdate.value = goodsSelect.lcategoryName;
         fetch( "/stockManage/scategoryList?lcategory=" + lcategorySelectUpdate.value )
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
                  if(option.innerText == goodsSelect.scategoryName){
                     option.selected = true;
                  }
               }
            }
         })
         .catch(e=>console.log(e));
         document.getElementById("goodsNoUpdate").value = goodsNo;
         document.getElementById("deleteCheckUpdate").value = -1;
      } )
      .catch(e=>console.log(e));
   });
}

for(let goodsItem of goodsDetailSelectBtn){
   goodsDetailFn(goodsItem);
}

const deleteImage = document.querySelector(".delete-image");
/* 이미지 x 버튼 표시 눌렀을 때 */
deleteImage.addEventListener("click", () => {
   goodsDetailImageUpdate.src = "";
   document.getElementById("deleteCheckUpdate").value = 0;
   goodsImage.value = "";
});

const goodsInertReset = document.getElementById("goodsInertReset");
/* 등록 초기화 버튼 클릭 시 데이터 초기화 */
goodsInertReset.addEventListener("click", () => {
   document.getElementById("goodsInertForm").reset();
});


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
      tempURL= pathName + "Ajax" +"?cp=" + cp;
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
         goodsDetailFn(td3);

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


// ---------------------------------------------------------------------------------------------------------
// 상품 중복 등록 막기
// 상품명 입력 필드
const goodsNameInput = document.getElementById('goodsNameInsert');
// 상품 등록 폼 제출 시 이벤트 핸들러
document.getElementById('goodsInertForm').addEventListener('submit', function(event) {
    // 폼 제출 기본 동작 방지
   const goodsName = goodsNameInput.value; // 입력된 상품명
   event.preventDefault();
   fetch('/stockManage/checkGoogsInsert', {
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: goodsName
   })
   .then(response => response.text())
   .then( parsedResponse => {

      if(goodsName === parsedResponse){
         alert("이미 등록되어 있는 상품입니다.");
      } else {
         event.target.submit();
      }

   })
   .catch(e=>console.log(e));
});


// ---------------------------------------------------------------------------------------------------------