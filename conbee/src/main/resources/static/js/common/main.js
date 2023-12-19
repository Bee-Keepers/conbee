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

// 무한 스크롤

const tableTbody = document.getElementById("tableTbody");
let cp = 1;
const cpFn = () => {
  cp += 1;
};
let url;
let callback = (entries, observer) => {
  entries.forEach(entry => {
    // 타겟 요소가 루트 요소와 교차하는 점이 없으면 콜백을 호출했으되, 조기에 탈출한다.
    if (entry.intersectionRatio <= 0) return

    // 혹은 isIntersecting을 사용할 수 있습니다.
    if (!entry.isIntersecting) return

    // ... 콜백 로직

    // cp 증가 함수
    cpFn();

    // url 설정
    if(stockStoreNo != null){
      url = "/stock/stockListAjax?cp=" + cp+"&storeNo="+stockStoreNo.value;
    } else{
      url = "stockManage/stockListAjax?cp=" + cp + "&storeNo=0";
    }

    // 비동기 무한스크롤 요청
    fetch(url)
      .then(resp => resp.json())
      .then(list => {
        console.log(list);
        if (list.length == 0) {
          observer.disconnect();
        }
        for (let goods of list) {
           const tr = createElement("tr", null, []);

           const td1 = createElement("td", null, []);
         td1.innerText = goods.scategoryName;

         const td2 = createElement("td",null,["text-truncate"]);
         td2.innerText = goods.goodsName;
         
         const td3 = createElement("td",null,[]);
         td3.innerText = goods.stockAmount;

         tr.append(td1, td2, td3);

         stockTbody.append(tr);
      }
   })
   .catch(e=>console.log(e));
   });
 };

const observer = new IntersectionObserver( callback ,{
	threshold: 0.5
});

observer.observe(document.querySelector("#stockObservedTag"));