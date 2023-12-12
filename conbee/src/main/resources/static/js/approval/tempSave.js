// const approvalOne = document.querySelectorAll(".approvalOne").forEach(function(one){

//   one.addEventListener("click",function(){

//     const approvalNo = this.getAttribute('data-one-id');

//     console.log(approvalNo);

//     fetch("/approval/tempSave/selectTempData?approvalNo=" + approvalNo);
//     .then(resp=>resp.json())
//     .then((approval)=>{
//       if(member.length!=0){
  
//         for(let i of member){
//           const li = document.createElement("li");
//           li.setAttribute("value",i.memberNo);
//           li.innerText=i.memberName + "("  + (i.teamName ? i.teamName + " " : "") + i.gradeName + ")";
//           li.setAttribute("ondblclick","addLine(this)");
//           block2.append(li);
//         }
//       }
//     })
//     .catch(e=>console.log(e));
  

//   })

// })