const checkObj = {
    "authKey" : false,
    "authKeyMessage" : false,
    "memberEmail" : false
};
const checkObj2 = {
    "authKey" : false
};

// ============================== 이메일 인증 ==============================

/* 인증번호 메일로 보내기 + DB INSERT */
const sendAuthKeyBtn = document.getElementById("sendAuthKeyBtn");
const authKeyMessage = document.getElementById("authKeyMessage");
const memberEmail = document.querySelector(".memberEmail");
const findPwFrm = document.getElementById("findPw-Frm");



/* 이메일 유효성 검사 */

// 1) 이메일 유효성 검사에 사용할 요소 모두 얻어오기

// 2) 이메일이 입력(input) 될 때 마다 유효성 검사 실행
memberEmail.addEventListener("input", () => {

    // 3) 입력된 이메일이 없을 경우
    if(memberEmail.value.trim().length == 0){
        memberEmail.value = '';

        // checkObj의 memberEmail 값을 false로 변경
        // == 이메일이 유효하지 않음을 의미
        checkObj.memberEmail = false;
        return;
    } else {
        checkObj.memberEmail = true;
        
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
sendAuthKeyBtn.addEventListener("click", function(){
    authMin = 4;
    authSec = 59;

    checkObj.authKey = false;
    checkObj2.authKey = false;

    if(!checkObj.memberEmail) {
        alert("이메일을 입력해주세요");
        return;
    }

    /* if(checkObj.memberEmail){ */ // 중복이 아닌 이메일인 경우


        /* fetch() API - POST방식, 단일 데이터 요청 */
        fetch("/email/authKey", {
            method : "POST",
            headers : {"Content-Type" : "application/text"},
            body : memberEmail.value // 전달되는 데이터가 한 개
        })
        .then(resp => resp.text())
        .then(result => {
            if(result > 0){
                console.log("인증 번호가 발송되었습니다.")
                tempEmail = memberEmail.value;
            }else{
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

        authTimer = window.setInterval(()=>{

            authKeyMessage.innerText = "0" + authMin + ":" + (authSec<10 ? "0" + authSec : authSec);
            
            // 남은 시간이 0분 0초인 경우
            if(authMin == 0 && authSec == 0){
                checkObj.authKey = false;
                checkObj2.authKey = false;
                clearInterval(authTimer);
                return;
            }

            // 0초인 경우
            if(authSec == 0){
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
const authKey = document.querySelector(".authKey");
const checkAuthKeyBtn = document.getElementById("checkAuthKeyBtn");
const submitBtn = document.getElementById("submitBtn");

checkAuthKeyBtn.addEventListener("click", function(){

    if(authMin > 0 || authSec > 0){ // 시간 제한이 지나지 않은 경우에만 인증번호 검사 진행
        /* fetch API */
        const obj = {"inputKey":authKey.value, "email":tempEmail}


        fetch("/email/checkAuthKey",  {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(obj)
        })
        .then(resp => resp.text())
        .then(result => {
            if(result > 0){
                clearInterval(authTimer);
                authKeyMessage.innerText = "인증되었습니다.";
                checkObj.authKey = true;
                checkObj2.authKey = true;

                authKey.disabled = true;
            } else{
                alert("인증번호가 일치하지 않습니다.")
                checkObj.authKey = false;
                checkObj2.authKey = false;
            }
        })
        .catch(err => console.log(err));


    } else{
        alert("인증 시간이 만료되었습니다. 다시 시도해주세요.")
    }

});

findPwFrm.addEventListener('submit', e => {
    
    for(let key in checkObj2){

        // 객체에서 얻어온 값이 false 경우
        // (유효하지 않은 것이 있을 경우)
        if( !checkObj2[key] ){

            let str;
            switch(key){
                case "authKey": str = "인증번호가 유효하지 않습니다"; break;
            }

            alert(str);

            // key == input id 속성 값
            // 유효하지 않은 input 태그로 focus 맞춤
            document.querySelector(`.${key}`).focus();

            e.preventDefault(); // form 제출 X
            return;
        }
    }
});













