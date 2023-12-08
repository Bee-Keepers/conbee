// 발주 조회 지점 선택
const storeNoSelect = document.getElementById("storeNoSelect");
storeNoSelect.addEventListener("change", e=>{
  location.href = "/stock/order/list?storeNo=" + e.target.value;
});

// 지점 선택 옵션 저장
const url = new URL(location.href);
const urlParams = url.searchParams;

const options = document.querySelectorAll("#storeNoSelect>option");
for(let option of options){
    if(option.value == urlParams.get("storeNo")){
        option.selected = true;
        break;
    }
}

const detailTbody = document.getElementById("detailTbody");

function detailOrderFn(e){
  console.log(e.parentElement.previousElementSibling.innerText);

  fetch("/stock/order/select?storeNo=" + storeNoSelect.value + "&orderDate=" + e.parentElement.previousElementSibling.innerText)
  .then(resp=>resp.json())
  .then(orderList=>{

    detailTbody.innerHTML = "";

    if(orderList.length != 0){
      for(let order of orderList){
        const tr = document.createElement("tr");
        console.log(order);
        for(let key in order){
          const td = document.createElement("td");
          td.innerText = order[key];
          tr.append(td);
        }
        detailTbody.append(tr);
      }
    } else {
      detailTbody.innerText = "조회 결과가 없습니다";
    }

  })
  .catch(e=>console.log(e));
  
};