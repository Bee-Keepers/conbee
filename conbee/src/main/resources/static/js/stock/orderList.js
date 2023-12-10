// 발주 조회 지점 선택
const storeNoSelect = document.getElementById("storeNoSelect");
storeNoSelect.addEventListener("change", e=>{
  location.href = "/stock/order/list?storeNo=" + e.target.value;
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

const detailTbody = document.getElementById("detailTbody");

function detailOrderFn(e){
  console.log(e.parentElement.previousElementSibling.innerText);

  fetch("/stock/order/select?storeNo=" + storeNoSelect.value + "&orderDate=" + e.parentElement.previousElementSibling.innerText)
  .then(resp=>resp.json())
  .then(orderList=>{

    detailTbody.innerHTML = "";

    if(orderList.length != 0){
      for(let order of orderList){
        const tr = document.createElement("tr");
        console.log(order);
        for(let key in order){
          const td = document.createElement("td");
          td.innerText = order[key];
          tr.append(td);
        }
        detailTbody.append(tr);
      }
    } else {
      detailTbody.innerText = "조회 결과가 없습니다";
    }

  })
  .catch(e=>console.log(e));
  
};

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


// 발주 날짜 검색
const stockSearchBtn = document.getElementById("stockSearchBtn");
const stockSearchForm = document.getElementById("stockSearchForm");
const storeNo = document.getElementById("storeNo");

stockSearchBtn.addEventListener("click", ()=>{
  storeNo.value = storeNoSelect.value;
  stockSearchForm.submit();
});
// 검색한 날짜 저장
const startDate = document.querySelector("input[name='startDate']");
const endDate = document.querySelector("input[name='endDate']");

startDate.value = document.getElementById("startDate").innerText;
endDate.value = document.getElementById("endDate").innerText;