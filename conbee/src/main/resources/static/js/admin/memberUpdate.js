// // 지점찾기 클릭 시 입력된 값 없는 경우 리턴
// const searchMemberIdFrm = document.getElementById("searchMemberIdFrm");

// searchMemberIdFrm.addEventListener("submit", (e)=>{

//     const searchMemberId = document.getElementById("searchMemberId");

//     // 입력된 인풋 값이 없을 경우
//     if(searchMemberId.value.trim().length == 0){
//       searchMemberId.value = "";

//         alert("회원 검색 할 아이디를 입력해주세요.");

//         e.preventDefault();
//         return;
//     }
// })

/* ***** 회원 가입 유효성 검사 ***** */
// .confirm : 초록색 / .error : 빨간색 / 아무것도 없음 : 검은색

/* 모든 입력이 유효성 검사가 진행 되었는지 체크할 객체를 생성 */
const checkObj = {
    "memberName" : false,
    "memberEmail" : false
};



// const memberTbody = document.getElementById("memberTbody");
// const memberNameInput = document.getElementById("memberName");
// const contact = document.getElementById("contact");
const searchMemberId = document.getElementById("searchMemberId");
const memberNo = document.getElementById("memberNo");


const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", ()=>{

  fetch("/admin/memberManage/memberSearch?memberId=" + searchMemberId.value)
  .then(resp=>resp.json())
  .then(member=>{
    console.log(member);
    memberName.disabled = false;
    memberName.value = member.memberName;

    memberEmail.disabled = false;
    memberEmail.value = member.memberEmail;

    memberNo.value = member.memberNo;

    if(member.storeNoList.length != 0){
      storeNo.value = member.storeNoList.toString();
    }
    departmentNoCategory.value = member.departmentNo;

    departmentNoFn(departmentNoCategory, teamNoCategory);

    // 부장 직급 생성
    if(member.gradeNo == 2){ // 임원부/점주가 아닌 경우
      const option = document.createElement("option");
      option.innerText='부장';
      option.setAttribute("value", 2);
      gradeNoCategory.append(option);
      option.selected = true;
    } else{
        setTimeout(function(){teamNoCategory.value = member.teamNo}, 150);
          
      
          // 직급 셀렉 초기화
          gradeNoCategory.innerHTML="";
      
          const option2 = document.createElement("option");
          option2.innerText = "선택";
          option2.setAttribute("value", "");
          gradeNoCategory.append(option2);
      
          // 점주, 팀장 산하 직급 생성
          if(departmentNoCategory.value == 0){ // 임원부인 경우
            const option1 = document.createElement("option");
            option1.innerText='사장';
            option1.setAttribute("value", 0);
      
            const option2 = document.createElement("option");
            option2.innerText='부사장';
            option2.setAttribute("value", 1);
      
            gradeNoCategory.append(option1, option2);
      
          } else if (departmentNoCategory.value == 5){ // 점주인 경우
            const option1 = document.createElement("option");
            option1.innerText='점주';
            option1.setAttribute("value", 6);
            gradeNoCategory.append(option1);
      
          } else {
            const option1 = document.createElement("option");
            option1.innerText='팀장';
            option1.setAttribute("value", 3);
      
            const option2 = document.createElement("option");
            option2.innerText='대리';
            option2.setAttribute("value", 4);
      
            const option3 = document.createElement("option");
            option3.innerText='사원';
            option3.setAttribute("value", 5);
      
            gradeNoCategory.append(option1, option2, option3);
          }
      
          gradeNoCategory.value = member.gradeNo;
          
    }

    

  })
  .catch(e=>console.log(e));
  checkObj.memberEmail = true;
  checkObj.memberName = true;
});







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
        fetch("/admin/memberManage/checkMemberEmail?memberEmail=" + memberEmail.value + "&memberNo=" + memberNo.value)
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









// document.addEventListener("DOMContentLoaded", function () {
//   const memberId = document.getElementById("memberId");
//   const messageMemberId = document.getElementById("messageMemberId");

//   memberId.addEventListener("input", () => {

//     if (memberId.value.trim().length == 0) {
//       memberId.value = "";

