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
plusBtn.addEventListener("click", ()=>{

    const tr = document.createElement("tr");

    tr.append(
        document.createElement("td"),
        document.createElement("td"),
        document.createElement("td"),
        document.createElement("td"),
        document.createElement("td"),
        document.createElement("td"),
        document.createElement("td")
    )
    // const input1 = document.createElement("input");
    // input1.classList.add("form-control");
    // input1.setAttribute("type", "text");
    // tr.children[3].append(input1);

    const input2 = document.createElement("input");
    input2.classList.add("form-control");
    
    input2.setAttribute("type", "number");
    input2.setAttribute("min", "0");
    input2.setAttribute("value", "0");
    tr.children[5].append(input2);

    parentTable.append(tr);

    input2.addEventListener("input", e => {
        calcPay(e.target);

        // 총 합계 계산
        const prices = document.querySelectorAll("#parentTable>tr>td:nth-of-type(7)");
        let temp = 0;
        for(let price of prices){
            if(price.innerText != ""){
                temp += parseInt(price.innerText);
            }
        }
        totalPrice.innerText = temp;
    });
});



