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
      }
    });

    calendar.render(); // 화면에 달력 출력


  })
  .catch(e => console.log(e));
}





/* 화면 로딩이 끝나면 selectCalendar 함수를 실행*/
document.addEventListener('DOMContentLoaded', selectCalendar);






// 모달 확인 버튼 클릭 시
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
    calStartTime = calendarStartDate + "T00:00:00" ;
    calEndTime = calendarEndDate+ "T00:00:00";
  
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

  for(let timerContainer of timeContainerList){ // 향상된 for문(한 바퀴 마다 0번부터 순서대로 하나씩 꺼냄)
    
    if(e.target.checked){ // 체크된 경우 -> 시간 숨기기
      timerContainer.style.display = 'none';
    }else{ // 체크가 안된 경우 -> 시간 보이기
      timerContainer.style.display = 'block';
    }
  }
})


