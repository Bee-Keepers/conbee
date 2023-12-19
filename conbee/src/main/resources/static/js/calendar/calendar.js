// let calendar;
let calendarList = []; /* 일정 저장하는 배열 */

/* 일정을 비동기로 조회해서 달력을 만드는 함수 */
const selectCalendar = () => {

  fetch('/calendar/selectCalendar')
  .then(resp => resp.json())
  .then(list => {
    console.log(list);

    calendarList = []; // 초기화

    /* 풀캘린더에 맞는 형식으로 변경 */
    for(let item of list){ 
      const obj = {};
      obj.title = item.calTitle;
      obj.start = item.calStartTime;
      obj.end = item.calEndTime;
      obj.allDay =  (item.calAllDay == 1 ? true : false);
      obj.color = item.calColor;

      obj.calNo = item.calNo;
      obj.calDetail = item.calDetail;
      obj.memberNo = item.memberNo;
      obj.memberName = item.memberName;

      calendarList.push(obj);
    }


    // 화면에 출력할 달력 설정
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay addEventButton'
      },
      initialDate: new Date(),
      locale: 'ko',
      editable: true,
      customButtons: {
        addEventButton: {
          text: '일정추가',
          click: function () {
            $('#calendarModal').modal('show');
          }
        }
      },

      /* 달력에 출력할 일정 [{}, {}] */
      events : calendarList,

      selectable: true, // 날짜 선택
      dateClick: (info) => { // 날짜 비어있는 부분 클릭
        // console.log("클릭됨");
        // console.log(info);

        // 일정 추가 모달 열기
        $('#calendarModal').modal('show');

        // 클릭한 날짜를 시작/종료 날짜에 대입
        document.getElementById("calendar_start_date").value = info.dateStr;
        document.getElementById("calendar_end_date").value = info.dateStr;

        document.getElementById("calendar_start_time").value = '09:00';
        document.getElementById("calendar_end_time").value = '10:00';
      },

      eventClick : (info) => {
        // console.log(info.event); //  클릭된 일정 이벤트 정보
        // console.log(info.event.title); // 클릭된 일정 제목

        // console.log(info.event.start); // Sat Dec 16 2023 00:00:00 GMT+0900 (한국 표준시)  (DATE)
        console.log(info.event.startStr);  // 2023-12-16

        // console.log(info.event.end);  // 하루 종일 중 1일 짜리는  end == null
        console.log(info.event.endStr); // 하루 종일은 1일 짜리는 endStr == ''

        // console.log(info.event.allDay);  // true/ false
        // console.log(info.event.backgroundColor);  // #e90707

        // console.log(info.event.extendedProps); // 추가된 속성들 (사용자 정의 속성 / calNo, carDetail, memberNo, memberName)

        
        /* 읽기 모달 열기 */
        $("#readModal").modal("show");

        /* 모달 헤더 배경, 테두리 색 */
        document.querySelector("#readModal .modal-header").style.backgroundColor = info.event.backgroundColor;
        document.querySelector("#readModal .modal-header").style.borderBottom = info.event.backgroundColor;


        document.querySelector("#readModalTitle").innerText = info.event.title;
        document.querySelector("#readModalContent").innerText = info.event.extendedProps.calDetail;
        document.querySelector("#nameModal").innerText = info.event.extendedProps.memberName;
        document.querySelector("#readModalAllDay").value = info.event.allDay;

        // 시작 날짜
        document.querySelector("#startModal").innerText = info.event.startStr.split("T")[0];

        // 종료 날짜
        document.querySelector("#endModal").innerText = info.event.endStr.split("T")[0];
        
        // 종료 날짜가 없는 경우 (1일 하루 종일)
        if(info.event.endStr == '') document.querySelector("#endModal").innerText = info.event.startStr.split("T")[0];

        // 하루 종일 == true
        if(info.event.allDay){
          document.querySelector("#startStrModal").previousElementSibling.style.display = 'none';
          document.querySelector("#startStrModal").style.display = 'none';
          document.querySelector("#endStrModal").previousElementSibling.style.display = 'none';
          document.querySelector("#endStrModal").style.display = 'none';
        }
        
        // 하루 종일 == false
        else{
          document.querySelector("#startStrModal").previousElementSibling.style.display = 'block';
          document.querySelector("#startStrModal").style.display = 'block';
          document.querySelector("#endStrModal").previousElementSibling.style.display = 'block';
          document.querySelector("#endStrModal").style.display = 'block';

          document.querySelector("#startStrModal").innerText = info.event.startStr.substr(11,5);
          document.querySelector("#endStrModal").innerText = info.event.endStr.substr(11,5);
        }

        
      }
    });

    calendar.render(); // 화면에 달력 출력


  })
  .catch(e => console.log(e));
}





