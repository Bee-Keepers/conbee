/* const soloBtn = document.getElementById("soloBtn");

테스트 코드

soloBtn.addEventListener("click", () => {
	fetch("/chatting/chatting/selectChat")
	.then(resp => resp.json())
	.then( (chatList) => {
		console.log(chatList);

		const listContainer = document.getElementById("listContainer");

		const roomDiv = document.createElement("div");
		roomDiv.innerText=chatList[0].chatNo;
		roomDiv.classList.add("roomDiv");

		listContainer.append(roomDiv);

	})
	.catch(err => console.log(err));
});
 */

const addTarget = document.querySelector("#addTarget"); // 추가 버튼

const addTargetPopupLayer = document.querySelector("#addTargetPopupLayer"); // 팝업

const closeBtn = document.querySelector("#closeBtn"); // 닫기 버튼

const targetInput = document.querySelector("#targetInput"); // 사용자 검색

const resultArea = document.querySelector("#resultArea"); // 검색 결과



let selectChatNo; // 선택한 채팅방 번호
let selectTargetNo; // 현재 채팅 대상
let selectTargetName; // 대상의 이름
let selecttargetImg; // 대상의 프로필


// 검색 팝업 레이어 열기
addTarget.addEventListener("click", e => {
	addTargetPopupLayer.classList.toggle("popup-layer-close");
	targetInput.focus();
});

// 검색 팝업 레이어  닫기
closeBtn.addEventListener("click", e => {
	addTargetPopupLayer.classList.toggle("popup-layer-close");
	resultArea.innerHTML = "";
});


// 사용자 검색(ajax)
targetInput.addEventListener("input", e => {

	const query = e.target.value.trim();

	// 입력된게 없을 때
	if (query.length == 0) {
		resultArea.innerHTML = ""; // 이전 검색 결과 비우기
		return;
	}


	// 입력된게 있을 때
	if (query.length > 0) {
		fetch("/chatting/chatting/selectTarget?query=" + query)
			.then(resp => resp.json())
			.then(list => {
				console.log(list);

				resultArea.innerHTML = ""; // 이전 검색 결과 비우기

				if (list.length == 0) {
					const li = document.createElement("li");
					li.classList.add("result-row");
					li.innerText = "일치하는 회원이 없습니다";
					resultArea.append(li);
				}

				for (let member of list) {
					// li요소 생성(한 행을 감싸는 요소)
					const li = document.createElement("li");
					li.classList.add("result-row");
					li.setAttribute("data-id", member.memberNo);

					// 프로필 이미지 요소
					const img = document.createElement("img");
					img.classList.add("result-row-img");

					// 프로필 이미지 여부에 따른 src 속성 선택
					if (member.memberProfile == null) img.setAttribute("src", userDefaultImage);
					else img.setAttribute("src", member.memberProfile);

					let name = member.memberName;
					let id = member.memberId;

					const span = document.createElement("span");
					span.innerHTML = `${name} ${id}`.replace(query, `<mark>${query}</mark>`);

					// 요소 조립(화면에 추가)
					li.append(img, span);
					resultArea.append(li);

					// li요소에 클릭 시 채팅방에 입장하는 이벤트 추가
					li.addEventListener('click', chattingEnter);
				}

			})
			.catch(err => console.log(err));
	}
});



// 채팅방 입장 또는 선택 함수
function chattingEnter(e) {
	console.log(e.target); // 실제 클릭된 요소
	console.log(e.currentTarget); // 이벤트 리스트가 설정된 요소

	const targetNo = e.currentTarget.getAttribute("data-id");
	// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ에러
	fetch("/chatting/chatting/enter?targetNo=" + targetNo)
		.then(resp => resp.text())
		.then(chatNo => {
			console.log(chatNo);

			selectChatList(); // 채팅방 목록 조회

			setTimeout(() => {
				// 만약 채팅방 목록 중 이미 존재하는 채팅방이 있으면 클릭해서 입장
				const itemList = document.querySelectorAll(".chatting-item")
				for (let item of itemList) {
					if (item.getAttribute("chat-no") == chatNo) {
						item.focus();
						item.click();
						addTargetPopupLayer.classList.toggle("popup-layer-close");
						targetInput.value = "";
						resultArea.innerHTML = "";
						return;
					}
				}

			}, 200); // 이게 뭘까?? ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

		})
		.catch(err => console.log(err));
}

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ에러

