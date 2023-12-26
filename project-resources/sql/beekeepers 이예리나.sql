-- 전체 점포정보조회
SELECT STORE_NO , STORE_NAME , STORE_TEL , STORE_ADDRESS , STORE_RUN_FL , MEMBER_NO , MEMBER_NAME
FROM STORE
JOIN "MEMBER" USING (MEMBER_NO)
;

COMMIT;

SELECT COUNT(*)
FROM STORE s ;

-- 점포 등록
INSERT INTO STORE
VALUES(SEQ_STORE_NO.NEXTVAL, '중구명동점', '서울 중구 퇴계로 114-1, 1 2층',
	'027131460', DEFAULT, DEFAULT, NULL, 7);
	
INSERT INTO STORE
VALUES(SEQ_STORE_NO.NEXTVAL, '명동화이자점', '서울 중구 퇴계로 105 (충무로1가)',
	'027131460', DEFAULT, DEFAULT, NULL, 10);
	
INSERT INTO STORE
VALUES(SEQ_STORE_NO.NEXTVAL, '남산쌍용점', '서울 중구 소공로 46 (회현동2가, 쌍용남산플래티넘) 쌍용남산플래티넘',
	'023161460', DEFAULT, DEFAULT, NULL, 11);
	
INSERT INTO STORE
VALUES(SEQ_STORE_NO.NEXTVAL, '종로센터점', '서울 종로구 종로 78 미려빌딩',
	'0214531460', DEFAULT, DEFAULT, NULL, 12);
	
INSERT INTO STORE
VALUES(SEQ_STORE_NO.NEXTVAL, '남산회현점', '서울 중구 퇴계로10길 20 (회현동1가)',
	'021231460', DEFAULT, DEFAULT, NULL, 13);
	
INSERT INTO STORE
VALUES(SEQ_STORE_NO.NEXTVAL, '한국은행점', '서울 중구 남대문로 39',
	'027131343', DEFAULT, DEFAULT, NULL, 14);
	
INSERT INTO STORE
VALUES(SEQ_STORE_NO.NEXTVAL, '마포환일길점', '서울 마포구 환일길 39 (아현동)',
	'023141460', DEFAULT, DEFAULT, NULL, 15);
	
INSERT INTO STORE
VALUES(SEQ_STORE_NO.NEXTVAL, '청구역점', '서울 중구 청구로 94 (신당동)',
	'0222326380', DEFAULT, DEFAULT, NULL, 16);
<<<<<<< HEAD
	
=======
	



-- 검색어가 일치하는 점포정보조회
SELECT *
FROM STORE
JOIN "MEMBER" USING (MEMBER_NO)
WHERE STORE_NAME LIKE '%2%' OR
STORE_TEL LIKE '%2%' OR
STORE_ADDRESS LIKE '%2%' OR
MEMBER_NAME LIKE  '%2%'
;

-- 검색어가 일치하는 점포 갯수
SELECT COUNT(*) 
FROM STORE
JOIN "MEMBER" USING (MEMBER_NO)
WHERE STORE_NAME LIKE '%2%' OR
STORE_TEL LIKE '%2%' OR
STORE_ADDRESS LIKE '%2%' OR
MEMBER_NAME LIKE  '%2%'
;

-- 점포 운영상태 바꾸기
UPDATE STORE SET
STORE_RUN_FL = 'Y'
WHERE STORE_NO = 1;

ROLLBACK;

SELECT * FROM STORE; 
WHERE STORE_NO = 5;

-- 점포 인서트
INSERT INTO STORE
VALUES(SEQ_STORE_NO.NEXTVAL, '하둘셋넷다여일여아점', '서울 중구 청구로 94 (신당동)',
	'01023121235', DEFAULT, DEFAULT, NULL, 16);

INSERT INTO STORE
VALUES(SEQ_STORE_NO.NEXTVAL, '인서트테스트점', '서울시 중구 어쩌구저쩌구',
	'01012345678', DEFAULT, DEFAULT, NULL, NULL);


SELECT STORE_NO , STORE_NAME , STORE_TEL , STORE_ADDRESS , STORE_RUN_FL , NVL2(MEMBER_NO, '없음', MEMBER_NO) , NVL(MEMBER_NAME, '없음', MEMBER_NAME)
FROM STORE
JOIN "MEMBER" USING (MEMBER_NO)
ORDER BY STORE_NO;

-- 멤버넘버 없는 경우까지 포함하여 점포정보 얻어오기
SELECT STORE_NO, STORE_NAME, STORE_TEL, STORE_ADDRESS, STORE_RUN_FL, 
       CASE 
	       WHEN MEMBER_NO IS NULL
	       THEN NULL
	       ELSE MEMBER_NO
	   END MEMBER_NO,
       CASE
	       WHEN MEMBER_NO IS NOT NULL
	       THEN M.MEMBER_NAME
	    END MEMBER_NAME
FROM STORE
LEFT JOIN "MEMBER" M USING (MEMBER_NO)
ORDER BY STORE_NO
;

-- memberNo가 없는 경우에도 count가 될 수 있도록 하기
SELECT COUNT(*)
FROM STORE
LEFT JOIN "MEMBER" USING (MEMBER_NO)
WHERE STORE_NAME LIKE '%인서트%' OR
STORE_TEL LIKE '%인서트%' OR
STORE_ADDRESS LIKE '%인서트%' OR
MEMBER_NAME LIKE  '%인서트%';


UPDATE STORE SET
MEMBER_NO = 10
WHERE STORE_NO = 17;


ROLLBACK;

SELECT *
FROM "MEMBER"
WHERE MEMBER_NO = 21;

SELECT *
FROM STORE
WHERE MEMBER_NO = 21;

SELECT COUNT(*) 
FROM "MEMBER"
WHERE MEMBER_NO = 25;



COMMIT;

--점포명 중복검사
SELECT COUNT(*) 
FROM STORE
WHERE STORE_RUN_FL = 'Y' AND
STORE_NAME = '서울시구가지점'
;

-- 점포전화번호 중복검사
SELECT COUNT(*) 
FROM STORE
WHERE STORE_TEL = '027131460';

-- 점포 주소 중복검사
SELECT COUNT(*) 
FROM STORE
WHERE STORE_ADDRESS = '서울 중구 퇴계로 105 (충무로1가)'
;


--점포 정보 업데이트
UPDATE STORE SET
STORE_NAME = '반송그리점',
MEMBER_NO = 26,
STORE_TEL = '0104628501',
STORE_ADDRESS ='점포정보수정테스트중 주소입니다'
WHERE STORE_NO = 10
;

SELECT * FROM STORE s ;
WHERE STORE_NO =10;

COMMIT;
ROLLBACK;

SELECT * 
FROM "MEMBER"
JOIN STORE USING (MEMBER_NO)
WHERE MEMBER_NO = 16;

-- 점주명 정보 수정
UPDATE "MEMBER" SET
MEMBER_NAME = '수정된점주명'
WHERE MEMBER_NO = 26;

-- 회원정보 INSERT test
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'test', '123123', '123@admin.com', '테스트임', '주소주소주소주소',
'01012312234', NULL, 1, DEFAULT, DEFAULT, 11, 5, 6);
COMMIT;

MERGE INTO STORE S
USING MEMBER M ON (S.MEMBER_NO = M.MEMBER_NO)
WHEN MATCHED THEN
	
ALTER TABLE STORE;



