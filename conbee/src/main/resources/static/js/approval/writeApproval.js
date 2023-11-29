// 행 클릭시 체크박스 체크
const tblBody = document.getElementById("tblBody");
const tblRows = tblBody.querySelectorAll("#tblRow");

for(var i=0; i<tblRows.length; i++){
  tblRows[i].addEventListener("click",e=>{

    if(e.target.parentElement.firstElementChild.firstElementChild==null){
      var chkBox = e.target;
    }
    else{
      var chkBox = e.target.parentElement.firstElementChild.firstElementChild;
    }

    // console.log(chkBox);
    chkBox.checked = !chkBox.checked;

    clickchk(chkBox);
  })
}

/* 체크박스 하나만 클릭 가능 + 다시 클릭 시 선택 해제 코드 작성 예정 */
function clickchk(e){

  document.querySelectorAll("#chk")
  .forEach(one => one.checked = false);

  e.checked = true;
}



// =====================================================================

/* 작성 버튼 클릭 시 페이지 요청 */
const writeBtn = document.getElementById("writeBtn");
const checkboxAll = document.querySelectorAll('input[type="checkbox"]');
var checkedDoc;

writeBtn.addEventListener("click", ()=> {

  // 선택한 문서값 찾기
  checkboxAll.forEach(k => {
    if(k.checked == true){
      checkedDoc = k;
      console.log(checkedDoc.value);
    }
  })

  // 선택한 문서가 없는 경우 알림
  // 디자인 추가?
  if(checkedDoc==null){
    alert("문서를 선택해주세요");
  }

  // 팝업
  // 모달 팝업으로 수정중
  const url = `/approval/approvalDoc/${checkedDoc.value}`;
  const name = "팝업"
  const option = "width = 830, height = 940, top = 70, left = 530, location = no, resizable=no";

  window.open(url, name, option);
})
