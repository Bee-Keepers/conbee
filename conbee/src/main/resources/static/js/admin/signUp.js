
/* ***** 회원 가입 유효성 검사 ***** */
// .confirm : 초록색 / .error : 빨간색 / 아무것도 없음 : 검은색

/* 모든 입력이 유효성 검사가 진행 되었는지 체크할 객체를 생성 */
const checkObj = {
    "memberId" : false,
    "memberName" : false,
    "memberEmail" : false, 
};


/* 회원 아이디 유효성 검사 */
const memberId = document.getElementById("memberId");
const messageMemberId = document.getElementById("messageMemberId");

memberId.addEventListener("input", () => {

    if(memberId.value.trim().length == 0) {
        memberId.value = "";

        messageMemberId.innerText = "아이디는 영어/숫자 포함 6~12글자 이내로 입력해주세요."
        messageMemberId.classList.remove("OK-feedback");
        messageMemberId.classList.remove("NotOK-feedback");

        memberId.classList.remove("is-invalid");
        memberId.classList.remove("is-valid");

    return;
  }

  // 아이디 정규표현식
  // 영어 대소문자 6~12글자
  const regEx = /^[A-Za-z\d]{6,12}$/;

  // 입력한 아이디가 유효할 경우
  if(regEx.test(memberId.value)){

    /* ===================== 아이디 중복 검사 ======================= */
    fetch("/admin/memberManage/checkMemberId?memberId=" + memberId.value)
    .then(response => response.text())
    .then(result =>{

      if(result == 0){ // 중복 X
        messageMemberId.innerText= "사용 가능한 아이디입니다.";
        messageMemberId.classList.add("OK-feedback");
        messageMemberId.classList.remove("NotOK-feedback");
        
        // 인풋 요소 변화
        memberId.classList.add("is-valid");
        memberId.classList.remove("is-invalid");
        
        checkObj.memberId = true;

      } else { // 중복 O
        messageMemberId.innerText= "이미 사용중인 아이디입니다.";
        messageMemberId.classList.add("NotOK-feedback");
        messageMemberId.classList.remove("OK-feedback");

        // 인풋 요소 변화
        memberId.classList.add("is-invalid");
        memberId.classList.remove("is-valid");

        checkObj.memberId = false;
      }
    })
    .catch(e=> console.log(e))

  // 입력한 아이디가 유효하지 않을 경우    
  } else {
    messageMemberId.innerText= "아이디가 형식에 맞지 않습니다.";
    messageMemberId.classList.add("NotOK-feedback");
    messageMemberId.classList.remove("OK-feedback");

    // 인풋 요소 변화
    memberId.classList.add("is-invalid");
    memberId.classList.remove("is-valid");

    checkObj.memberId = false;
  }

});






/* 회원 이름 유효성 검사 */
const memberName = document.getElementById("memberName");
const messageMemberName = document.getElementById("messageMemberName");

memberName.addEventListener("input", () => {

    if(memberName.value.trim().length == 0) {
      memberName.value = "";

      messageMemberName.innerText = "이름은 한글 2~8글자 이내로 입력해주세요."
      messageMemberName.classList.remove("OK-feedback");
      messageMemberName.classList.remove("NotOK-feedback");

      memberName.classList.remove("is-invalid");
      memberName.classList.remove("is-valid");

    return;
  }


  // 이름 정규표현식
  const regEx = /^[가-힣]{2,8}$/;

  // 입력한 이름이 유효할 경우
  if(regEx.test(memberName.value)){

    messageMemberName.innerText= "사용 가능한 이름입니다.";
    messageMemberName.classList.add("OK-feedback");
    messageMemberName.classList.remove("NotOK-feedback");
    
    // 인풋 요소 변화
    memberName.classList.add("is-valid");
    memberName.classList.remove("is-invalid");
    
    checkObj.memberName = true;

  // 입력한 이름이 유효하지 않을 경우    
  } else {
    messageMemberName.innerText= "이름이 형식에 맞지 않습니다.";
    messageMemberName.classList.add("NotOK-feedback");
    messageMemberName.classList.remove("OK-feedback");

    // 인풋 요소 변화
    memberName.classList.add("is-invalid");
    memberName.classList.remove("is-valid");

    checkObj.memberName = false;
  }

});







/* 이메일 유효성 검사 */

// 1) 이메일 유효성 검사에 사용할 요소 모두 얻어오기
const memberEmail = document.getElementById("memberEmail");
const messageMemberEmail = document.getElementById("messageMemberEmail");

