const messageName = document.getElementById("messageName");
const messageContent = document.getElementById("messageContent");
const messageDate = document.getElementById("messageDate");
const messageNoInput = document.getElementById("messageNo");

// 쪽지가 클릭 될 때 읽음으로 변경
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
      console.log(result);
      if(result > 0){
        e.classList.remove("fw-bold");
        e.classList.add("fw-light");

        noteBadges.forEach(noteBadge => {
          noteBadge.classList.remove("d-none");
          noteBadge.innerText = result;
        });

        if (result > 99) {
          noteBadges.forEach(noteBadge => {
            noteBadge.innerText = "99+";
          });
        }
      } else {
        e.classList.remove("fw-bold");
        e.classList.add("fw-light");
        noteBadges.forEach(noteBadge => {
          noteBadge.classList.add("d-none");
        });
      }
    })
    .catch(e=>console.log(e));
  }
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

  if(confirm("정말 삭제하시겠습니까??")){
  
    location.href="/note/deleteNoteReceive?messageNoList=" + messageNoList;

  }

});


/* 검색 */
const receiveName = document.getElementById("receiveName");
const receiveNameBtn = document.getElementById("receiveNameBtn");

const url = new URL(location.href);
const urlParams = url.searchParams;

receiveNameBtn.addEventListener("click", ()=>{
    const url = new URL(location.href);
    const urlParams = url.searchParams;
    location.href = "/note/note-receive?query=" + receiveName.value;
});


/* 검색 기록 남기기 */
(()=>{
  const searchWord = urlParams.get("query"); // 검색어

  // 검색을 했을 경우
  if(searchWord !=null){
    receiveName.value = searchWord; // 검색어를 input에 추가
  }
})();