-- 점포번호순 정렬
SELECT STORE_NO, STORE_NAME, STORE_TEL, STORE_ADDRESS, STORE_RUN_FL, 
       CASE 
	       WHEN MEMBER_NO IS NULL
	       THEN NULL
	       ELSE MEMBER_NO
	   END MEMBER_NO,
       CASE
	       WHEN MEMBER_NO IS NOT NULL
	       THEN M.MEMBER_NAME
	    END MEMBER_NAME
FROM STORE
LEFT JOIN "MEMBER" M USING (MEMBER_NO)
		WHERE STORE_NAME LIKE '%%' OR
		STORE_TEL LIKE '%%' OR
		STORE_ADDRESS LIKE '%%' OR
		MEMBER_NAME LIKE  '%%'
ORDER BY STORE_NO
;


--점포명순 정렬
SELECT STORE_NO, STORE_NAME, STORE_TEL, STORE_ADDRESS, STORE_RUN_FL, 
   CASE 
       WHEN MEMBER_NO IS NULL
       THEN NULL
       ELSE MEMBER_NO
   END MEMBER_NO,
   CASE
       WHEN MEMBER_NO IS NOT NULL
       THEN M.MEMBER_NAME
    END MEMBER_NAME
FROM STORE
LEFT JOIN "MEMBER" M USING (MEMBER_NO)
WHERE STORE_NAME LIKE '%%' OR
STORE_TEL LIKE '%%' OR
STORE_ADDRESS LIKE '%%' OR
MEMBER_NAME LIKE  '%%'
ORDER BY STORE_NAME;


-- 점포테이블에 runApproval(폐점승인여부) 컬럼 추가
ALTER TABLE STORE
ADD STORE_RUN_APPROVAL CHAR(1) DEFAULT 'N' CHECK (STORE_RUN_APPROVAL IN ('Y', 'N'));

ALTER TABLE STORE
DROP COLUMN STORE_RUN_APPROVAL;

ALTER TABLE DOC_STORE
ADD FOREIGN KEY(STORE_NO)
REFERENCES STORE(STORE_NO);

ALTER TABLE DOC_STORE
ADD STORE_NO NUMBER;

COMMIT;

-- 폐점승인여부 승인시(Y) 점포운영상태 폐쇄(N)로 바꾸는 트리거
CREATE TRIGGER TRG_STORE_RUN
AFTER UPDATE OF STORE_RUN_APPROVAL ON STORE
FOR EACH ROW
	BEGIN
		IF :NEW.STORE_RUN_APPROVAL = 'Y'
		THEN 
			UPDATE STORE SET STORE_RUN_FL = 'N'
			WHERE STORE_NO = :NEW.STORE_NO;
		END IF;
	END;

-- 작동댐!
CREATE OR REPLACE TRIGGER TRG_STORE_RUN
BEFORE UPDATE OF STORE_RUN_APPROVAL ON STORE
FOR EACH ROW
	BEGIN
	  IF :NEW.STORE_RUN_APPROVAL = 'Y' THEN
	     :NEW.STORE_RUN_FL := 'N';
	  END IF;
	END;



-- 트리거 활성화
ALTER TRIGGER TRG_STORE_RUN ENABLE;

DROP TRIGGER TRG_STORE_RUN;
	

-- 운영상태 바꾸기
UPDATE STORE SET
STORE_RUN_FL = 'N'
WHERE STORE_RUN_APPROVAL = 'Y';

COMMIT;

-- 운영폐쇄 트리거 테스트(폐점승인 시 자동 폐쇄)
UPDATE STORE SET
STORE_RUN_APPROVAL = 'Y'
WHERE STORE_NO = 3;

SELECT * FROM MEMBER;
-- 사장, 부사장 회원정보변경
UPDATE MEMBER SET
MEMBER_NAME = '윤성민'
WHERE MEMBER_NO =11;

-- 팀장 인서트
-- 인사관리부 직원 인서트
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'mate', '$2a$10$xlsemZtWCryE7fTgWUVVfemE2RnzTXp1mXvmjVq6hmmZHrp6vsuQi', '12@admin.com', '박정훈', '주소주소주소주소',
'01012312239', NULL, 1, DEFAULT, DEFAULT, 1, 1, 5);

INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'mate1', '$2a$10$xlsemZtWCryE7fTgWUVVfemE2RnzTXp1mXvmjVq6hmmZHrp6vsuQi', '12@admin.com', '김상철', '주소주소주소주소',
'01012312239', NULL, 1, DEFAULT, DEFAULT, 2, 1, 5);

INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'mate2', '$2a$10$xlsemZtWCryE7fTgWUVVfemE2RnzTXp1mXvmjVq6hmmZHrp6vsuQi', '12@admin.com', '유상관', '주소주소주소주소',
'01012312239', NULL, 1, DEFAULT, DEFAULT, 3, 1, 5);

-- 경영관리부 직원 인서트
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'mate3', '$2a$10$xlsemZtWCryE7fTgWUVVfemE2RnzTXp1mXvmjVq6hmmZHrp6vsuQi', '12@admin.com', '최한울', '주소주소주소주소',
'01012312236', NULL, 1, DEFAULT, DEFAULT, 4, 2, 5);

INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'mate4', '$2a$10$xlsemZtWCryE7fTgWUVVfemE2RnzTXp1mXvmjVq6hmmZHrp6vsuQi', '12@admin.com', '이서', '주소주소주소주소',
'01012312236', NULL, 1, DEFAULT, DEFAULT, 5, 2, 5);

INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'mate5', '$2a$10$xlsemZtWCryE7fTgWUVVfemE2RnzTXp1mXvmjVq6hmmZHrp6vsuQi', '12@admin.com', '조상균', '주소주소주소주소',
'01012312236', NULL, 1, DEFAULT, DEFAULT, 6, 2, 5);

INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'mate6', '$2a$10$xlsemZtWCryE7fTgWUVVfemE2RnzTXp1mXvmjVq6hmmZHrp6vsuQi', '12@admin.com', '유정서', '주소주소주소주소',
'01012312236', NULL, 1, DEFAULT, DEFAULT, 7, 2, 5);

-- 운영관리부 직원 인서트
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'mate7', '$2a$10$xlsemZtWCryE7fTgWUVVfemE2RnzTXp1mXvmjVq6hmmZHrp6vsuQi', '12@admin.com', '김민준', '주소주소주소주소',
'01012312237', NULL, 1, DEFAULT, DEFAULT, 8, 3, 5);

INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'mate8', '$2a$10$xlsemZtWCryE7fTgWUVVfemE2RnzTXp1mXvmjVq6hmmZHrp6vsuQi', '12@admin.com', '이윤지', '주소주소주소주소',
'01012312237', NULL, 1, DEFAULT, DEFAULT, 9, 3, 5);

-- 고객관리부 직원 인서트
INSERT INTO "MEMBER"
VALUES(SEQ_MEMBER_NO.NEXTVAL, 'mate9', '$2a$10$xlsemZtWCryE7fTgWUVVfemE2RnzTXp1mXvmjVq6hmmZHrp6vsuQi', '12@admin.com', '윤정호', '주소주소주소주소',
'01012312238', NULL, 1, DEFAULT, DEFAULT, 10, 4, 5);

DELETE FROM "MEMBER"
WHERE MEMBER_NO = 78;


-- 부장 팀코드 null로 업데이트
UPDATE "MEMBER" SET
TEAM_NO = NULL
WHERE GRADE_NO = 2
;

COMMIT;


-- 회원조회
SELECT MEMBER_NO, MEMBER_NAME , DEPARTMENT_NO , TEAM_NO , GRADE_NO  , MEMBER_ID 
FROM "MEMBER" 
WHERE MEMBER_NO = 55;

