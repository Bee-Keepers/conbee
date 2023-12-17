/* 문서함에서 가장 위에 있는 체크박스 선택 시 같은 페이지에 있는 모든 체크박스 선택되도록 */
// const checkAll = document.getElementById("checkAll"); // 제일 위 체크박스
// const checkboxes = document.querySelectorAll('input[type="checkbox"]'); // 전체 체크박스들

// checkAll.addEventListener("change", ()=>{

//   // 전체 체크박스가 체크된 경우
//   if(checkAll.checked){
//     for(let check of checkboxes){
//       check.checked = true;
//     }
//     return;

//   // 전체 체크박스가 해제된 경우
//   } else {
//     for(let check of checkboxes){
//       check.checked = false;
//     }
//   }
// })


//클릭시 체크박스 체크기능 함수
// function handleClick(e) {
//   let target = e.target;

//   // 클릭한 요소가 'approvalTitle' 클래스를 가진 td인 경우, 체크박스인경우, a태그인경우 리턴
//   if (target.tagName === 'INPUT' || target.closest('td').classList.contains('approvalTitle')
//    || target.tagName ==='A' || target === checkAll) {
//     return;
//   }

//   let checkbox = target.closest('tr').querySelector('input[type=checkbox]');

//   checkbox.checked = !checkbox.checked;
// }

