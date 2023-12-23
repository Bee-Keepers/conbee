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

  if(messageNoList.length==0){
    alert("삭제할 쪽지를 선택해주세요");
    e.preventDefault();
    return;            
  }
  if(confirm("정말 삭제??")){
  
    location.href="/note/deleteNoteSent?messageNoList=" + messageNoList;

  }

});


/* 검색 */
const sentName = document.getElementById("sentName");
const sentNameBtn = document.getElementById("sentNameBtn");

const url = new URL(location.href);
const urlParams = url.searchParams;

sentNameBtn.addEventListener("click", ()=>{
    const url = new URL(location.href);
    const urlParams = url.searchParams;
    location.href = "/note/note-sent?query=" + sentName.value;
});


/* 검색 기록 남기기 */
(()=>{
  const searchWord = urlParams.get("query"); // 검색어

  // 검색을 했을 경우
  if(searchWord !=null){
    sentName.value = searchWord; // 검색어를 input에 추가
  }
})();




