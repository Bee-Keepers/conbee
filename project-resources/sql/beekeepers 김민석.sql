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

SELECT GOODS_NO, GOODS_NAME, LCATEGORY_NAME, SCATEGORY_NAME, STOCK_OUT_PRICE, STOCK_DISCOUNT
			,STORE_NO, STORE_NAME
		FROM GOODS
		JOIN LCATEGORY USING(LCATEGORY_NO)
		JOIN SCATEGORY USING(SCATEGORY_NO)
		JOIN STOCK USING(GOODS_NO)
		JOIN STORE USING(STORE_NO)
		WHERE GOODS_NAME LIKE '%이%'
		AND STORE_NAME = '서울시청점';