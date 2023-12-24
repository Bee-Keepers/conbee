const checkObj = {
    "authKey" : false,
    "authKeyMessage" : false,
    "memberEmail" : false

   
};
const checkObj2 = {
    "authKey" : false,
    "memberTel" : true,
    "memberAddress" : true
};


  



// ============================== 이메일 인증 ==============================

/* 인증번호 메일로 보내기 + DB INSERT */
const sendAuthKeyBtn = document.getElementById("sendAuthKeyBtn");
const authKeyMessage = document.getElementById("authKeyMessage");
const memberEmail = document.querySelector("#memberEmail");




/* 이메일 유효성 검사 */

// 1) 이메일 유효성 검사에 사용할 요소 모두 얻어오기

// 2) 이메일이 입력(input) 될 때 마다 유효성 검사 실행
memberEmail.addEventListener("input", () => {

    // 3) 입력된 이메일이 없을 경우
    if(memberEmail.value.trim().length == 0){
        memberEmail.value = '';
        alert("이메일을 입력해주세요");

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
const authKey = document.querySelector("#authKey");
const checkAuthKeyBtn = document.getElementById("checkAuthKeyBtn");

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
        }
    }).open();
}





// 점포전화번호 유효성 검사
const memberTel = document.getElementById("memberTel");
const messageMemberTel = document.getElementById("messageMemberTel");

// 점포전화번호 입력시 유효성 검사
memberTel.addEventListener("input", ()=>{

    // 점포명이 입력되지 않은 경우
    if(memberTel.value.trim().length == 0){
        memberTel.value = "";

        messageMemberTel.innerText = "점포 전화번호는 숫자 9~11글자 이내로 작성해주세요.";
        messageMemberTel.classList.remove("valid-feedback");
        messageMemberTel.classList.remove("invalid-feedback");

        memberTel.classList.remove("is-invalid");
        memberTel.classList.remove("is-valid");


        return;
    }

    // 점포전화번호 정규표현식
    // 숫자 9~11글자, 첫글자는 0
    const regEx = /^[0][0-9]{8,10}$/;

    // 입력한 점포전화번호가 유효할 경우
    if(regEx.test(memberTel.value)){

        /* ===================== 점포전화번호 중복 검사 ======================= */
        // fetch("/admin/storeManage/checkStoreTel?memberTel=" + memberTel.value)
        // .then(response => response.text())
        // .then(result =>{

            // if(result == 0){ // 중복 X
                messageMemberTel.innerText= "사용 가능한 점포 전화번호입니다.";
                messageMemberTel.classList.add("valid-feedback");
                messageMemberTel.classList.remove("invalid-feedback");

                // 인풋 요소 변화
                memberTel.classList.add("is-valid");
                memberTel.classList.remove("is-invalid");

                checkObj.memberTel = true;

            // } else { // 중복 O
            //     messageMemberTel.innerText= "이미 사용중인 점포 전화번호입니다.";
            //     messageMemberTel.classList.add("invalid-feedback");
            //     messageMemberTel.classList.remove("valid-feedback");

            //     // 인풋 요소 변화
            //     memberTel.classList.add("is-invalid");
            //     memberTel.classList.remove("is-valid");

            //     checkObj.memberTel = false;
            // }
        // })
        // .catch(e=> console.log(e))

    // 입력한 점포명이 유효하지 않을 경우    
    } else {
        messageMemberTel.innerText= "점포 전화번호가 형식에 맞지 않습니다.";
        messageMemberTel.classList.add("invalid-feedback");
        messageMemberTel.classList.remove("valid-feedback");

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

        return;
    }

    // 점포주소 정규표현식
    // 한글, 숫자, 띄어쓰기, -, (), ,를 포함한 10~100글자 이내의 정규표현식
    const regEx = /^[가-힣0-9\s\-\(\),]{10,100}$/;

    // 입력한 점포주소가 유효할 경우
    if(regEx.test(memberAddress.value)){

        /* ===================== 점포주소 중복 검사 ======================= */
        // fetch("/admin/storeManage/checkStoreAddress?memberAddress=" + memberAddress.value)
        // .then(response => response.text())
        // .then(result =>{

            // if(result == 0){ // 중복 X
                messageMemberAddress.innerText= "사용 가능한 점포 주소입니다.";
                messageMemberAddress.classList.add("OK-feedback");
                messageMemberAddress.classList.remove("NotOK-feedback");

                // 인풋 요소 변화
                memberAddress.classList.add("is-valid");
                memberAddress.classList.remove("is-invalid");

                checkObj.memberAddress = true;

        //     } else { // 중복 O
        //         messageMemberAddress.innerText= "이미 등록된 점포 주소입니다.";
        //         messageMemberAddress.classList.add("NotOK-feedback");
        //         messageMemberAddress.classList.remove("OK-feedback");

        //         // 인풋 요소 변화
        //         memberAddress.classList.add("is-invalid");
        //         memberAddress.classList.remove("is-valid");

        //         checkObj.memberAddress = false;
        //     }
        // })
        // .catch(e=> console.log(e))

    // 입력한 점포주소가 유효하지 않을 경우    
    } else {
        messageMemberAddress.innerText= "점포 주소가 형식에 맞지 않습니다.";
        messageMemberAddress.classList.add("NotOK-feedback");
        messageMemberAddress.classList.remove("OK-feedback");

        // 인풋 요소 변화
        memberAddress.classList.add("is-invalid");
        memberAddress.classList.remove("is-valid");

        checkObj.memberAddress = false;
    }

})



document.getElementById("profileFrm").addEventListener('submit', e => {
    
    for(let key in checkObj2){

        // 객체에서 얻어온 값이 false 경우
        // (유효하지 않은 것이 있을 경우)
        if( !checkObj2[key] ){

            let str;
            switch(key){
                case "authKey": str = "인증번호가 유효하지 않습니다"; break;
                case "memberTel": str = "전화번호가 유효하지 않습니다"; break;
                case "memberAddress": str = "주소가 유효하지 않습니다"; break;
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


