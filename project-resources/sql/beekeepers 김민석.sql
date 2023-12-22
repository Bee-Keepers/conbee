-- 대분류 생성
CREATE SEQUENCE SEQ_LCATEGORY_NO NOCACHE;
INSERT INTO LCATEGORY VALUES(SEQ_LCATEGORY_NO.NEXTVAL, '간편식사');
INSERT INTO LCATEGORY VALUES(SEQ_LCATEGORY_NO.NEXTVAL, '즉석조리');
INSERT INTO LCATEGORY VALUES(SEQ_LCATEGORY_NO.NEXTVAL, '과자류');
INSERT INTO LCATEGORY VALUES(SEQ_LCATEGORY_NO.NEXTVAL, '아이스크림');
INSERT INTO LCATEGORY VALUES(SEQ_LCATEGORY_NO.NEXTVAL, '식품');
INSERT INTO LCATEGORY VALUES(SEQ_LCATEGORY_NO.NEXTVAL, '음료');
INSERT INTO LCATEGORY VALUES(SEQ_LCATEGORY_NO.NEXTVAL, '생활용품');

-- 소분류 생성
CREATE SEQUENCE SEQ_SCATEGORY_NO NOCACHE;
INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '도시락', 1);
INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '샌드위치/햄버거', 1);
INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '주먹밥/김밥', 1);

INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '튀김류', 2);
INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '베이커리', 2);
INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '즉석커피', 2);

INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '스낵/비스켓', 3);
INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '빵/디저트', 3);
INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '껌/초콜릿/캔디', 3);

INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '아이스크림', 4);

INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '가공식사', 5);
INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '안주류', 5);
INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '식재료', 5);

INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '음료', 6);
INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '아이스드링크', 6);
INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '유제품', 6);

INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '취미/레저', 7);
INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '의약외품', 7);
INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '신변잡화', 7);
INSERT INTO SCATEGORY VALUES(SEQ_SCATEGORY_NO.NEXTVAL, '생활잡화', 7);

-- 상품 등록
CREATE SEQUENCE SEQ_GOODS_NO NOCACHE;

INSERT INTO GOODS VALUES(SEQ_GOODS_NO.NEXTVAL, '자이언트머스타드치킨', DEFAULT, 1, 1);
INSERT INTO GOODS VALUES(SEQ_GOODS_NO.NEXTVAL, '단백질칩버터구이', DEFAULT, 3, 7);
INSERT INTO GOODS VALUES(SEQ_GOODS_NO.NEXTVAL, '하이면고추우동2인', DEFAULT, 5, 11);
INSERT INTO GOODS VALUES(SEQ_GOODS_NO.NEXTVAL, '망곰이초코마카롱', DEFAULT, 3, 8);
INSERT INTO GOODS VALUES(SEQ_GOODS_NO.NEXTVAL, '딸기치즈케이크도넛', DEFAULT, 4, 10);
INSERT INTO GOODS VALUES(SEQ_GOODS_NO.NEXTVAL, '바닐라딜라이트', DEFAULT, 6, 14);

-- 점포 등록
CREATE SEQUENCE SEQ_STORE_NO NOCACHE;

INSERT INTO STORE
VALUES(SEQ_STORE_NO.NEXTVAL, '서울시청점', '서울 중구 을지로 6 (을지로1가) 1층',
	'0212341234', DEFAULT, DEFAULT, NULL, 7);
INSERT INTO STORE
VALUES(SEQ_STORE_NO.NEXTVAL, '별내아이파크점', '남양주 별내동 123-123',
	'0311231233', DEFAULT, DEFAULT, NULL, 7);
INSERT INTO STORE
VALUES(SEQ_STORE_NO.NEXTVAL, '광주고룡점', '광주광역시 광산구 고룡동 1021번지',
	'0629544345', DEFAULT, DEFAULT, NULL, 8);
