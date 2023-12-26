/* 회원가입 시 시퀀스 넘버 생성 */
CREATE SEQUENCE SEQ_MEMBER_NO
INCREMENT BY 1
START WITH 1
MINVALUE 1
MAXVALUE 99999
NOCYCLE
NOCACHE
NOORDER;

COMMIT;

/* 관리자 계정 추가 */
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'admin', 'admin01', 'admin@admin.com', '관리자1', '04540^^^서울시 중구 남대문로 120^^^2층',
'01012341234', NULL, 0, DEFAULT, DEFAULT, 8, 3, 5);


/* 사원 계정 */
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'manager1', '123123', 'manager1@admin.com', '점주1', '04540^^^서울시 중구 남대문로 120^^^3층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 11, 5, 6);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'manager2', '123123', 'manager2@admin.com', '점주2', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 11, 5, 6);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'test01', '123123', 'test01@test.com', '사원', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 10, 4, 5);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'test02', '123123', 'test02@test.com', '팀장', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 10, 4, 3);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'test03', '123123', 'test03@test.com', '부장', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 10, 4, 2);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'test04', '123123', 'test04@test.com', '부사장', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 0, 0, 1);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'test05', '123123', 'test05@test.com', '사장', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 0, 0, 0);

INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'test06', '123123', 'test06@test.com', '정유진', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 6, 1, 3);

INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'test07', '123123', 'test07@test.com', '이유진', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 6, 2, 3);

DELETE FROM "AUTH_KEY" 
WHERE AUTH_KEY_NO = 7;
COMMIT;



ROLLBACK;


/* 점주 생성 */
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'manager3', '123123', 'manager3@admin.com', '점주3', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 11, 5, 6);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'manager4', '123123', 'manager4@admin.com', '점주4', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 11, 5, 6);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'manager5', '123123', 'manager5@admin.com', '점주5', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 11, 5, 6);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'manager6', '123123', 'manager6@admin.com', '점주6', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 11, 5, 6);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'manager7', '123123', 'manager7@admin.com', '점주7', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 11, 5, 6);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'manager8', '123123', 'manager8@admin.com', '점주8', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 11, 5, 6);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'manager9', '123123', 'manager9@admin.com', '점주9', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 11, 5, 6);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'manager10', '123123', 'manager10@admin.com', '점주10', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 11, 5, 6);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'manager11', '123123', 'manager11@admin.com', '점주11', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 11, 5, 6);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'manager12', '123123', 'manager12@admin.com', '점주12', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 11, 5, 6);
COMMIT;
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'manager12', '123123', 'manager12@admin.com', '점주12', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 11, 5, 6);
COMMIT;
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'manager12', '123123', 'manager12@admin.com', '점주12', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 11, 5, 6);
COMMIT;


/* 회원 조회 */
SELECT COUNT(*) FROM MEMBER
JOIN 
WHERE STORE_NO = 123;

 
/* 아이디 찾기 테스트 */
SELECT COUNT(*) FROM MEMBER
WHERE MEMBER_ID = member02
AND MEMBER_EMAIL = mkmk0607@gmail.com
AND MEMBER_DEL_FL = 'N';






SELECT * FROM "MEMBER";


/* 관리자 계정 생성 확인 및 로그인 가능 여부 체크 */
SELECT MEMBER_NO, MEMBER_ID, MEMBER_PW, MEMBER_EMAIL, MEMBER_NAME, MEMBER_ADDRESS,
MEMBER_TEL, MEMBER_PROFILE, MEMBER_AUTHORITY, 
	TO_CHAR(MEMBER_ENROLL_DATE, 'YYYY"년" MM"월" DD"일" HH24"시" MI"분" SS"초"') ENROLL_DATE
FROM "MEMBER"
WHERE MEMBER_DEL_FL = 'N'
		 AND MEMBER_ID = 'admin';
		 
		
/* 게시판 글 번호 시퀀스 생성 */
CREATE SEQUENCE SEQ_BOARD_NO NOCACHE;

