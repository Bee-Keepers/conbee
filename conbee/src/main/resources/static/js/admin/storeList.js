/* 검색창에 이전 검색어 남겨두기 */
const searchQuery = document.getElementById("searchQuery");

// 즉시 실행 함수
(()=>{

  // 주소에 있는 파라미터(쿼리스트링) 얻어오기
  const params = new URL(location.href).searchParams;

  const query = params.get("query"); // 검색어 얻어오기

  //검색한 경우
  if(query != null){
    searchQuery.value = query; // 검색어를 input에 추가
  }

})();

//=============================================================================

// 운영버튼을 눌렀을 때 폐점승인 미승인인 경우 폐점 이벤트 막기 안댐...^^
// document.getElementById("storeRunFlY").addEventListener("click", e=>{

//   if(document.getElementById("storeRunApproval").innerText === '미승인'){
//     e.preventDefault();
//   }
// })


//=============================================================================

/* th 정렬 */
const sortStoreNo = document.getElementById("sortStoreNo");
const sortStoreName = document.getElementById("sortStoreName");
const sortRunApproval = document.getElementById("sortRunApproval");
const sortStoreRunFl = document.getElementById("sortStoreRunFl");


/* 점포번호 정렬 */
const sortStoreNoFn = (cp) =>{

  const params = new URL(location.href).searchParams;
  const query1 = params.get("query")!=null ? params.get("query") : ""; // 검색어

  let param = {"cp":cp, "query1" : query1};

  fetch("/admin/storeManage/storeList/sortStoreNo?query=" + query1 + "&cp="+cp)
  .then(response => response.json())
  .then((map) => {

    console.log(map);
    /* URL 수정하기 */
    /* history.pushState(null, null,'storeList/sortStoreNo?query=' + query1 + '&cp='+cp); */

    /* 점포리스트, 페이지네이션 지우기 */
    const storeListFull = document.getElementById("storeListFull");
    storeListFull.innerHTML="";
    const pagination = document.querySelector(".pagination"); // 페이지네이션 ul태그
    pagination.innerHTML="";

    /* 점포리스트 가져오기 */
    for (let store of map.storeList){

      /* tr 생성 */
      const tr = document.createElement("tr");

      /* 점포번호 td 생성 */
      const tdStoreNo = document.createElement("td");
      tdStoreNo.innerHTML=store.storeNo;
      

      /* 점포명 td 생성 */
      const tdStoreName = document.createElement("td");
      const bStoreName = document.createElement("b");
      const aStoreName = document.createElement("a");
      aStoreName.href="/admin/storeManage/storeUpdate/" + store.storeNo;
      aStoreName.style.textDecoration = "none";
      aStoreName.style.color = "black";

      bStoreName.append(aStoreName);
      tdStoreName.append(bStoreName);

      aStoreName.innerHTML=store.storeName;

      /* 점주명 td 생성 */
      const tdMemberName = document.createElement("td");
      tdMemberName.innerHTML=store.memberName;

      /* 점포전화번호 td 생성 */
      const tdStoreTel = document.createElement("td");
      tdStoreTel.innerHTML=store.storeTel;

      /* 점포주소 td 생성 */
      const tdStoreAddress = document.createElement("td");
      tdStoreAddress.innerHTML=store.storeAddress;

      /* 폐점승인여부 td 생성 */
      const tdStoreRunApproval = document.createElement("td");

      if(store.storeRunApproval === 'N') { // 폐점 미승인의 경우
        tdStoreRunApproval.innerHTML='미승인';
      } else {
        tdStoreRunApproval.innerHTML='승인';
      }


      /* 매장운영여부 td 생성 */
      const tdStoreRunFl = document.createElement("td");
      const aStoreRunFl = document.createElement("a");
      aStoreRunFl.href="changeRunFl/" + store.storeNo + "/" + store.storeRunFl;
      aStoreRunFl.style.width = "80px";

      if(store.storeRunFl === 'Y') { // 매장운영 중인 경우
        aStoreRunFl.classList.add("btn");
        aStoreRunFl.classList.add("btn-warning");
        aStoreRunFl.classList.add("mx-3");
        
        aStoreRunFl.innerHTML='운영';

      } else { // 매장운영이 아닌 경우
        aStoreRunFl.classList.add("btn");
        aStoreRunFl.classList.add("btn-secondary");
        aStoreRunFl.classList.add("mx-3");

        aStoreRunFl.innerHTML='폐쇄';
      }

      tdStoreRunFl.append(aStoreRunFl);

      /* 전체 정렬 */
      tr.append(tdStoreNo);
      tr.append(tdStoreName);
      tr.append(tdMemberName);
      tr.append(tdStoreTel);
      tr.append(tdStoreAddress);
      tr.append(tdStoreRunApproval);
      tr.append(tdStoreRunFl);

      storeListFull.append(tr);
      console.log(tr);
    }


    // 페이지네이션
    const pg = map.pagination;

    //조회결과 없을 경우 페이지네이션 생성 X
    if(map.storeList.length == 0) return;

    // 맨 앞 페이지(1번째)
    const li1 = document.createElement("li");
    const a1 = document.createElement("a");
    const span1 = document.createElement("span");

    li1.classList.add("page-item");
    a1.classList.add("page-link");
    
    a1.addEventListener("click", ()=>{
      sortStoreNoFn(1);
    });
    
    span1.innerHTML = "&laquo";
    a1.append(span1);
    li1.append(a1);


    // 이전 페이지 목록
    const li2 = document.createElement("li");
    const a2 = document.createElement("a");
    const span2 = document.createElement("span");

    li2.classList.add("page-item");
    a2.classList.add("page-link");

    a2.addEventListener("click", ()=>{
      sortStoreNoFn(pg.prevPage);
    });

    span2.innerHTML = "&lt";
    a2.append(span2);
    li2.append(a2);

    pagination.append(li1, li2);

    // 특정 페이지로 이동
    for(let i = pg.startPage; i<=pg.endPage; i++){
      const li = document.createElement("li");
      const a = document.createElement("a");
      const span = document.createElement("span");

      li.classList.add("page-item");
      a.classList.add("page-link");
      
      a.addEventListener("click", ()=>{
        sortStoreNoFn(i);
      });
      a.innerHTML = i;

      // 현재 보고 있는 페이지의 경우 클래스 추가
      if(i == pg.currentPage){
        a.classList.add("current");
      }

      a.append(span);
      li.append(a);

      pagination.append(li);
    }


    // 다음 페이지 목록
    const li3 = document.createElement("li");
    const a3 = document.createElement("a");
    const span3 = document.createElement("span");

    li3.classList.add("page-item");
    a3.classList.add("page-link");

    a3.addEventListener("click", ()=>{
      sortStoreNoFn(pg.nextPage);
    });

    span3.innerHTML = "&gt";
    
    a3.append(span3);
    li3.append(a3);


    // 다음 페이지 목록
    const li4 = document.createElement("li");
    const a4 = document.createElement("a");
    const span4 = document.createElement("span");

    li4.classList.add("page-item");
    a4.classList.add("page-link");

    a4.addEventListener("click", ()=>{
      sortStoreNoFn(pg.maxPage);
    });

    span4.innerHTML = "&raquo";
    
    a4.append(span4);
    li4.append(a4);
    
    pagination.append(li3, li4);
  })
  .catch(e => console.log(e));
}