INSERT INTO STORE
VALUES(SEQ_STORE_NO.NEXTVAL, '반송그린점', '부산광역시 해운대구 반송순환로 205-1',
	'15778007', DEFAULT, DEFAULT, NULL, 8);
	
-- 재고 등록
INSERT INTO STOCK
VALUES(1, 4, 10, 0, 3800, 2500);
INSERT INTO STOCK
VALUES(1, 4, 10, 10, 3800, 2500);

-- 입출고 내역
CREATE SEQUENCE SEQ_HISTORY_NO NOCACHE;

SELECT GOODS_NO, GOODS_NAME, STOCK_AMOUNT, LCATEGORY_NAME, SCATEGORY_NAME, STOCK_OUT_PRICE, STOCK_DISCOUNT
			,STORE_NO, STORE_NAME
FROM GOODS
JOIN LCATEGORY USING(LCATEGORY_NO)
JOIN SCATEGORY USING(SCATEGORY_NO)
JOIN STOCK USING(GOODS_NO)
JOIN STORE USING(STORE_NO)
WHERE GOODS_NAME LIKE '%이%'
AND STORE_NAME = '서울시청점';
	
DROP TRIGGER TGR_HISTORY;
-- 입출고 트리거 생성
CREATE TRIGGER TGR_HISTORY
AFTER INSERT ON HISTORY
FOR EACH ROW
	BEGIN
		IF :NEW.HISTORY_DIVIDE = '입고'
		THEN
			UPDATE "STOCK" SET STOCK_AMOUNT = STOCK_AMOUNT + :NEW.HISTORY_AMOUNT
			WHERE STORE_NO = :NEW.STORE_NO
			AND GOODS_NO = :NEW.GOODS_NO;
		END IF;
		IF :NEW.HISTORY_DIVIDE = '출고'
		THEN
			UPDATE "STOCK" SET STOCK_AMOUNT = STOCK_AMOUNT - :NEW.HISTORY_AMOUNT
			WHERE STORE_NO = :NEW.STORE_NO
			AND GOODS_NO = :NEW.GOODS_NO;
		END IF;
END;

INSERT INTO HISTORY 
VALUES(SEQ_HISTORY_NO.NEXTVAL, '출고', 5, 8910, 9900, 10, DEFAULT, '서울시청점', '자이언트머스타드치킨', 1, 1);


-- HISTORY PK 생성 함수 (대량 INSERT에 사용하기 위해)
CREATE OR REPLACE FUNCTION NEXT_HISTORY_NO
RETURN NUMBER 
IS NUM NUMBER;
BEGIN 
	SELECT SEQ_HISTORY_NO.NEXTVAL 
	INTO NUM
	FROM DUAL;
	RETURN NUM;
END;

-- ORDER_NO 시퀀스 생성
CREATE SEQUENCE SEQ_ORDER_NO NOCACHE;

-- ORDER PK 생성 함수 (대량 INSERT에 사용하기 위해)
CREATE OR REPLACE FUNCTION NEXT_ORDER_NO
RETURN NUMBER 
IS NUM NUMBER;
BEGIN 
	SELECT SEQ_ORDER_NO.NEXTVAL 
	INTO NUM
	FROM DUAL;
	RETURN NUM;
END;


	
SELECT HISTORY_GOODS_NAME,  SUM(HISTORY_AMOUNT * HISTORY_ACTUAL_PRICE) TOTAL_PRICE  FROM HISTORY;
SELECT HISTORY_GOODS_NAME,  SUM(HISTORY_AMOUNT * HISTORY_ACTUAL_PRICE) TOTAL_PRICE FROM HISTORY
WHERE TO_CHAR(HISTORY_DATE, 'YYYY-MM-DD')  BETWEEN  '' AND ''
GROUP BY HISTORY_GOODS_NAME
;