/* 이메일 인증키 조회 */
SELECT * FROM AUTH_KEY;
		
/* 작성일 보드에 삽입 */
ALTER TABLE BOARD ADD BOARD_WRITE_DATE DATE DEFAULT SYSDATE NOT NULL;
COMMIT;
ALTER TABLE BOARD DROP COLUMN BOARD_WRITE_DATE;
/* 작성일 보드에 삽입 */
ALTER TABLE BOARD ADD BOARD_DEL_FL CHAR(1) DEFAULT 'N' NOT NULL;
COMMIT;
ALTER TABLE BOARD DROP COLUMN BOARD_WRITE_DATE;
		
	
		
		
		
		
		
		
		
		
/* 회원 관리 샘플 데이터 삽입 */
SELECT MEMBER_NO, DEPARTMENT_NO,TEAM_NO, GRADE_NO, MEMBER_TEL, MEMBER_ADDRESS,
MEMBER_ENROLL_DATE, DEPARTMENT_NAME, TEAM_NAME, GRADE_NAME
FROM MEMBER
JOIN TEAM USING (TEAM_NO)
JOIN DEPARTMENT USING (DEPARTMENT_NO)
JOIN GRADE USING (GRADE_NO);



/* 게시판 샘플 데이터 삽입 */
SELECT BOARD_NO, BOARD_TITLE, BOARD_ATTACH, BOARD_HITS, MEMBER_NO, BOARD_CODE_NO,
BOARD_WRITE_DATE
, MEMBER_NAME
FROM BOARD
JOIN "MEMBER" USING(MEMBER_NO)
WHERE BOARD_DEL_FL = 'N'
	AND BOARD_CODE_NO = 1
	ORDER BY BOARD_NO DESC;

SELECT BOARD_CODE_NAME FROM BOARD_CODE
WHERE BOARD_CODE_NO = 1;




/* 게시판 샘플 데이터 삽입 */
INSERT INTO "BOARD"
VALUES(1, '제목입니다', '내용입니다', NULL, default, 6, 1);


/* 게시판 별 코드 생성 */
INSERT INTO BOARD_CODE
VALUES(2, '자유게시판');
INSERT INTO BOARD_CODE
VALUES(3, '익명게시판');
COMMIT;


/* 컬럼추가 */
ALTER TABLE CHAT_MESSAGE  ADD CHAT_MESSAGE_SENDER NUMBER NULL;

COMMIT;



/* 게시판 댓글 샘플 데이터 생성 */
INSERT INTO "COMMENT"
VALUES(BOARD_COMMENT_NO, BOARD_COMMENT_CONTENT, BOARD_NO, BOARD_COMMENT_PARENT, MEMBER_NO)
JOIN "BOARD" USING(BOARD_NO);


INSERT INTO "BOARD_COMMENT"
(BOARD_COMMENT_NO, BOARD_COMMENT_CONTENT, BOARD_NO, BOARD_COMMENT_PARENT, MEMBER_NO)
VALUES
(SEQ_BOARD_COMMENT_NO.NEXTVAL, '테스트', 201, null, 6);
COMMIT;





/* 팀채팅 샘플 데이터 생성 */
INSERT INTO "CHAT" 
VALUES(11, DEFAULT, NULL, NULL, 11);


/* 1:1 채팅 샘플 데이터 생성 */
INSERT INTO "CHAT" 
VALUES(20, DEFAULT, 15, 6, NULL);
ROLLBACK;


COMMIT;


INSERT INTO "CHAT_MESSAGE"
VALUES(17, DEFAULT, '테스트ㅋ!', DEFAULT, 20, 15);

COMMIT;

INSERT INTO "CHAT_MESSAGE"
VALUES(1, DEFAULT, 'ㅎㅇㅎㅇ1', DEFAULT, 12, 6);
COMMIT;


/* 채팅 관련 테이블 드랍 및 추가 구문 */
DROP TABLE "CHAT";

