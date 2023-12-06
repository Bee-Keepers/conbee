/* 주소 */
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수

  
            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("detailAddress").focus();
        }
    }).open();
}


/* 정보 등록 유효성 검사 */

const checkObj = {
    "storeName" : false,
    "storeTel" : false,
    "storeAddress" : false
  };
  
  /* 점주명, 점주회원번호 동시작성/동시빈칸 */
  const checkMemberObj = {
    "memberName" : false,
    "memberNo" : false
  }



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

// 점포전화번호 유효성 검사
const storeTel = document.getElementById("storeTel");
const messageStoreTel = document.getElementById("messageStoreTel");

// 점포전화번호 입력시 유효성 검사
storeTel.addEventListener("input", ()=>{

  // 점포전화번호가 입력되지 않은 경우
  if(storeTel.value.trim().length == 0){
      storeTel.value = "";

      messageStoreTel.innerText = "점포 전화번호는 숫자 9~11글자 이내로 작성해주세요.";
      messageStoreTel.classList.remove("OK-feedback");
      messageStoreTel.classList.remove("NotOK-feedback");

      storeTel.classList.remove("is-invalid");
      storeTel.classList.remove("is-valid");

      checkObj.storeTel = false;

      return;
  }

  // 점포전화번호 정규표현식
  // 숫자 9~11글자, 첫글자는 0
  const regEx = /^[0][0-9]{8,10}$/;

  // 입력한 점포전화번호가 유효할 경우
  if(regEx.test(storeTel.value)){

      /* ===================== 점포전화번호 중복 검사 ======================= */
      fetch("/admin/storeManage/checkStoreTel?storeTel=" + storeTel.value)
      .then(response => response.text())
      .then(result =>{

        if(result == 0){ // 중복 X
          messageStoreTel.innerText= "사용 가능한 점포 전화번호입니다.";
          messageStoreTel.classList.add("OK-feedback");
          messageStoreTel.classList.remove("NotOK-feedback");

          // 인풋 요소 변화
          storeTel.classList.add("is-valid");
          storeTel.classList.remove("is-invalid");

          checkObj.storeTel = true;

        } else { // 중복 O
          messageStoreTel.innerText= "이미 사용중인 점포 전화번호입니다.";
          messageStoreTel.classList.add("NotOK-feedback");
          messageStoreTel.classList.remove("OK-feedback");

          // 인풋 요소 변화
          storeTel.classList.add("is-invalid");
          storeTel.classList.remove("is-valid");

          checkObj.storeTel = false;
        }
      })
      .catch(e=> console.log(e))

  // 입력한 점포명이 유효하지 않을 경우    
  } else {
    messageStoreTel.innerText= "점포 전화번호가 형식에 맞지 않습니다.";
    messageStoreTel.classList.add("NotOK-feedback");
    messageStoreTel.classList.remove("OK-feedback");

    // 인풋 요소 변화
    storeTel.classList.add("is-invalid");
    storeTel.classList.remove("is-valid");

    checkObj.storeTel = false;
  }

})

// 점포전화번호 유효성 검사
const memberTel = document.getElementById("memberTel");
const messageMemberTel = document.getElementById("messageMemberTel");

// 점포전화번호 입력시 유효성 검사
memberTel.addEventListener("input", ()=>{

  // 점포전화번호가 입력되지 않은 경우
  if(memberTel.value.trim().length == 0){
    memberTel.value = "";

    messageMemberTel.innerText = "점포 전화번호는 숫자 9~11글자 이내로 작성해주세요.";
    messageMemberTel.classList.remove("OK-feedback");
    messageMemberTel.classList.remove("NotOK-feedback");

    memberTel.classList.remove("is-invalid");
    memberTel.classList.remove("is-valid");

      checkObj.memberTel = false;

      return;
  }

  // 점포전화번호 정규표현식
  // 숫자 9~11글자, 첫글자는 0
  const regEx = /^[0][0-9]{8,10}$/;

  // 입력한 점포전화번호가 유효할 경우
  if(regEx.test(memberTel.value)){

      /* ===================== 점포전화번호 중복 검사 ======================= */
      fetch("/admin/storeManage/checkStoreTel?storeTel=" + memberTel.value)
      .then(response => response.text())
      .then(result =>{

        if(result == 0){ // 중복 X
            messageMemberTel.innerText= "사용 가능한 점포 전화번호입니다.";
            messageMemberTel.classList.add("OK-feedback");
            messageMemberTel.classList.remove("NotOK-feedback");

          // 인풋 요소 변화
          memberTel.classList.add("is-valid");
          memberTel.classList.remove("is-invalid");

          checkObj.memberTel = true;

        } else { // 중복 O
            messageMemberTel.innerText= "이미 사용중인 점포 전화번호입니다.";
            messageMemberTel.classList.add("NotOK-feedback");
            messageMemberTel.classList.remove("OK-feedback");

          // 인풋 요소 변화
          memberTel.classList.add("is-invalid");
          memberTel.classList.remove("is-valid");

          checkObj.memberTel = false;
        }
      })
      .catch(e=> console.log(e))

  // 입력한 점포명이 유효하지 않을 경우    
  } else {
    messageMemberTel.innerText= "점포 전화번호가 형식에 맞지 않습니다.";
    messageMemberTel.classList.add("NotOK-feedback");
    messageMemberTel.classList.remove("OK-feedback");

    // 인풋 요소 변화
    memberTel.classList.add("is-invalid");
    memberTel.classList.remove("is-valid");

    checkObj.memberTel = false;
  }

})


