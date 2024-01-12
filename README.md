# SpringBoot-Project [🍯conBee]
스프링 부트 기반의 편의점 통합 솔루션


## 🖥️ 프로젝트 소개
conBee는 편의점 본사와 지점운영을 지원하는 통합 솔루션입니다. 편의점 비즈니스 특성에 맞게 설계한 ERP와 그룹웨어 시스템을 결합하여, 효율적인 자원 관리와 강화된 협업 기능을 제공합니다.
<br>

## 🕰️ 개발 기간
* 23.11.21일 - 23.12.26일

### 🧑‍🤝‍🧑 팀 구성
 - 팀장 **이예리나** : 전자결재 결재파트, 관리자페이지(점포관리, 신고관리) <a href="https://blog.naver.com/poikl11234/223311632237">[상세보기]</a>
 - 팀원 **윤성국** : 상품 페이지, 재고 페이지
 - 팀원 **김민석** : 발주, POS 결제, 매출, 입출고 내역, 발주 내역 검색 및 조회, 입고가 조정
 - 팀원 **정유진** : 기안문 작성, 임시저장함, 결재요청함, 회수문서함
 - 팀원 **김민규** : 회원 관리, 게시판 관리, 채팅
 - 팀원 **박상언** : 마이페이지, 쪽지, 캘린더, 주소록


### ⚙️ 개발 환경
- **Framework** : Springboot4, Mybatis, Bootstrap5
- **IDE** : VS Code, Eclips, DBeaver
- **FrontEnd** : HTML , CSS, Javascript ES6, jQuery, Ajax
- **BackEnd** : `Java 17`
- **Database** : Oracle DB 19c
- **Server** : Tomcat 10.1
- **API** : FullCalender, CKEditor, Daum주소 API, PDF API
- **etc**: GitHub, SourceTree, Figma, ERD cloud

## 📌 주요 기능
### 1. 그룹웨어
#### 로그인
- DB값 검증
- ID찾기, PW찾기
- 로그인 시 쿠키(Cookie) 및 세션(Session) 생성
  
#### 회원가입
- 주소 API 연동
- ID 중복 체크
- 임시 비밀번호 발송

#### 마이 페이지
- 주소 API 연동
- 회원정보 변경

#### 주소록
- 전 사원의 이름/직책/부서/이메일/전화번호 조회
- 쪽지 서비스 연동

#### 쪽지
- 주소록 연동
- 상대방에게 쪽지 발송, 수신, 조회 쪽지 저장 가능

#### 캘린더
- Full Calendar API
- 캘린더 CRUD 구현
- 팀단위 캘린더 조회

#### 게시판
- 게시판 CRUD 구현
- 목록 조회(댓글수/조회수), 댓글, 북마크
- 회원별 조회 구분(익명/사내/점주)
- 웹에디터(ck에디터 > 에디터 툴바 설정 / youtube영상 등록 & 사진등록(+링크) & 편의 기능) 적용

#### 채팅
- 채팅 리스트 조회
- 1:1 채팅, 팀채팅(직급 순 참여자 조회), webSocket(실시간 채팅)
- 회원 상세 검색 및 신규 채팅창 생성

#### 전자결재
- 전자결재 시스템 구축 (작성, 조회, 승인, 반려, 반려취소, 재작성)
- 기안작성문 모달창 구현
- 템플릿(휴가신청서, 사직서, 출폐점 등록 요청서, 지출결의서, 발주기안서) 선택 및 기안문 작성
- 임시저장 및 결재요청 기능
- 협조부서 문서 조회
- 기안서 첨부파일 인쇄, PDF 저장
- 180일 지난 기안서 자동 삭제
- 기안서 별 사원관리, 점포관리, 재고관리, 캘린더 연동

#### 관리자 페이지
- 회원 정보 조회, 탈퇴, 신규 등록
- 신고된 게시글, 댓글 관리
- 점포 정보 조회, 수정, 신규 등록
- 주소 API 연동

### 2. ERP
#### POS - <a href="" >상세보기</a>
- 편의점 점포 내 재고 출력, 분류, 이름 입력시 해당 조건으로 재고 출력 최신화
- POS에 해당 품목들 입력됨, 수량 선택 후 제출 시 결제 완료

#### 상품 관리
- 상품 조회, 등록, 수정, 삭제, 검색

#### 재고 관리
- 본사/지점별 상품의 재고, 입고가, 출고가, 할인율 등의 조회/등록/수정/삭제/검색
- 입출고 내역 조회
- 입고가 조정 기능

#### 발주 관리
- 요청 기간 내 발주 기록 상세조회
- 일일발주 신청 등록, 수정, 삭제 기능 구현
- 1일 내 자동 발주, 재고 업데이트 연동

#### 매출 관리
- 지점별 상세 매출 기록 조회


### 📌 상세 주소
* [**프로젝트 보고서**(PDF)](https://drive.google.com/file/d/1TncMrfe87R2tQcfsLHsSkNQ3Sa8wHPUb/view?usp=drive_link)
* [**요구사항 정의서**](https://docs.google.com/spreadsheets/d/1hohRRCWC4EnTQadmIPCw3EvsyTfoN2p_GTsh0FoiENs/edit#gid=0)
* [**화면 구성**(Figma)](https://www.figma.com/file/SWpBQfmViq15xE256W5ts4/beeKeepers-(all)?type=design&node-id=219-8&mode=design&t=T5NrU3yY5bEGYP3s-0)
* [**일정 관리**(Notion)](https://www.notion.so/87ffc638435c4aedba504d94af9eb2f5?v=59d56e640ca049a68b60f72bdb98ea34)
* [**DB 설계**(ERD-Cloud)](https://www.erdcloud.com/d/wyJKMZTYS4pkfzWi7)