CREATE TABLE "CHAT" (
	"CHAT_NO"	NUMBER		NOT NULL,
	"CHAT_DATE"	DATE	DEFAULT SYSDATE	NOT NULL,
	"MEMBER_NO"	NUMBER		NULL,
	"CHAT_OPEN_MEMBER"	NUMBER		NULL,
	"TEAM_NO"	NUMBER		NULL
);

COMMENT ON COLUMN "CHAT"."CHAT_NO" IS '채팅방 번호';

COMMENT ON COLUMN "CHAT"."CHAT_DATE" IS '채팅방 생성 날짜';

COMMENT ON COLUMN "CHAT"."MEMBER_NO" IS '1:1참여자 회원 번호';

COMMENT ON COLUMN "CHAT"."CHAT_OPEN_MEMBER" IS '개설 회원';

COMMENT ON COLUMN "CHAT"."TEAM_NO" IS '팀 코드 번호';

DROP TABLE "CHAT_MESSAGE";

CREATE TABLE "CHAT_MESSAGE" (
	"CHAT_MESSAGE_NO"	NUMBER		NOT NULL,
	"CHAT_MESSAGE_DATE"	DATE	DEFAULT SYSDATE	NOT NULL,
	"CHAT_MESSAGE_CONTENT"	NVARCHAR2(150)		NOT NULL,
	"CHAT_MESSAGE_READ"	NVARCHAR2(4)	DEFAULT '읽지않음'	NOT NULL,
	"CHAT_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "CHAT_MESSAGE"."CHAT_MESSAGE_NO" IS '채팅 메시지 번호';

COMMENT ON COLUMN "CHAT_MESSAGE"."CHAT_MESSAGE_DATE" IS '메시지 보낸 시간';

COMMENT ON COLUMN "CHAT_MESSAGE"."CHAT_MESSAGE_CONTENT" IS '채팅 메시지 내용';

COMMENT ON COLUMN "CHAT_MESSAGE"."CHAT_MESSAGE_READ" IS '메시지 읽음 여부';

COMMENT ON COLUMN "CHAT_MESSAGE"."CHAT_NO" IS '채팅방 번호';


DROP TABLE "CHAT_IMAGE";

CREATE TABLE "CHAT_IMAGE" (
	"CHAT_IMAGE_NO"	NUMBER		NOT NULL,
	"CHAT_IMAGE_DATE"	DATE	DEFAULT SYSDATE	NOT NULL,
	"CHAT_IMAGE_ROUTE"	NVARCHAR2(50)		NOT NULL,
	"CHAT_IMAGE_ONAME"	NVARCHAR2(100)		NOT NULL,
	"CHAT_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "CHAT_IMAGE"."CHAT_IMAGE_NO" IS '채팅 이미지 번호';

COMMENT ON COLUMN "CHAT_IMAGE"."CHAT_IMAGE_DATE" IS '이미지 업로드 날짜';

COMMENT ON COLUMN "CHAT_IMAGE"."CHAT_IMAGE_ROUTE" IS '채팅 이미지 경로';

COMMENT ON COLUMN "CHAT_IMAGE"."CHAT_IMAGE_ONAME" IS '이미지 원본 이름';

COMMENT ON COLUMN "CHAT_IMAGE"."CHAT_NO" IS '채팅방 번호';

DROP TABLE "CHAT_FILE";

CREATE TABLE "CHAT_FILE" (
	"CHAT_FILE_NO"	NUMBER		NOT NULL,
	"CHAT_UPLOAD_DATE"	DATE	DEFAULT SYSDATE	NOT NULL,
	"CHAT_FILE_ROUTE"	NVARCHAR2(50)		NOT NULL,
	"CHAT_FILE_ONAME"	NVARCHAR2(100)		NOT NULL,
	"CHAT_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "CHAT_FILE"."CHAT_FILE_NO" IS '채팅 파일 번호';

COMMENT ON COLUMN "CHAT_FILE"."CHAT_UPLOAD_DATE" IS '파일 업로드 날짜';

COMMENT ON COLUMN "CHAT_FILE"."CHAT_FILE_ROUTE" IS '채팅 파일 경로';

COMMENT ON COLUMN "CHAT_FILE"."CHAT_FILE_ONAME" IS '파일 원본 이름';

COMMENT ON COLUMN "CHAT_FILE"."CHAT_NO" IS '채팅방 번호';

ALTER TABLE "CHAT" ADD CONSTRAINT "PK_CHAT" PRIMARY KEY (
	"CHAT_NO"
);

ALTER TABLE "CHAT_MESSAGE" ADD CONSTRAINT "PK_CHAT_MESSAGE" PRIMARY KEY (
	"CHAT_MESSAGE_NO"
);

ALTER TABLE "CHAT_IMAGE" ADD CONSTRAINT "PK_CHAT_IMAGE" PRIMARY KEY (
	"CHAT_IMAGE_NO"
);

ALTER TABLE "CHAT_FILE" ADD CONSTRAINT "PK_CHAT_FILE" PRIMARY KEY (
	"CHAT_FILE_NO"
);


/* 채팅 시퀀스 넘버 생성 */
CREATE SEQUENCE SEQ_R00M_NO
INCREMENT BY 1
START WITH 21
MINVALUE 21
MAXVALUE 99999
NOCYCLE
NOCACHE
NOORDER;

COMMIT;



		SELECT CHAT_NO
		
			,(SELECT CHAT_MESSAGE_CONTENT FROM (
				SELECT * FROM CHAT_MESSAGE M2
				WHERE M2.CHAT_NO = R.CHAT_NO
				ORDER BY CHAT_MESSAGE_NO DESC) 
				WHERE ROWNUM = 1) LAST_MESSAGE
				
			,TO_CHAR(NVL((SELECT MAX(CHAT_MESSAGE_DATE) CHAT_MESSAGE_DATE 
					FROM CHAT_MESSAGE M
					WHERE R.CHAT_NO  = M.CHAT_NO), CHAT_DATE), 
					'YYYY.MM.DD') CHAT_MESSAGE_DATE
					
					
			,NVL2((SELECT CHAT_OPEN_MEMBER FROM CHAT R2
				WHERE R2.CHAT_NO = R.CHAT_NO
				AND R2.CHAT_OPEN_MEMBER = 6),
				R.MEMBER_NO,
				R.CHAT_OPEN_MEMBER
				) TARGET_NO	
				
				
			,NVL2((SELECT CHAT_OPEN_MEMBER FROM CHAT R2
				WHERE R2.CHAT_NO = R.CHAT_NO
				AND R2.CHAT_OPEN_MEMBER = 6),
				(SELECT MEMBER_NAME FROM MEMBER WHERE MEMBER_NO = R.MEMBER_NO),
				(SELECT MEMBER_NAME FROM MEMBER WHERE MEMBER_NO = R.CHAT_OPEN_MEMBER)
				) TARGET_NAME	
			,NVL2((SELECT CHAT_OPEN_MEMBER FROM CHAT R2
				WHERE R2.CHAT_NO = R.CHAT_NO
				AND R2.CHAT_OPEN_MEMBER = 6),
				(SELECT MEMBER_PROFILE FROM MEMBER WHERE MEMBER_NO = R.MEMBER_NO),
				(SELECT MEMBER_PROFILE FROM MEMBER WHERE MEMBER_NO = R.CHAT_OPEN_MEMBER)
				) TARGET_IMG
			,(SELECT COUNT(*) FROM CHAT_MESSAGE M WHERE M.CHAT_NO = R.CHAT_NO AND CHAT_MESSAGE_READ = '읽지않음' AND CHAT_MESSAGE_SENDER != 6) NOT_READ_COUNT
			,(SELECT MAX(CHAT_MESSAGE_NO) CHAT_MESSAGE_DATE FROM CHAT_MESSAGE M WHERE R.CHAT_NO  = M.CHAT_NO) MAX_MESSAGE_NO
		FROM CHAT R
		WHERE CHAT_OPEN_MEMBER = 6
		OR MEMBER_NO = 6
		ORDER BY MAX_MESSAGE_NO DESC NULLS LAST;
	
COMMIT;

/* 멤버 검색 버튼 회원이름/회원번호 조회 확인 구문 */
SELECT MEMBER_NO, MEMBER_ID, MEMBER_NAME, MEMBER_PROFILE  FROM "MEMBER"
WHERE (MEMBER_ID LIKE '%imbujang%' OR MEMBER_NAME LIKE '%송재철%')
AND MEMBER_DEL_FL = 'N'
AND MEMBER_NO != 6;


/* 채팅방 유무 조회 확인 구문 */
SELECT NVL(SUM(CHAT_NO),0) CHAT_NO FROM CHAT
		WHERE (CHAT_OPEN_MEMBER = 136 AND MEMBER_NO = 55)
		OR (CHAT_OPEN_MEMBER = 55 AND MEMBER_NO = 136);
	
SELECT SEQ_R00M_NO.NEXTVAL FROM DUAL;
RENAME SEQ_R00M_NO TO SEQ_ROOM_NO;
SELECT * FROM DEPARTMENT ;
SELECT * FROM TEAM ;



 
/* 외래키가 연결된 다른 컬럼 이름 조인되는지 확인 */
SELECT *
FROM CHAT_MESSAGE
JOIN MEMBER ON CHAT_MESSAGE.CHAT_MESSAGE_SENDER = MEMBER.MEMBER_NO;


/* 팀 채팅 조회 시 */
SELECT CHAT_MESSAGE_NO, CHAT_MESSAGE_CONTENT,
CHAT_MESSAGE_READ, CHAT_MESSAGE_SENDER,
"CHAT".CHAT_NO, "CHAT".TEAM_NO,
TO_CHAR(CHAT_MESSAGE_DATE, 'YYYY.MM.DD HH24:MI') CHAT_MESSAGE_DATE 
FROM CHAT_MESSAGE
JOIN MEMBER ON (CHAT_MESSAGE.CHAT_MESSAGE_SENDER = MEMBER.MEMBER_NO)
JOIN "CHAT" ON CHAT_MESSAGE.CHAT_NO = "CHAT".CHAT_NO 
WHERE "CHAT".TEAM_NO = 8;


SELECT MEMBER_NO, MEMBER_ID, MEMBER_NAME, TEAM_NO
FROM MEMBER;

SELECT COUNT(*) AS COMMENT_NO FROM BOARD_COMMENT 
JOIN BOARD ON BOARD_COMMENT.BOARD_NO = BOARD.BOARD_NO
WHERE BOARD.BOARD_NO = #{boardNo};



INSERT INTO CHAT_MESSAGE 
VALUES(SEQ_CHAT_MESSAGE_NO.NEXTVAL, DEFAULT, '테스트입니다', '읽지않음', SEQ_ROOM_NO.NEXTVAL);


INSERT INTO CHAT_MESSAGE 
VALUES(SEQ_CHAT_MESSAGE_NO.NEXTVAL, DEFAULT, '테스트입니다', '읽지않음', 2, 68);
COMMIT;

DELETE 
FROM CHAT
WHERE CHAT_NO = 11;
COMMIT;


SELECT TEAM_NO FROM CHAT R2
				WHERE R2.CHAT_NO = CHAT_NO
				AND R2.TEAM_NO = 3;

			
			SELECT COUNT(*) FROM "BOARD" B
		WHERE B.BOARD_DEL_FL = 'N'
		AND B.BOARD_CODE_NO = 1
		JOIN MEMBER M ON (B.MEMBER_NO=M.MEMBER_NO)
		WHERE M.MEMBER_NAME LIKE '관리자1' 
		OR B.BOARD_TITLE LIKE 'fff'
		ORDER BY M.MEMBER_NO;



SELECT COUNT(*) FROM "BOARD" B
JOIN MEMBER M ON (B.MEMBER_NO=M.MEMBER_NO)

WHERE B.BOARD_DEL_FL = 'N'
AND B.BOARD_CODE_NO = #{boardCodeNo}
AND (M.MEMBER_NAME LIKE '%${query}%'  OR B.BOARD_TITLE LIKE '%${query}%')
ORDER BY M.MEMBER_NO;


		SELECT B.BOARD_NO, B.BOARD_TITLE, B.BOARD_ATTACH, B.BOARD_HITS, M.MEMBER_NO, B.BOARD_CODE_NO,
		B.BOARD_WRITE_DATE, M.MEMBER_NAME
		FROM "BOARD" B
		JOIN MEMBER M ON (B.MEMBER_NO=M.MEMBER_NO)
		
		WHERE B.BOARD_DEL_FL = 'N'
		AND B.BOARD_CODE_NO = 1
		AND (M.MEMBER_NAME LIKE '작성자'  OR B.BOARD_TITLE LIKE 'fff')
		ORDER BY M.MEMBER_NO;
	
	
UPDATE "MEMBER" SET
	MEMBER_NAME = '우지훈!',
	GRADE_NO = 0,
	TEAM_NO = 0,
	DEPARTMENT_NO = 0,
	STORE_NO = 0
WHERE MEMBER_NO = 10; 
	
UPDATE "MEMBER" SET
	MEMBER_NAME = '홍우준',
	GRADE_NO = 1,
	TEAM_NO = 0,
	DEPARTMENT_NO = 0
	WHERE MEMBER_NO=23;
	COMMIT;

	ROLLBACK;


SELECT TEAM_NO FROM CHAT R2
				WHERE R2.CHAT_NO = CHAT_NO
				AND R2.TEAM_NO  = 8;

SELECT CHAT_NO,
    (SELECT CHAT_MESSAGE_CONTENT FROM (
        SELECT * FROM CHAT_MESSAGE M2
        WHERE M2.CHAT_NO = R.CHAT_NO
        ORDER BY CHAT_MESSAGE_NO DESC) 
        WHERE ROWNUM = 1) AS LAST_MESSAGE,
    TO_CHAR(NVL((SELECT MAX(CHAT_MESSAGE_DATE) CHAT_MESSAGE_DATE 
            FROM CHAT_MESSAGE M
            WHERE R.CHAT_NO  = M.CHAT_NO), CHAT_DATE), 
            'YYYY.MM.DD') AS CHAT_MESSAGE_DATE,
    CASE WHEN teamNo = 0 THEN
        NVL2((SELECT CHAT_OPEN_MEMBER FROM CHAT R2
            WHERE R2.CHAT_NO = R.CHAT_NO
            AND R2.CHAT_OPEN_MEMBER = 6),
        R.MEMBER_NO,
        R.CHAT_OPEN_MEMBER)
    ELSE
        NVL2((SELECT TEAM_NO FROM CHAT R2
            WHERE R2.CHAT_NO = CHAT_NO
            AND R2.TEAM_NO  = 8)
        )
    END AS TARGET_NO,
    CASE WHEN teamNo = 0 THEN
        NVL2((SELECT CHAT_OPEN_MEMBER FROM CHAT R2
            WHERE R2.CHAT_NO = R.CHAT_NO
            AND R2.CHAT_OPEN_MEMBER = 6),
        (SELECT MEMBER_NAME FROM MEMBER WHERE MEMBER_NO = R.MEMBER_NO),
        (SELECT MEMBER_NAME FROM MEMBER WHERE MEMBER_NO = R.CHAT_OPEN_MEMBER))
    ELSE
        NVL2((SELECT TEAM_NO FROM CHAT R2
            WHERE R2.CHAT_NO = CHAT_NO
            AND R2.TEAM_NO = 8),
        (SELECT MEMBER_NAME FROM MEMBER WHERE MEMBER_NO = R.MEMBER_NO),
        (SELECT MEMBER_NAME FROM MEMBER WHERE MEMBER_NO = R.TEAM_NO))
    END AS TARGET_NAME,
    CASE WHEN TEAM_NO = 8 THEN
        NVL2((SELECT CHAT_OPEN_MEMBER FROM CHAT R2
            WHERE R2.CHAT_NO = R.CHAT_NO
            AND R2.CHAT_OPEN_MEMBER = 6),
        (SELECT MEMBER_PROFILE FROM MEMBER WHERE MEMBER_NO = R.MEMBER_NO),
        (SELECT MEMBER_PROFILE FROM MEMBER WHERE MEMBER_NO = R.CHAT_OPEN_MEMBER))
    ELSE
        NVL2((SELECT TEAM_NO FROM CHAT R2
            WHERE R2.CHAT_NO = CHAT_NO
            AND R2.TEAM_NO = 8),
        (SELECT MEMBER_PROFILE FROM MEMBER WHERE MEMBER_NO = R.MEMBER_NO),
        (SELECT MEMBER_PROFILE FROM MEMBER WHERE MEMBER_NO = R.TEAM_NO))
    END AS TARGET_IMG,
    (SELECT COUNT(*) FROM CHAT_MESSAGE M WHERE M.CHAT_NO = R.CHAT_NO AND CHAT_MESSAGE_READ = '읽지않음' AND CHAT_MESSAGE_SENDER != 6) AS NOT_READ_COUNT,
    (SELECT MAX(CHAT_MESSAGE_NO) CHAT_MESSAGE_DATE FROM CHAT_MESSAGE M WHERE R.CHAT_NO  = M.CHAT_NO) AS MAX_CHAT_MESSAGE_NO
FROM CHAT R
WHERE CHAT_OPEN_MEMBER = 6
OR MEMBER_NO = 6
ORDER BY MAX_CHAT_MESSAGE_NO DESC NULLS LAST;

SELECT * FROM MEMBER;

 
/* 업데이트 커밋 후 데이터 다시 살려내는 법(15분 / 30분 / 1일 단위 조회) */
UPDATE "MEMBER" M1 SET
DEPARTMENT_NO = (SELECT DEPARTMENT_NO
  FROM "MEMBER" AS OF TIMESTAMP(SYSTIMESTAMP-INTERVAL '15' MINUTE)
  WHERE M1.MEMBER_NO = MEMBER_NO);

COMMIT;

SELECT CHAT_MESSAGE_NO, CHAT_MESSAGE_CONTENT, CHAT_MESSAGE_READ, CHAT_MESSAGE_SENDER, CHAT_NO,
		TO_CHAR(CHAT_MESSAGE_DATE, 'YYYY.MM.DD HH24:MI') CHAT_MESSAGE_DATE, MEMBER_PROFILE, MEMBER_NAME
		FROM CHAT_MESSAGE
		JOIN MEMBER ON (MEMBER_NO = CHAT_MESSAGE_SENDER)
		WHERE CHAT_NO  = 8
		ORDER BY CHAT_MESSAGE_NO;
		
		
	
DELETE FROM MEMBER
WHERE MEMBER_NO = 87;
COMMIT;
		
		
		
		
		
		
		
		
		
		
SELECT CHAT_MESSAGE_NO, CHAT_MESSAGE_CONTENT, "MEMBER".MEMBER_PROFILE, "MEMBER".MEMBER_NAME, 
    CHAT_MESSAGE_SENDER, "MEMBER".MEMBER_NO,
    "CHAT".CHAT_NO, "CHAT".TEAM_NO,
    TO_CHAR(CHAT_MESSAGE_DATE, 'YYYY.MM.DD HH24:MI') CHAT_MESSAGE_DATE 
FROM CHAT_MESSAGE
LEFT JOIN "MEMBER" ON CHAT_MESSAGE.CHAT_MESSAGE_SENDER = "MEMBER".MEMBER_NO
JOIN "CHAT" ON CHAT_MESSAGE.CHAT_NO = "CHAT".CHAT_NO 
WHERE "CHAT".TEAM_NO = 8;
		