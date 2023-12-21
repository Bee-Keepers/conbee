const messageName = document.getElementById("messageName");
const messageContent = document.getElementById("messageContent");
const messageDate = document.getElementById("messageDate");
const messageNoInput = document.getElementById("messageNo");


function readCheckFn(e){

  // 쪽지 번호
  const messageNo = e.previousElementSibling.value;

  messageName.innerText = e.previousElementSibling.previousElementSibling.innerText;
  messageContent.innerText = e.innerText;
  messageDate.innerText = e.nextElementSibling.innerText;


};




document.getElementById('deleteBtn').addEventListener('click', e =>{
  
  let messageNo;
  let messageNoList=[];
  const checkNotes = document.querySelectorAll(".checkNote");
  for(let checkNote of checkNotes){
    if(checkNote.checked==true){
      messageNo=checkNote.value;
      messageNoList.push(parseInt(messageNo));
      console.log(messageNoList);
    }
  }
  if(confirm("정말 삭제??")){
  
    location.href="/note/deleteNoteSent?messageNoList=" + messageNoList;

  }

});


const messageSave = document.getElementById("messageSave");

messageSave.addEventListener("click", ()=>{
  fetch("/note/save",{
    method : "PUT",
    headers : {"Content-Type" : "application/json"},
    body : messageNoInput.value
  })
  .then(resp=>resp.text())
  .then(result=>{
    if(result>0){
      alert("저장 성공");
    } else if(result == -1){
      alert("이미 저장된 메시지입니다");
    }else{
      alert("저장 안됨");
    }
  })
  .catch(e=>console.log(e));
});



