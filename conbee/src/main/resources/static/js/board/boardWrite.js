const boardTitle = document.getElementById('boardTitle');
const boardContent = document.querySelector('.boardContent');
const saveBtn = document.querySelector('.saveBtn');

/* 제출 시 유효성 검사 */
const boardWriteFrm = document.getElementById("boardWriteFrm");
boardWriteFrm.addEventListener("submit", e => {

  const title = document.querySelector("[name='boardTitle']");
  const content = document.querySelector("[name='boardContent']");
  
  // 제목 미입력 상태
  if(title.value.trim().length == 0){ 
    alert("제목을 입력해주세요");
    
    e.preventDefault(); // form 제출 못하게 막기
    title.value="";  // 공백 제거
    title.focus();   // 타이틀로 커서(포커스) 이동

    return;
  }

  // 내용 미입력 상태
  if(content.value.trim().length == 0){ 
    alert("내용을 입력해주세요");
    
    e.preventDefault(); // form 제출 못하게 막기
    content.value="";  // 공백 제거
    content.focus();   // 콘텐트로 커서(포커스) 이동
    return;
  }

});
