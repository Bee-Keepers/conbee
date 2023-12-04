const lcategorySelect = document.getElementById("lcategorySelect");
const scategorySelect = document.getElementById("scategorySelect");
const lcategorySelectOptions = document.querySelectorAll("#lcategorySelect>option");

// 등록 창 모달에서 대분류 선택 시 대분류 안에있는 소분류 불러오기
lcategorySelect.addEventListener("change", ()=>{
   scategorySelect.innerHTML = "";
   const option = document.createElement("option");
   option.innerText = "선택";
   option.setAttribute("value", "0");
   scategorySelect.append(option);
   if(lcategorySelect.value != 0){
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

