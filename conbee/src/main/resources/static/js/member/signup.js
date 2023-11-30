/* 회원가입 유효성 검사 */
// .confirm : 초록색 / .error : 빨간색

/* 모든 입력이 유효성 검사가 진행 되었는지 체크할 객체 생성 */
const checkObj = {
  "memberId" : false,
  "storeNo" : false,
  "memberPw" : false,
  "memberPwConfirm"  : false,
  "memberEmail" : false,
  "memberTel" : false,
  "storeTel" : false
};




// /* 이메일 유효성 검사 */
// const memberEmail = document.getElementById("memberEmail");
// const memberEmailMessage = document.getElementById("memberEmailMessage");

// memberEmail.addEventListener("input", () => {

//   if(memberEmail.ariaValueMax.trim().length == 0){
//     memberEmail.value = '';
//     memberEmailMessage.innerText = "수신 가능한 이메일 주소를 입력해주세요";

//     memberEmailMessage.classList.remove("confirm", "error");

//     checkObj.memberEmail = false;
//     return;
//   }

//   // 이메일 정규식 검사
//   const regEx = /^[A-Za-z\d\-\_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;

//   if( regEx.test(memberEmail.value) ) {

//     fetch





//   }


// });


