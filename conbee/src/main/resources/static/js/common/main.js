// 매출현황 합계
const revenueSum = document.getElementById("revenueSum");

function revenueSumFn(revenueList){
  let temp = 0;
  if(revenueList.length != 0){
    for (let revenue of revenueList) {
      temp += revenue.historyAmount * revenue.historyActualPrice;
    }
  }
  
  revenueSum.innerText = '합계 : ' + temp.toLocaleString("ko-KR");
};

revenueSumFn(revenueList);

// 재고현황 지정 변경시 리스트 재출력
const stockStoreNo = document.getElementById('stockStoreNo');
const stockTbody = document.getElementById("stockTbody");

if(stockStoreNo != null){
  stockStoreNo.addEventListener("change", ()=>{
    console.log(stockStoreNo.value);
    fetch("/ajax/stockList?storeNo=" + stockStoreNo.value)
    .then(resp=>resp.json())
    .then(stockList=>{
      console.log(stockList);
      stockTbody.innerHTML = "";
  
      if(stockList.length != 0){
        for(let stock of stockList){
          const tr = document.createElement("tr");
          const td1 = document.createElement("td");
          td1.innerText = stock.scategoryName;
          const td2 = document.createElement("td");
          td2.classList.add("text-truncate");
          td2.innerText = stock.goodsName;
          const td3 = document.createElement("td");
          td3.innerText = stock.stockAmount;
    
          tr.append(td1, td2, td3);
          stockTbody.append(tr);
        }
      } else {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.classList.add("text-center", "fw-bold");
        td.innerText = '재고가 없습니다';
        td.setAttribute("colspan", "3");
        tr.append(td);
        stockTbody.append(tr);
      }
      
    })
    .catch(e=>console.log(e));
  })
}

// 매출현황 변경 시 재출력
const revenueTbody = document.getElementById("revenueTbody");
const revenueStoreNo = document.getElementById("revenueStoreNo");

if(revenueStoreNo != null){

  revenueStoreNo.addEventListener("change", ()=>{
    console.log(revenueStoreNo.value);
    fetch("/ajax/revenueList?storeNo=" + revenueStoreNo.value)
    .then(resp=>resp.json())
    .then(stockList=>{
      revenueTbody.innerHTML = "";
  
      if(stockList.length != 0){
        for(let stock of stockList){
          const tr = document.createElement("tr");
          const td1 = document.createElement("td");
          td1.innerText = stock.scategoryName;
          const td2 = document.createElement("td");
          td2.classList.add("text-truncate");
          td2.innerText = stock.historyGoodsName;
          const td3 = document.createElement("td");
          td3.innerText = stock.historyAmount * stock.historyActualPrice;
    
          tr.append(td1, td2, td3);
          revenueTbody.append(tr);
        }
      } else{
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.classList.add("text-center", "fw-bold");
        td.innerText = '금일 매출이 없습니다';
        td.setAttribute("colspan", "3");
        tr.append(td);
        revenueTbody.append(tr);
      }
      revenueSumFn(stockList);
    })
    .catch(e=>console.log(e));
  });
}

// 일일발주 변경 시 재출력
const orderTbody = document.getElementById("orderTbody");
const orderStoreNo = document.getElementById("orderStoreNo");

if(orderStoreNo != null){

  orderStoreNo.addEventListener("change", ()=>{
    fetch("/ajax/orderList?storeNo=" + orderStoreNo.value)
    .then(resp=>resp.json())
    .then(orderList=>{
      orderTbody.innerHTML = "";
  
      if(orderList.length != 0){
        for(let order of orderList){
          const tr = document.createElement("tr");
          const td1 = document.createElement("td");
          td1.innerText = order.scategoryName;
          const td2 = document.createElement("td");
          td2.classList.add("text-truncate");
          td2.innerText = order.goodsName;
          const td3 = document.createElement("td");
          td3.innerText = order.stockAmount;
          const td4 = document.createElement("td");
          td4.innerText = order.orderAmount;
    
          tr.append(td1, td2, td3, td4);
          orderTbody.append(tr);
        }
      } else{
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.classList.add("text-center", "fw-bold");
        td.innerText = '금일 발주가 없습니다';
        td.setAttribute("colspan", "4");
        tr.append(td);
        orderTbody.append(tr);
      }
    })
    .catch(e=>console.log(e));
  });
}