/* 화면 로딩이 끝나면 selectCalendar 함수를 실행*/
document.addEventListener('DOMContentLoaded', selectCalendar);






// 일정 추가 - 모달 확인 버튼 클릭 시
document.getElementById('calender-confirm').addEventListener('click',() => {

  const calTitle = document.getElementById('calendar_title').value;
  const calDetail = document.getElementById('calendar_content').value;
  const calendarAllday = document.getElementById('calendar_allday').checked; // 체크 시 true, 아니면 false

  const calendarStartDate = document.getElementById('calendar_start_date').value;
  const calendarStartTime = document.getElementById('calendar_start_time').value;

  const calendarEndDate = document.getElementById('calendar_end_date').value;
  const calendarEndTime = document.getElementById('calendar_end_time').value;

  const calendarColor = document.getElementById('calendar_color').value;


  // 시작/종료 날짜 + 시간  (2023-12-14/16:20)
  let calStartTime;
  let calEndTime;


  // 하루 종일이 체크되어 있는 경우 (2023-12-14/00:00)
  if(calendarAllday){
    if(calendarStartDate == calendarEndDate){
      calStartTime = calendarStartDate + "T00:00:00" ;
      calEndTime = calendarEndDate+ "T00:00:00";
   
    }else{
      calStartTime = calendarStartDate + "T00:00:00" ;

      const temp = new Date(calendarEndDate);
      const year = temp.getFullYear();
      const month = temp.getMonth() + 1; // month (0~11) + 1 --> 1월 ~ 12월
      const date = temp.getDate() + 1; // 끝나는 날짜를 하루 증가해야 캘린더에서 종료일 까지 색이 꽉 참

      calEndTime = `${year}-${month}-${date}T00:00:00`;
    }
    
  
    // 하루 종일이 체크되어 있지 않은 경우 (2023-12-14/16:20)
  } else{
    calStartTime = calendarStartDate + "T" + calendarStartTime + ":00";
    calEndTime = calendarEndDate + "T" + calendarEndTime + "00";
  }

  // 입력된 데이터를 하나의 객체로 묶음
  const dataObj = {"calTitle": calTitle, 
                  "calDetail" : calDetail, 
                  "calAllDay" : (calendarAllday ? 1 : 0), // 체크 되었으면 1, 아니면 0
                  "calStartTime" : calStartTime,
                  "calEndTime": calEndTime,
                  "calColor" : calendarColor
  }
  

  fetch('/calendar/staffcalendar', {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(dataObj)
  })
  .then(resp => resp.text())
  .then(result => {
    console.log(result); // 성공 시 1

    selectCalendar(); // 달력 다시 만들기

    /* 모달에 작성된 내용 삭제 */
    document.getElementById('calendar_title').value = '';
    document.getElementById('calendar_content').value = '';
    document.getElementById('calendar_allday').checked = false;
    document.getElementById('calendar_start_date').value = '';
    document.getElementById('calendar_end_date').value = '';

    document.querySelectorAll(".calendar-time-container").forEach( item => item.style.display = "block" );

    // 모달 닫기
    $('#calendarModal').modal('hide');

  })
  .catch(e => console.log(e))
})