// 비동기로 채팅방 목록 조회
function selectChatList() {

	fetch("/chatting/chatting/chatList")
		.then(resp => resp.json())
		.then(chatList => {
			console.log(chatList);

			// 채팅방 목록 출력 영역 선택
			const chattingList = document.querySelector(".roomList");

			// 채팅방 목록 지우기
			chattingList.innerHTML = "";
			
			// 조회한 채팅방 목록을 화면에 추가
			for (let chat of chatList) {
				const li = document.createElement("li");
				li.classList.add("chatting-item");
				li.setAttribute("chat-no", chat.chatNo);
				li.setAttribute("target-no", chat.targetNo);

				if (chat.chatNo == selectChatNo) {
					li.classList.add("select");
				}

				// item-header 부분
				const itemHeader = document.createElement("div");
				itemHeader.classList.add("item-header");

				const listProfile = document.createElement("img");
				listProfile.classList.add("list-profile");

				if (chat.targetImg == undefined)
					listProfile.setAttribute("src", userDefaultImage);
				else
					listProfile.setAttribute("src", chat.targetImg);

				itemHeader.append(listProfile);

				// item-body 부분
				const itemBody = document.createElement("div");
				itemBody.classList.add("item-body");

				const p = document.createElement("p");

				const targetName = document.createElement("span");
				targetName.classList.add("target-name");
				targetName.innerText = chat.targetName;

				const recentChatMessageDate = document.createElement("span");
				recentChatMessageDate.classList.add("recent-send-time");
				recentChatMessageDate.innerText = chat.chatMessageDate;


				p.append(targetName, recentChatMessageDate);


				const div = document.createElement("div");

				const recentMessage = document.createElement("p");
				recentMessage.classList.add("recent-message");

				if (chat.lastMessage != undefined) {
					recentMessage.innerHTML = chat.lastMessage;
				}

				div.append(recentMessage);

				itemBody.append(p, div);

				// 현재 채팅방을 보고있는게 아니고 읽지 않은 개수가 0개 이상인 경우 -> 읽지 않은 메세지 개수 출력
				if (chat.notReadCount > 0 && chat.chatNo != selectChatNo) {
					// if(chat.chatNo != selectChatNo ){
					const notReadCount = document.createElement("p");
					notReadCount.classList.add("not-read-count");
					notReadCount.innerText = chat.notReadCount;
					div.append(notReadCount);
				} else {

					// 현재 채팅방을 보고있는 경우
					// 비동기로 해당 채팅방 글을 읽음으로 표시
					fetch("/chatting/chatting/updateChatMessageRead", {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ "chatNo": selectChatNo, "memberNo": loginMemberNo })
					})
						.then(resp => resp.text())
						.then(result => console.log(result))
						.catch(err => console.log(err));

				}


				li.append(itemHeader, itemBody);
				chattingList.append(li);
			}

			chatListAddEvent();
		})
		.catch(err => console.log(err));


	/*$.ajax({
		url: "/chatting/roomList",
		data : {"memberNo" : loginMemberNo},
		dataType : "JSON",
		success : roomList => {
			
		}
	})*/
}






// 채팅 메세지 영역
const display = document.getElementsByClassName("display-chatting")[0];


function chatListAddEvent() {
	const chattingItemList = document.getElementsByClassName("chatting-item");

	for (let item of chattingItemList) {
		item.addEventListener("click", e => {

			selectChatNo = item.getAttribute("chat-no");
			selectTargetNo = item.getAttribute("target-no");




			selecttargetImg = item.children[0].children[0].getAttribute("src");
			selectTargetName = item.children[1].children[0].children[0].innerText;





			// 1 지우는 구문임 !! ( 아래 구문 주석해서 작동 X)
			if (item.children[1].children[1].children[1] != undefined) {
				item.children[1].children[1].children[1].remove();
			}

			console.log(item); // 오류나서 로그 찍어봄





			// 모든 채팅방에서 select 클래스를 제거
			for (let it of chattingItemList) it.classList.remove("select")

			// 현재 클릭한 채팅방에 select 클래스 추가
			item.classList.add("select");

			// 비동기로 메세지 목록을 조회하는 함수 호출
			selectChattingFn();
		});
	}
}






