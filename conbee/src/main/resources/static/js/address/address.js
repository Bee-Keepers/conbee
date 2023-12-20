/* 검색 */
const addressName = document.getElementById("addressName");
const addressNameBtn = document.getElementById("addressNameBtn");

const url = new URL(location.href);
const urlParams = url.searchParams;

// console.log(memberDeptNo);

addressNameBtn.addEventListener("click", ()=>{
    const url = new URL(location.href);
    const urlParams = url.searchParams;
    let deptNo = urlParams.get("deptNo");
    console.log(deptNo);
    if(urlParams.get("deptNo")==null && memberDeptNo == 5){
        deptNo=5;
    }
    else if(urlParams.get("deptNo")==null && memberDeptNo != 5){
        deptNo=-1;
    }
    // let grade = urlParams.get("grade");
    // if(urlParams.get("grade") == null){
    //     grade = 0;
    // }
    location.href = "/address?deptNo=" + deptNo + "&query=" + addressName.value;
});


/* 검색 기록 남기기 */
(()=>{
  const searchWord = urlParams.get("query"); // 검색어

  // 검색을 했을 경우
  if(searchWord !=null){
    addressName.value = searchWord; // 검색어를 input에 추가
  }
})();


/* 부서이름 넣기 */
(()=>{
    let deptNo = urlParams.get("deptNo");

    const deptName = document.getElementById("deptName");

    switch(deptNo){
        case "0" : deptName.innerText = "  - 임원"; break;
        case "1" : deptName.innerText = "  - 인사관리부"; break;
        case "2" : deptName.innerText = "  - 경영관리부"; break;
        case "3" : deptName.innerText = "  - 운영관리부"; break;
        case "4" : deptName.innerText = "  - 고객관리부"; break;
        case "5" : deptName.innerText = ""; break;
        default : deptName.innerText = "  - 전 부서"; 
    }


})();

