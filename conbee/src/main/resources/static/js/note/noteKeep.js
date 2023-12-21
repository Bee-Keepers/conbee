const messageName = document.getElementById("messageName");
const messageContent = document.getElementById("messageContent");
const messageDate = document.getElementById("messageDate");
const messageNoInput = document.getElementById("messageNo");

// 쪽지가 클릭 될 때 읽음으로 변경
function readCheckFn(e){

  // 쪽지 번호
  const messageNo = e.previousElementSibling.value;

  messageName.innerText = e.previousElementSibling.previousElementSibling.innerText;
  messageContent.innerText = e.innerText;
  messageDate.innerText = e.nextElementSibling.innerText;
  messageNoInput.value = messageNo;

};

/* 전체 체크하기 */
document.getElementById("checkAll").addEventListener("change",e=>{
  document.querySelectorAll(".checkNote").forEach((item)=>{item.checked=e.target.checked})
});

/* 체크가 하나라도 해제되면 전체체크 해제 */

document.querySelectorAll(".checkNote").forEach((item)=>{
  item.addEventListener("change", e=>{
    if(!e.target.checked){
      document.getElementById("checkAll").checked = false;
    }
  })
})