SELECT LCATEGORY_NAME, SCATEGORY_NAME, GOODS_NO ,HISTORY_GOODS_NAME,
	SUM(HISTORY_AMOUNT) HISTORY_AMOUNT, AVG(HISTORY_ACTUAL_PRICE) HISTORY_ACTUAL_PRICE, SUM(HISTORY_AMOUNT * HISTORY_ACTUAL_PRICE) TOTAL_PRICE
FROM HISTORY
JOIN GOODS USING(GOODS_NO)
JOIN LCATEGORY USING(LCATEGORY_NO)
JOIN SCATEGORY USING(SCATEGORY_NO)
WHERE STORE_NO = 1
AND HISTORY_DIVIDE = '출고'
AND HISTORY_AMOUNT * HISTORY_ACTUAL_PRICE < 20000
GROUP BY GOODS_NO, LCATEGORY_NAME, SCATEGORY_NAME, HISTORY_GOODS_NAME;



SELECT * FROM STORE;

DELETE FROM HISTORY WHERE HISTORY_NO BETWEEN 9 AND 14;

SELECT STORE_NO, GOODS_NO, GOODS_NAME, LCATEGORY_NAME, SCATEGORY_NAME, STOCK_OUT_PRICE, STOCK_IN_PRICE, STOCK_DISCOUNT
			,STOCK_AMOUNT
		FROM STOCK
		JOIN GOODS USING(GOODS_NO)
		JOIN LCATEGORY USING(LCATEGORY_NO)
		JOIN SCATEGORY USING(SCATEGORY_NO);
	
SELECT LCATEGORY_NAME, SCATEGORY_NAME, GOODS_NO ,HISTORY_GOODS_NAME,
			HISTORY_AMOUNT, HISTORY_ACTUAL_PRICE, HISTORY_NO, HISTORY_DIVIDE, HISTORY_UNIT_PRICE, HISTORY_DISCOUNT, TO_CHAR(HISTORY_DATE, 'YYYY-MM-DD HH24:MI:SS') HISTORY_DATE
			, (HISTORY_ACTUAL_PRICE * HISTORY_AMOUNT) TOTAL_PRICE
		FROM HISTORY
		JOIN GOODS USING(GOODS_NO)
		JOIN LCATEGORY USING(LCATEGORY_NO)
		JOIN SCATEGORY USING(SCATEGORY_NO)
		WHERE STORE_NO = 1
		AND TO_CHAR(HISTORY_DATE, 'YYYY-MM-DD')  BETWEEN '2023-12-06' AND '2023-12-06';
		
	
-- history 날짜 별 조회
SELECT TO_CHAR(HISTORY_DATE, 'YYYY-MM-DD') HISTORY_DATE FROM HISTORY
WHERE STORE_NO = 1
GROUP BY TO_CHAR(HISTORY_DATE, 'YYYY-MM-DD')
HAVING TO_CHAR(HISTORY_DATE, 'YYYY-MM-DD') BETWEEN '2023-12-03' AND '2023-12-05'
ORDER BY HISTORY_DATE DESC;

-- ORDER 날짜 별 조회
SELECT TO_CHAR(ORDER_DATE, 'YYYY-MM-DD') ORDER_DATE FROM "ORDER"
WHERE STORE_NO = 1
GROUP BY TO_CHAR(ORDER_DATE, 'YYYY-MM-DD')
HAVING TO_CHAR(ORDER_DATE, 'YYYY-MM-DD') BETWEEN '2023-12-03' AND '2023-12-05'
ORDER BY ORDER_DATE DESC;

-- 날짜 조작
SELECT SYSDATE , SYSDATE -0.5 FROM DUAL;

-- 발주 스케쥴러
SELECT ORDER_NO, TO_CHAR(ORDER_DATE, 'YYYY-MM-DD') ORDER_DATE, ORDER_AMOUNT, O.STORE_NO, O.GOODS_NO, STORE_NAME, GOODS_NAME,
	(SELECT STOCK_IN_PRICE FROM STOCK S WHERE STORE_NO = O.STORE_NO AND GOODS_NO = O.GOODS_NO) STOCK_IN_PRICE
