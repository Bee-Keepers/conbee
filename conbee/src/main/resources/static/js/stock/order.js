// 검색 창 모달에서 대분류 선택 시 대분류 안에있는 소분류 불러오기
const lcategorySelect = document.getElementById("lcategorySelect");
const scategorySelect = document.getElementById("scategorySelect");

const totalPrice = document.getElementById("totalPrice");

// 대분류 선택 시 소분류 나오는 구문
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

  autoCompleteFn();
});

//
scategorySelect.addEventListener("change", autoCompleteFn);

// 선택 되어있는 select 초기화
const modalBtn = document.getElementById("modalBtn");
const autoComplete = document.getElementById("autoComplete");
const floatingName = document.getElementById("floatingName");
const nameBtns = document.getElementById("nameBtns");

modalBtn.addEventListener("click", ()=>{
  lcategorySelect.value = "";
  scategorySelect.innerHTML = "";
  const option = document.createElement("option");
  option.innerText = "선택";
  option.setAttribute("value", "");
  scategorySelect.append(option);
  autoComplete.innerHTML = "";
  floatingName.value = "";
  nameBtns.innerHTML = "";

  autoCompleteFn();
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

const storeNo = document.getElementsByClassName("storeNo");
const autoCompleteContainer = document.getElementById("autoCompleteContainer");

// 상세 검색 자동완성 및 여러기능
floatingName.addEventListener("input", e=>{
  
  if(e.target.value.trim().length == 0){
    autoComplete.innerHTML = "";
    return;
  }
  
  // 상세 검색 자동 완성
  autoCompleteFn();
});

const revenueSearchBtn = document.getElementById("revenueSearchBtn");
const tableTbody = document.getElementById("tableTbody");

// 상세 검색 모달창에서 등록 버튼 누를 시 테이블에 행 추가하는 구문
revenueSearchBtn.addEventListener("click", ()=>{
  const nameBtn = document.querySelectorAll("#nameBtns>button");

  // 발주가 없을 경우 초기화
  if(tableTbody.children[0].children[0].innerText == '오늘의 발주가 없습니다'){
    tableTbody.innerHTML = "";
  }

  // 선택된 품목 태그들 향상된 for문
  for(let btn of nameBtn){
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const input1 = createElement("input", {"type" : "checkbox"}, ["rowCheckbox"]);
    td1.append(input1);
    tr.append(td1);
    for(let temp of btn.children){
      const td = document.createElement("td");
      td.innerText = temp.value;
      const input = temp.cloneNode(true);
      td.append(input);
      tr.append(td);
    };
    const td2 = document.createElement("td");
    const input2 = createElement("input", {"type" : "number", "value" : 1, "name" : "orderAmount"}, ["form-control", "inputOrderAmount"]);

    // 발주 수량 입력 시 합계 계산
    input2.addEventListener("change", totalPriceFn);
    
    // 발주 수량 제한
    input2.addEventListener("input", e=>{
      if(e.target.value < 1){
        e.target.value = 1;
      }
      if(e.target.value > 99){
        e.target.value = 99;
      }
    });
    
    td2.append(input2);
    tr.append(td2);
    tableTbody.prepend(tr);
  };
  
  totalPriceFn();
});


// 지점 선택 시
const storeSelect = document.getElementById("storeSelect");
storeSelect.addEventListener("change", ()=>{
  location.href = "/stock/order/insert?storeNo=" + storeSelect.value;
  for(let storeNos of storeNo){
    storeNos.value = storeSelect.value;
  }
});


// 발주 신청 합계액 계산
const totalPriceFn = ()=>{
  const inputOrderAmounts = document.querySelectorAll(".inputOrderAmount");
  let temp = 0;
  for(let inputOrderAmount of inputOrderAmounts){
    temp += inputOrderAmount.value * parseInt(inputOrderAmount.parentElement.previousElementSibling.innerText.replace(",",""));
  }
  totalPrice.innerText = temp.toLocaleString("ko-KR");
}
totalPriceFn();

// 수량 변경 시 합계 계산
if(document.querySelectorAll(".inputOrderAmount") != null){
  document.querySelectorAll(".inputOrderAmount").forEach(item=>{
    item.addEventListener("change",()=>{
      totalPriceFn();
    });
  });
}
// 체크박스 전체 선택
const checkAll = document.getElementById("checkAll");
checkAll.addEventListener("click", e=>{
  const rowCheckbox = document.querySelectorAll(".rowCheckbox");
  for(let ckbox of rowCheckbox){
    if(e.target.checked){
      ckbox.checked = true;
    } else{
      ckbox.checked = false;
    }
  }
});

// 행 삭제
const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", ()=>{
  if(confirm("삭제하시겠습니까?")){
    const rowCheckbox = document.querySelectorAll(".rowCheckbox");
    let data = [];
    for(let rowCheck of rowCheckbox){
      if(rowCheck.checked){
        rowCheck.parentElement.parentElement.remove();
        checkAll.checked = false;
        data.push(rowCheck.parentElement.nextElementSibling.children[0].value);
      }
    }

    // 행 삭제 데이터 전달용 객체
    let obj ={
      "goodsNoList" : data,
      "storeNo" : storeSelect.value
    }
    
    // 비동기 발주 삭제
    fetch("/stock/order/delete",{
      method : "DELETE",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(obj)
    })
    .catch(e=>console.log(e));
  }
  totalPriceFn();

  // 발주가 하나도 없을 시
  console.log(document.querySelectorAll(".rowCheckbox"));
  if(document.querySelectorAll(".rowCheckbox").length == 0){
    const tr = document.createElement("tr");
    const td = createElement("td", {"colspan":"8"},[]);
    td.innerText = "오늘의 발주가 없습니다";
    tr.append(td);
    tableTbody.append(tr);
  }
});