/* 하루 종일 체크 변경 시 마다 수행 */
document.getElementById('calendar_allday').addEventListener('change', e => {

  // 체크 여부 확인
  // console.log(e.target); // 이벤트(change)가 발생한 요소
  console.log(e.target.checked) // [라디오/체크박스].checked : 체크되어 있으면 true, 없으면 false


  const timeContainerList = document.querySelectorAll(".calendar-time-container");

  for(let timeContainer of timeContainerList){ // 향상된 for문(한 바퀴 마다 0번부터 순서대로 하나씩 꺼냄)
    
    if(e.target.checked){ // 체크된 경우 -> 시간 숨기기
      timeContainer.style.display = 'none';
    }else{ // 체크가 안된 경우 -> 시간 보이기
      timeContainer.style.display = 'block';
    }
  }
  
})


// -------------------------------------------------------------------

/* rgb(1,2,3) -> #010203(hex) 변환*/
const rgbToHex = (rgbString) => {

  // rgbString == 'rgb(11,222,0)'
  const regex = /\d+/g; // 숫자에 해당하는 정규 표현식
  const matches = rgbString.match(regex);
  console.log(matches); 

  let red = Number(matches[0]).toString(16);
  let green = Number(matches[1]).toString(16);
  let blue = Number(matches[2]).toString(16);

  if(red.length < 2) red = "0" + red;
  if(green.length < 2) green = "0" + green;
  if(blue.length < 2) blue = "0" + blue;

  return `#${red}${green}${blue}`;

}


/* 읽기 모달 -> 수정 버튼 클릭 시 */
document.getElementById("calender-update").addEventListener('click' , ()=>{

  const title = document.getElementById("readModalTitle").innerText;
  const content = document.getElementById("readModalContent").innerText;
  const allDay = document.getElementById("readModalAllDay").value;
  
  const startDate = document.getElementById("startModal").innerText;
  const startTime = document.getElementById("startStrModal").innerText;
  const endDate = document.getElementById("endModal").innerText;
  const endTime = document.getElementById("endStrModal").innerText;
  
  const color = document.querySelector("#readModal .modal-header").style.backgroundColor;


  // console.log(title);
  // console.log(content);
  console.log(allDay);
  console.log(startDate);
  console.log(startTime);
  console.log(endDate);
  console.log(endTime);
  // console.log(color);

  document.getElementById("calendar_title_update").value = title;
  document.getElementById("calendar_color_update").value = rgbToHex(color);
  document.getElementById("calendar_content_update").value = content;


  document.getElementById("calendar_start_date_update").value = startDate;
  document.getElementById("calendar_end_date_update").value = endDate;
  document.getElementById("calendar_allday_update").checked = allDay == 'true';

  // 하루 종일이 체크된 경우(allDay == 'true') 시작/종료 시간 안보이게 하기 


  const timeContainerList = document.querySelectorAll(".update-time-container");

  for(let timeContainer of timeContainerList){ // 향상된 for문(한 바퀴 마다 0번부터 순서대로 하나씩 꺼냄)
    
    if(allDay == 'true'){ // 체크된 경우 -> 시간 숨기기
      timeContainer.style.display = 'none';
      document.getElementById("calendar_start_time_update").value = '09:00';
      document.getElementById("calendar_end_time_update").value = '10:00';
    }else{ // 체크가 안된 경우 -> 시간 보이기
      timeContainer.style.display = 'block';
      document.getElementById("calendar_start_time_update").value = startTime;
      document.getElementById("calendar_end_time_update").value = endTime;
    }
  }

})



/* 수정 모달 - 하루 종일 체크 변경 시 마다 수행 */
document.getElementById('calendar_allday_update').addEventListener('change', e => {

  console.log(e.target.checked);
  const timeContainerList = document.querySelectorAll(".update-time-container");

  for(let timeContainer of timeContainerList){ // 향상된 for문(한 바퀴 마다 0번부터 순서대로 하나씩 꺼냄)
    
    if(e.target.checked){ // 체크된 경우 -> 시간 숨기기
      timeContainer.style.display = 'none';
      document.getElementById("calendar_start_time_update").value = '09:00';
      document.getElementById("calendar_end_time_update").value = '10:00';
    }else{ // 체크가 안된 경우 -> 시간 보이기
      timeContainer.style.display = 'block';
    }
  }
})



