/* 비밀번호 유효성 검사 */

// .confirm : #66B97E / .error : 빨간색 / 아무것도 없음 : 검은색

/* 모든 입력이 유효성 검사가 진행되었는지 체크할 객체를 생성 */
const checkObj = {
    "memberPw" : false,
    "memberPwCheck" : false
  };
  
  /*  비밀번호/비밀번호 확인 유효성 검사 */
  const memberPw = document.querySelector(".memberPw");
  const memberPwCheck = document.querySelector(".memberPwCheck");
  const checkMessage = document.getElementById("checkMessage");
  const submitBtn = document.getElementById("submitBtn");
  
  
  // 비밀번호 입력 시 유효성 검사
  memberPw.addEventListener("input", ()=>{
  
      // 비밀번호가 입력되지 않은 경우
      if(memberPw.value.trim().length == 0){
          memberPw.value = ""; //띄어쓰기 못넣게 하기
  
          checkMessage.innerText = "비밀번호는 영어,숫자,특수문자(!,@,#,-,_) 8~20글자 사이로 입력해주세요.";
          checkMessage.classList.remove("confirm", "error"); // 검정 글씨
  
          checkObj.memberPw = false; // 빈칸 == 유효 X
          return;
      }
  
      
      // 정규 표현식을 이용한 비밀번호 유효성 검사
  
      // 영어,숫자,특수문자(!,@,#,-,_) 8~20글자 사이
      const regEx = /^[a-zA-Z0-9\!\@\#\-\_]{8,20}$/;
  
      // 입력한 비밀번호가 유효한 경우
      if(regEx.test(memberPw.value)){
          checkObj.memberPw = true; 
          
          // 비밀번호가 유효하게 작성된 상태에서
          // 비밀번호 확인이 입력되지 않았을 때
          if(memberPwCheck.value.trim().length == 0){
  
              checkMessage.innerText = "유효한 비밀번호 형식입니다";
              checkMessage.classList.add("confirm");
              checkMessage.classList.remove("error");
          }
          
          // 비밀번호가 유효하게 작성된 상태에서
          // 비밀번호 확인이 입력되어 있을 때
          else{
              // 비밀번호 == 비밀번호 확인  (같을 경우)
              if(memberPw.value == memberPwCheck.value){
                  checkMessage.innerText = "비밀번호가 일치합니다";
                  checkMessage.classList.add("confirm");
                  checkMessage.classList.remove("error");
                  checkObj.memberPwCheck = true;
                  
              } else{ // 다를 경우
                  checkMessage.innerText = "비밀번호가 일치하지 않습니다";
                  checkMessage.classList.add("error");
                  checkMessage.classList.remove("confirm");
                  checkObj.memberPwCheck = false;
              }
          }
  
          
      } else{ // 유효하지 않은 경우
          
          checkMessage.innerText = "비밀번호 형식이 유효하지 않습니다";
          checkMessage.classList.add("error");
          checkMessage.classList.remove("confirm");
          checkObj.memberPw = false; 
      }
  })
  
  
  // 비밀번호 확인 유효성 검사
  memberPwCheck.addEventListener('input', ()=>{
  
      if(checkObj.memberPw){ // 비밀번호가 유효하게 작성된 경우에
  
          // 비밀번호 == 비밀번호 확인  (같을 경우)
          if(memberPw.value == memberPwCheck.value){
              checkMessage.innerText = "비밀번호가 일치합니다";
              checkMessage.classList.add("confirm");
              checkMessage.classList.remove("error");
              checkObj.memberPwCheck = true;
              
          } else{ // 다를 경우
              checkMessage.innerText = "비밀번호가 일치하지 않습니다";
              checkMessage.classList.add("error");
              checkMessage.classList.remove("confirm");
              checkObj.memberPwCheck = false;
          }
  
      } else { // 비밀번호가 유효하지 않은 경우
          checkObj.memberPwCheck = false;
      }
  });
  
  
  /* 비밀번호 변경 버튼이 클릭 되었을 때 */
  document.getElementById("findPw-resultFrm").addEventListener("submit", e => {
  
    /* checkObj의 모든 값을 검사해서
       하나라도 false이면 가입 시도 X */
  
    // 객체 전용 향상된 for문 (for .... in)
  
    for(let key in checkObj){
  
        // 객체에서 얻어온 값이 false인 경우
        // (유효하지 않은 것이 있을 경우)
        if( !checkObj[key] ){
  
            alert("비밀번호를 정확하게 입력해주세요.");
  
            // key == input id 속성 값
            // 유효하지 않은 input 태그로 focus 맞춤
            document.getElementById(key).focus();
  
            e.preventDefault(); // form 제출 X
            return;
        }
    }
  })
  