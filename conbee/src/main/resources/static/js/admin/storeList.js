/* 검색창에 이전 검색어 남겨두기 */
const searchQuery = document.getElementById("searchQuery");

// 즉시 실행 함수
(()=>{

  // 주소에 있는 파라미터(쿼리스트링) 얻어오기
  const params = new URL(location.href).searchParams;

  const query = params.get("query"); // 검색어 얻어오기

  //검색한 경우
  if(query != null){
    searchQuery.value = query; // 검색어를 input에 추가
  }

})();

//=============================================================================

/* th 클릭 시 sorting되도록 */
window.addEventListener('click', e=>{
  if(e.target.dataset.sort) {table_sort(e.target); }
});

function table_sort(target){
  const $tbody = target.parentElement.parentElement.nextElementSibling;
  for(let i=0; i<$tbody.children.length; i++){
    sort_func(target);
  }
}

function sort_func(target){
  const cidx = target.cellIndex;
  const $tbody = target.parentElement.parentElement.nextElementSibling;

  // 한 행씩 다음행과의 값을 비교
  for(let i=0; i<$tbody.children.length -1; i++){
    const $curr = $tbody.children[i].children[cidx];
    const $next = $tbody.children[i + 1].children[cidx];

    let val_curr = $curr.innerText;
    let val_next = $next.innerText;

    let predi;
    switch(target.dataset.sort){
      case "str" :
        val_curr = val_curr[0].toLowerCase();
        val_next = val_next[0].toLowerCase();
        break;

      case "num" :
        val_curr = parseInt(val_curr);
        val_next = parseInt(val_next);
        break;
    }

    if(val_curr > val_next){
      $tbody.insertBefore($curr.parentElement, $next.parentElement.nextElementSibling);
    }
  }
}