// 이거 내꺼에서도 해야하나??
sortStoreNo.addEventListener("click", ()=>{

  sortStoreNo.classList.add("clicked");
  sortStoreName.classList.remove("clicked");
  sortRunApproval.classList.remove("clicked");
  sortStoreRunFl.classList.remove("clicked");

  sortStoreNoFn(1);

})


//=============================================================================



/* 점포명 정렬 */
const sortStoreNameFn = (cp) =>{

  const params = new URL(location.href).searchParams;
  const query1 = params.get("query")!=null ? params.get("query") : ""; // 검색어

  let param = {"cp":cp, "query1" : query1};

  fetch("/admin/storeManage/storeList/sortStoreName?query=" + query1 + "&cp="+cp)
  .then(response => response.json())
  .then((map) => {

    console.log(map);

    /* 점포리스트, 페이지네이션 지우기 */
    const storeListFull = document.getElementById("storeListFull");
    storeListFull.innerHTML="";
    const pagination = document.querySelector(".pagination"); // 페이지네이션 ul태그
    pagination.innerHTML="";

    /* 점포리스트 가져오기 */
    for (let store of map.storeList){

      /* tr 생성 */
      const tr = document.createElement("tr");

      /* 점포번호 td 생성 */
      const tdStoreNo = document.createElement("td");
      tdStoreNo.innerHTML=store.storeNo;
      

      /* 점포명 td 생성 */
      const tdStoreName = document.createElement("td");
      const bStoreName = document.createElement("b");
      const aStoreName = document.createElement("a");
      aStoreName.href="/admin/storeManage/storeUpdate/" + store.storeNo;
      aStoreName.style.textDecoration = "none";
      aStoreName.style.color = "black";

      bStoreName.append(aStoreName);
      tdStoreName.append(bStoreName);

      aStoreName.innerHTML=store.storeName;

      /* 점주명 td 생성 */
      const tdMemberName = document.createElement("td");
      tdMemberName.innerHTML=store.memberName;

      /* 점포전화번호 td 생성 */
      const tdStoreTel = document.createElement("td");
      tdStoreTel.innerHTML=store.storeTel;

      /* 점포주소 td 생성 */
      const tdStoreAddress = document.createElement("td");
      tdStoreAddress.innerHTML=store.storeAddress;

      /* 폐점승인여부 td 생성 */
      const tdStoreRunApproval = document.createElement("td");
      if(store.storeRunApproval === 'N') { // 폐점 미승인의 경우
        tdStoreRunApproval.innerHTML='미승인';
      } else {
        tdStoreRunApproval.innerHTML='승인';
      }


      /* 매장운영여부 td 생성 */
      const tdStoreRunFl = document.createElement("td");
      const aStoreRunFl = document.createElement("a");
      aStoreRunFl.href="changeRunFl/" + store.storeNo + "/" + store.storeRunFl;
      aStoreRunFl.style.width = "80px";

      if(store.storeRunFl === 'Y') { // 매장운영 중인 경우
        aStoreRunFl.classList.add("btn");
        aStoreRunFl.classList.add("btn-warning");
        aStoreRunFl.classList.add("mx-3");
        
        aStoreRunFl.innerHTML='운영';

      } else { // 매장운영이 아닌 경우
        aStoreRunFl.classList.add("btn");
        aStoreRunFl.classList.add("btn-secondary");
        aStoreRunFl.classList.add("mx-3");

        aStoreRunFl.innerHTML='폐쇄';
      }

      tdStoreRunFl.append(aStoreRunFl);

      /* 전체 정렬 */
      tr.append(tdStoreNo);
      tr.append(tdStoreName);
      tr.append(tdMemberName);
      tr.append(tdStoreTel);
      tr.append(tdStoreAddress);
      tr.append(tdStoreRunApproval);
      tr.append(tdStoreRunFl);

      storeListFull.append(tr);
      console.log(tr);
    }


    // 페이지네이션
    const pg = map.pagination;

    //조회결과 없을 경우 페이지네이션 생성 X
    if(map.storeList.length == 0) return;

    // 맨 앞 페이지(1번째)
    const li1 = document.createElement("li");
    const a1 = document.createElement("a");
    const span1 = document.createElement("span");

    li1.classList.add("page-item");
    a1.classList.add("page-link");
    
    a1.addEventListener("click", ()=>{
      sortStoreNameFn(1);
    });
    
    span1.innerHTML = "&laquo";
    a1.append(span1);
    li1.append(a1);


    // 이전 페이지 목록
    const li2 = document.createElement("li");
    const a2 = document.createElement("a");
    const span2 = document.createElement("span");

    li2.classList.add("page-item");
    a2.classList.add("page-link");

    a2.addEventListener("click", ()=>{
      sortStoreNameFn(pg.prevPage);
    });

    span2.innerHTML = "&lt";
    a2.append(span2);
    li2.append(a2);

    pagination.append(li1, li2);

    // 특정 페이지로 이동
    for(let i = pg.startPage; i<=pg.endPage; i++){
      const li = document.createElement("li");
      const a = document.createElement("a");
      const span = document.createElement("span");

      li.classList.add("page-item");
      a.classList.add("page-link");
      
      a.addEventListener("click", ()=>{
        sortStoreNameFn(i);
      });
      a.innerHTML = i;

      // 현재 보고 있는 페이지의 경우 클래스 추가
      if(i == pg.currentPage){
        a.classList.add("current");
      }

      a.append(span);
      li.append(a);

      pagination.append(li);
    }


    // 다음 페이지 목록
    const li3 = document.createElement("li");
    const a3 = document.createElement("a");
    const span3 = document.createElement("span");

    li3.classList.add("page-item");
    a3.classList.add("page-link");

    a3.addEventListener("click", ()=>{
      sortStoreNameFn(pg.nextPage);
    });

    span3.innerHTML = "&gt";
    
    a3.append(span3);
    li3.append(a3);


    // 다음 페이지 목록
    const li4 = document.createElement("li");
    const a4 = document.createElement("a");
    const span4 = document.createElement("span");

    li4.classList.add("page-item");
    a4.classList.add("page-link");

    a4.addEventListener("click", ()=>{
      sortStoreNameFn(pg.maxPage);
    });

    span4.innerHTML = "&raquo";
    
    a4.append(span4);
    li4.append(a4);
    
    pagination.append(li3, li4);
  })
  .catch(e => console.log(e));
}


