/* 주소록 버튼 */
const noteTbody = document.getElementById("noteTbody");
const memberNameInput = document.getElementById("memberName");
const searchBtn = document.getElementById("searchBtn");
const contact = document.getElementById("contact");
const memberEmail = document.getElementById("memberEmail");
const memberNoReciplent = document.getElementById("memberNoReciplent");

const myModal = new bootstrap.Modal('#exampleModal', {
  keyboard: false
})

searchBtn.addEventListener("click", ()=>{
  console.log(memberNameInput.value);
  fetch("/note/name-search?memberName=" + memberNameInput.value)
  .then(resp=>resp.json())
  .then(memberList=>{
    console.log(memberList);
    for(let member of memberList){
      const tr = document.createElement("tr");

      const td1 = document.createElement("td");
      td1.innerText = member.memberNo;

      const td2 = document.createElement("td");
      td2.innerText = member.memberName;

      const td3 = document.createElement("td");
      td3.innerText = member.memberEmail;

      const td4 = document.createElement("td");
      td4.innerText = member.departmentName;
      
      const td5 = document.createElement("td");
      const button = document.createElement("button");
      button.classList.add("btn", "btn-warning")
      button.innerText = "선택";
      button.addEventListener("click", ()=>{
        contact.value = member.memberName;
        memberEmail.value = member.memberEmail;
        memberNoReciplent.value = member.memberNo;

        myModal.hide();


      });
      td5.append(button);

      tr.append(td1, td2, td3, td4, td5);
      noteTbody.append(tr);
      
    }
  })
  .catch(e=>console.log(e));
});

/* 쪽지 보내기 */

document.getElementById('notego').addEventListener('submit', function(e){

  // 유효성 검사
  // e.preventDefault();











  
  // var formData = new FormData(this);

  // fetch('/notesent',{
  //   method:'POST',
  //   body:formData
  // })

  // .then(response => {
  //     if(response.ok) {
  //       window.location.href='/note-sent';
  //     }else{
  //       alert('쪽지 전송에 실패했습니다.');
  //     }
  // })
  // .catch(error => {
  //   console.error('Error',error);


  // });

});