// 비동기로 메세지 목록을 조회하는 함수
function selectChattingFn() { 

	// 팀 넘버가 (null)0인 경우 1:1
	
	if(myTeamNo ==0) {
	
		fetch("/chatting/chatting/selectMessage?" + `chatNo=${selectChatNo}&memberNo=${loginMemberNo}`)
		.then(resp => resp.json())
		.then(chatMessageList => {
			console.log(chatMessageList);

			// <ul class="display-chatting">
			const ul = document.querySelector(".display-chatting");

			ul.innerHTML = ""; // 이전 내용 지우기

			// 메세지 만들어서 출력하기
			for (let msg of chatMessageList) {
				//<li>,  <li class="my-chat">
				const li = document.createElement("li");

				// 보낸 시간
				const span = document.createElement("span");
				span.classList.add("chatDate");
				span.innerText = msg.chatMessageDate;

				// 메세지 내용
				const p = document.createElement("p");
				p.classList.add("chat");
				p.innerHTML = msg.chatMessageContent; // br태그 해석을 위해 innerHTML

				// 내가 작성한 메세지인 경우
				if (loginMemberNo == msg.chatMessageSender) {
					li.classList.add("my-chat");

					li.append(span, p);

			


				} else { // 상대가 작성한 메세지인 경우
					li.classList.add("target-chat");

					// 상대 프로필
					const img = document.createElement("img");
					img.setAttribute("src", selecttargetImg);

					const div = document.createElement("div");

					// 상대 이름
					const b = document.createElement("b");
					b.innerText = selectTargetName; // 전역변수

					const br = document.createElement("br");

					div.append(b, br, p, span);
					li.append(img, div);

				}


				



				ul.append(li);
				display.scrollTop = display.scrollHeight; // 스크롤 제일 밑으로
			}


		})
		.catch(err => console.log(err));
	} else {
		fetch("/chatting/chatting/selectMessage?" + `chatNo=${selectChatNo}&memberNo=${loginMemberNo}&teamNo=${myTeamNo}`)
		.then(resp => resp.json())
		.then(chatMessageList => {
			console.log(chatMessageList);

			// <ul class="display-chatting">
			const ul = document.querySelector(".display-chatting");

			ul.innerHTML = ""; // 이전 내용 지우기

			// 메세지 만들어서 출력하기
			for (let msg of chatMessageList) {
				//<li>,  <li class="my-chat">
				const li = document.createElement("li");

				// 보낸 시간
				const span = document.createElement("span");
				span.classList.add("chatDate");
				span.innerText = msg.chatMessageDate;

				// 메세지 내용
				const p = document.createElement("p");
				p.classList.add("chat");
				p.innerHTML = msg.chatMessageContent; // br태그 해석을 위해 innerHTML

				// 내가 작성한 메세지인 경우
				if (loginMemberNo == msg.chatMessageSender) {
					li.classList.add("my-chat");

					li.append(span, p);

			


				} else { // 상대가 작성한 메세지인 경우
					li.classList.add("target-chat");

					// 상대 프로필
					const img = document.createElement("img");
					img.setAttribute("src", selecttargetImg);

					const div = document.createElement("div");

					// 상대 이름
					const b = document.createElement("b");
					b.innerText = selectTargetName; // 전역변수

					const br = document.createElement("br");

					div.append(b, br, p, span);
					li.append(img, div);

				}


				



				ul.append(li);
				display.scrollTop = display.scrollHeight; // 스크롤 제일 밑으로
			}


		})
		.catch(err => console.log(err));
	}

}


// ----------------------------------------------------------------------------------------------------------------

