/* ======================================================================== */
/* 프로필 이미지 */

const memberProfile = document.getElementById("memberProfile");
let imageInput = document.getElementById("imageInput");
const deleteImg = document.getElementById("deleteImage");

// 변경 x : -1
// 있다가 없어짐 : 0
// 새 이미지 : 1
let statusCheck = -1;

// 백업
let backupInput;

if (imageInput != null) {

  // 이미지 변경 함수
  const changeImageFn = e => {

    const uploadFile = e.target.files[0];

    // ============ 파일 선택 -> 취소 ============
    if (uploadFile == undefined) {

      // 백업 요소 복제
      const temp = backupInput.cloneNode(true);

      // temp로 바꾸기
      imageInput.after(temp);
      imageInput.remove();
      imageInput = temp;

      imageInput.addEventListener("change", changeImageFn);

      return;
    }

    // ============ 파일 크기 초과 ============
    const maxSize = 1024 * 1024 * 5; // 1MB


    if (uploadFile.size > maxSize) {
      console.log(uploadFile.size);
      alert("5MB 이하의 이미지만 업로드 가능합니다");

      if (statusCheck == -1) { // 변경x
        imageInput.value = '';
        statusCheck = -1;
      }
      else { // 기존 이미지 o

        const temp = backupInput.cloneNode(true);

        imageInput.after(temp);
        imageInput.remove();
        imageInput = temp;

        imageInput.addEventListener("change", changeImageFn);

        statusCheck = 1;
      }

      return;

    }

    // ============ 미리보기 ============

    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);

    reader.onload = e => {

      console.log("이미지 로드");

      memberProfile.setAttribute("src", reader.result);
      statusCheck = 1;

      // 백업하기
      backupInput = imageInput.cloneNode(true);

    }
  }

  // ============ 이미지 선택 변경 ============
  imageInput.addEventListener("change", changeImageFn);

  // ============ x버튼 클릭시 기본이미지 변경 ============

  deleteImg.addEventListener("click", () => {

    memberProfile.setAttribute("src", defaultImage);

    imageInput.value = "";
    if (backupInput != undefined) {
      backupInput.value = "";
    }

    statusCheck = 0;
  })

  const profileImgFrm = document.getElementById("profileImgFrm");

  profileImgFrm.addEventListener("submit", e => {

    let flag = true;

    if (loginMemberProfileImg != null && statusCheck == 0) flag = false;

    if (loginMemberProfileImg == null && statusCheck == 1) flag = false;

    if (loginMemberProfileImg != null && statusCheck == 1) flag = false;

    if (flag) {
      console.log(statusCheck);
      console.log(loginMemberProfileImg == null);
      e.preventDefault();
      alert("이미지 변경 후 클릭해주세요");
    }

  });


}
/* ======================================================================== */
/* 정보 등록 유효성 검사 */

const checkObj = {
  "memberEmail": true,
  "memberTel": true,
  "inputAddress": true,
  "authKey" : true
};





/* 주소 */
function searchAddress() {
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
      document.getElementById('inputAddress').value = `${data.zonecode} ${addr} `;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("inputAddress").focus();

      messageMemberAddress.innerText = "유효한 주소입니다";
      document.getElementById("inputAddress").classList.add("is-valid");
      document.getElementById("inputAddress").classList.remove("is-invalid");
      checkObj.inputAddress = true;

    }
  }).open();
}






/* 인증번호 메일로 보내기 + DB INSERT */
const sendAuthKeyBtn = document.getElementById("sendAuthKeyBtn");
const authKeyMessage = document.getElementById("authKeyMessage");
const memberEmail = document.querySelector("#memberEmail");



/* 이메일 유효성 검사 */

