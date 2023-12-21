const messageName = document.getElementById("messageName");
const messageContent = document.getElementById("messageContent");
const messageDate = document.getElementById("messageDate");


function readCheckFn(e){

  // 쪽지 번호
  const messageNo = e.previousElementSibling.value;

  messageName.innerText = e.previousElementSibling.previousElementSibling.innerText;
  messageContent.innerText = e.innerText;
  messageDate.innerText = e.nextElementSibling.innerText;


};