const placeOrderForm = document.getElementById("placeOrderForm");
const submitBtn = document.getElementById("submitBtn");

const orderInputStoreNo = document.getElementById("orderInputStoreNo");

// 지점 선택 옵션 저장
const url = new URL(location.href);
const urlParams = url.searchParams;

const options = document.querySelectorAll("#storeSelect>option");
for(let option of options){
    if(option.value == urlParams.get("storeNo")){
        option.selected = true;
        break;
    }
}

orderInputStoreNo.value = storeSelect.value;
// 발주 신청 폼 제출
submitBtn.addEventListener("click", ()=>{
  if(tableTbody.children[0].children[0].innerText == "오늘의 발주가 없습니다"){
    alert("품목을 입력해주세요");
    return;
  }
  const inputOrderAmount = document.querySelectorAll(".inputOrderAmount");
  const goodsNos = document.querySelectorAll("tr>td:nth-of-type(2)>input");
  const list = [];
  for(let i=0; i<inputOrderAmount.length; i++){
    // 발주 신청용 데이터 전달 객체
    let dataObj = {}
    dataObj.orderAmount = inputOrderAmount[i].value;
    dataObj.goodsNo = goodsNos[i].value;
    dataObj.storeNo = storeSelect.value;
    
    list.push(dataObj)
  }
  
  console.log(list);

  fetch("/stock/orderAmountCheck",{
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(list)
  })
  .then(resp=>resp.json())
  .then(result=>{
    console.log(result);
    if(result.length == 0){
      placeOrderForm.submit();
    } else{
      // 본사 재고가 부족할 시      
      alert(result + "번 물품이 본사 재고가 부족합니다");
    }

  })
  .catch(e=>console.log(e));
});

// 발주 검색 함수
function autoCompleteFn(){

  fetch("/stock/autoComplete?inputQuery=" + floatingName.value + "&storeNo=" + storeSelect.value
    + "&lcategoryName=" + lcategorySelect.value + "&scategoryName=" + scategorySelect.value)
  .then(resp => resp.json())
  .then(list =>{
    autoComplete.innerHTML = "";
    if(list.length == 0){
      const button = createElement("button", {"type":"button"}, ["btn", "btn-light", "w-100"]);
      button.innerText = "검색된 품목이 없습니다.";
      autoComplete.append(button)
    } else {
      for(let stock of list){
        const button = createElement("button", {"type":"button"}, ["btn", "btn-light", "m-1"]);
        button.innerText = stock.goodsName;

        // 자동완성검색어 클릭 시 태그 생성
        button.addEventListener("click", ()=>{
          const goodsNameList = document.querySelectorAll("#tableTbody>tr>td:nth-of-type(2)>input");
          // 발주 신청 창에 이미 존재하면 생성되지 않음
          for(let goodsNameInput of goodsNameList){
            if(goodsNameInput.value == stock.goodsNo){
              return;
            }
          }
          // 검색 태그들이 이미 있으면 생성되지 않음
          for(let children of nameBtns.children){
            if(children.children[0].value == stock.goodsNo){
              return;
            }
          };

          // 검색 선택하면 생기는 태그
          const nameBtn = createElement("button", {"type":"button"}, ["btn", "btn-sm", "btn-warning", "mx-1", "mb-1"]);
          nameBtn.innerText = stock.goodsName;
          nameBtn.append(createElement("input", {"type" : "hidden", "name" : "goodsNo", "value" : stock.goodsNo}, []));
          nameBtn.append(createElement("input", {"type" : "hidden", "name" : "goodsName", "value" : stock.goodsName}, []));
          nameBtn.append(createElement("input", {"type" : "hidden", "name" : "lcategoryName", "value" : stock.lcategoryName}, []));
          nameBtn.append(createElement("input", {"type" : "hidden", "name" : "scategoryName", "value" : stock.scategoryName}, []));
          nameBtn.append(createElement("input", {"type" : "hidden", "name" : "stockAmount", "value" : stock.stockAmount}, []));
          nameBtn.append(createElement("input", {"type" : "hidden", "name" : "stockInPrice", "value" : stock.stockInPrice.toLocaleString("ko-KR")}, []));
          nameBtn.addEventListener("click", e=>{
            e.target.remove();
          });
          nameBtns.append(nameBtn);
        });
        autoComplete.append(button);
      }
    }
  })
  .catch(e => console.log(e));
}
