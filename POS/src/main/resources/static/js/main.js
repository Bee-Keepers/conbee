// 김민석 ============================================================================
// ===================================================================================
// 지점 선택 select 요소
const storeSelect = document.getElementById("storeSelect");
const lcategorySelect = document.getElementById("lcategorySelect");
const scategorySelect = document.getElementById("scategorySelect");

// 검색 창 모달에서 대분류 선택 시 대분류 안에있는 소분류 불러오기
lcategorySelect.addEventListener("change", ()=>{

    // 소분류 초기화
    scategorySelect.innerHTML = "";
    const option = document.createElement("option");
    option.innerText = "선택";
    option.setAttribute("value", "");
    scategorySelect.append(option);

    // 소분류 검색
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

    // 대분류 선택 시 검색
    searchFn();
});

// 소분류 선택 시 검색
scategorySelect.addEventListener("change", searchFn);

// 수량을 입력하면 단가와 수량을 곱한 금액을 금액란에 계산해서 출력하는 함수
function calcPay(e){
    e.parentElement.nextElementSibling.innerHTML = "";
    const amount = e.value;
    const price = e.parentElement.previousElementSibling.innerText;
    
    e.parentElement.nextElementSibling.innerText = (amount * price.replace(",", "")).toLocaleString("ko-KR");
    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("value", price.replace(",", ""));
    input.setAttribute("name", "historyActualPrice");

    e.parentElement.nextElementSibling.append(input);
}

const posForm = document.getElementById("posForm");
const totalPrice = document.getElementById("totalPrice");
// 포스기에 행 추가하는 기능
const plusBtn = document.getElementById("plusBtn");
const parentTable = document.getElementById("parentTable");

// 품목 검색하는 모달창
const plusRowBtn = document.getElementById("plusRowBtn");
const inputPosSearch = document.getElementById("inputPosSearch");

// 품목 선택 후 확인버튼 (행 추가)
plusRowBtn.addEventListener("click", ()=>{
    const goods = document.querySelectorAll("input.goods");
    const goodsNameList = document.querySelectorAll("tbody>tr>td:nth-of-type(5)");

    for(let good of goods){

        // 체크된 경우
        if(good.checked){

            const parent = good.parentElement;

            let flag = true;

            // 똑같은 이름이 있을 경우 입력이 안되게
            for(let goodsName of goodsNameList){
                if(parent.children[4].innerText == goodsName.innerText){
                    flag = false;
                    break;
                }
            }
            if(flag == false){
                continue;
            }

            const tr = document.createElement("tr");
            const td0 = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.classList.add("form-check-input", "deleteCheckbox");
            checkbox.setAttribute("type", "checkbox");
            td0.append(checkbox);
            tr.append(td0);

            // 행 생성 후 삽입
            for(let i = 1; i <=8; i++){
                const td = document.createElement("td");
                const input = document.createElement("input");
                input.setAttribute("type", "hidden");
                input.value = parent.children[i].innerText;
                switch(i){
                    case 1 : input.setAttribute("name", "goodsNo"); break;
                    case 2 : input.setAttribute("name", "lcategoryName"); break;
                    case 3 : input.setAttribute("name", "scategoryName"); break;
                    case 4 : input.setAttribute("name", "historyGoodsName"); break;
                    case 5 : input.classList.add("stockAmount"); break;
                    case 6 : input.setAttribute("name", "historyDiscount"); break;
                    case 7 : input.setAttribute("name", "historyUnitPrice"); break;
                    case 8 : input.setAttribute("name", "historyActualPrice"); break;
                    default : break;
                }
                if(i == 7 || i == 8){
                    td.innerText = Number(parent.children[i].innerText).toLocaleString("ko-KR");
                } else{
                    td.innerText = parent.children[i].innerText;
                }
                td.append(input);
                tr.append(td);
            }
            const td6 = document.createElement("td");
            const td7 = document.createElement("td");
            
            const input = document.createElement("input");
            input.classList.add("form-control", "text-center");
            input.setAttribute("type", "number");
            input.setAttribute("min", "0");
            input.setAttribute("max",  Number(parent.children[5].innerText));
            input.setAttribute("value", "1");
            input.setAttribute("name", "historyAmount");
            td6.append(input);

            tr.append(td6, td7);
            parentTable.prepend(tr);

            // 수량 유효성 검사
            input.addEventListener("input", e => {
                if(input.value > Number(parent.children[5].innerText)){
                    input.value = Number(parent.children[5].innerText);
                    alert("수량은 재고개수를 초과할 수 없습니다");
                }
                if(input.value < 0){
                    input.value = 0;
                    alert("0이상의 수량을 선택해주세요");
                }
                calcPay(e.target);
                // 총 합계 계산
                const prices = document.querySelectorAll("#parentTable>tr>td:nth-of-type(11)");
                let temp = 0;
                for(let price of prices){
                    if(price.innerText != ""){
                        temp += parseInt(price.innerText.replace(",",""));
                    }
                }
                totalPrice.innerText = temp.toLocaleString("ko-KR");
            });
            calcPay(input);
            const prices = document.querySelectorAll("#parentTable>tr>td:nth-of-type(11)");
                let temp = 0;
                for(let price of prices){
                    if(price.innerText != ""){
                        temp += parseInt(price.innerText.replace(",",""));
                    }
                }
                totalPrice.innerText = temp.toLocaleString("ko-KR");

        }
    }
});