// 이거 내꺼에서도 해야하나??
sortStoreName.addEventListener("click", ()=>{

  sortStoreName.classList.remove("clicked");
  sortStoreName.classList.add("clicked");
  sortRunApproval.classList.remove("clicked");
  sortStoreRunFl.classList.remove("clicked");

  sortStoreNameFn(1);

})



//=============================================================================


/* 폐점승인 정렬 */

const sortRunApprovalFn = (cp) =>{

  const params = new URL(location.href).searchParams;
  const query1 = params.get("query")!=null ? params.get("query") : ""; // 검색어

  fetch("/admin/storeManage/storeList/sortRunApproval?query=" + query1 + "&cp="+cp)
  .then(response => response.json())
  .then((map) => {

    console.log(map);

    /* 점포리스트, 페이지네이션 지우기 */
    const storeListFull = document.getElementById("storeListFull");
    storeListFull.innerHTML="";
    const pagination = document.querySelector(".pagination"); // 페이지네이션 ul태그
    pagination.innerHTML="";

    /* 점포리스트 가져오기 */
    for (let store of map.storeList){

      /* tr 생성 */
      const tr = document.createElement("tr");

      /* 점포번호 td 생성 */
      const tdStoreNo = document.createElement("td");
      tdStoreNo.innerHTML=store.storeNo;
      

      /* 점포명 td 생성 */
      const tdStoreName = document.createElement("td");
      const bStoreName = document.createElement("b");
      const aStoreName = document.createElement("a");
      aStoreName.href="/admin/storeManage/storeUpdate/" + store.storeNo;
      aStoreName.style.textDecoration = "none";
      aStoreName.style.color = "black";

      bStoreName.append(aStoreName);
      tdStoreName.append(bStoreName);

      aStoreName.innerHTML=store.storeName;

      /* 점주명 td 생성 */
      const tdMemberName = document.createElement("td");
      tdMemberName.innerHTML=store.memberName;

      /* 점포전화번호 td 생성 */
      const tdStoreTel = document.createElement("td");
      tdStoreTel.innerHTML=store.storeTel;

      /* 점포주소 td 생성 */
      const tdStoreAddress = document.createElement("td");
      tdStoreAddress.innerHTML=store.storeAddress;

      /* 폐점승인여부 td 생성 */
      const tdStoreRunApproval = document.createElement("td");
      if(store.storeRunApproval === 'N') { // 폐점 미승인의 경우
        tdStoreRunApproval.innerHTML='미승인';
      } else {
        tdStoreRunApproval.innerHTML='승인';
      }


      /* 매장운영여부 td 생성 */
      const tdStoreRunFl = document.createElement("td");
      const aStoreRunFl = document.createElement("a");
      aStoreRunFl.href="changeRunFl/" + store.storeNo + "/" + store.storeRunFl;
      aStoreRunFl.style.width = "80px";

      if(store.storeRunFl === 'Y') { // 매장운영 중인 경우
        aStoreRunFl.classList.add("btn");
        aStoreRunFl.classList.add("btn-warning");
        aStoreRunFl.classList.add("mx-3");
        
        aStoreRunFl.innerHTML='운영';

      } else { // 매장운영이 아닌 경우
        aStoreRunFl.classList.add("btn");
        aStoreRunFl.classList.add("btn-secondary");
        aStoreRunFl.classList.add("mx-3");

        aStoreRunFl.innerHTML='폐쇄';
      }

      tdStoreRunFl.append(aStoreRunFl);

      /* 전체 정렬 */
      tr.append(tdStoreNo);
      tr.append(tdStoreName);
      tr.append(tdMemberName);
      tr.append(tdStoreTel);
      tr.append(tdStoreAddress);
      tr.append(tdStoreRunApproval);
      tr.append(tdStoreRunFl);

      storeListFull.append(tr);
      console.log(tr);
    }


    // 페이지네이션
    const pg = map.pagination;

    //조회결과 없을 경우 페이지네이션 생성 X
    if(map.storeList.length == 0) return;

    // 맨 앞 페이지(1번째)
    const li1 = document.createElement("li");
    const a1 = document.createElement("a");
    const span1 = document.createElement("span");

    li1.classList.add("page-item");
    a1.classList.add("page-link");
    
    a1.addEventListener("click", ()=>{
      sortRunApprovalFn(1);
    });
    
    span1.innerHTML = "&laquo";
    a1.append(span1);
    li1.append(a1);


    // 이전 페이지 목록
    const li2 = document.createElement("li");
    const a2 = document.createElement("a");
    const span2 = document.createElement("span");

    li2.classList.add("page-item");
    a2.classList.add("page-link");

    a2.addEventListener("click", ()=>{
      sortRunApprovalFn(pg.prevPage);
    });

    span2.innerHTML = "&lt";
    a2.append(span2);
    li2.append(a2);

    pagination.append(li1, li2);

    // 특정 페이지로 이동
    for(let i = pg.startPage; i<=pg.endPage; i++){
      const li = document.createElement("li");
      const a = document.createElement("a");
      const span = document.createElement("span");

      li.classList.add("page-item");
      a.classList.add("page-link");
      
      a.addEventListener("click", ()=>{
        sortRunApprovalFn(i);
      });
      a.innerHTML = i;

      // 현재 보고 있는 페이지의 경우 클래스 추가
      if(i == pg.currentPage){
        a.classList.add("current");
      }

      a.append(span);
      li.append(a);

      pagination.append(li);
    }


    // 다음 페이지 목록
    const li3 = document.createElement("li");
    const a3 = document.createElement("a");
    const span3 = document.createElement("span");

    li3.classList.add("page-item");
    a3.classList.add("page-link");

    a3.addEventListener("click", ()=>{
      sortRunApprovalFn(pg.nextPage);
    });

    span3.innerHTML = "&gt";
    
    a3.append(span3);
    li3.append(a3);


    // 다음 페이지 목록
    const li4 = document.createElement("li");
    const a4 = document.createElement("a");
    const span4 = document.createElement("span");

    li4.classList.add("page-item");
    a4.classList.add("page-link");

    a4.addEventListener("click", ()=>{
      sortRunApprovalFn(pg.maxPage);
    });

    span4.innerHTML = "&raquo";
    
    a4.append(span4);
    li4.append(a4);
    
    pagination.append(li3, li4);
  })
  .catch(e => console.log(e));
}


