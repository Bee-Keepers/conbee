
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


//============================================================================
/* 정보 수정 유효성 검사 */

// 점포명 유효성 검사
const storeName = document.getElementById("storeName");
const messageStoreName = document.getElementById("messageStoreName");

// 점포명 입력시 유효성 검사
storeName.addEventListener("input", ()=>{

    // 점포명이 입력되지 않은 경우
    if(storeName.value.trim().length == 0){
        storeName.value = "";

        messageStoreName.innerText = "점포명은 한글, 숫자, 영어 2~10글자 / OO점 형태로 작성해주세요.";
        messageStoreName.classList.remove("valid-feedback");
        messageStoreName.classList.remove("invalid-feedback");

        storeName.classList.remove("valid-feedback");
        storeName.classList.remove("invalid-feedback");

        return;
    }

    // 점포명 정규표현식
    // 한글, 영어, 숫자 포함 2~10글자, 마지막글자는 '점'
    const regEx = /^[가-힣A-Za-z0-9]{1,9}[점]$/;

    // 입력한 점포명이 유효할 경우
    if(regEx.test(storeName.value)){

        /* ===================== 점포명 중복 검사 ======================= */
        fetch("/admin/storeManage/checkStoreName?storeName=" + storeName.value)
        .then(response => response.text())
        .then(result =>{

            if(result == 0){ // 중복 X
                messageStoreName.innerText= "사용 가능한 매장명입니다.";
                messageStoreName.classList.add("valid-feedback");
                messageStoreName.classList.remove("invalid-feedback");

                // 인풋 요소 변화
                storeName.classList.add("is-valid");
                storeName.classList.remove("is-invalid");

            } else { // 중복 O
                messageStoreName.innerText= "이미 사용중인 매장명입니다.";
                messageStoreName.classList.add("invalid-feedback");
                messageStoreName.classList.remove("valid-feedback");

                // 인풋 요소 변화
                storeName.classList.add("is-invalid");
                storeName.classList.remove("is-valid");
            }
        })
        .catch(e=> console.log(e))

    // 입력한 점포명이 유효하지 않을 경우    
    } else {
        messageStoreName.innerText= "점포명이 형식에 맞지 않습니다.";
        messageStoreName.classList.add("invalid-feedback");
        messageStoreName.classList.remove("valid-feedback");

        // 인풋 요소 변화
        storeName.classList.add("is-invalid");
        storeName.classList.remove("is-valid");
    }

})