// 2) 이메일이 입력(input) 될 때 마다 유효성 검사 실행
memberEmail.addEventListener("input", () => {
  checkObj.memberEmail = false;
  checkObj.authKey = false;

  // 3) 입력된 이메일이 없을 경우
  if (memberEmail.value.trim().length == 0) {
    memberEmail.value = '';
    checkObj.memberEmail = false;
    checkObj.authKey = false;
    memberEmail.classList.remove("is-valid");
    memberEmail.classList.remove("is-invalid");
    return;
  }

  // 4) 이메일 정규식 검사    /*  한글 + 영어 + 숫자 -_ */
  const regEx = /^[A-Za-z\d]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;
  /* 영어 대/소 + 숫자(0~9)                   .으로 시작하는 아무 단어 1글자 이상  */

  // 입력 받은 이메일이 정규식과 일치하는 경우
  if (regEx.test(memberEmail.value)) {


    /* =========== 이메일 중복 검사(비동기) ============ */
    fetch("/myPage/checkmyPageEmail?memberEmail=" + memberEmail.value)
      .then(response => response.text())   // 첫번째 then은 응답이 왔을 때 수행, 응답 결과를 text로 파싱
      .then(result => {                     // 두번째 then은 첫번째 then의 반환된 결과를 이용해 기능 수행
        if (result == 0) { // 중복 X
          memberEmail.classList.add("is-valid");
          memberEmail.classList.remove("is-invalid");

          checkObj.memberEmail = true; // 유효한 상태임을 기록

        } else { // 중복 O
          memberEmail.classList.add("is-invalid");
          memberEmail.classList.remove("is-valid");

          checkObj.memberEmail = false; // 유효한 상태임을 기록
          checkObj.authKey = false;
        }
      })
      .catch(e => console.log(e))

    /* ============================================= */

  }

  // 입력 받은 이메일이 정규식과 일치하는 않은 경우
  else {
    memberEmail.classList.add("is-invalid");
    memberEmail.classList.remove("is-valid");

    checkObj.memberEmail = false;
    checkObj.authKey = false;
  }
});





// 인증번호 보내기 버튼을 클릭하면
// authKeyMessage에 5분 타이머를 출력 
let authTimer;
let authMin = 4;
let authSec = 59;

// 인증번호를 보낸 이메일을 저장할 변수
let tempEmail;


// 인증번호 받기 버튼 클릭 시
sendAuthKeyBtn.addEventListener("click", function () {

  // 유효하지 않은 이메일인 경우
  if (!checkObj.memberEmail) {
    alert("수정할 이메일을 입력해주세요");
    return;
  }


  authMin = 4;
  authSec = 59;

  checkObj.authKey = false;
  /* if(checkObj.memberEmail){ */ // 중복이 아닌 이메일인 경우


  /* fetch() API - POST방식, 단일 데이터 요청 */
  fetch("/email/authKey", {
    method: "POST",
    headers: { "Content-Type": "application/text" },
    body: memberEmail.value // 전달되는 데이터가 한 개
  })
    .then(resp => resp.text())
    .then(result => {
      if (result > 0) {
        console.log("인증 번호가 발송되었습니다.")
        tempEmail = memberEmail.value;
      } else {
        console.log("인증번호 발송 실패")
      }
    })
    .catch(err => {
      console.log("이메일 발송 중 에러 발생");
      console.log(err);
    });


  alert("인증번호가 발송 되었습니다.");


  authKeyMessage.innerText = "05:00";
  authKeyMessage.classList.remove("confirm");

  authTimer = window.setInterval(() => {

    authKeyMessage.innerText = "0" + authMin + ":" + (authSec < 10 ? "0" + authSec : authSec);

    // 남은 시간이 0분 0초인 경우
    if (authMin == 0 && authSec == 0) {
      checkObj.authKey = false;
      clearInterval(authTimer);
      return;
    }

    // 0초인 경우
    if (authSec == 0) {
      authSec = 60;
      authMin--;
    }


    authSec--; // 1초 감소

  }, 1000)

  // } else{
  //     alert("중복되지 않은 이메일을 작성해주세요.");
  //     memberEmail.focus();
  // }
});



/* 인증번호 확인 */
const authKey = document.querySelector("#authKey");
const checkAuthKeyBtn = document.getElementById("checkAuthKeyBtn");

checkAuthKeyBtn.addEventListener("click", function () {

  if (authMin > 0 || authSec > 0) { // 시간 제한이 지나지 않은 경우에만 인증번호 검사 진행
    /* fetch API */
    const obj = { "inputKey": authKey.value, "email": tempEmail }


    fetch("/email/checkAuthKey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj)
    })
      .then(resp => resp.text())
      .then(result => {
        if (result > 0) {
          clearInterval(authTimer);
          authKeyMessage.innerText = "인증되었습니다.";
          checkObj.authKey = true;
          authKey.classList.add("is-valid");
          authKey.classList.remove("is-invalid");
          
          authKey.readOnly = true;
          memberEmail.readOnly = true;
        } else {
          alert("인증번호가 일치하지 않습니다.")
          authKey.classList.add("is-invalid");
          authKey.classList.remove("is-valid");
          checkObj.authKey = false;
        }
      })
      .catch(err => console.log(err));


  } else {
    alert("인증 시간이 만료되었습니다. 다시 시도해주세요.")
  }

});






