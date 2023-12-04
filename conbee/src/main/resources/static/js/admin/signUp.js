
/* 주소검색 API */
function sample6_execDaumPostcode() {
  new daum.Postcode({
      oncomplete: function(data) {
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
          document.getElementById("memberAddress").value = addr;
      }
  }).open();
}








/* ***** 회원 가입 유효성 검사 ***** */
// .confirm : 초록색 / .error : 빨간색 / 아무것도 없음 : 검은색

/* 모든 입력이 유효성 검사가 진행 되었는지 체크할 객체를 생성 */
const checkObj = {
    "memberId" : false,
    "memberName" : false,
    "memberEmail" : false, 
    "memberEmail" : false,
    "storeNo" : false
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

      memberName.innerText = "이름은 한글 2~8글자 이내로 입력해주세요."
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

    /* ===================== 이름 중복 검사 ======================= */
    fetch("/admin/memberManage/checkMemberId?memberName=" + memberName.value) // 
    .then(response => response.text())
    .then(result =>{

      if(result == 0){ // 중복 X
        messageMemberName.innerText= "사용 가능한 이름입니다.";
        messageMemberName.classList.add("OK-feedback");
        messageMemberName.classList.remove("NotOK-feedback");
        
        // 인풋 요소 변화
        memberName.classList.add("is-valid");
        memberName.classList.remove("is-invalid");
        
        checkObj.memberName = true;

      } else { // 이름이 올바른 형식으로 작성이 되지않았을 때
        messageMemberName.innerText= "이름이 형식에 맞지 않습니다.";
        messageMemberName.classList.add("NotOK-feedback");
        messageMemberName.classList.remove("OK-feedback");

        // 인풋 요소 변화
        memberName.classList.add("is-invalid");
        memberName.classList.remove("is-valid");

        checkObj.memberName = false;
      }
    })
    .catch(e=> console.log(e))

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
        messageMemberEmail.classList.remove("confirm", "error");

        // checkObj의 memberEmail 값을 false로 변경
        // == 이메일이 유효하지 않음을 의미
        checkObj.memberEmail = false;
        return;
    }

    // 4) 이메일 정규식 검사    /*  한글 + 영어 + 숫자 -_ */
    const regEx = /^[A-Za-z\d\-\_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;
        /* 영어 대/소 + 숫자(0~9) - _                   .으로 시작하는 아무 단어 1글자 이상  */

    // 입력 받은 이메일이 정규식과 일치하는 경우
    if( regEx.test(memberEmail.value) ){
        

        /* =========== 이메일 중복 검사(비동기) ============ */
        fetch("/admin/checkEmail?email=" + memberEmail.value)
        .then( response => response.text() )   // 첫번째 then은 응답이 왔을 때 수행, 응답 결과를 text로 파싱
        .then( result => {                     // 두번째 then은 첫번째 then의 반환된 결과를 이용해 기능 수행
            if(result == 0) { // 중복 X
              messageMemberEmail.innerText = "사용 가능한 이메일 입니다.";
              messageMemberEmail.classList.add("confirm"); // 초록색 글씨
              messageMemberEmail.classList.remove("error"); // 빨간 글씨 제거
              checkObj.memberEmail = true; // 유효한 상태임을 기록
            } else { // 중복 O
              messageMemberEmail.innerText = "이미 사용 중인 이 메일 입니다.";
              messageMemberEmail.classList.add("error"); // 빨간 글씨
              messageMemberEmail.classList.remove("confirm"); // 초록색 글씨 제거
                checkObj.memberEmail = false; // 유효한 상태임을 기록

            }
        } )                 
        .catch( e => console.log(e))
        
        
        /* ============================================= */


    }
    
    // 입력 받은 이메일이 정규식과 일치하는 않은 경우
    else { 
      messageMemberEmail.innerText = "알맞은 이메일 형식으로 작성해주세요.";
      messageMemberEmail.classList.add("error"); // 빨간 글씨
      messageMemberEmail.classList.remove("confirm"); // 초록색 글씨 제거
      checkObj.memberEmail = false; // 유효하지 않은 상태임을 기록
    }
});





