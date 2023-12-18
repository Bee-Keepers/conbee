const messageName = document.getElementById("messageName");
const messageContent = document.getElementById("messageContent");
const messageDate = document.getElementById("messageDate");


function readCheckFn(e){

  // 쪽지 번호
  const messageNo = e.previousElementSibling.value;

  // fw-bold 클래스를 가지고 있을 시 실행
  if(e.classList.contains("fw-bold")){
    fetch("/note/readCheck",{
      method : "PUT",
      headers : {"Content-Type":"application/json"},
      body : messageNo
    })
    .then(resp=>resp.text())
    .then(result=>{
      if(result > 0){
        e.classList.remove("fw-bold");
        e.classList.add("fw-light");
      }
    })
    .catch(e=>console.log(e));
  }
  messageName.innerText = e.previousElementSibling.previousElementSibling.innerText;
  messageContent.innerText = e.innerText;
  messageDate.innerText = e.nextElementSibling.innerText;


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

