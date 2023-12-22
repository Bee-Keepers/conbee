# SpringBoot-Project [🍯conBee]
스프링 부트 기반의 편의점 통합 솔루션


## 🖥️ 프로젝트 소개
conBee는 편의점 본사와 지점운영을 지원하는 통합 솔루션입니다. 편의점 비즈니스 특성에 맞게 설계한 ERP와 그룹웨어 시스템을 결합하여, 효율적인 자원 관리와 강화된 협업 기능을 제공합니다.
<br>

## 🕰️ 개발 기간
* 23.11.21일 - 23.12.26일

### 🧑‍🤝‍🧑 팀 구성
 - 팀장 이예리나 - 전자결재 결재파트, 관리자페이지(점포관리, 신고관리)
 - 팀원 김민규 - 
 - 팀원 박상언 - 
 - 팀원 정유진 - 
 - 팀원 윤성국 - 
 - 팀원 김민석 - 

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
#### 로그인 - <a href="" >상세보기 - WIKI 이동</a>
- DB값 검증
- ID찾기, PW찾기
- 로그인 시 쿠키(Cookie) 및 세션(Session) 생성
  
#### 회원가입 - <a href="" >상세보기 - WIKI 이동</a>
- 주소 API 연동
- ID 중복 체크
#### 마이 페이지 - <a href="" >상세보기 - WIKI 이동</a>
- 주소 API 연동
- 회원정보 변경

#### 전자결재 - <a href="" >상세보기 - WIKI 이동</a>
- 전자결재 시스템 구축 (승인, 반려, 반려취소, 재작성)
- 협조부서 문서 조회
- 기안서 첨부파일 인쇄, PDF 저장
- 180일 지난 기안서 자동 삭제
- 기안서 별 사원관리, 점포관리, 캘린더 연동

#### 관리자 페이지 
- 신고된 게시글, 댓글 관리
- 점포 정보 조회, 수정, 신규 등록
- 주소 API 연동


### 📌 상세 주소
* [**요구사항 정의서**](https://docs.google.com/spreadsheets/d/1hohRRCWC4EnTQadmIPCw3EvsyTfoN2p_GTsh0FoiENs/edit#gid=0)
* [**화면 구성**(Figma)](https://www.figma.com/file/joUbPDUWFfBpnbVl4HHdCn/beeKeepers?type=design&node-id=0-1&mode=design&t=MDE8zFqEEjUgwocW-0)
* [**일정 관리**(Notion)](https://www.notion.so/87ffc638435c4aedba504d94af9eb2f5?v=59d56e640ca049a68b60f72bdb98ea34)
* [**DB 설계**(ERD-Cloud)](https://www.erdcloud.com/d/wyJKMZTYS4pkfzWi7)