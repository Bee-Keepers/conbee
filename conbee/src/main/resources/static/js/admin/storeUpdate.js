
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


//-------------------------------------------------------------------------


// 점주명 유효성 검사
const memberName = document.getElementById("memberName");
const messageMemberName = document.getElementById("messageMemberName");

// 점주명 입력시 유효성 검사
memberName.addEventListener("input", ()=>{

    // 점포명이 입력되지 않은 경우
    if(memberName.value.trim().length == 0){
        memberName.value = "";

        messageMemberName.innerText = "점포명은 한글 2~8글자 이내로 작성해주세요.";
        messageMemberName.classList.remove("valid-feedback");
        messageMemberName.classList.remove("invalid-feedback");

        memberName.classList.remove("valid-feedback");
        memberName.classList.remove("invalid-feedback");

        return;
    }

    // 점주명 정규표현식
    // 한글 2~8글자
    const regEx = /^[가-힣]{2,8}$/;

    // 입력한 점주명이 유효할 경우
    if(regEx.test(memberName.value)){

        messageMemberName.innerText= "사용 가능한 점주명입니다.";
        messageMemberName.classList.add("valid-feedback");
        messageMemberName.classList.remove("invalid-feedback");

        // 인풋 요소 변화
        memberName.classList.add("is-valid");
        memberName.classList.remove("is-invalid");

    // 입력한 점주명이 유효하지 않을 경우    
    } else {
        messageMemberName.innerText= "점주명이 형식에 맞지 않습니다.";
        messageMemberName.classList.add("invalid-feedback");
        messageMemberName.classList.remove("valid-feedback");

        // 인풋 요소 변화
        memberName.classList.add("is-invalid");
        memberName.classList.remove("is-valid");
    }

})


//-------------------------------------------------------------------------


// 점주회원번호 유효성 검사
const memberNo = document.getElementById("memberNo");
const messageMemberNo = document.getElementById("messageMemberNo");

// 점주회원번호 입력시 유효성 검사
memberNo.addEventListener("input", ()=>{

    // 점주회원번호가 입력되지 않은 경우
    if(memberNo.value.trim().length == 0){
        memberNo.value = "";

        messageMemberNo.innerText = "점포회원번호는 숫자 1~5글자 이내로 작성해주세요.";
        messageMemberNo.classList.remove("valid-feedback");
        messageMemberNo.classList.remove("invalid-feedback");

        memberNo.classList.remove("valid-feedback");
        memberNo.classList.remove("invalid-feedback");

        return;
    }

    // 점주회원번호 정규표현식
    // 숫자 1~5글자
    const regEx = /^[0-9]{1,5}$/;

    // 입력한 점주번호가 유효할 경우
    if(regEx.test(memberNo.value)){

        messageMemberNo.innerText= "사용 가능한 점주회원번호입니다.";
        messageMemberNo.classList.add("valid-feedback");
        messageMemberNo.classList.remove("invalid-feedback");

        // 인풋 요소 변화
        memberNo.classList.add("is-valid");
        memberNo.classList.remove("is-invalid");

    // 입력한 점주번호가 유효하지 않을 경우    
    } else {
        messageMemberNo.innerText= "점주회원번호가 형식에 맞지 않습니다.";
        messageMemberNo.classList.add("invalid-feedback");
        messageMemberNo.classList.remove("valid-feedback");

        // 인풋 요소 변화
        memberNo.classList.add("is-invalid");
        memberNo.classList.remove("is-valid");
    }

})

//-------------------------------------------------------------------------

// 점포전화번호 유효성 검사
const storeTel = document.getElementById("storeTel");
const messageStoreTel = document.getElementById("messageStoreTel");

// 점포명 입력시 유효성 검사
storeTel.addEventListener("input", ()=>{

    // 점포명이 입력되지 않은 경우
    if(storeTel.value.trim().length == 0){
        storeTel.value = "";

        messageStoreTel.innerText = "점포 전화번호는 숫자 9~11글자 이내로 작성해주세요.";
        messageStoreTel.classList.remove("valid-feedback");
        messageStoreTel.classList.remove("invalid-feedback");

        storeTel.classList.remove("valid-feedback");
        storeTel.classList.remove("invalid-feedback");

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
                messageStoreTel.classList.add("valid-feedback");
                messageStoreTel.classList.remove("invalid-feedback");

                // 인풋 요소 변화
                storeTel.classList.add("is-valid");
                storeTel.classList.remove("is-invalid");

            } else { // 중복 O
                messageStoreTel.innerText= "이미 사용중인 점포 전화번호입니다.";
                messageStoreTel.classList.add("invalid-feedback");
                messageStoreTel.classList.remove("valid-feedback");

                // 인풋 요소 변화
                storeTel.classList.add("is-invalid");
                storeTel.classList.remove("is-valid");
            }
        })
        .catch(e=> console.log(e))

    // 입력한 점포명이 유효하지 않을 경우    
    } else {
        messageStoreTel.innerText= "점포 전화번호가 형식에 맞지 않습니다.";
        messageStoreTel.classList.add("invalid-feedback");
        messageStoreTel.classList.remove("valid-feedback");

        // 인풋 요소 변화
        storeTel.classList.add("is-invalid");
        storeTel.classList.remove("is-valid");
    }

})