// sockjs를 이용한 WebSocket 구현

// 로그인이 되어 있을 경우에만
// /chatSock 이라는 요청 주소로 통신할 수 있는  WebSocket 객체 생성
let chatSock;

if (loginMemberNo != "") {
	chatSock = new SockJS("/chatSock");
}



// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ에러


// 채팅 입력
const send = document.getElementById("send");

const sendMessage = () => {
	const inputChat = document.getElementById("inputChat");

	if (inputChat.value.trim().length == 0) {
		alert("채팅을 입력해주세요.");
		inputChat.value = "";
	} else {
		var obj = {
			"chatMessageSender": loginMemberNo, // 누가
			"targetNo": selectTargetNo, // 누구에게
			"chatNo": selectChatNo, // 어떤 채팅방 번호로
			"chatMessageContent": inputChat.value, // 채팅을 보내는지
		};
		console.log(obj)

		// JSON.stringify() : 자바스크립트 객체를 JSON 문자열로 변환
		chatSock.send(JSON.stringify(obj));

		inputChat.value = "";
	}
}
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ에러

// 엔터 == 제출
// 쉬프트 + 엔터 == 줄바꿈
inputChat.addEventListener("keyup", e => {
	if (e.key == "Enter") {
		if (!e.shiftKey) {
			sendMessage();
		}
	}
})



// WebSocket 객체 chatSock이 서버로 부터 메세지를 통지 받으면 자동으로 실행될 콜백 함수
chatSock.onmessage = function (e) {
	// 메소드를 통해 전달받은 객체값을 JSON객체로 변환해서 obj 변수에 저장.
	const msg = JSON.parse(e.data);
	console.log(msg);


	// 현재 채팅방을 보고있는 경우
	if (selectChatNo == msg.chatNo) {


		const ul = document.querySelector(".display-chatting");

		// 메세지 만들어서 출력하기
		//<li>,  <li class="my-chat">
		const li = document.createElement("li");

		// 보낸 시간
		const span = document.createElement("span");
		span.classList.add("chatDate");
		span.innerText = msg.chatMessageDate;

		// 메세지 내용
		const p = document.createElement("p");
		p.classList.add("chat");
		p.innerHTML = msg.chatMessageContent; // br태그 해석을 위해 innerHTML

		// 내가 작성한 메세지인 경우
		if (loginMemberNo == msg.chatMessageSender) {
			li.classList.add("my-chat");

			li.append(span, p);

		} else { // 상대가 작성한 메세지인 경우
			li.classList.add("target-chat");

			// 상대 프로필
			const img = document.createElement("img");
			img.setAttribute("src", selecttargetImg);

			const div = document.createElement("div");

			// 상대 이름
			const b = document.createElement("b");
			b.innerText = selectTargetName; // 전역변수

			const br = document.createElement("br");

			div.append(b, br, p, span);
			li.append(img, div);

		}

		ul.append(li)
		display.scrollTop = display.scrollHeight; // 스크롤 제일 밑으로
	}


	/* 1:1 채팅 / 팀채팅 구분용 */
 if(msg.chatNo>11){
	 selectChatList();

 }


}




// 문서 로딩 완료 후 수행할 기능
document.addEventListener("DOMContentLoaded", () => {

	// 채팅방 목록에 클릭 이벤트 추가
	chatListAddEvent();

	// 보내기 버튼에 이벤트 추가
	send.addEventListener("click", sendMessage);
});


// -------------------------------------------------------------------------