// 이거 내꺼에서도 해야하나??
sortRunApproval.addEventListener("click", ()=>{

  sortStoreName.classList.remove("clicked");
  sortStoreName.classList.remove("clicked");
  sortRunApproval.classList.add("clicked");
  sortStoreRunFl.classList.remove("clicked");

  sortRunApprovalFn(1);

})


//=============================================================================


/* 운영여부 정렬 */

const sortStoreRunFlFn = (cp) =>{

  const params = new URL(location.href).searchParams;
  const query1 = params.get("query")!=null ? params.get("query") : ""; // 검색어

  fetch("/admin/storeManage/storeList/sortStoreRunFl?query=" + query1 + "&cp="+cp)
  .then(response => response.json())
  .then((map) => {

    console.log(map);

    /* 점포리스트, 페이지네이션 지우기 */
    const storeListFull = document.getElementById("storeListFull");
    storeListFull.innerHTML="";
    const pagination = document.querySelector(".pagination"); // 페이지네이션 ul태그
    pagination.innerHTML="";

    /* 점포리스트 가져오기 */
    for (let store of map.storeList){

      /* tr 생성 */
      const tr = document.createElement("tr");

      /* 점포번호 td 생성 */
      const tdStoreNo = document.createElement("td");
      tdStoreNo.innerHTML=store.storeNo;
      

      /* 점포명 td 생성 */
      const tdStoreName = document.createElement("td");
      const bStoreName = document.createElement("b");
      const aStoreName = document.createElement("a");
      aStoreName.href="/admin/storeManage/storeUpdate/" + store.storeNo;
      aStoreName.style.textDecoration = "none";
      aStoreName.style.color = "black";

      bStoreName.append(aStoreName);
      tdStoreName.append(bStoreName);

      aStoreName.innerHTML=store.storeName;

      /* 점주명 td 생성 */
      const tdMemberName = document.createElement("td");
      tdMemberName.innerHTML=store.memberName;

      /* 점포전화번호 td 생성 */
      const tdStoreTel = document.createElement("td");
      tdStoreTel.innerHTML=store.storeTel;

      /* 점포주소 td 생성 */
      const tdStoreAddress = document.createElement("td");
      tdStoreAddress.innerHTML=store.storeAddress;

      /* 폐점승인여부 td 생성 */
      const tdStoreRunApproval = document.createElement("td");
      if(store.storeRunApproval === 'N') { // 폐점 미승인의 경우
        tdStoreRunApproval.innerHTML='미승인';
      } else {
        tdStoreRunApproval.innerHTML='승인';
      }


      /* 매장운영여부 td 생성 */
      const tdStoreRunFl = document.createElement("td");
      const aStoreRunFl = document.createElement("a");
      aStoreRunFl.href="changeRunFl/" + store.storeNo + "/" + store.storeRunFl;
      aStoreRunFl.style.width = "80px";

      if(store.storeRunFl === 'Y') { // 매장운영 중인 경우
        aStoreRunFl.classList.add("btn");
        aStoreRunFl.classList.add("btn-warning");
        aStoreRunFl.classList.add("mx-3");
        
        aStoreRunFl.innerHTML='운영';

      } else { // 매장운영이 아닌 경우
        aStoreRunFl.classList.add("btn");
        aStoreRunFl.classList.add("btn-secondary");
        aStoreRunFl.classList.add("mx-3");

        aStoreRunFl.innerHTML='폐쇄';
      }

      tdStoreRunFl.append(aStoreRunFl);

      /* 전체 정렬 */
      tr.append(tdStoreNo);
      tr.append(tdStoreName);
      tr.append(tdMemberName);
      tr.append(tdStoreTel);
      tr.append(tdStoreAddress);
      tr.append(tdStoreRunApproval);
      tr.append(tdStoreRunFl);

      storeListFull.append(tr);
      console.log(tr);
    }


    // 페이지네이션
    const pg = map.pagination;

    //조회결과 없을 경우 페이지네이션 생성 X
    if(map.storeList.length == 0) return;

    // 맨 앞 페이지(1번째)
    const li1 = document.createElement("li");
    const a1 = document.createElement("a");
    const span1 = document.createElement("span");

    li1.classList.add("page-item");
    a1.classList.add("page-link");
    
    a1.addEventListener("click", ()=>{
      sortStoreRunFlFn(1);
    });
    
    span1.innerHTML = "&laquo";
    a1.append(span1);
    li1.append(a1);


    // 이전 페이지 목록
    const li2 = document.createElement("li");
    const a2 = document.createElement("a");
    const span2 = document.createElement("span");

    li2.classList.add("page-item");
    a2.classList.add("page-link");

    a2.addEventListener("click", ()=>{
      sortStoreRunFlFn(pg.prevPage);
    });

    span2.innerHTML = "&lt";
    a2.append(span2);
    li2.append(a2);

    pagination.append(li1, li2);

    // 특정 페이지로 이동
    for(let i = pg.startPage; i<=pg.endPage; i++){
      const li = document.createElement("li");
      const a = document.createElement("a");
      const span = document.createElement("span");

      li.classList.add("page-item");
      a.classList.add("page-link");
      
      a.addEventListener("click", ()=>{
        sortStoreRunFlFn(i);
      });
      a.innerHTML = i;

      // 현재 보고 있는 페이지의 경우 클래스 추가
      if(i == pg.currentPage){
        a.classList.add("current");
      }

      a.append(span);
      li.append(a);

      pagination.append(li);
    }


    // 다음 페이지 목록
    const li3 = document.createElement("li");
    const a3 = document.createElement("a");
    const span3 = document.createElement("span");

    li3.classList.add("page-item");
    a3.classList.add("page-link");

    a3.addEventListener("click", ()=>{
      sortStoreRunFlFn(pg.nextPage);
    });

    span3.innerHTML = "&gt";
    
    a3.append(span3);
    li3.append(a3);


    // 다음 페이지 목록
    const li4 = document.createElement("li");
    const a4 = document.createElement("a");
    const span4 = document.createElement("span");

    li4.classList.add("page-item");
    a4.classList.add("page-link");

    a4.addEventListener("click", ()=>{
      sortStoreRunFlFn(pg.maxPage);
    });

    span4.innerHTML = "&raquo";
    
    a4.append(span4);
    li4.append(a4);
    
    pagination.append(li3, li4);
  })
  .catch(e => console.log(e));
}