FROM "ORDER" O
JOIN GOODS G ON(G.GOODS_NO = O.GOODS_NO)
JOIN STORE ST ON(ST.STORE_NO = O.STORE_NO)
WHERE ORDER_DATE BETWEEN SYSDATE-(1/24/60) AND SYSDATE;

SELECT *
FROM HISTORY h ;

SELECT O.GOODS_NO, LCATEGORY_NAME, SCATEGORY_NAME, (SELECT STOCK_AMOUNT, STOCK_IN_PRICE FROM STOCK WHERE STORE_NO = 1 AND GOODS_NO = O.GOODS_NO), ORDER_AMOUNT
FROM "ORDER" O
JOIN GOODS G ON(G.GOODS_NO = O.GOODS_NO)
JOIN LCATEGORY USING(LCATEGORY_NO)
JOIN SCATEGORY USING(SCATEGORY_NO)
JOIN STOCK
WHERE STORE_NO = 1;

SELECT O.GOODS_NO, GOODS_NAME, LCATEGORY_NAME, SCATEGORY_NAME, STOCK_AMOUNT, STOCK_IN_PRICE, ORDER_AMOUNT
FROM "STOCK" S
JOIN GOODS G ON G.GOODS_NO = S.GOODS_NO
JOIN LCATEGORY USING(LCATEGORY_NO)
JOIN SCATEGORY USING(SCATEGORY_NO)
JOIN "ORDER" O ON O.GOODS_NO = S.GOODS_NO AND O.STORE_NO = S.STORE_NO
WHERE O.STORE_NO = 1
AND TO_CHAR(ORDER_DATE, 'YYYY-MM-DD HH24:MI:SS')  BETWEEN TO_CHAR(SYSDATE, 'YYYY-MM-DD "00":"00":"00"') AND TO_CHAR(SYSDATE+1, 'YYYY-MM-DD "00":"00":"00"') ;

SELECT TO_CHAR(SYSDATE, 'YYYY-MM-DD "00":"00":"00"'), TO_CHAR(SYSDATE+1, 'YYYY-MM-DD "00":"00":"00"'), TO_CHAR(SYSDATE , 'YYYY-MM-DD HH24:MI:SS')
FROM DUAL;

SELECT * FROM "ORDER" o ;

SELECT O.GOODS_NO, GOODS_NAME, LCATEGORY_NAME, SCATEGORY_NAME, STOCK_AMOUNT, STOCK_IN_PRICE, ORDER_AMOUNT
FROM "STOCK" S
JOIN GOODS G ON G.GOODS_NO = S.GOODS_NO
JOIN LCATEGORY USING(LCATEGORY_NO)
JOIN SCATEGORY USING(SCATEGORY_NO)
JOIN "ORDER" O ON O.GOODS_NO = S.GOODS_NO AND O.STORE_NO = S.STORE_NO
WHERE O.STORE_NO = 1
AND TO_CHAR(ORDER_DATE, 'YYYY-MM-DD') = '2023-12-08';

SELECT * FROM TEAM;

SELECT NEXT_HISTORY_NO(), '입고', DOC_ORDER_AMOUNT, DOC_ORDER_UNIT_PRICE, DOC_ORDER_UNIT_PRICE, 0, SYSDATE, '본사', DOC_ORDER_GOODS_NAME, 0 , GOODS_NO
FROM DOC_ORDER;


SELECT NEXT_HISTORY_NO() FROM DUAL;

-- 본사 발주 트리거
CREATE TRIGGER TGR_DOC_ORDER
AFTER UPDATE ON APPROVAL
FOR EACH ROW
WHEN (APPROVAL_CONDITION = 4 AND DOC_CATEGORY_NO = 5)
BEGIN
	INSERT INTO HISTORY
	(SELECT NEXT_HISTORY_NO(), '입고', DOC_ORDER_AMOUNT, DOC_ORDER_UNIT_PRICE, DOC_ORDER_UNIT_PRICE, 0, SYSDATE, '본사', DOC_ORDER_GOODS_NAME, 0 , GOODS_NO
		FROM DOC_ORDER WHERE APPROVAL_NO = :NEW.APPROVAL_NO)
