// 검색 창 모달에서 대분류 선택 시 대분류 안에있는 소분류 불러오기
const lcategorySelect = document.getElementById("lcategorySelect");
const scategorySelect = document.getElementById("scategorySelect");
lcategorySelect.addEventListener("change", ()=>{
  scategorySelect.innerHTML = "";
  const option = document.createElement("option");
  option.innerText = "선택";
  option.setAttribute("value", "");
  scategorySelect.append(option);
  if(lcategorySelect.value != ""){
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
// 선택 되어있는 select 초기화
const modalBtn = document.getElementById("modalBtn");
const autoComplete = document.getElementById("autoComplete");
const floatingName = document.getElementById("floatingName");

modalBtn.addEventListener("click", ()=>{
  lcategorySelect.value = "";
  scategorySelect.value = "";
  autoComplete.innerHTML = "";
  floatingName.value = "";
});

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


const storeNo = document.getElementById("storeNo");
const autoCompleteContainer = document.getElementById("autoCompleteContainer");


floatingName.addEventListener("input", e=>{
  
  if(e.target.value.trim().length == 0){
    autoComplete.innerHTML = "";
    return;
  }
  
  fetch("/stock/autoComplete?inputQuery=" + floatingName.value + "&storeNo=" + storeNo.value
    + "&lcategoryName=" + lcategorySelect.value + "&scategoryName=" + scategorySelect.value)
  .then(resp => resp.json())
  .then(list =>{
    autoComplete.innerHTML = "";
    if(list.length == 0){
      const list = createElement("li", null, ["list-group-item"]);
      list.innerText = "검색된 품목이 없습니다";
      autoComplete.append(list);
    } else {
      for(let stock of list){
        const list = createElement("li", null, ["list-group-item"]);
        list.innerText = stock.goodsName;
        autoComplete.append(list);
      }
    }
  })
  .catch(e => console.log(e));
});