// 이거 내꺼에서도 해야하나??
sortStoreRunFl.addEventListener("click", ()=>{

  sortStoreName.classList.remove("clicked");
  sortStoreName.classList.remove("clicked");
  sortRunApproval.classList.remove("clicked");
  sortStoreRunFl.classList.add("clicked");

  sortStoreRunFlFn(1);

})



//=============================================================================

/* th 클릭 시 sorting되도록 -> 화면에 있는것만 sorting이 가능해서 폐기!*/
/* window.addEventListener('click', e=>{
  if(e.target.dataset.sort) {table_sort(e.target);}
});

// tobody에 있는 데이터를 모두 얻어와 sorting 하기
function table_sort(target){
  const tbody = target.parentElement.parentElement.nextElementSibling;

  for(let i=0; i<tbody.children.length; i++){
    sort_func(target);
  }
}

// sort함수
function sort_func(target){
  const cidx = target.cellIndex;
  const tbody = target.parentElement.parentElement.nextElementSibling;

  // 한 행씩 다음행과의 값을 비교
  for(let i=0; i<tbody.children.length -1; i++){
    const curr = tbody.children[i].children[cidx];
    const next = tbody.children[i + 1].children[cidx];

    let val_curr = curr.innerText;
    let val_next = next.innerText;

    let predi;
    switch(target.dataset.sort){
      case "str" :
        val_curr = val_curr[0].toLowerCase();
        val_next = val_next[0].toLowerCase();
        break;

      case "num" :
        val_curr = parseInt(val_curr);
        val_next = parseInt(val_next);
        break;
    }

    if(val_curr > val_next){
      tbody.insertBefore(curr.parentElement, next.parentElement.nextElementSibling);
    }
  }
} */

//=============================================================================

