const storeSearch = document.getElementById("storeSearch");
const storeSelect = document.getElementById("storeSelect");
// 요소 생성 코드
// createElement("input",{type:"text", name:"inputId"},["test", "aaa"])
function createElement(tag, obj, classList){
    const element = document.createElement(tag);
  
    for(let key in obj){
      element.setAttribute(key, obj[key]);
    }
    for(let clas of classList){
      element.classList.add(clas);
    }
    return element;
  };
// 지점 이름으로 검색
storeSearch.addEventListener("change", e=>{

    fetch("/revenueManage/storeSearch?inputStoreName=" + e.target.value)
    .then(resp=>resp.json())
    .then(list=>{
        storeSelect.innerHTML = "";
        console.log(list);
        if(list.length == 0){
            storeSelect.innerText = "검색된 지점이 없습니다.";
        } else{
            for(let opt of list){
                const option = document.createElement("option");
                option.value = opt.storeNo;
                option.innerText = opt.storeName;
                storeSelect.append(option);
            }
        }
    })
    .catch(e=>console.log(e));
});
$('.input-daterange')
    .datepicker({
        format: 'yyyy-mm-dd', //데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
        autoclose: true, //사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
        templates: {
        leftArrow: '&laquo;',
        rightArrow: '&raquo;',
        }, //다음달 이전달로 넘어가는 화살표 모양 커스텀 마이징
        showWeekDays: true, // 위에 요일 보여주는 옵션 기본값 : true
        todayHighlight: true, //오늘 날짜에 하이라이팅 기능 기본값 :false
        toggleActive: true, //이미 선택된 날짜 선택하면 기본값 : false인경우 그대로 유지 true인 경우 날짜 삭제
        language: 'ko', //달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.
        todayBtn: "linked"
    })
    .on('changeDate', function (e) {
        /* 이벤트의 종류 */
        //show : datePicker가 보이는 순간 호출
        //hide : datePicker가 숨겨지는 순간 호출
        //clearDate: clear 버튼 누르면 호출
        //changeDate : 사용자가 클릭해서 날짜가 변경되면 호출 (개인적으로 가장 많이 사용함)
        //changeMonth : 월이 변경되면 호출
        //changeYear : 년이 변경되는 호출
        //changeCentury : 한 세기가 변경되면 호출 ex) 20세기에서 21세기가 되는 순간

        // e.date를 찍어보면 Thu Jun 27 2019 00:00:00 GMT+0900 (한국 표준시) 위와 같은 형태로 보인다.
});
$('.input-daterange input').datepicker('setDate', new Date());

// 상세검색 제출 버튼
const revenueSearchBtn = document.getElementById("revenueSearchBtn");
const revenueSearchForm = document.getElementById("revenueSearchForm");
const storeNoSelect = document.getElementById("storeNoSelect");
const floatingPrice = document.getElementById("floatingPrice");

revenueSearchBtn.addEventListener("click", ()=>{
   console.log(storeSelect.value);
   if(storeSelect.value == -1){
      alert("지점을 선택해주세요");
      return;
   }
   if(floatingPrice.value == ""){
      floatingPrice.value = 0;
  }
    revenueSearchForm.submit();
});

const lcategorySelect = document.getElementById("lcategorySelect");
const scategorySelect = document.getElementById("scategorySelect");

// 검색 창 모달에서 대분류 선택 시 대분류 안에있는 소분류 불러오기
lcategorySelect.addEventListener("change", ()=>{
   scategorySelect.innerHTML = "";
   const option = document.createElement("option");
   option.innerText = "선택";
   option.setAttribute("value", "");
   scategorySelect.append(option);
   if(lcategorySelect.value != ""){
      fetch(
         "/stockManage/scategoryList?lcategory=" + lcategorySelect.value
      )
      .then(resp=>resp.json())
      .then(list=>{
         if(list.length != 0){
            for(let scategory of list){
               const option = document.createElement("option");
               option.innerText = scategory;
               scategorySelect.append(option);
            }
         }
      })
      .catch(e=>console.log(e));
   }
});

// 지점 선택 옵션 저장
const url = new URL(location.href);
const urlParams = url.searchParams;

const options = document.querySelectorAll("#storeNoSelect>option");
for(let option of options){
    if(option.value == urlParams.get("storeNo")){
        option.selected = true;
        break;
    }
}

const startDate = document.querySelector("input[name='startDate']");
const endDate = document.querySelector("input[name='endDate']");

if(document.getElementById("startDate") != null){
    startDate.value = document.getElementById("startDate").innerText;
    endDate.value = document.getElementById("endDate").innerText;
}

// 무한 스크롤

const urlSearch = url.search;
const tableTbody = document.getElementById("tableTbody");

// cp 선언
let cp = 1;

// cp 하나 씩 증가하는 함수 생성
const cpFn = ()=>{
   cp += 1;
};

// 무한 스크롤 작동 함수
let callback = (entries, observer) => {
   entries.forEach(entry => {
    // 타겟 요소가 루트 요소와 교차하는 점이 없으면 콜백을 호출했으되, 조기에 탈출한다.
    if (entry.intersectionRatio <= 0) return
 
    // 혹은 isIntersecting을 사용할 수 있습니다.
    if (!entry.isIntersecting) return
 
    // ... 콜백 로직

    // cp 증가
    cpFn();

    // 요청 주소 설정
   let params;
   if(urlSearch == ""){
      params = "?cp=" + cp;
   } else{
      params = urlSearch + "&cp=" + cp;
   }
   fetch("/revenueManage/historyListAjax"+ params)
   .then(resp=>resp.json())
   .then(list=>{

      if(list.length == 0){
         observer.disconnect();
      }
      for(let goods of list){
         const tr = createElement("tr",null,[]);

         const td1 = createElement("td",null,[]);
         td1.innerText = goods.historyNo;

         const td2 = createElement("td",null,[]);
         td2.innerText = goods.historyDivide;
         
         const td3 = createElement("td",null,[]);
         td3.innerText = goods.historyGoodsName;

         const td4 = createElement("td",null,[]);
         td4.innerText = goods.lcategoryName;

         const td5 = createElement("td",null,[]);
         td5.innerText = goods.scategoryName;

         const td6 = createElement("td",null,[]);
         td6.innerText = goods.historyUnitPrice.toLocaleString("ko-KR");

         const td7 = createElement("td",null,[]);
         td7.innerText = goods.historyDiscount;

         const td8 = createElement("td",null,[]);
         td8.innerText = goods.historyActualPrice.toLocaleString("ko-KR");

         const td9 = createElement("td",null,[]);
         td9.innerText = goods.historyAmount;

         const td10 = createElement("td",null,[]);
         td10.innerText = goods.totalPrice.toLocaleString("ko-KR");

         const td11 = createElement("td",null,[]);
         td11.innerText = goods.historyDate;

         tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9, td10, td11);

         tableTbody.append(tr);
      }
   })
   .catch(e=>console.log(e));
   });
};

// IntersectionObserver 객체 생성
const observer = new IntersectionObserver( callback ,{
   // 요소가 어느 정도 보이면 작동할지 설정
	threshold: 0.5
});

// observer가 무엇을 감시할 지 설정
observer.observe(document.querySelector("#observedTag"));

// 상세 검색 판매금액 유효성
floatingPrice.addEventListener("input", e=>{
   if(e.target.value < 0){
      e.target.value = 0;
   }
});