/* 전화번호 */
const memberTel = document.getElementById("memberTel");

// 점포전화번호 입력시 유효성 검사
memberTel.addEventListener("input", () => {

  // 점포전화번호가 입력되지 않은 경우
  if (memberTel.value.trim().length == 0) {
    memberTel.value = "";
    memberTel.classList.remove("is-valid");
    memberTel.classList.remove("is-invalid");
    checkObj.memberTel = false;
    return;
  }

  // 점포전화번호 정규표현식
  // 숫자 9~11글자, 첫글자는 0
  const regEx = /^[0][0-9]{8,10}$/;

  // 입력한 점포전화번호가 유효할 경우
  if (regEx.test(memberTel.value)) {

    /* ===================== 점포전화번호 중복 검사 ======================= */
    fetch("/myPage/checkMemberTel?memberTel=" + memberTel.value)
      .then(response => response.text())
      .then(result => {

        if (result == 0) { // 중복 X
          // 인풋 요소 변화
    /* The above code is setting the font size of an element with the id "messageMemberTel" to 16
    pixels. */
          messageMemberTel.style.fontSize = "16px";
          messageMemberTel.innerText = "유효한 전화번호 입니다.";
          memberTel.classList.add("is-valid");
          memberTel.classList.remove("is-invalid");

          checkObj.memberTel = true;

        } else { // 중복 O
          // 인풋 요소 변화
          messageMemberTel.style.fontSize = "16px";
          messageMemberTel.innerText = "중복된 전화번호 입니다.";
          memberTel.classList.add("is-invalid");
          memberTel.classList.remove("is-valid");

          checkObj.memberTel = false;
        }
      })
      .catch(e => console.log(e))

    // 입력한 점포명이 유효하지 않을 경우    
  } else {
    messageMemberTel.style.fontSize = "16px";
    messageMemberTel.innerText = "전화번호는 숫자 9~11글자 이내로 작성해주세요.";
    // 인풋 요소 변화
    memberTel.classList.add("is-invalid");
    memberTel.classList.remove("is-valid");

    checkObj.memberTel = false;
  }

})


//-------------------------------------------------------------------------

// 주소 유효성 검사
const inputAddress = document.getElementById("inputAddress");

// 주소 입력시 유효성 검사
inputAddress.addEventListener("input", () => {

  // 주소가 입력되지 않은 경우
  if (inputAddress.value.trim().length < 15) {
    inputAddress.value = "";
    messageMemberAddress.style.fontSize = "16px";
    messageMemberAddress.innerText = "주소를 입력해주세요";
    inputAddress.classList.add("is-invalid");
    inputAddress.classList.remove("is-valid");

    checkObj.inputAddress = false;
    return;
  } else{

    inputAddress.classList.add("is-valid");
    inputAddress.classList.remove("is-invalid");

    checkObj.inputAddress = true;

  }

})



/* 회원 정보 수정 제출 시 */
document.getElementById("myPageFrm").addEventListener("submit", e => {

  /* for...of(객체용 향상된 for문) */
  for(let key in checkObj){

    if( !checkObj[key] ){ // 유효하지 않은 값이 있을 경우
      let str;
      switch(key){
        case 'memberEmail' : str = "이메일이 유효하지 않습니다"; break;
        case 'memberTel' : str = "전화번호가 유효하지 않습니다"; break;
        case 'inputAddress' : str = "주소가 유효하지 않습니다"; break;
        case 'authKey' : str = "이메일이 인증되지 않았습니다"; break;
      }

      alert(str);

      document.getElementById(key)

      e.preventDefault(); // form 제출 막기

      return;

    }
  }

})


/* 이전 값이 작성되어 있을 경우 */
document.addEventListener("DOMContentLoaded", () => {
  if(inputAddress.value.length != 0) checkObj.inputAddress = true;
  if(memberTel.value.length != 0) checkObj.memberTel = true;
  if(memberEmail.value.length != 0){
    checkObj.memberEmail = true;
    checkObj.authKey = true;
  } 
});