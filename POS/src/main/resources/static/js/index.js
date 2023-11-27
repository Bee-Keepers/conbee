function calcPay(e){

    console.log(e.value);
    const amount = e.value;
    const price = e.parentElement.previousElementSibling.innerText;
    
    e.parentElement.nextElementSibling.innerText = amount * price;

}

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
    const input1 = document.createElement("input");
    input1.classList.add("form-control");
    input1.setAttribute("type", "text");
    tr.children[3].append(input1);

    const input2 = document.createElement("input");
    input2.classList.add("form-control");
    input2.addEventListener("input", e => {
        calcPay(e.target);
    });
    input2.setAttribute("type", "number");
    tr.children[5].append(input2);

    parentTable.append(tr);
});