//       if (messageMemberId) {
//         messageMemberId.innerText = "아이디는 영어/숫자 포함 6~12글자 이내로 입력해주세요."
//         messageMemberId.classList.remove("OK-feedback");
//         messageMemberId.classList.remove("NotOK-feedback");
//       }

//       memberId.classList.remove("is-invalid");
//       memberId.classList.remove("is-valid");

//       checkObj.memberId = false;

//       return;
//     }

//     const regEx = /^[A-Za-z\d]{6,12}$/;

//     if (regEx.test(memberId.value)) {
//       fetch("/admin/memberManage/checkMemberId?memberId=" + memberId.value)
//         .then(response => response.text())
//         .then(result => {
//           if (result == 0) {
//             if (messageMemberId) {
//               messageMemberId.innerText = "일치하지 않는 회원입니다.";
//               messageMemberId.classList.remove("OK-feedback");
//               messageMemberId.classList.add("NotOK-feedback");
//             }

//             memberId.classList.add("is-invalid");
//             memberId.classList.remove("is-valid");

//             checkObj.memberId = false;
//           } else {
//             if (messageMemberId) {
//               messageMemberId.innerText = "일치하는 회원입니다.";
//               messageMemberId.classList.remove("NotOK-feedback");
//               messageMemberId.classList.add("OK-feedback");
//             }

//             memberId.classList.add("is-valid");
//             memberId.classList.remove("is-invalid");

//             checkObj.memberId = true;
//           }
//         })
//         .catch(e => console.log(e))
//     } else {
//       if (messageMemberId) {
//         messageMemberId.innerText = "아이디가 형식에 맞지 않습니다.";
//         messageMemberId.classList.add("NotOK-feedback");
//         messageMemberId.classList.remove("OK-feedback");
//       }

//       memberId.classList.add("is-invalid");
//       memberId.classList.remove("is-valid");

//       checkObj.memberId = false;
//     }
//   });
// });


/* ======================================================================== */

/* 취소, 확인 버튼 작동 */

// const cancelBtn = document.querySelector("#cancelBtn");
const submitBtn = document.querySelector("#submitBtn");


// 취소 버튼 클릭 시 input 작성내용 지우기
// cancelBtn.addEventListener("click", ()=>{

//   memberId.value = "";
//   memberName.value = "";
//   memberEmail.value = "";
//   return;
// })

//-------------------------------------------------------------------------

const updateForm = document.getElementById("updateForm");

/* 회원 가입 버튼이 클릭 되었을 때 */
document.getElementById("submitBtn").addEventListener("click", e => {

  /*  checkObj의 모든 값을 검사해서
      하나라도 false이면 가입 시도 X */


  // 객체 전용 향상된 for문 ( for ... in )

  for(let key in checkObj){

      // 객체에서 얻어온 값이 false 경우
      // (유효하지 않은 것이 있을 경우)
      if( !checkObj[key] ){

          let str;
          switch(key){

              case "memberName": str = "이름이 유효하지 않습니다"; break;
              
              case "memberEmail": str = "이메일이 유효하지 않습니다"; break;

          }

          alert(str);

          // key == input id 속성 값
          // 유효하지 않은 input 태그로 focus 맞춤

          e.preventDefault(); // form 제출 X
          return;
      }
  }
  updateForm.submit();
});

//-------------------------------------------------------------------------

let clickCount = 0; // 버튼 클릭 횟수 저장

const storeNoBtn = document.getElementById("storeNoBtn");

if(storeNoBtn != null){
  storeNoBtn.addEventListener("click", () => {
    clickCount += 1;
  
    if (clickCount % 2 === 0) { // 닫히기일 경우 (유효성 검사 기록 삭제)
      storeNo.disabled = true;
      storeNo.value = "";
      messageStoreNo.innerText = ""; 
      messageStoreNo.classList.remove("OK-feedback", "NotOK-feedback"); 
      storeNo.classList.remove("is-invalid", "is-valid"); 
    } else { // 열기일 경우
      storeNo.disabled = false;
    }
  });
}

/* ======================================================================== */

const departmentNoCategory = document.getElementById("departmentNo"); // 부서 셀렉
const teamNoCategory = document.getElementById("teamNo"); // 팀 셀렉
const gradeNoCategory = document.getElementById("gradeNo"); // 직급 셀렉

