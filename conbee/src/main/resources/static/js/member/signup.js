
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
          document.getElementById("storeAddress").value = addr;
      }
  }).open();
}





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




/* 이메일 유효성 검사 */
const memberEmail = document.getElementById("memberEmail");
const memberEmailMessage = document.getElementById("memberEmailMessage");

memberEmail.addEventListener("input", () => {

  if(memberEmail.ariaValueMax.trim().length == 0){
    memberEmail.value = '';
    memberEmailMessage.innerText = "수신 가능한 이메일 주소를 입력해주세요";

    memberEmailMessage.classList.remove("confirm", "error");

    checkObj.memberEmail = false;
    return;
  }

  // 이메일 정규식 검사
  const regEx = /^[A-Za-z\d\-\_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;

  if( regEx.test(memberEmail.value) ) {

    /* ==== 이메일 중복 검사 ==== */
    fetch("/")





  }


});


