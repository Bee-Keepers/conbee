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


/* 점주 계정 */
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
'01012341234', NULL, 1, DEFAULT, DEFAULT, 10, 4, 3);
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'test05', '123123', 'test05@test.com', '사장', '04540^^^서울시 중구 남대문로 120^^^4층',
'01012341234', NULL, 1, DEFAULT, DEFAULT, 10, 4, 3);

DELETE FROM "MEMBER" ;
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





SELECT * FROM "MEMBER";


/* 관리자 계정 생성 확인 및 로그인 가능 여부 체크 */
SELECT MEMBER_NO, MEMBER_ID, MEMBER_PW, MEMBER_EMAIL, MEMBER_NAME, MEMBER_ADDRESS,
MEMBER_TEL, MEMBER_PROFILE, MEMBER_AUTHORITY, 
	TO_CHAR(MEMBER_ENROLL_DATE, 'YYYY"년" MM"월" DD"일" HH24"시" MI"분" SS"초"') ENROLL_DATE
FROM "MEMBER"
WHERE MEMBER_DEL_FL = 'N'
		 AND MEMBER_ID = 'admin';