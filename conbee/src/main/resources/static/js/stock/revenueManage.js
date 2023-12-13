const storeSearch = document.getElementById("storeSearch");
const storeSelect = document.getElementById("storeSelect");
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

revenueSearchBtn.addEventListener("click", ()=>{
    if(storeSelect.value == ""){
        alert("지점을 선택해주세요");
        return;
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



// 합계 계산
const totalPrice = document.getElementById("totalPrice");
const totalPriceList = document.querySelectorAll("#tableTbody>tr>td:last-of-type");
let temp = 0;
for(let totalPrices of totalPriceList){
   temp += parseInt(totalPrices.innerText);
}
totalPrice.innerText = temp;

// 검색한 날짜 저장
const startDate = document.querySelector("input[name='startDate']");
const endDate = document.querySelector("input[name='endDate']");

if(document.getElementById("startDate") != null){
    startDate.value = document.getElementById("startDate").innerText;
    endDate.value = document.getElementById("endDate").innerText;
}

const floatingPrice = document.getElementById("floatingPrice");
floatingPrice.addEventListener("input", e=>{
   if(e.target.value < 0){
      e.target.value = 0;
   }
});