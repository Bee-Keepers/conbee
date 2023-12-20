/* 검색창에 이전 검색 기록 남겨두기 */


const choiceName = document.getElementById("choiceName");

// 즉시 실행 함수 (해석되지 마자 실행되는 함수 , 속도가 빠름)
(()=>{
  // 주소에 있는 파라미터 (쿼리스트링) 얻어오기 == ?writeName=g&cp=1
  const params = new URL (location.href).searchParams;

  const query = params.get("choiceName"); // writeName=g -> g 만 반환

  if (query != null) {

    choiceName.value = query; // 검색어를 input에 추가
  }

})();


