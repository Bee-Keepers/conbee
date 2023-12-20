// let calendar;
let calendarList = []; /* 일정 저장하는 배열 */

const selectMainCalendar = () => {

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
      contentHeight : "auto",
      // height : 300,
      // aspectRatio: 3,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialDate: new Date(),
      locale: 'ko',
      editable: false,

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

        console.log(info.event.extendedProps); // 추가된 속성들 (사용자 정의 속성 / calNo, carDetail, memberNo, memberName)

        
        /* 읽기 모달 열기 */
        $("#readModal").modal("show");

        /* 모달 헤더 배경, 테두리 색 */
        document.querySelector("#readModal .modal-header").style.backgroundColor = info.event.backgroundColor;
        document.querySelector("#readModal .modal-header").style.borderBottom = info.event.backgroundColor;

        // 제목에 일정 번호(시퀀스) 숨겨두기!! -> 수정, 삭제
        document.querySelector("#readModalTitle").setAttribute("calNo", info.event.extendedProps.calNo);

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

        // info.event.extendedProps.memberNo == 일정 등록한 회원의 번호
        // loginMemberNo == 로그인한 회원의 번호

        const modalFooter = document.querySelector("#readModal .modal-footer");
        /* 로그인한 회원이 쓴 일정인 경우 */
        if(info.event.extendedProps.memberNo == loginMemberNo){
          modalFooter.style.display = "flex";
        } 
        
        /* 로그인한 회원이 쓴 일정인 아닌 경우 */
        else{
          modalFooter.style.display = "none";
        }

        
      }
    });

    calendar.render(); // 화면에 달력 출력


  })
  .catch(e => console.log(e));
}


selectMainCalendar();