const modalBtn = document.getElementById("modalBtn");
const modalBody = document.getElementById("modalBody");

// 모달 창 열릴 때 마다 모달 바디 초기화(검색 흔적 초기화)
modalBtn.addEventListener("click", ()=>{
    modalBody.innerHTML = "";
    inputPosSearch.value = "";

    lcategorySelect.children[0].selected = true;
    scategorySelect.innerHTML = "";
    const option = document.createElement("option");
    option.innerText = "선택";
    option.setAttribute("value", "");
    scategorySelect.append(option);

    // 모달 창 초기 화면에 품목들 나오게
    searchFn();
});

// 품목 검색 기능
inputPosSearch.addEventListener("input", ()=>{

    if(inputPosSearch.value.trim().length == 0){
        modalBody.innerHTML = "";
        return;
    }

    searchFn();
    
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

// 행 삭제
const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", ()=>{
    const deleteCheckbox = document.querySelectorAll("input.deleteCheckbox");

    if(confirm("삭제하시겠습니까?")){
        for(let box of deleteCheckbox){
            if(box.checked){
                box.parentElement.parentElement.remove();
            }
        }
        const prices = document.querySelectorAll("#parentTable>tr>td:nth-of-type(9)");
        let temp = 0;
        for(let price of prices){
            if(price.innerText != ""){
                temp += parseInt(price.innerText.replace(",",""));
            }
        }
        totalPrice.innerText = temp.toLocaleString("ko-KR");
    }
});

// 로그아웃
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", ()=>{
    location.href = "/logout";
});

// form 제출 버튼
const formSubmitBtn = document.getElementById("formSubmitBtn");

// 유효성 검사
formSubmitBtn.addEventListener("click", ()=>{
    if(storeSelect.value == 0){
        alert("지점을 선택해주세요");
        return;
    } else {
        if(parentTable.children[0] == undefined){
            alert("선택된 품목이 없습니다");
            return;
        }
    }
    const amounts = document.querySelectorAll("input[name='historyAmount']");
    for(let amount of amounts){
        if(amount.value == 0){
            alert("수량을 입력해주세요");
            return;
        }
    }

    const stockAmount = document.querySelectorAll(".stockAmount");
    for(let stockAm of stockAmount){
        if(stockAm.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0].value > Number(stockAm.value)){
            alert("재고를 초과합니다");
            return;
        }
    }

    posForm.submit();
});

// 지점 선택
storeSelect.addEventListener("change", ()=>{
    if(storeSelect.value == 0){
        location.href = "/";
    } else{
        location.href = "?storeNo=" + storeSelect.value;
    }
});


const url = new URL(location.href);
const urlParams = url.searchParams;
if(urlParams.get("storeNo") == null){
    modalBtn.disabled = true;
}
// 선택 옵션 그대로 지정
const options = document.querySelectorAll("#storeSelect>option");
for(let option of options){
    if(option.value == urlParams.get("storeNo")){
        option.selected = true;
        break;
    }
}

// 가게 번호 보내기
const storeName = document.getElementById("storeName");
const storeNameOption = document.querySelectorAll("#storeSelect>option");
storeNameOption.forEach(option=>{
    if(option.selected){
        storeName.value = option.innerText;
    }
})
   





    
// 검색 함수
function searchFn(){
    fetch(
        "/search?inputPosSearch=" + inputPosSearch.value + "&storeNo=" +storeSelect.value + "&lcategoryName=" + lcategorySelect.value + "&scategoryName=" +scategorySelect.value
    )
    .then(resp=>resp.json())
    .then(goodsList=>{
        modalBody.innerHTML = "";
        
        if(goodsList.length == 0){
            const div = document.createElement("div");
            div.classList.add("form-control", "my-2", "w-25");
            div.innerText = "검색된 상품이 없습니다.";
            modalBody.append(div);

            return;
        }

        // 검색된 결과 숨겨서 담기
        for(let goods of goodsList){
            const label = document.createElement("label");
            label.classList.add("form-control", "my-2", "user-select-none");

            const input = document.createElement("input");
            input.classList.add("form-check-input", "goods");
            input.setAttribute("type", "checkbox");

            const span1 = document.createElement("span");
            span1.innerText = goods.goodsNo;
            span1.style.display = "none";

            const span2 = document.createElement("span");
            span2.innerText = goods.lcategoryName;
            span2.style.display = "none";
            const span3 = document.createElement("span");
            span3.innerText = goods.scategoryName;
            span3.style.display = "none";
            
            const span4 = document.createElement("span");
            span4.innerText = goods.goodsName;
            span4.classList.add("mx-2");

            const span45 = document.createElement("span");
            span45.innerText = goods.stockAmount;
            span45.style.display = "none";

            const span5 = document.createElement("span");
            span5.innerText = goods.stockDiscount;
            span5.style.display = "none";
            

            const span6 = document.createElement("span");
            span6.style.display = "none";
            span6.innerText = goods.stockOutPrice;

            const span7 = document.createElement("span");
            span7.innerText = goods.stockOutPrice - (goods.stockDiscount * 0.01 * goods.stockOutPrice);
            span7.style.display = "none";

            const span8 = document.createElement("span");
            span8.innerText = goods.stockAmount;
            span8.style.display = "none";
            
            label.append(input, span1, span2, span3, span4, span45, span5, span6, span7, span8);
            modalBody.append(label);


        }
    })
    .catch(e=>console.log(e));
}