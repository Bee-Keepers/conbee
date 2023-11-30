// 김민석 ============================================================================
// ===================================================================================

// 수량을 입력하면 단가와 수량을 곱한 금액을 금액란에 계산해서 출력하는 함수
function calcPay(e){

    const amount = e.value;
    const price = e.parentElement.previousElementSibling.innerText;
    
    e.parentElement.nextElementSibling.innerText = amount * price;
    
}

const totalPrice = document.getElementById("totalPrice");
// 포스기에 행 추가하는 기능
const plusBtn = document.getElementById("plusBtn");
const parentTable = document.getElementById("parentTable");
// plusBtn.addEventListener("click", ()=>{

//     const tr = document.createElement("tr");

//     tr.append(
//         document.createElement("td"),
//         document.createElement("td"),
//         document.createElement("td"),
//         document.createElement("td"),
//         document.createElement("td"),
//         document.createElement("td"),
//         document.createElement("td")
//     )
//     // const input1 = document.createElement("input");
//     // input1.classList.add("form-control");
//     // input1.setAttribute("type", "text");
//     // tr.children[3].append(input1);

//     const input2 = document.createElement("input");
//     input2.classList.add("form-control");
    
//     input2.setAttribute("type", "number");
//     input2.setAttribute("min", "0");
//     input2.setAttribute("value", "0");
//     tr.children[5].append(input2);

//     parentTable.append(tr);

//     input2.addEventListener("input", e => {
//         calcPay(e.target);

//         // 총 합계 계산
//         const prices = document.querySelectorAll("#parentTable>tr>td:nth-of-type(7)");
//         let temp = 0;
//         for(let price of prices){
//             if(price.innerText != ""){
//                 temp += parseInt(price.innerText);
//             }
//         }
//         totalPrice.innerText = temp;
//     });
// });

// 품목 검색하는 모달창
const plusRowBtn = document.getElementById("plusRowBtn");
const inputPosSearch = document.getElementById("inputPosSearch");
const storeSelect = document.getElementById("storeSelect");
// 품목 선택 후 확인버튼 (행 추가)
plusRowBtn.addEventListener("click", ()=>{

    
    const goods = document.querySelectorAll("input.goods");
    for(let good of goods){
        if(good.checked){
            const parent = good.parentElement;
            const tr = document.createElement("tr");
            const td0 = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.classList.add("form-check-input", "deleteCheckbox");
            checkbox.setAttribute("type", "checkbox");
            td0.append(checkbox);
            tr.append(td0);
            



            tr.append(td0);
            for(let i = 1; i <=7; i++){
                const td = document.createElement("td");
                td.innerText = parent.children[i].innerText;
                tr.append(td);
            }
            const td6 = document.createElement("td");
            const td7 = document.createElement("td");
            
            const input = document.createElement("input");
            input.classList.add("form-control", "text-center");
            input.setAttribute("type", "number");
            input.setAttribute("min", "0");
            input.setAttribute("max", "99");
            input.setAttribute("value", "0");
            td6.append(input);

            tr.append(td6, td7);
            parentTable.prepend(tr);

            input.addEventListener("input", e => {
                if(input.value > 99){
                    input.value = 99;
                    alert("수량은 99를 초과할 수 없습니다")
                }
                if(input.value < 0){
                    input.value = 0;
                    alert("수량은 0을 미만할 수 없습니다")
                }
                calcPay(e.target);
                // 총 합계 계산
                const prices = document.querySelectorAll("#parentTable>tr>td:nth-of-type(10)");
                let temp = 0;
                for(let price of prices){
                    if(price.innerText != ""){
                        temp += parseInt(price.innerText);
                    }
                }
                totalPrice.innerText = temp;
            });

        }
    }
});

// 모달 창 열릴 때 마다 모달 바디 초기화(검색 흔적 초기화)
const modalBtn = document.getElementById("modalBtn");
const modalBody = document.getElementById("modalBody");


modalBtn.addEventListener("click", ()=>{
    modalBody.innerHTML = "";
    inputPosSearch.value = "";
});

// 품목 검색 기능
inputPosSearch.addEventListener("input", ()=>{

    if(inputPosSearch.value.trim().length == 0){
        modalBody.innerHTML = "";
        return;
    }

    fetch(
        "/search?inputPosSearch=" + inputPosSearch.value
    )
    .then(resp=>resp.json())
    .then(goodsList=>{
        modalBody.innerHTML = "";
        
        if(goodsList.length == 0){
            const div = document.createElement("div");
            div.classList.add("form-control", "my-2");
            div.innerText = "검색된 상품이 없습니다.";
            modalBody.append(div);

            return;
        }

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

            const span5 = document.createElement("span");
            span5.innerText = goods.stockDiscount;
            span5.style.display = "none";

            const span6 = document.createElement("span");
            span6.innerText = goods.stockOutPrice;
            span6.style.display = "none";

            const span7 = document.createElement("span");
            span7.innerText = goods.stockOutPrice - (goods.stockDiscount * 0.01 * goods.stockOutPrice);
            span7.style.display = "none";
            
            label.append(input, span1, span2, span3, span4, span5, span6, span7);
            modalBody.append(label);
        }
    })
    .catch(e=>console.log(e));

});

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
        const prices = document.querySelectorAll("#parentTable>tr>td:nth-of-type(8)");
        let temp = 0;
        for(let price of prices){
            if(price.innerText != ""){
                temp += parseInt(price.innerText);
            }
        }
        totalPrice.innerText = temp;
    }
});

// 로그아웃
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", ()=>{
    location.href = "/logout";
});