/* 부서 별로 달라지는 팀 리스트 불러오기 */
const departmentNoFn = (departmentNoCategory, teamNoCategory) =>{
  fetch("/admin/memberManage/teamNoList?departmentNo=" + departmentNoCategory.value)
  .then(resp => resp.json())
  .then(list => {
    
    // 조회된 팀명이 있다면
    if(list.length != 0){

      // 팀명, 팀번호 생성
      for(let team of list){
        const option = document.createElement("option");
        option.innerText = team.teamName;
        option.setAttribute("value", team.teamNo);
        teamNoCategory.append(option);
      }
    }
  })
  .catch(e => console.log(e));
};

/* 부서 클릭 시 팀 셀렉 함수호출 */
departmentNoCategory.addEventListener("change", ()=>{
  teamNoCategory.innerHTML="";
  gradeNoCategory.innerHTML="";

  // 팀 셀렉 초기화
  const option = document.createElement("option");
  option.innerText = "선택";
  option.setAttribute("value", "");
  teamNoCategory.append(option);

  // 직급 셀렉 초기화
  const option2 = document.createElement("option");
  option2.innerText = "선택";
  option2.setAttribute("value", "");
  gradeNoCategory.append(option2);


  // 부서 선택 시
  if(departmentNoCategory.value != 100){

    // 팀명 조회 함수 호출
    departmentNoFn(departmentNoCategory, teamNoCategory);

    // 부장 직급 생성
    if(departmentNoCategory.value != 0 && departmentNoCategory.value != 5){ // 임원부/점주가 아닌 경우
      const option = document.createElement("option");
      option.innerText='부장';
      option.setAttribute("value", 2);
      gradeNoCategory.append(option);
    }

    // 팀명 클릭 시
    teamNoCategory.addEventListener("change", ()=>{

      // 직급 셀렉 초기화
      gradeNoCategory.innerHTML="";

      const option2 = document.createElement("option");
      option2.innerText = "선택";
      option2.setAttribute("value", "");
      gradeNoCategory.append(option2);

      // 점주, 팀장 산하 직급 생성
      if(departmentNoCategory.value == 0){ // 임원부인 경우
        const option1 = document.createElement("option");
        option1.innerText='사장';
        option1.setAttribute("value", 0);
  
        const option2 = document.createElement("option");
        option2.innerText='부사장';
        option2.setAttribute("value", 1);
  
        gradeNoCategory.append(option1, option2);
  
      } else if (departmentNoCategory.value == 5){ // 점주인 경우
        const option1 = document.createElement("option");
        option1.innerText='점주';
        option1.setAttribute("value", 6);
        gradeNoCategory.append(option1);
  
      } else {
        const option1 = document.createElement("option");
        option1.innerText='팀장';
        option1.setAttribute("value", 3);
  
        const option2 = document.createElement("option");
        option2.innerText='대리';
        option2.setAttribute("value", 4);
  
        const option3 = document.createElement("option");
        option3.innerText='사원';
        option3.setAttribute("value", 5);
  
        gradeNoCategory.append(option1, option2, option3);
      }
    })
  }
})

/* 
// 회원 찾기 클릭 시 입력된 값 없는 경우 리턴

const searchMemberFrm = document.getElementById("searchMemberFrm");

searchMemberFrm.addEventListener("submit", (e) => {
    try {
        const searchMemberNo = document.getElementById("searchMemberNo");

        // 입력된 인풋 값이 없을 경우
        if (searchMemberNo.value.trim().length == 0) {
            searchMemberNo.value = "";

            alert("검색 할 아이디를 입력해주세요.");

            e.preventDefault();
            return;
        }
    } catch (error) {
        console.error("Error in submit event listener:", error);
    }
});
 */
/* 
const searchMemberFrm = document.getElementById("searchMemberFrm");

searchMemberFrm.addEventListener("submit", (e)=>{

    const searchMemberNo = document.getElementById("searchMemberNo");

    // 입력된 인풋 값이 없을 경우
    if(searchMemberNo.value.trim().length == 0){
      searchMemberNo.value = "";

        alert("검색 할 아이디를 입력해주세요.");

        e.preventDefault();
        return;
    }
}) */