// 2) 이메일이 입력(input) 될 때 마다 유효성 검사 실행
memberEmail.addEventListener("input", () => {

    // 3) 입력된 이메일이 없을 경우
    if(memberEmail.value.trim().length == 0){
        memberEmail.value = '';
        messageMemberEmail.innerText = "메일을 받을 수 있는 이메일을 입력해주세요";

        // 클래스를 제거해서 글자색을 검은색으로 만들기
        messageMemberEmail.classList.remove("OK-feedback");
        messageMemberEmail.classList.remove("NotOK-feedback");
  
        memberEmail.classList.remove("is-valid");
        memberEmail.classList.remove("is-invalid");
  
        return;
    }

    // 4) 이메일 정규식 검사    /*  한글 + 영어 + 숫자 -_ */
    const regEx = /^[A-Za-z\d]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;
        /* 영어 대/소 + 숫자(0~9)                   .으로 시작하는 아무 단어 1글자 이상  */

    // 입력 받은 이메일이 정규식과 일치하는 경우
    if( regEx.test(memberEmail.value) ){
        

        /* =========== 이메일 중복 검사(비동기) ============ */
        fetch("/admin/memberManage/checkMemberEmail?memberEmail=" + memberEmail.value)
        .then( response => response.text() )   // 첫번째 then은 응답이 왔을 때 수행, 응답 결과를 text로 파싱
        .then( result => {                     // 두번째 then은 첫번째 then의 반환된 결과를 이용해 기능 수행
            if(result == 0) { // 중복 X
              messageMemberEmail.innerText = "사용 가능한 이메일 입니다.";
              messageMemberEmail.classList.add("OK-feedback"); // 초록색 글씨
              messageMemberEmail.classList.remove("NotOK-feedback"); // 빨간 글씨 제거


               // 인풋 요소 변화
              memberEmail.classList.add("is-valid");
              memberEmail.classList.remove("is-invalid");

              checkObj.memberEmail = true; // 유효한 상태임을 기록

            } else { // 중복 O
              messageMemberEmail.innerText = "이미 사용 중인 이메일 입니다.";
              messageMemberEmail.classList.add("NotOK-feedback"); // 빨간 글씨
              messageMemberEmail.classList.remove("OK-feedback"); // 초록색 글씨 제거
              
              // 인풋 요소 변화
              memberEmail.classList.add("is-invalid");
              memberEmail.classList.remove("is-valid");

              checkObj.memberEmail = false; // 유효한 상태임을 기록

            }
        } )                 
        .catch( e => console.log(e))
        
        
        /* ============================================= */


    }
    
    // 입력 받은 이메일이 정규식과 일치하는 않은 경우
    else { 
      messageMemberEmail.innerText = "알맞은 이메일 형식으로 작성해주세요.";
      messageMemberEmail.classList.add("NotOK-feedback"); // 빨간 글씨
      messageMemberEmail.classList.remove("OK-feedback"); // 초록색 글씨 제거

      memberEmail.classList.add("is-invalid");
      memberEmail.classList.remove("is-valid");

      checkObj.memberEmail = false;
    }
});




/* 점포번호 유효성 검사 */
const storeNo = document.getElementById("storeNo");
const messageStoreNo = document.getElementById("messageStoreNo");

// 점포번호 입력시 유효성 검사
storeNo.addEventListener("input", ()=>{

  // // 점포번호가 입력되지 않은 경우
  if(storeNo.value > 99999 || storeNo.value < 0){
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


        messageStoreNo.innerText= "사용 가능한 점포번호입니다.";
        messageStoreNo.classList.add("OK-feedback");
        messageStoreNo.classList.remove("NotOK-feedback");
        
        // 인풋 요소 변화
        storeNo.classList.add("is-valid");
        storeNo.classList.remove("is-invalid");
        
        checkObj.storeNo = true;

      
    

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


/* ======================================================================== */

/* 취소, 확인 버튼 작동 */

const cancelBtn = document.querySelector("#cancelBtn");
const submitBtn = document.querySelector("#submitBtn");


// 취소 버튼 클릭 시 input 작성내용 지우기
cancelBtn.addEventListener("click", ()=>{

  memberId.value = "";
  memberName.value = "";
  memberEmail.value = "";
  return;
})

//-------------------------------------------------------------------------



/* 회원 가입 버튼이 클릭 되었을 때 */
document.getElementById("submitBtn").addEventListener("click", e => {

  /*  checkObj의 모든 값을 검사해서
      하나라도 false이면 가입 시도 X */


  // 객체 전용 향상된 for문 ( for ... in )

  for(let key in checkObj){

      // 객체에서 얻어온 값이 false 경우
      // (유효하지 않은 것이 있을 경우)
      if( !checkObj[key] ){

          let str;
          switch(key){
              case "memberId": str = "아이디가 유효하지 않습니다"; break;

              case "memberName": str = "이름이 유효하지 않습니다"; break;
              
              case "memberEmail": str = "이메일이 유효하지 않습니다"; break;

          }

          alert(str);

          // key == input id 속성 값
          // 유효하지 않은 input 태그로 focus 맞춤
          document.getElementById(key).focus();

          e.preventDefault(); // form 제출 X
          return;
      }
  }
});

const storeNoBtn = document.getElementById("storeNoBtn");

storeNoBtn.addEventListener("click", ()=>{
  storeNo.disabled = false;
});


/* ======================================================================== */

const departmentNoCategory = document.getElementById("departmentNo"); // 부서 셀렉
const teamNoCategory = document.getElementById("teamNo"); // 팀 셀렉
const gradeNoCategory = document.getElementById("gradeNo"); // 직급 셀렉

/* 부서 별로 달라지는 팀 리스트 불러오기 */
const departmentNoFn = (departmentNoCategory, teamNoCategory) =>{
  fetch("/admin/memberManage/teamNoList?departmentNo=" + departmentNoCategory.value)
  .then(resp => resp.json())
  .then(list => {
    // 조회된 팀명이 있다면
    if(list.length != 0){
      for(let teamName of list){
        const option = document.createElement("option");
        option.innerText = teamName;
        teamNoCategory.append(option);
      }
    }
  })
  .catch(e => console.log(e));
};

/* 부서 클릭 시 팀 셀렉 함수호출 */
departmentNoCategory.addEventListener("change", ()=>{
  teamNoCategory.innerHTML="";

  const option = document.createElement("option");
  option.innerText = "선택";
  option.setAttribute("value", "");
  teamNoCategory.append(option);

  // 부서 선택 시
  if(departmentNoCategory.value != 0){
    departmentNoFn(departmentNoCategory, teamNoCategory);
  }
})


// 부서 클릭 후 팀이 클릭되지 않았다면 직급에 부장만 나오도록
// 부서 클릭 후 부서가 점포가 클릭되었다면 직급에는 점주만 나오도록
// 부서 클릭 후 임원부 선택 시 직급에 사장,부사장

// 팀 클릭 후 직급에 팀장~사원