//-------------------------------------------------------------------------

// 점포주소 유효성 검사
const memberAddress = document.getElementById("memberAddress");
const messageMemberAddress = document.getElementById("messageMemberAddress");

// 점포주소 입력시 유효성 검사
memberAddress.addEventListener("input", ()=>{

  // 점포주소가 입력되지 않은 경우
  if(memberAddress.value.trim().length == 0){
    memberAddress.value = "";

    messageMemberAddress.innerText = "점포 주소는 한글, 숫자로 작성해주세요.";
    messageMemberAddress.classList.remove("OK-feedback");
    messageMemberAddress.classList.remove("NotOK-feedback");

    memberAddress.classList.remove("is-invalid");
    memberAddress.classList.remove("is-valid");

    checkObj.memberAddress = false;

    return;
  }

  // 점포주소 정규표현식
  // 한글, 숫자, 띄어쓰기, -, (), ,를 포함한 10~100글자 이내의 정규표현식
  const regEx = /^[가-힣0-9\s\-\(\),]{10,100}$/;

  // 입력한 점포주소가 유효할 경우
  if(regEx.test(memberAddress.value)){

      /* ===================== 점포주소 중복 검사 ======================= */
      fetch("/mypage/memberAddress/checkMemberAddress?memberAddress=" + memberAddress.value)
      .then(response => response.text())
      .then(result =>{

        if(result == 0){ // 중복 X
          messageStoreAddress.innerText= "사용 가능한 점포 주소입니다.";
          messageStoreAddress.classList.add("OK-feedback");
          messageStoreAddress.classList.remove("NotOK-feedback");

          // 인풋 요소 변화
          storeAddress.classList.add("is-valid");
          storeAddress.classList.remove("is-invalid");

          checkObj.storeAddress = true;

        } else { // 중복 O
          messageStoreAddress.innerText= "이미 등록된 점포 주소입니다.";
          messageStoreAddress.classList.add("NotOK-feedback");
          messageStoreAddress.classList.remove("OK-feedback");

          // 인풋 요소 변화
          storeAddress.classList.add("is-invalid");
          storeAddress.classList.remove("is-valid");

          checkObj.storeAddress = false;
        }
      })
      .catch(e=> console.log(e))

  // 입력한 점포주소가 유효하지 않을 경우    
  } else {
    messageStoreAddress.innerText= "점포 주소가 형식에 맞지 않습니다.";
    messageStoreAddress.classList.add("NotOK-feedback");
    messageStoreAddress.classList.remove("OK-feedback");

    // 인풋 요소 변화
    storeAddress.classList.add("is-invalid");
    storeAddress.classList.remove("is-valid");

    checkObj.storeAddress = false;
  }

})

/* ======================================================================== */

// 회원가입 버튼 클릭 시
document.getElementById("storeInsertFrm").addEventListener("submit", e=>{

  // 점주회원번호와 점주명이 동시에 작성되거나 미작성된 경우가 아니라면
  if(checkMemberObj.memberName != checkMemberObj.memberNo){
    let str;
    str = "점주명과 점주회원번호 기입시 모두 작성해주세요.";
    
    alert(str);

    e.preventDefault(); // form 제출 X
    return;
  }

  /* checkObj의 모든 값을 검사해서
    하나라도 false이면 가입 시도 X */
  // 객체 전용 향상된 for문 (for .... in)
  for(let key in checkObj){


    // 객체에서 얻어온 값이 false인 경우
    // (유효하지 않거나 작성되지 않은 값이 있을 경우)
    if( !checkObj[key] ){

      let str;
      switch(key){
      case "storeName"   : str = "점포명이 유효하지 않습니다"; break;
      case "storeTel"    : str = "점포 전화번호가 유효하지 않습니다"; break;
      case "storeAddress": str = "점포주소가 유효하지 않습니다"; break;
      }

      alert(str);

      // key == input id 속성 값
      // 유효하지 않은 input 태그로 focus 맞춤
      document.getElementById(key).focus();

      e.preventDefault(); // form 제출 X
      return;
    }
  }
})


/* ======================================================================== */

/* 취소 버튼 작동 */

const cancelBtn = document.querySelector("#cancelBtn");

// 취소 버튼 클릭 시 input 작성내용 지우기
cancelBtn.addEventListener("click", ()=>{

  storeName.value = "";
  memberName.value = "";
  memberNo.value = "";
  storeTel.value = "";
  storeAddress.value = "";
})

//-------------------------------------------------------------------------


