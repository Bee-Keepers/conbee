const lcategorySelect = document.getElementById("lcategorySelect");
const scategorySelect = document.getElementById("scategorySelect");
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

// 등록 창 모달에서 대분류 선택 시 대분류 안에있는 소분류 불러오기
lcategorySelect.addEventListener("change", ()=>{
   scategorySelect.innerHTML = "";
   const option = document.createElement("option");
   option.innerText = "선택";
   option.setAttribute("value", "0");
   scategorySelect.append(option);
   if(lcategorySelect.value != 0){
      lcategoryFn(lcategorySelect, scategorySelect);
   }
});

const deleteBtn = document.getElementById("deleteBtn");

/* 체크박스 선택 후 삭제버튼 눌렀을 때 goodsNo값 넘어옴 */
deleteBtn.addEventListener('click', () => {
   
   if( confirm("삭제 하시겠습니까?") ){
      let obj = document.querySelectorAll(".checkbox");
      let idList = new Array();
      for(let i = 0; i<obj.length; i++){
         if(obj[i].checked == true) {
            idList.push(obj[i].name);
         }
      }
      fetch( "/stock/goodsDelete", {
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

const goodsDetailBtn = document.querySelectorAll(".goodsDetailBtn");
const goodsDetailName = document.getElementById("goodsDetailName");
const goodsDetailStandard = document.getElementById("goodsDetailStandard");
const goodsDetail = document.getElementById("goodsDetail");
/* 상품(재고) 상세 조회 */
for(let item of goodsDetailBtn){

   item.addEventListener("click", () => {
   
      const goodsNo = item.previousElementSibling.innerText;
      console.log(goodsNo);
      fetch("/stock/goodsDetail?goodsNo=" + goodsNo)
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

/* 상품 상세 조회 및 수정 */
for(let goodsItem of goodsDetailSelectBtn){
   goodsItem.addEventListener("click", () => {
      console.log(goodsImage);
      const goodsNo = goodsItem.previousElementSibling.innerText;
      fetch("/stock/goodsDetailSelect?goodsNo=" + goodsNo)
      .then( resp => resp.json() )
      .then( goodsSelect => {
         goodsDetailImageUpdate.src = goodsSelect.goodsImagePath + goodsSelect.goodsImage;
         goodsDetailNameUpdate.value = goodsSelect.goodsName;
         goodsDetailStandardUpdate.value = goodsSelect.goodsStandard;
         goodsDetailUpdate.value = goodsSelect.goodsDetail;
         document.getElementById("goodsNoUpdate").value = goodsNo;
         document.getElementById("deleteCheckUpdate").value = -1;
      } )
      .catch(e=>console.log(e));
   });

}

const deleteImage = document.querySelector(".delete-image");
/* 이미지 x 버튼 표시 눌렀을 때 */
deleteImage.addEventListener("click", () => {
   goodsDetailImageUpdate.src = "";
   document.getElementById("deleteCheckUpdate").value = 0;
   goodsImage.value = "";
});