-- 결재대기함 문서 조회

-- 예시
SELECT APPROVAL_NO, DOC_CATEGORY_GROUP , DOC_CATEGORY_SORT, APPROVAL_TITLE, MEMBER_NAME, APPROVAL_DATE
FROM APPROVAL
JOIN DOC_CATEGORY USING(DOC_CATEGORY_NO)
JOIN MEMBER USING(MEMBER_NO)
WHERE MEMBER_NO = #{memberNo}
AND APPROVAL_CONDITION =0
ORDER BY APPROVAL_DATE DESC;


-- 결재대기함 문서 조회
SELECT AL.APPROVAL_NO , AL.APPROVAL_DATE , AL.APPROVAL_TITLE , 
D.DOC_CATEGORY_GROUP , D.DOC_CATEGORY_SORT, 
(SELECT MEMBER_NAME FROM MEMBER M WHERE AL.MEMBER_NO = M.MEMBER_NO) MEMBER_NAME, -- 기안자의 이름
(SELECT TEAM_NAME FROM MEMBER M
JOIN TEAM T ON (M.TEAM_NO = T.TEAM_NO)
WHERE AL.MEMBER_NO = M.MEMBER_NO) TEAM_NAME ,
(SELECT DEPARTMENT_NAME FROM MEMBER M
JOIN DEPARTMENT D ON (D.DEPARTMENT_NO = M.DEPARTMENT_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) DEPARTMENT_NAME,
(SELECT MEMBER_NAME
FROM (SELECT MEMBER_NAME
FROM APPROVER
JOIN MEMBER USING (MEMBER_NO)
WHERE APPROVAL_NO = AL.APPROVAL_NO
ORDER BY APPROVER_ORDER DESC)
WHERE ROWNUM = 1) FINAL_APPROVER_NAME --최종결재자 이름
FROM APPROVAL AL
JOIN APPROVER AR ON (AL.APPROVAL_NO = AR.APPROVAL_NO)
JOIN DOC_CATEGORY D ON (AL.DOC_CATEGORY_NO = D.DOC_CATEGORY_NO)
WHERE AR.MEMBER_NO = 55 -- 상급자(로그인멤버)의 회원번호
AND APPROVAL_DELETE = 0 -- 삭제되지 않은 문서
AND APPROVAL_CONDITION = 0 -- 미승인 문서
AND AR.APPROVER_CONDITION = 0 --상급자(로그인멤버)가 미승인한 문서-->
AND AR.MEMBER_NO = (SELECT MEMBER_NO FROM (
SELECT *
FROM APPROVER AR
WHERE AR.APPROVER_CONDITION = 0
AND AR.APPROVAL_NO = AL.APPROVAL_NO
ORDER BY AR.APPROVER_ORDER)
WHERE ROWNUM =1)

ORDER BY APPROVAL_DATE DESC
;

-- 결재목록 중에서 결재상태가 0인 것들 중 가장 순서가 빠른 결재자 회원번호 찾기
(SELECT MEMBER_NO FROM (
SELECT *
FROM APPROVER AR
WHERE AR.APPROVER_CONDITION = 0
AND AR.APPROVAL_NO = 115
ORDER BY AR.APPROVER_ORDER)
WHERE ROWNUM =1)
;

-- 나에게 온 결재대기함 문서마다 내 결재 순서가 몇번인지?
SELECT APPROVER_ORDER
FROM APPROVER AR
WHERE APPROVAL_NO = 86
AND MEMBER_NO = 55;




-- APPROVAL 리스트 중에서 결재자 차례가 된 문서들 불러오기
SELECT *
FROM APPROVAL AL
JOIN APPROVER AR USING (AL.APPROVAL_NO = AR.APPROVAL_NO)
WHERE APPROVAL_NO = 6;

SELECT *
FROM APPROVAL
WHERE APPROVER_NO = (SELECT APPROVER_NO FROM (
SELECT *
FROM APPROVER AR
WHERE APPROVER_CONDITION = 0
AND AR.APPROVAL_NO = 71
ORDER BY AR.APPROVER_ORDER)
WHERE ROWNUM =1);



-- 결재문서 승인/반려하기
UPDATE APPROVER SET 
APPROVER_CONDITION = 2,
WHERE MEMBER_NO = 55
AND APPROVAL_NO = 31;

-- 결재문서 반려사유 입력하기
UPDATE APPROVAL SET 
APPROVAL_RETURN_COMMENT = 'dkdkdkdkdkdk'
WHERE APPROVAL_NO = 29;

COMMIT;

-- 결재문서 승인/반려 완료하기
UPDATE APPROVAL SET 
APPROVAL_CONDITION = 4
WHERE APPROVAL_NO = 23;

SELECT *
FROM APPROVER
WHERE APPROVAL_NO =31;

SELECT *
FROM APPROVAL
WHERE APPROVAL_NO =35;

-- 팀 번호에 따라서 팀명 가져오기
SELECT TEAM_NAME, DEPARTMENT_NAME
FROM MEMBER M
JOIN TEAM T ON (M.TEAM_NO = T.TEAM_NO)
JOIN DEPARTMENT D ON (D.DEPARTMENT_NO = M.DEPARTMENT_NO)
WHERE MEMBER_NO=9;


-- 결재문서번호의 최종 결재자 이름 불러오기
SELECT APPROVAL_NO, MEMBER_NO, APPROVER_ORDER, MEMBER_NAME
FROM (SELECT APPROVAL_NO, MEMBER_NO, APPROVER_ORDER, MEMBER_NAME
FROM APPROVER
JOIN MEMBER USING (MEMBER_NO)
WHERE APPROVAL_NO = 19
ORDER BY APPROVER_ORDER DESC)
WHERE ROWNUM = 1;



-- 결재진행함 문서 조회
SELECT AL.APPROVAL_NO , AL.APPROVAL_DATE , AL.APPROVAL_TITLE , 
D.DOC_CATEGORY_GROUP , D.DOC_CATEGORY_SORT,
(SELECT MEMBER_NAME FROM MEMBER M WHERE AL.MEMBER_NO = M.MEMBER_NO) MEMBER_NAME, -- 기안자의 이름
(SELECT TEAM_NAME FROM MEMBER M
JOIN TEAM T ON (M.TEAM_NO = T.TEAM_NO)
WHERE AL.MEMBER_NO = M.MEMBER_NO) TEAM_NAME ,
(SELECT DEPARTMENT_NAME FROM MEMBER M
JOIN DEPARTMENT D ON (D.DEPARTMENT_NO = M.DEPARTMENT_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) DEPARTMENT_NAME,
(SELECT MEMBER_NAME
FROM (SELECT MEMBER_NAME
FROM APPROVER
JOIN MEMBER USING (MEMBER_NO)
WHERE APPROVAL_NO = AL.APPROVAL_NO
ORDER BY APPROVER_ORDER DESC)
WHERE ROWNUM = 1) FINAL_APPROVER_NAME --최종결재자 이름
FROM APPROVAL AL
JOIN APPROVER AR ON (AL.APPROVAL_NO = AR.APPROVAL_NO)
JOIN DOC_CATEGORY D ON (AL.DOC_CATEGORY_NO = D.DOC_CATEGORY_NO)
WHERE AR.MEMBER_NO = 55 -- 상급자(로그인멤버)의 회원번호
AND APPROVAL_DELETE = 0 -- 삭제되지 않은 문서
AND APPROVAL_CONDITION = 0 -- 결재중인 문서
AND AR.APPROVER_CONDITION = 1 -- 상급자(로그인멤버)가 승인한 문서
ORDER BY APPROVAL_DATE DESC
;

-- 완료문서함 조회
-- 1) 결재승인권한자가 조회하는 완료문서
SELECT AL.APPROVAL_NO , AL.APPROVAL_DATE , AL.APPROVAL_TITLE ,
D.DOC_CATEGORY_GROUP , D.DOC_CATEGORY_SORT, 
(SELECT MEMBER_NAME FROM MEMBER M WHERE AL.MEMBER_NO = M.MEMBER_NO) MEMBER_NAME, -- 기안자의 이름
(SELECT TEAM_NAME FROM MEMBER M
JOIN TEAM T ON (M.TEAM_NO = T.TEAM_NO)
WHERE AL.MEMBER_NO = M.MEMBER_NO) TEAM_NAME ,
(SELECT DEPARTMENT_NAME FROM MEMBER M
JOIN DEPARTMENT D ON (D.DEPARTMENT_NO = M.DEPARTMENT_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) DEPARTMENT_NAME,
(SELECT MEMBER_NAME
FROM (SELECT MEMBER_NAME
FROM APPROVER
JOIN MEMBER USING (MEMBER_NO)
WHERE APPROVAL_NO = AL.APPROVAL_NO
ORDER BY APPROVER_ORDER DESC)
WHERE ROWNUM = 1) FINAL_APPROVER_NAME --최종결재자 이름
FROM APPROVAL AL
JOIN APPROVER AR ON (AL.APPROVAL_NO = AR.APPROVAL_NO)
JOIN DOC_CATEGORY D ON (AL.DOC_CATEGORY_NO = D.DOC_CATEGORY_NO)
JOIN MEMBER M ON (M.MEMBER_NO = AL.MEMBER_NO)
WHERE AR.MEMBER_NO = 55 -- 상급자(로그인멤버)의 회원번호
AND APPROVAL_DELETE = 0 -- 삭제되지 않은 문서
AND APPROVAL_CONDITION = 4 -- 결재완료된 문서
AND AR.APPROVER_CONDITION = 1 -- 상급자(로그인멤버)가 승인한 문서
ORDER BY APPROVAL_DATE DESC
;

-- 2) 기안자가 조회하는 결재완료문서
SELECT APPROVAL_NO, APPROVAL_TITLE, APPROVAL_DATE, MEMBER_NAME ,DOC_CATEGORY_GROUP , DOC_CATEGORY_SORT, T.TEAM_NAME, D.DEPARTMENT_NAME,
(SELECT MEMBER_NAME
FROM (SELECT MEMBER_NAME
FROM APPROVER
JOIN MEMBER USING (MEMBER_NO)
WHERE APPROVAL_NO = A.APPROVAL_NO
ORDER BY APPROVER_ORDER DESC)
WHERE ROWNUM = 1) FINAL_APPROVER_NAME --최종결재자 이름
FROM APPROVAL A
JOIN MEMBER M ON (M.MEMBER_NO = A.MEMBER_NO)
JOIN DOC_CATEGORY USING(DOC_CATEGORY_NO)
LEFT JOIN TEAM T ON (M.TEAM_NO = T.TEAM_NO)
LEFT JOIN DEPARTMENT D ON (M.DEPARTMENT_NO = D.DEPARTMENT_NO)
WHERE A.MEMBER_NO = 55
AND APPROVAL_CONDITION =4
ORDER BY APPROVAL_DATE DESC
;



-- 반려문서함 조회
-- 1) 결재승인권한자가 조회하는 반려문서
SELECT AL.APPROVAL_NO , AL.APPROVAL_DATE , AL.APPROVAL_TITLE , AL.DOC_CATEGORY_NO,
D.DOC_CATEGORY_GROUP , D.DOC_CATEGORY_SORT, 
(SELECT MEMBER_NAME FROM MEMBER M WHERE AL.MEMBER_NO = M.MEMBER_NO) MEMBER_NAME, -- 기안자의 이름
(SELECT TEAM_NAME FROM MEMBER M
JOIN TEAM T ON (M.TEAM_NO = T.TEAM_NO)
WHERE AL.MEMBER_NO = M.MEMBER_NO) TEAM_NAME ,
(SELECT DEPARTMENT_NAME FROM MEMBER M
JOIN DEPARTMENT D ON (D.DEPARTMENT_NO = M.DEPARTMENT_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) DEPARTMENT_NAME,
(SELECT MEMBER_NAME
FROM (SELECT MEMBER_NAME
FROM APPROVER
JOIN MEMBER USING (MEMBER_NO)
WHERE APPROVAL_NO = AL.APPROVAL_NO
ORDER BY APPROVER_ORDER DESC)
WHERE ROWNUM = 1) FINAL_APPROVER_NAME --최종결재자 이름
FROM APPROVAL AL
JOIN APPROVER AR ON (AL.APPROVAL_NO = AR.APPROVAL_NO)
JOIN DOC_CATEGORY D ON (AL.DOC_CATEGORY_NO = D.DOC_CATEGORY_NO)
JOIN MEMBER M ON (M.MEMBER_NO = AL.MEMBER_NO)
WHERE AR.MEMBER_NO = 55 -- 상급자(로그인멤버)의 회원번호
AND APPROVAL_DELETE = 0 -- 삭제되지 않은 문서
AND APPROVAL_CONDITION = 3 -- 반려된 문서
AND AR.APPROVER_CONDITION = 2 -- 상급자(로그인멤버)가 반려한 문서
ORDER BY APPROVAL_DATE DESC
;

-- 2) 기안자가 조회하는 반려문서
SELECT APPROVAL_NO, APPROVAL_TITLE, APPROVAL_DATE, DOC_CATEGORY_NO, MEMBER_NAME ,DOC_CATEGORY_GROUP , DOC_CATEGORY_SORT, T.TEAM_NAME, D.DEPARTMENT_NAME,
(SELECT MEMBER_NAME
FROM (SELECT MEMBER_NAME
FROM APPROVER
JOIN MEMBER USING (MEMBER_NO)
WHERE APPROVAL_NO = A.APPROVAL_NO
ORDER BY APPROVER_ORDER DESC)
WHERE ROWNUM = 1) FINAL_APPROVER_NAME --최종결재자 이름
FROM APPROVAL A
JOIN MEMBER M ON (M.MEMBER_NO = A.MEMBER_NO)
JOIN DOC_CATEGORY USING(DOC_CATEGORY_NO)
LEFT JOIN TEAM T ON (M.TEAM_NO = T.TEAM_NO)
LEFT JOIN DEPARTMENT D ON (M.DEPARTMENT_NO = D.DEPARTMENT_NO)
WHERE A.MEMBER_NO = 55
AND APPROVAL_CONDITION =3
ORDER BY APPROVAL_DATE DESC
;