// 일정 수정 - 모달 수정 버튼 클릭 시
document.getElementById('calender-update-btn').addEventListener('click',() => {

  const calTitle = document.getElementById('calendar_title_update').value;
  const calDetail = document.getElementById('calendar_content_update').value;
  const calendarAllday = document.getElementById('calendar_allday_update').checked; // 체크 시 true, 아니면 false

  const calendarStartDate = document.getElementById('calendar_start_date_update').value;
  const calendarStartTime = document.getElementById('calendar_start_time_update').value;

  const calendarEndDate = document.getElementById('calendar_end_date_update').value;
  const calendarEndTime = document.getElementById('calendar_end_time_update').value;

  const calendarColor = document.getElementById('calendar_color_update').value;


  // 시작/종료 날짜 + 시간  (2023-12-14/16:20)
  let calStartTime;
  let calEndTime;


  // 하루 종일이 체크되어 있는 경우 (2023-12-14/00:00)
  if(calendarAllday){
    if(calendarStartDate == calendarEndDate){
      calStartTime = calendarStartDate + "T00:00:00" ;
      calEndTime = calendarEndDate+ "T00:00:00";
   
    }else{
      calStartTime = calendarStartDate + "T00:00:00" ;

      const temp = new Date(calendarEndDate);
      const year = temp.getFullYear();
      const month = temp.getMonth() + 1; // month (0~11) + 1 --> 1월 ~ 12월
      const date = temp.getDate() + 1; // 끝나는 날짜를 하루 증가해야 캘린더에서 종료일 까지 색이 꽉 참

      calEndTime = `${year}-${month}-${date}T00:00:00`;
    }
    
  
    // 하루 종일이 체크되어 있지 않은 경우 (2023-12-14/16:20)
  } else{
    calStartTime = calendarStartDate + "T" + calendarStartTime + ":00";
    calEndTime = calendarEndDate + "T" + calendarEndTime + "00";
  }

  // 입력된 데이터를 하나의 객체로 묶음
  const dataObj = {"calTitle": calTitle, 
                  "calDetail" : calDetail, 
                  "calAllDay" : (calendarAllday ? 1 : 0), // 체크 되었으면 1, 아니면 0
                  "calStartTime" : calStartTime,
                  "calEndTime": calEndTime,
                  "calColor" : calendarColor
  }
  

  fetch('/calendar/staffcalendar', {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(dataObj)
  })
  .then(resp => resp.text())
  .then(result => {
    console.log(result); // 성공 시 1

    selectCalendar(); // 달력 다시 만들기

    /* 모달에 작성된 내용 삭제 */
    document.getElementById('calendar_title').value = '';
    document.getElementById('calendar_content').value = '';
    document.getElementById('calendar_allday').checked = false;
    document.getElementById('calendar_start_date').value = '';
    document.getElementById('calendar_end_date').value = '';

    document.querySelectorAll(".calendar-time-container").forEach( item => item.style.display = "block" );

    // 모달 닫기
    $('#calendarModal').modal('hide');

  })
  .catch(e => console.log(e))
})


/* 하루 종일 체크 변경 시 마다 수행 */
document.getElementById('calendar_allday').addEventListener('change', e => {

  // 체크 여부 확인
  // console.log(e.target); // 이벤트(change)가 발생한 요소
  console.log(e.target.checked) // [라디오/체크박스].checked : 체크되어 있으면 true, 없으면 false


  const timeContainerList = document.querySelectorAll(".calendar-time-container");

  for(let timeContainer of timeContainerList){ // 향상된 for문(한 바퀴 마다 0번부터 순서대로 하나씩 꺼냄)
    
    if(e.target.checked){ // 체크된 경우 -> 시간 숨기기
      timeContainer.style.display = 'none';
    }else{ // 체크가 안된 경우 -> 시간 보이기
      timeContainer.style.display = 'block';
    }
  }
  
})