const soloBtn = document.getElementById("soloBtn");
soloBtn.addEventListener("click", () => {


	fetch("/chatting/chatting/selectSoloChat")
		.then(resp => resp.json())
		.then(chatList => {
			console.log(chatList);
			const chattingList = document.querySelector(".roomList");

			// 채팅방 목록 지우기
			chattingList.innerHTML = "";

			// 조회한 채팅방 목록을 화면에 추가
			for (let chat of chatList) {
				const li = document.createElement("li");
				li.classList.add("chatting-item");
				li.setAttribute("chat-no", chat.chatNo);
				li.setAttribute("target-no", chat.targetNo);

				if (chat.chatNo == selectChatNo) {
					li.classList.add("select");
				}

				// item-header 부분
				const itemHeader = document.createElement("div");
				itemHeader.classList.add("item-header");

				const listProfile = document.createElement("img");
				listProfile.classList.add("list-profile");

				if (chat.targetImg == undefined)
					listProfile.setAttribute("src", userDefaultImage);
				else
					listProfile.setAttribute("src", chat.targetImg);

				itemHeader.append(listProfile);

				// item-body 부분
				const itemBody = document.createElement("div");
				itemBody.classList.add("item-body");

				const p = document.createElement("p");

				const targetName = document.createElement("span");
				targetName.classList.add("target-name");
				targetName.innerText = chat.targetName;

				const recentChatMessageDate = document.createElement("span");
				recentChatMessageDate.classList.add("recent-send-time");
				recentChatMessageDate.innerText = chat.chatMessageDate;


				p.append(targetName, recentChatMessageDate);


				const div = document.createElement("div");

				const recentMessage = document.createElement("p");
				recentMessage.classList.add("recent-message");

				if (chat.lastMessage != undefined) {
					recentMessage.innerHTML = chat.lastMessage;
				}

				div.append(recentMessage);

				itemBody.append(p, div);

				li.append(itemHeader, itemBody);

				chattingList.append(li);
			}

			// 만들어진 채팅 목록(li) 태그에 클릭 이벤트 추가
			chatListAddEvent();


		})
		.catch(err => console.log(err));
})












// 팀 채팅창 조회 시
const teamBtn = document.getElementById("teamBtn");


teamBtn.addEventListener("click", () => {
	const chattingList = document.querySelector(".roomList");
		
	// 채팅방 목록 지우기
	chattingList.innerHTML = "";
	fetch("/chatting/teamMemberList")
	.then(resp=>resp.json())
	.then(list=>{
		for(let member of list){
			const li = document.createElement("li");
			li.classList.add("chatting-item");

			const div1 = document.createElement("div");
			div1.classList.add("item-header");
			
			const img = document.createElement("img");
			img.classList.add("list-profile");
			if(member.memberProfile == null){
				img.src = userDefaultImage;
			} else {
				img.src = member.memberProfile;
			}
			div1.append(img);

			const div2 = document.createElement("div");
			div2.classList.add("item-body");

			const p1 = document.createElement("p");
			const span1 = document.createElement("span");
			span1.classList.add("target-name");
			span1.innerText = member.memberName;

			const span2 = document.createElement("span");


			span2.classList.add("recent-send-time");
			span2.innerText = member.gradeName;

			p1.append(span1, span2);

			const p2 = document.createElement("p");
			p2.innerText =  member.memberTel;

			div2.append(p1, p2);

			li.append(div1, div2);

			chattingList.append(li);

		}
	})
	.catch();
	selectChatNo = myTeamNo;
	selectChattingFn();
	
	
	// fetch("/chatting/chatting/selectTeamMessageList")
	// .then(resp => resp.json())
	// .then(teamMessageList => {
	// 	console.log(teamMessageList);
		

	// })
	// .catch(err => console.log(err));
});




/* 


				// 현재 채팅방을 보고있는게 아니고 읽지 않은 개수가 0개 이상인 경우 -> 읽지 않은 메세지 개수 출력
				if (chat.notReadCount > 0 && chat.chatNo != selectChatNo) {
					// if(chat.chatNo != selectChatNo ){
					const notReadCount = document.createElement("p");
					notReadCount.classList.add("not-read-count");
					notReadCount.innerText = chat.notReadCount;
					div.append(notReadCount);
				} else {

					// 현재 채팅방을 보고있는 경우
					// 비동기로 해당 채팅방 글을 읽음으로 표시
					fetch("/chatting/chatting/updateChatMessageRead", {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ "chatNo": selectChatNo, "memberNo": loginMemberNo })
					})
						.then(resp => resp.text())
						.then(result => console.log(result))
						.catch(err => console.log(err));

				} */