/* 모든 입력이 유효성 검사가 진행 되었는지 체크할 객체를 생성 */
const checkObj = {
    "storeNo" : false
};
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

/* 점포번호 유효성 검사 */
const storeNo = document.getElementById("storeNo");
const messageStoreNo = document.getElementById("messageStoreNo");

// 점포번호 입력시 유효성 검사
storeNo.addEventListener("input", ()=>{

  // // 점포번호가 입력되지 않은 경우
  if(storeNo.value > 99999 || storeNo.value <= 0){
      storeNo.value = "";

    messageStoreNo.innerText = "점포번호는 숫자 1~5자리 이내로 작성해주세요.";
    messageStoreNo.classList.remove("OK-feedback");
    messageStoreNo.classList.remove("NotOK-feedback");

    storeNo.classList.remove("is-invalid");
    storeNo.classList.remove("is-valid");

    return;
  }

  // 점포번호 정규표현식
  // 숫자 1~5글자
  const regEx = /^[0-9]{1,5}$/;

  // 입력한 점포번호가 유효할 경우
  if(regEx.test(storeNo.value)){
    /* ===================== 점포번호 중복 검사 ======================= */
    fetch("/admin/memberManage/checkStoreNo?storeNo=" + storeNo.value)
    .then(resp => resp.text())
    .then(result =>{

      if(result == 1){ // 중복이 아닌 경우
        messageStoreNo.innerText= "사용 가능한 점포번호입니다.";
        messageStoreNo.classList.add("OK-feedback");
        messageStoreNo.classList.remove("NotOK-feedback");
        
        // 인풋 요소 변화
        storeNo.classList.add("is-valid");
        storeNo.classList.remove("is-invalid");
        
        checkObj.storeNo = true;

      } else {
        messageStoreNo.innerText= "사용 불가능한 점포번호입니다.";
        messageStoreNo.classList.add("NotOK-feedback");
        messageStoreNo.classList.remove("OK-feedback");
    
        // 인풋 요소 변화
        storeNo.classList.add("is-invalid");
        storeNo.classList.remove("is-valid");
    
        checkObj.storeNo = false;
      }
    })
    .catch(e=> console.log(e))

  // 입력한 점포번호가 유효하지 않을 경우    
  } else {
    messageStoreNo.innerText= "점포명이 형식에 맞지 않습니다.";
    messageStoreNo.classList.add("NotOK-feedback");
    messageStoreNo.classList.remove("OK-feedback");

    // 인풋 요소 변화
    storeNo.classList.add("is-invalid");
    storeNo.classList.remove("is-valid");

    checkObj.storeNo = false;
  }

});

const plusBtn = document.getElementById("plusBtn");

plusBtn.addEventListener("click", ()=>{
    if(checkObj.storeNo){
        const button = createElement("button", {"type":"button"},["btn","btn-warning"]);
        button.innerText = storeNo.value;
        const input = createElement("input", {"type":"hidden"} ,[]);
        input.value = storeNo.value;
        button.append(input);

        button.addEventListener("click", e=>{
            e.target.innerHTML = "";
            e.target.remove();
        })

        storeNoContainer.append(button);
    }


});

// 점포 번호 받아두는 칸
const storeNoContainer = document.getElementById("storeNoContainer");

const searchMemberId = document.getElementById("searchMemberId");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", ()=>{

    fetch("/admin/memberManage/getStoreNoList?storeNo=" + storeNo.value)
    .then()
    .then()
    .catch(e=>console.log(e));

})