END;

INSERT INTO STORE
VALUES(0, '본사', '서울 중구 남대문로 120', '029999999', 'Y', SYSDATE, NULL, NULL, 'N');

ALTER TABLE DOC_ORDER ADD DOC_ORDER_GOODS_NAME NVARCHAR2(30) NOT NULL;
ALTER TABLE DOC_ORDER ADD DOC_ORDER_DATE NVARCHAR2(30) NOT NULL;
ALTER TABLE DOC_ORDER DROP COLUMN DOC_ORDER_DATE_NAME;
ALTER TABLE GOODS ADD GOODS_DETAIL NVARCHAR2(300) NULL;
ALTER TABLE GOODS ADD GOODS_IMAGE NVARCHAR2(100) NULL;
ALTER TABLE GOODS ADD GOODS_IMAGE_PATH NVARCHAR2(50) NULL;
ALTER TABLE GOODS ADD GOODS_PRICE NUMBER NULL;
ALTER TABLE GOODS ADD GOODS_DEL_FL CHAR(1) DEFAULT 'N' NULL;



SELECT GOODS_NO, GOODS_NAME, STOCK_IN_PRICE
		FROM STOCK
		JOIN GOODS USING(GOODS_NO)
		WHERE STORE_NO = 0;
		
INSERT INTO "STOCK"
VALUES(0, 1, 10, 0, 9900, 8000);

INSERT INTO "STOCK"
VALUES(0, 2, 20, 0, 1700, 1000);

SELECT DOC_ORDER_AMOUNT, DOC_ORDER_UNIT_PRICE, DOC_ORDER_PRICE, GOODS_NO, DOC_ORDER_GOODS_NAME, DOC_ORDER_DATE
FROM DOC_ORDER
JOIN APPROVAL USING(APPROVAL_NO)
WHERE DOC_CATEGORY_NO = 5
AND APPROVAL_CONDITION = 4
AND DOC_ORDER_DATE = TO_CHAR(SYSDATE+1, 'YYYY-MM-DD');

UPDATE APPROVAL SET APPROVAL_CONDITION = 4
WHERE APPROVAL_NO = 85;

SELECT GOODS_NAME, GOODS_STANDARD, GOODS_DETAIL, GOODS_IMAGE, GOODS_IMAGE_PATH
		FROM (SELECT GOODS_NAME, GOODS_STANDARD, GOODS_DETAIL, GOODS_IMAGE, GOODS_IMAGE_PATH
			FROM GOODS WHERE GOODS_DEL_FL = 'N' ORDER BY GOODS_NO DESC)
		WHERE ROWNUM <= 5;

SELECT COUNT(*) FROM "STOCK" WHERE STORE_NO = 0;


SELECT COUNT(*) FROM "MESSAGE"
		WHERE MEMBER_NO_RECIPIENT = 7
		AND MESSAGE_READ_FL = 'N';
	
	SELECT NVL(SUM(ORDER_AMOUNT), 0) FROM "ORDER"
		WHERE GOODS_NO = 1
		AND ORDER_DATE BETWEEN SYSDATE-(1/24/60)*60 AND SYSDATE;
	
	SELECT * FROM "ORDER" o ;
SELECT NVL(SUM(ORDER_AMOUNT), 0) FROM "ORDER"
		WHERE GOODS_NO = 2
		AND ORDER_DATE BETWEEN SYSDATE-(1/24/60)*60*6 AND SYSDATE
		AND STORE_NO != 1;
	
	DELETE FROM HISTORY;

SELECT AVG(HISTORY_ACTUAL_PRICE), COUNT(*)
FROM "HISTORY"
WHERE HISTORY_GOODS_NAME = '망곰이초코마카롱'
AND HISTORY_DIVIDE = '출고';