-- 협조문서함 조회
SELECT DISTINCT AL.APPROVAL_NO , AL.APPROVAL_DATE , AL.APPROVAL_TITLE , AL.DOC_CATEGORY_NO, DECODE(APPROVAL_CONDITION, 0, '결재중', 4, '결재완료') APPROVAL_CONDITION_TITLE,
D.DOC_CATEGORY_GROUP , D.DOC_CATEGORY_SORT, 
(SELECT MEMBER_NAME FROM MEMBER M WHERE AL.MEMBER_NO = M.MEMBER_NO) MEMBER_NAME, -- 기안자의 이름
(SELECT TEAM_NAME FROM MEMBER M
JOIN TEAM T ON (M.TEAM_NO = T.TEAM_NO)
WHERE AL.MEMBER_NO = M.MEMBER_NO) TEAM_NAME ,
(SELECT DEPARTMENT_NAME FROM MEMBER M
JOIN DEPARTMENT D ON (D.DEPARTMENT_NO = M.DEPARTMENT_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) DEPARTMENT_NAME,
(SELECT MEMBER_NAME
FROM (SELECT MEMBER_NAME
FROM APPROVER
JOIN MEMBER USING (MEMBER_NO)
WHERE APPROVAL_NO = AL.APPROVAL_NO
ORDER BY APPROVER_ORDER DESC)
WHERE ROWNUM = 1) FINAL_APPROVER_NAME --최종결재자 이름
FROM APPROVAL AL
JOIN APPROVER AR ON (AL.APPROVAL_NO = AR.APPROVAL_NO)
JOIN DOC_CATEGORY D ON (AL.DOC_CATEGORY_NO = D.DOC_CATEGORY_NO)
JOIN MEMBER M ON (M.MEMBER_NO = AL.MEMBER_NO)
WHERE APPROVAL_DELETE = 0 -- 삭제되지 않은 문서
AND APPROVAL_CONDITION IN (0, 4)  -- 결재중 또는 결재완료된 문서
AND AL.DEPARTMENT_NO =1
ORDER BY APPROVAL_DATE DESC
;

SELECT * FROM APPROVAL a ;


--결재대기함 기안서 조회(휴가)
-- 결재자 순서, 이름, 수, 승인여부
-- 휴가인경우 시작일, 종료일, 제목, 내용, 첨부파일
-- 문서번호, 부서, 팀, 기안자명, 구분(항목), 협조부서명, 기안일
SELECT TO_CHAR(AL.APPROVAL_DATE, 'YYYY-MM-DD') APPROVAL_DATE , AL.APPROVAL_TITLE , AL.APPROVAL_CONTENT , DECODE(AL.DEPARTMENT_NO, 1, '인사관리부', 2, '경영관리부', 3, '운영관리부', 4, '고객관리부', 0, '임원부') DEPARTMENT_TITLE,
AF.APPROVAL_FILE_ROUTE , AF.APPROVAL_FILE_ORIGIN_NAME , AF.APPROVAL_FILE_RENAME ,
DECODE(AL.DOC_CATEGORY_NO, 0, '복무(휴가)', 1, '인사(퇴직)', 2, '업무(출점)', 3, '업무(폐점)', 4, '업무(지출)', 5, '업무(발주)') DOC_CATEGORY_TITLE,
(SELECT MEMBER_NAME FROM MEMBER M WHERE AL.MEMBER_NO = M.MEMBER_NO) MEMBER_NAME, -- 기안자의 이름
(SELECT TEAM_NAME FROM MEMBER M JOIN TEAM T ON (M.TEAM_NO = T.TEAM_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) TEAM_NAME,
(SELECT DEPARTMENT_NAME FROM MEMBER M JOIN DEPARTMENT D ON (D.DEPARTMENT_NO = M.DEPARTMENT_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) DEPARTMENT_NAME,
(SELECT COUNT(*) FROM APPROVER AR WHERE AR.APPROVAL_NO = AL.APPROVAL_NO) APPROVER_COUNT, -- 결재자수
DH.DOC_HOLIDAY_START, DH.DOC_HOLIDAY_END
FROM APPROVAL AL
JOIN DOC_HOLIDAY DH ON (AL.APPROVAL_NO=DH.APPROVAL_NO)
LEFT JOIN APPROVAL_FILE AF ON (AL.APPROVAL_NO=AF.APPROVAL_NO)
WHERE AL.APPROVAL_NO = 31;



-- 조회하는 기안서의 DOC_CATEGORY_NO 얻어오기
SELECT * 
FROM APPROVAL
WHERE APPROVAL_NO =31;


INSERT INTO "BOARD"
VALUES(1, '제목입니다', '내용입니다', NULL, DEFAULT, 6, 1);

INSERT INTO BOARD_CODE
VALUES(1, '공지사항');

COMMIT;


-- 결재자 모두 불러오기
SELECT APPROVAL_NO, APPROVER_NO, APPROVER_ORDER, APPROVER_CONDITION, TO_CHAR(APPROVER_DATE, 'YYYY-MM-DD')APPROVER_DATE, MEMBER_NAME , MEMBER_NO
FROM APPROVER
JOIN "MEMBER" USING (MEMBER_NO)
WHERE APPROVAL_NO =31
;


-- 기안서 상세조회(지출)
SELECT TO_CHAR(AL.APPROVAL_DATE, 'YYYY-MM-DD') APPROVAL_DATE , AL.APPROVAL_NO , AL.APPROVAL_TITLE , AL.APPROVAL_CONTENT , DECODE(AL.DEPARTMENT_NO, 1, '인사관리부', 2, '경영관리부', 3, '운영관리부', 4, '고객관리부', 0, '임원부') DEPARTMENT_TITLE,
AF.APPROVAL_FILE_ROUTE , AF.APPROVAL_FILE_ORIGIN_NAME , AF.APPROVAL_FILE_RENAME ,
DECODE(AL.DOC_CATEGORY_NO, 0, '복무(휴가)', 1, '인사(퇴직)', 2, '업무(출점)', 3, '업무(폐점)', 4, '업무(지출)', 5, '업무(발주)') DOC_CATEGORY_TITLE,
(SELECT MEMBER_NAME FROM MEMBER M WHERE AL.MEMBER_NO = M.MEMBER_NO) MEMBER_NAME, -- 기안자의 이름
(SELECT TEAM_NAME FROM MEMBER M JOIN TEAM T ON (M.TEAM_NO = T.TEAM_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) TEAM_NAME,
(SELECT DEPARTMENT_NAME FROM MEMBER M JOIN DEPARTMENT D ON (D.DEPARTMENT_NO = M.DEPARTMENT_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) DEPARTMENT_NAME,
(SELECT COUNT(*) FROM APPROVER AR WHERE AR.APPROVAL_NO = AL.APPROVAL_NO) APPROVER_COUNT -- 결재자수
FROM APPROVAL AL
LEFT JOIN APPROVAL_FILE AF ON (AL.APPROVAL_NO=AF.APPROVAL_NO)
WHERE AL.APPROVAL_NO = 66
;


-- 기안서 상세조회(퇴직)
SELECT TO_CHAR(AL.APPROVAL_DATE, 'YYYY-MM-DD') APPROVAL_DATE , AL.APPROVAL_NO , AL.APPROVAL_TITLE , AL.APPROVAL_CONTENT , DECODE(AL.DEPARTMENT_NO, 1, '인사관리부', 2, '경영관리부', 3, '운영관리부', 4, '고객관리부', 0, '임원부') DEPARTMENT_TITLE,
AF.APPROVAL_FILE_ROUTE , AF.APPROVAL_FILE_ORIGIN_NAME , AF.APPROVAL_FILE_RENAME ,
DECODE(AL.DOC_CATEGORY_NO, 0, '복무(휴가)', 1, '인사(퇴직)', 2, '업무(출점)', 3, '업무(폐점)', 4, '업무(지출)', 5, '업무(발주)') DOC_CATEGORY_TITLE,
(SELECT MEMBER_NAME FROM MEMBER M WHERE AL.MEMBER_NO = M.MEMBER_NO) MEMBER_NAME, -- 기안자의 이름
(SELECT TEAM_NAME FROM MEMBER M JOIN TEAM T ON (M.TEAM_NO = T.TEAM_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) TEAM_NAME,
(SELECT DEPARTMENT_NAME FROM MEMBER M JOIN DEPARTMENT D ON (D.DEPARTMENT_NO = M.DEPARTMENT_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) DEPARTMENT_NAME,
(SELECT COUNT(*) FROM APPROVER AR WHERE AR.APPROVAL_NO = AL.APPROVAL_NO) APPROVER_COUNT, -- 결재자수
TO_CHAR(DR.DOC_RETIRE_DATE, 'YYYY-MM-DD')DOC_RETIRE_DATE 
FROM APPROVAL AL
JOIN DOC_RETIREMENT DR ON (AL.APPROVAL_NO=DR.APPROVAL_NO)
LEFT JOIN APPROVAL_FILE AF ON (AL.APPROVAL_NO=AF.APPROVAL_NO)
WHERE AL.APPROVAL_NO = 73;



-- 기안서 상세조회(출점)
SELECT TO_CHAR(AL.APPROVAL_DATE, 'YYYY-MM-DD') APPROVAL_DATE , AL.APPROVAL_NO , AL.APPROVAL_TITLE , AL.APPROVAL_CONTENT , DECODE(AL.DEPARTMENT_NO, 1, '인사관리부', 2, '경영관리부', 3, '운영관리부', 4, '고객관리부', 0, '임원부') DEPARTMENT_TITLE,
AF.APPROVAL_FILE_ROUTE , AF.APPROVAL_FILE_ORIGIN_NAME , AF.APPROVAL_FILE_RENAME ,
DECODE(AL.DOC_CATEGORY_NO, 0, '복무(휴가)', 1, '인사(퇴직)', 2, '업무(출점)', 3, '업무(폐점)', 4, '업무(지출)', 5, '업무(발주)') DOC_CATEGORY_TITLE,
(SELECT MEMBER_NAME FROM MEMBER M WHERE AL.MEMBER_NO = M.MEMBER_NO) MEMBER_NAME, -- 기안자의 이름
(SELECT TEAM_NAME FROM MEMBER M JOIN TEAM T ON (M.TEAM_NO = T.TEAM_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) TEAM_NAME,
(SELECT DEPARTMENT_NAME FROM MEMBER M JOIN DEPARTMENT D ON (D.DEPARTMENT_NO = M.DEPARTMENT_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) DEPARTMENT_NAME,
(SELECT COUNT(*) FROM APPROVER AR WHERE AR.APPROVAL_NO = AL.APPROVAL_NO) APPROVER_COUNT, -- 결재자수
DS.STORE_NAME 
FROM APPROVAL AL
JOIN DOC_STORE DS ON (AL.APPROVAL_NO=DS.APPROVAL_NO)
LEFT JOIN APPROVAL_FILE AF ON (AL.APPROVAL_NO=AF.APPROVAL_NO)
WHERE AL.APPROVAL_NO = 72
AND DS.DOC_STORE_STATE = 0
;

-- 기안서 상세조회(폐점)
SELECT TO_CHAR(AL.APPROVAL_DATE, 'YYYY-MM-DD') APPROVAL_DATE , AL.APPROVAL_NO , AL.APPROVAL_TITLE , AL.APPROVAL_CONTENT , DECODE(AL.DEPARTMENT_NO, 1, '인사관리부', 2, '경영관리부', 3, '운영관리부', 4, '고객관리부', 0, '임원부') DEPARTMENT_TITLE,
AF.APPROVAL_FILE_ROUTE , AF.APPROVAL_FILE_ORIGIN_NAME , AF.APPROVAL_FILE_RENAME ,
DECODE(AL.DOC_CATEGORY_NO, 0, '복무(휴가)', 1, '인사(퇴직)', 2, '업무(출점)', 3, '업무(폐점)', 4, '업무(지출)', 5, '업무(발주)') DOC_CATEGORY_TITLE,
(SELECT MEMBER_NAME FROM MEMBER M WHERE AL.MEMBER_NO = M.MEMBER_NO) MEMBER_NAME, -- 기안자의 이름
(SELECT TEAM_NAME FROM MEMBER M JOIN TEAM T ON (M.TEAM_NO = T.TEAM_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) TEAM_NAME,
(SELECT DEPARTMENT_NAME FROM MEMBER M JOIN DEPARTMENT D ON (D.DEPARTMENT_NO = M.DEPARTMENT_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) DEPARTMENT_NAME,
(SELECT COUNT(*) FROM APPROVER AR WHERE AR.APPROVAL_NO = AL.APPROVAL_NO) APPROVER_COUNT, -- 결재자수
DS.STORE_NAME , DS.STORE_NO 
FROM APPROVAL AL
JOIN DOC_STORE DS ON (AL.APPROVAL_NO=DS.APPROVAL_NO)
LEFT JOIN APPROVAL_FILE AF ON (AL.APPROVAL_NO=AF.APPROVAL_NO)
WHERE AL.APPROVAL_NO = 77
AND DS.DOC_STORE_STATE = 1
;




-- 기안서 상세조회(발주) 
SELECT TO_CHAR(AL.APPROVAL_DATE, 'YYYY-MM-DD') APPROVAL_DATE , AL.APPROVAL_NO , AL.APPROVAL_TITLE , AL.APPROVAL_CONTENT , DECODE(AL.DEPARTMENT_NO, 1, '인사관리부', 2, '경영관리부', 3, '운영관리부', 4, '고객관리부', 0, '임원부') DEPARTMENT_TITLE,
DECODE(AL.DOC_CATEGORY_NO, 0, '복무(휴가)', 1, '인사(퇴직)', 2, '업무(출점)', 3, '업무(폐점)', 4, '업무(지출)', 5, '업무(발주)') DOC_CATEGORY_TITLE,
(SELECT MEMBER_NAME FROM MEMBER M WHERE AL.MEMBER_NO = M.MEMBER_NO) MEMBER_NAME, -- 기안자의 이름
(SELECT MEMBER_NO FROM MEMBER M WHERE AL.MEMBER_NO = M.MEMBER_NO) MEMBER_NO, -- 기안자의 회원번호
(SELECT TEAM_NAME FROM MEMBER M JOIN TEAM T ON (M.TEAM_NO = T.TEAM_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) TEAM_NAME,
(SELECT DEPARTMENT_NAME FROM MEMBER M JOIN DEPARTMENT D ON (D.DEPARTMENT_NO = M.DEPARTMENT_NO) WHERE AL.MEMBER_NO = M.MEMBER_NO) DEPARTMENT_NAME,
(SELECT COUNT(*) FROM APPROVER AR WHERE AR.APPROVAL_NO = AL.APPROVAL_NO) APPROVER_COUNT, -- 결재자수

DO.DOC_ORDER_NO , DO.DOC_ORDER_AMOUNT , DO.DOC_ORDER_UNIT_PRICE , DO.DOC_ORDER_PRICE , DO.GOODS_NO , DO.DOC_ORDER_GOODS_NAME , DO.DOC_ORDER_DATE 
FROM APPROVAL AL
JOIN DOC_ORDER DO ON (AL.APPROVAL_NO=DO.APPROVAL_NO)
WHERE AL.APPROVAL_NO = 84
;

SELECT * FROM MEMBER WHERE MEMBER_NO = 9;
COMMIT;

-- 기안서 삭제
UPDATE APPROVAL SET
APPROVAL_DELETE = 0
WHERE APPROVAL_NO = 35
;

UPDATE APPROVAL SET 
APPROVAL_CONDITION =3
WHERE APPROVAL_NO = 90;


-- 반려취소
UPDATE APPROVER SET
APPROVER_CONDITION = 2
WHERE MEMBER_NO = 55
AND APPROVAL_NO = 32;
-- 반려취소 후 해당 문서 결재중으로 돌리기
UPDATE APPROVAL SET
APPROVAL_CONDITION = 3
WHERE APPROVAL_NO = 32;


SELECT * FROM APPROVAL a WHERE APPROVAL_NO =32;
SELECT * FROM APPROVER WHERE APPROVAL_NO =32;

-- 반려사유 조회
SELECT APPROVAL_RETURN_COMMENT 
FROM APPROVAL
WHERE APPROVAL_NO = 29;

COMMIT;

-- 해당 문서의 결재자가 모두 승인되었는지 확인
SELECT COUNT(*) 
FROM APPROVER
WHERE APPROVAL_NO = 116
AND APPROVER_CONDITION = 0;

-- 해당문서 결재자가 모두 승인 시 문서컨디션 결재완료로 바꿈
UPDATE APPROVAL SET
APPROVAL_CONDITION = 4
WHERE APPROVAL_NO = 116
AND 0 = (SELECT COUNT(*) 
		FROM APPROVER
		WHERE APPROVAL_NO = 116
		AND APPROVER_CONDITION = 0)
;	

COMMIT;
UPDATE MEMBER SET 
MEMBER_ID = 'imteamjang'
WHERE MEMBER_NO = 61;


-- 결재완료 된 문서가 폐점 문서인지 확인 후 맞을 경우
-- approval no로  점포 폐쇄
UPDATE STORE SET
STORE_RUN_APPROVAL = 'Y'
WHERE STORE_NO = (SELECT STORE_NO
				FROM DOC_STORE
				WHERE APPROVAL_NO = 122)
AND 3 = (SELECT DOC_CATEGORY_NO
		FROM APPROVAL
		WHERE APPROVAL_NO = 122);
		
	
-- 결재완료 된 문서 중 기안 후 180일 지난 문서 찾기
SELECT APPROVAL_NO
FROM APPROVAL
WHERE SYSDATE - APPROVAL_DATE > 180
AND APPROVAL_DELETE = 0;

-- 기안서 삭제
UPDATE APPROVAL SET
APPROVAL_DELETE = 1
WHERE APPROVAL_NO = 2
;


-- 결재대기함 기안서 갯수 조회
SELECT COUNT(*)
FROM APPROVAL AL
JOIN APPROVER AR ON (AL.APPROVAL_NO = AR.APPROVAL_NO)
JOIN DOC_CATEGORY D ON (AL.DOC_CATEGORY_NO = D.DOC_CATEGORY_NO)
WHERE AR.MEMBER_NO = 55
AND APPROVAL_DELETE = 0 --삭제되지 않은 문서-->
AND APPROVAL_CONDITION = 0 --결재중인 문서-->
AND AR.APPROVER_CONDITION = 0 --상급자(로그인멤버)가 미승인한 문서-->
AND AR.MEMBER_NO = (SELECT MEMBER_NO FROM ( -- 로그인멤버의 결재차례인 문서 -->
SELECT *
FROM APPROVER AR
WHERE AR.APPROVER_CONDITION = 0
AND AR.APPROVAL_NO = AL.APPROVAL_NO
ORDER BY AR.APPROVER_ORDER)
WHERE ROWNUM =1);


-- 신고 인서트
INSERT INTO REPORT (REPORT_NO, MEMBER_NO, BOARD_NO, REPORT_KIND, REPORT_TITLE, REPORT_ANSWER)
VALUES (SEQ_REPORT_NO.NEXTVAL, 6, 92, '1', '스팸홍보', DEFAULT);

SELECT * FROM REPORT r ;

CREATE SEQUENCE SEQ_REPORT_NO;

ALTER TABLE REPORT
DROP COLUMN BOARD_NO;

COMMIT;

ALTER TABLE REPORT
DROP FOREIGN KEY (BOARD_NO);

ALTER TABLE REPORT
ADD PRIMARY KEY (REPORT_NO);

ALTER TABLE REPORT  
ADD BOARD_COMMENT_NO NUMBER;

ALTER TABLE BOARD_COMMENT
ADD FOREIGN KEY (BOARD_COMMENT_NO) REFERENCES BOARD_COMMENT (BOARD_COMMENT_NO);


DELETE FROM DOC_CATEGORY;

-- 신고처리가 완료되지 않은 신고게시글 수 불러오기
SELECT COUNT(*)
FROM REPORT
WHERE REPORT_ANSWER = 'N';


-- 신고된 게시글 목록 내용 불러오기
SELECT R.REPORT_NO , R.REPORT_TITLE , R.REPORT_KIND , R.REPORT_TITLE ,
R.REPORT_ANSWER , R.BOARD_NO , M.MEMBER_NAME, B.BOARD_TITLE ,
(SELECT MEMBER_NAME FROM BOARD B JOIN MEMBER M ON (B.MEMBER_NO= M.MEMBER_NO)  
WHERE R.BOARD_NO = B.BOARD_NO) WRITER_NAME, --게시글 작성자 이름
(SELECT COUNT(*) FROM REPORT RP WHERE R.BOARD_NO = RP.BOARD_NO) REPORT_COUNT --신고횟수
, '/board/boardDetail/' || (SELECT BOARD_CODE_NO FROM BOARD B WHERE B.BOARD_NO = R.BOARD_NO) || '/' || R.BOARD_NO "URL" --게시글 URL
FROM REPORT R
JOIN "MEMBER" M ON (R.MEMBER_NO = M.MEMBER_NO)
JOIN BOARD B ON (R.BOARD_NO=B.BOARD_NO)
;

-- 신고된 댓글 목록 내용 불러오기
SELECT REPORT_COMMENT_NO , REPORT_COMMENT_TITLE , REPORT_COMMENT_KIND , REPORT_COMMENT_TITLE ,
REPORT_COMMENT_ANSWER , BOARD_NO , MEMBER_NAME, BOARD_COMMENT_NO,
(SELECT MEMBER_NAME FROM BOARD_COMMENT B JOIN MEMBER M ON (B.MEMBER_NO= M.MEMBER_NO) WHERE R.BOARD_COMMENT_NO = B.BOARD_COMMENT_NO) WRITER_NAME  --댓글 작성자 이름
,(SELECT COUNT(*) FROM REPORT_COMMENT RP WHERE R.BOARD_COMMENT_NO = RP.BOARD_COMMENT_NO) REPORT_COUNT --신고횟수
, '/board/boardDetail/' || (SELECT BOARD_CODE_NO FROM BOARD B WHERE B.BOARD_NO = R.BOARD_NO) || '/' || BOARD_NO "URL" --게시글 URL
, (SELECT BOARD_COMMENT_CONTENT FROM BOARD_COMMENT BC WHERE R.BOARD_COMMENT_NO = BC.BOARD_COMMENT_NO ) REPORT_COMMENT_CONTENT -- 신고된 댓글 내용
FROM REPORT_COMMENT R
JOIN MEMBER M USING (MEMBER_NO)
;

-- 댓글 내용 불러오기
(SELECT BOARD_COMMENT_CONTENT 
FROM BOARD_COMMENT BC
WHERE R.BOARD_COMMENT_NO = BC.BOARD_COMMENT_NO ) REPORT_COMMENT_CONTENT



-- BOARD_NO 를 통해 작성자명 불러오기
SELECT MEMBER_NAME
FROM BOARD B
JOIN MEMBER M ON (B.MEMBER_NO= M.MEMBER_NO)
WHERE BOARD_NO = 95;

-- 댓글 신고 테이블 생성
CREATE TABLE "REPORT_COMMENT" (
	"REPORT_COMMENT_NO"	NUMBER	PRIMARY KEY,
	"MEMBER_NO"	NUMBER	NOT NULL,
	"REPORT_COMMENT_TITLE"	NVARCHAR2(50)		NOT NULL,
	"REPORT_COMMENT_KIND"	NVARCHAR2(20)		NOT NULL,
	"REPORT_COMMENT_ANSWER"	CHAR(1)	DEFAULT 'N'	NOT NULL,
	"BOARD_NO"	NUMBER		NOT NULL,
	"BOARD_COMMENT_NO"	NUMBER		NOT NULL
);

ALTER TABLE REPORT_COMMENT
ADD FOREIGN KEY (MEMBER_NO) REFERENCES MEMBER (MEMBER_NO);

ALTER TABLE REPORT_COMMENT
ADD FOREIGN KEY (BOARD_NO) REFERENCES BOARD (BOARD_NO);

ALTER TABLE REPORT_COMMENT
ADD FOREIGN KEY (BOARD_COMMENT_NO) REFERENCES BOARD_COMMENT (BOARD_COMMENT_NO);

ALTER TABLE REPORT
DROP COLUMN BOARD_COMMENT_NO; 


--검색 회원 조회
SELECT M.MEMBER_NO, D.DEPARTMENT_NAME, T.TEAM_NAME, G.GRADE_NAME, M.MEMBER_NAME, M.MEMBER_TEL, M.MEMBER_ADDRESS, M.MEMBER_ENROLL_DATE, M.MEMBER_DEL_FL
FROM MEMBER M
JOIN TEAM T ON (T.TEAM_NO=M.TEAM_NO)
JOIN DEPARTMENT D ON (D.DEPARTMENT_NO=M.DEPARTMENT_NO)
JOIN GRADE G ON (G.GRADE_NO=M.GRADE_NO)
WHERE M.MEMBER_NO LIKE '%김민준%' 
OR D.DEPARTMENT_NAME LIKE '%김민준%'
OR T.TEAM_NAME LIKE '%김민준%'
OR G.GRADE_NAME LIKE '%김민준%'
OR M.MEMBER_NAME LIKE '%김민준%'
OR M.MEMBER_TEL LIKE '%김민준%'
OR M.MEMBER_ADDRESS LIKE '%김민준%'
ORDER BY M.MEMBER_NO;

-- 부서 조회 시 팀 자동셀렉
SELECT TEAM_NAME , TEAM_NO
FROM TEAM
JOIN DEPARTMENT USING (DEPARTMENT_NO)
WHERE DEPARTMENT_NO = 2
;

COMMIT;

ALTER TABLE MEMBER
ADD MEMBER_DEL_APPROVAL CHAR(1); 

-- 사직서 결재완료인 경우 회원 탈퇴승인 처리하기
UPDATE MEMBER SET
MEMBER_DEL_APPROVAL = 'N'
WHERE MEMBER_NO = (SELECT MEMBER_NO
					FROM "MEMBER"
					JOIN APPROVAL USING (MEMBER_NO)
					WHERE APPROVAL_NO = 178)
AND 1 = (SELECT DOC_CATEGORY_NO
		FROM APPROVAL
		WHERE APPROVAL_NO = ${approvalNo})

		
-- 승인서에 나온 APPROVAL_NO를 작성한 작성자의 회원번호
SELECT MEMBER_NO
FROM "MEMBER"
JOIN APPROVAL USING (MEMBER_NO)
WHERE APPROVAL_NO = 178;

-- 사직서 중 결재완료된 문서 리스트 얻어오기
SELECT MEMBER_NO 
FROM APPROVAL
JOIN DOC_RETIREMENT USING (APPROVAL_NO)
WHERE APPROVAL_CONDITION = 4
AND DOC_CATEGORY_NO = 1
AND DOC_RETIRE_DATE < SYSDATE ;


-- 회원탈퇴
UPDATE MEMBER SET
MEMBER_DEL_FL = 'Y'
WHERE MEMBER_NO = 6;


-- 결재완료된 휴가신청서의 휴가 시작일과 종료일을 받아와서
-- 캘린더에 집어넣기
SELECT DOC_HOLIDAY_START
FROM DOC_HOLIDAY
WHERE APPROVAL_NO = 175;

SELECT DOC_HOLIDAY_END
FROM DOC_HOLIDAY
WHERE APPROVAL_NO = 175;

SELECT MEMBER_NO
FROM APPROVAL
WHERE APPROVAL_NO = 175;


INSERT INTO CALENDAR
VALUES (SEQ_CAL_NO.NEXTVAL, 'Y', 
		 TO_DATE(#{calStartTime}, 'YYYY-MM-DD"T"HH24:MI:SS'),
		 TO_DATE(#{calEndTime}, 'YYYY-MM-DD"T"HH24:MI:SS'),
		'휴가', '휴가', '#F6C90E', #{memberNo});
		
		
		
-- 결재완료된 휴가신청서의 휴가 시작일, 종료일, 회원번호 받아오기
SELECT DOC_HOLIDAY_START , DOC_HOLIDAY_END, MEMBER_NO
FROM APPROVAL
JOIN DOC_HOLIDAY USING (APPROVAL_NO)
WHERE APPROVAL_NO = 175;


INSERT INTO CALENDAR
VALUES (SEQ_CAL_NO.NEXTVAL, '1', 
	 TO_DATE('2023-12-26', 'YYYY-MM-DD"T"HH24:MI:SS'),
	 TO_DATE('2023-12-27', 'YYYY-MM-DD"T"HH24:MI:SS'),
	'휴가', '휴가', '#f6c90e', '70');


COMMIT;

DELETE FROM CALENDAR c 
WHERE CAL_NO = 58;


UPDATE MEMBER SET
TEAM_NO = 10
WHERE MEMBER_NO = 46;


SELECT COUNT(*) 
FROM "MEMBER"
WHERE MEMBER_NO = 12
AND MEMBER_NAME = '윤성';


SELECT TO_CHAR(DOC_HOLIDAY_START, 'YYYY-MM-DD') DOC_HOLIDAY_START, TO_CHAR(DOC_HOLIDAY_END, 'YYYY-MM-DD')DOC_HOLIDAY_END, MEMBER_NO
FROM APPROVAL
JOIN DOC_HOLIDAY USING (APPROVAL_NO)
WHERE APPROVAL_NO = 182
AND 0 = (SELECT DOC_CATEGORY_NO
	FROM APPROVAL
	WHERE APPROVAL_NO = 182);

-- 삭제 후 신고처리 완료로 바꾸기(게시글)	
SELECT COUNT(*) 
FROM REPORT
WHERE BOARD_NO = 180;

UPDATE REPORT SET 
REPORT_ANSWER = 'Y'
WHERE BOARD_NO = 180;

COMMIT;
UPDATE STORE SET
STORE_RUN_FL = 'N'
WHERE STORE_RUN_APPROVAL ='Y';


-- 회원탈퇴
DELETE FROM "MEMBER" m 
WHERE MEMBER_NO = 9;


UPDATE APPROVAL SET 
APPROVAL_DELETE = 2
WHERE APPROVAL_NO = 181;

COMMIT;



