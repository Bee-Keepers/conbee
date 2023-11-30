/* ---------------- 로그인 ---------------- */

/* 로그인 기능 */

// 쿠키 얻어오기 함수
// function 함수명(){} // 함수 정의

// 변수에 함수 대입 (==변수로 인식)
// - 해당 변수가 해석될 때 까지 변수에 대입된 함수 호출 불가
const getCookie = (key)=>{

  // 현재 존재하는 모든 쿠키를 얻어옴
  const cookies = document.cookie; // 'testCookie=테스트; saveId=member01@naver.com'

  // 배열.map(()=>{}) : 배열 내 요소를 하나씩 순차접근 후
  //  함수 수행 후 반환되는 결과를 새로운 배열에 담아서 반환

  // cookies 문자열을 '; ' 구분자로 해서 배열 생성 후
  // map을 이용해서 cookies의 요소를 '='로 나누어 2차원 배열 생성
  const list = cookies.split('; ').map(entry => entry.split('='));

  // list를 JS 객체로 옮겨 담기
  const obj = {}; // 비어있는 객체 생성

  for(let i=0; i<list.length; i++){
      obj[ list[i][0] ] = list[i][1];
  }

  return obj[key];
  } 


  // 쿠키에 saveId가 있을 경우
  // 이메일 input 태그에 value로 추가
  // + 아이디 저장 체크박스가 체크 되어있게 하기
  const memberId = document.querySelector("input[name='memberId']");
  const saveId = document.querySelector("input[name='saveId']");

  // 화면에 이메일 input, 체크 박스가 있을 경우
  if(memberId != null && saveId != null){

  // 쿠키에서 key가 "saveId"인 요소의 값을 얻어옴
  const id = getCookie('saveId');

  // saveId가 있을 경우
  if(id != undefined){
      memberId.value = id; // input 값 대입
      saveId.checked = true; // 체크
  }
}
























/* 빠른 로그인 기능 */
const quickLogin = document.getElementById("quickLogin");

quickLogin.addEventListener("click", ()=>{

  location.href = "/member/login/admin";

});