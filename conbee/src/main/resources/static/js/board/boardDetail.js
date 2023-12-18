
const bookMark = document.querySelector("#bookMark");

// 좋아요 버튼 클릭 시(이벤트 리스너 추가)
bookMark.addEventListener("click", e => {
  


  if(!loginCheck) { // 로그인이 되어있지 않은 경우
    alert("로그인 후 이용해주세요")
    return;
  }

  // 즐겨찾기 상태 확인
  let check;

  // 즐겨찾기 (별)
  if(e.target.classList.contains("bi-star")){
    check = 0;
  } else {
    check = 1;
  }

  // 3. ajax 구문 작성

  // 1) ajax로 비동기 요청 시 전달할 데이터를 모아둔 객체
  const dataObj = {"boardNo" : boardNo , "check" : check};

  // 2) fetch() API 작성
  fetch("/board/like", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(dataObj)
  })
  .then(resp => resp.text() )
  .then(count => {
    
    if(count == -1) {
      console.log("좋아요 처리 실패")
      return;
    }

    e.target.classList.toggle("bi-star");
    e.target.classList.toggle("bi-star-fill");


    e.target.nextElementSibling.innerText = count;

  })
  .catch(e => console.log(e));
});


//--------------------------------------------------------------------
/* 목록으로 버튼 */

const goToListBtn = document.getElementById("goToListBtn");

if(goToListBtn != null) { 

  const goToListFn = () => {



    const paramMap = new URL(location.href).searchParams;

    const obj = {}; 
    obj.cp = paramMap.get("cp"); 
    obj.key = paramMap.get("key"); 
    obj.query = paramMap.get("query"); 


   
    const tempParams = new URLSearchParams();

    for(let key in obj){ 
      if(obj[key] != null) tempParams.append(key, obj[key]);
    }

    location.href = `/board/boardList/${boardCodeNo}${tempParams.toString()}`;

  }


  goToListBtn.addEventListener("click", goToListFn);

}

// ---------------------------------------------------------------------

/* 게시글 삭제 */
const deleteBtn = document.getElementById("deleteBtn");


if(deleteBtn != null) {

  deleteBtn.addEventListener("click", () => {

   
    if(confirm("삭제 하시겠습니까?") ){


      location.href
        = location.pathname.replace("board", "board") + "/delete";

    }
  });
}

// --------------------------------------------------------------------------



