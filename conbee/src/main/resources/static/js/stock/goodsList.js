const lcategorySelect = document.getElementById("lcategorySelect");
const scategorySelect = document.getElementById("scategorySelect");

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

// 재고 삭제 버튼
const deleteBtn = document.getElementById("deleteBtn");
const checkbox = document.querySelectorAll(".checkbox");

deleteBtn.addEventListener('click', e => {

   for(let i = 0; i < checkbox.length; i++){
      if(checkbox[i].checked){
         console.log(checkbox);
         checkbox[i].parentElement.parentElement.parentElement.remove();
      }
   }
});