const modal = document.getElementById("doc1");
const docOne = document.getElementById("docOne");


(()=>{

  // 기안문 정보 가져오기
  fetch("/approval/writeApproval/docWriteInfos")
  .then((resp) => {
    // console.log(resp);
    return resp.json();
  })
  .then((map) => {

    // console.log(map);
    const docWriteInfosMap = new Map(Object.entries(map));

    const infoTeams = document.querySelectorAll(".infoTeam");
    infoTeams.forEach((infoTeam)=>{
      infoTeam.innerText = docWriteInfosMap.get('infoTeam');
    })

    const infoNames = document.querySelectorAll(".infoName");
    // console.log(infoNames);
    // console.log(docWriteInfosMap.get('infoName'));
    infoNames.forEach((infoName)=>{
      infoName.innerText = docWriteInfosMap.get('infoName');
    })

    const docWriteInfos = document.querySelectorAll(".docWriteInfo");
    docWriteInfos.forEach((docWriteInfo)=>{
      docWriteInfo.innerText = docWriteInfosMap.get('infoName') + "(" + docWriteInfosMap.get('infoTeam') + ")";
    })

  })

  .catch(e => console.log(e));

})();
 



/* =========================================================== */
/* 공통 */


// 임시저장 confirm
const saveDoc = document.querySelectorAll('#saveHoliday, #saveRetirement, #saveStore, #saveExpense, #saveOrder');

saveDoc.forEach((doc)=>{
  doc.addEventListener("click",e=>{    
    const userConfirm = confirm("작성한 문서를 임시저장하시겠습니까?");
    
    if(!userConfirm){
      e.preventDefault();
      return;
    }
  })
})



/* docHoliday =============================================== */
/* 제목 입력 시 -> 템플릿 안 제목 같이 입력되기 */
const inputHoliday = document.getElementById("inputHoliday");
const inputHoliday2 = document.getElementById("inputHoliday2");

inputHoliday.addEventListener("input",e=>{
  // console.log("확인");
  const val = inputHoliday.value;
  inputHoliday2.value = val;
})

/* inputRetire =============================================== */
/* 제목 입력 시 -> 템플릿 안 제목 같이 입력되기 */
const inputRetire = document.getElementById("inputRetire");
const inputRetire2 = document.getElementById("inputRetire2");

inputRetire.addEventListener("input",e=>{
  const val = inputRetire.value;
  inputRetire2.value = val;
})

/* inputStore =============================================== */
/* 제목 입력 시 -> 템플릿 안 제목 같이 입력되기 */
const inputStore = document.getElementById("inputStore");
const inputStore2 = document.getElementById("inputStore2");

inputStore.addEventListener("input",e=>{
  const val = inputStore.value;
  inputStore2.value = val;
})

/* inputStore =============================================== */
/* 제목 입력 시 -> 템플릿 안 제목 같이 입력되기 */
const inputExpense = document.getElementById("inputExpense");
const inputExpense2 = document.getElementById("inputExpense2");

inputExpense.addEventListener("input",e=>{
  const val = inputExpense.value;
  inputExpense2.value = val;
})
