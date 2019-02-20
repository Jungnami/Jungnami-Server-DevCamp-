CREATE TABLE membership
(
    `idx`            INT            NOT NULL    AUTO_INCREMENT, 
    `auth_type`      VARCHAR(45)    NOT NULL    COMMENT '로그인 방법(0:naver, 1:kakao)', 
    `id`             VARCHAR(45)    NOT NULL, 
    `name`           VARCHAR(45)    NOT NULL, 
    `profile_img`    VARCHAR(45)    NOT NULL, 
    `age`            VARCHAR(45)    NULL, 
    `gender`         TINYINT        NULL        COMMENT '(0 : 남자, 1 : 여자)', 
    `status`         TINYINT        NOT NULL    COMMENT '회원 상태(0 : inactive, 1 : active)', 
    `grade`          TINYINT        NOT NULL    COMMENT '회원 등급(0 : admin, 1 : normal, 2 : 우수, 3 : vip)', 
    `point`          INT            NOT NULL    COMMENT '포인트', 
    `fcm_token`      TEXT           NOT NULL    COMMENT '푸쉬알림 토큰', 
    `refresh_token`  TEXT           NOT NULL    COMMENT '통신 토큰 재발급용 토큰', 
    `access_date`    DATETIME       NOT NULL, 
    `regist_date`    DATETIME       NOT NULL, 
    PRIMARY KEY (idx)
);

CREATE TABLE vote
(
    `idx`          INT         NOT NULL    COMMENT '유저 인덱스', 
    `ballot`       INT         NOT NULL    COMMENT '투표권 개수', 
    `update_date`  DATETIME    NOT NULL    COMMENT '투표권 갱신 날짜', 
    PRIMARY KEY (idx)
);

ALTER TABLE vote ADD CONSTRAINT FK_vote_idx_membership_idx FOREIGN KEY (idx)
 REFERENCES membership (idx)  ON DELETE RESTRICT ON UPDATE RESTRICT;
 
CREATE TABLE party
(
    `party_cd`    INT            NOT NULL    COMMENT '정당코드', 
    `party_name`  VARCHAR(45)    NULL        COMMENT '정당이름', 
    PRIMARY KEY (party_cd)
);

CREATE TABLE city
(
    `city_cd`    INT            NOT NULL    AUTO_INCREMENT, 
    `city_name`  VARCHAR(45)    NULL, 
    PRIMARY KEY (city_cd)
);

ALTER TABLE city COMMENT '시도 코드';


 CREATE TABLE legislator
(
    `idx`          INT            NOT NULL, 
    `legi_cd`      INT            NULL        COMMENT '의원코드', 
    `legi_name`    VARCHAR(10)    NULL        COMMENT '이름', 
    `party_cd`     INT            NULL        COMMENT '정당코드', 
    `party_name`   VARCHAR(45)    NULL        COMMENT '정당이름', 
    `city_cd`      INT            NULL        COMMENT '도시코드', 
    `city_name`    VARCHAR(45)    NULL        COMMENT '도시이름', 
    `region`       VARCHAR(45)    NULL        COMMENT '지역구', 
    `ordinal`      INT            NULL        COMMENT '당선대수', 
    `profile_img`  TEXT           NULL        COMMENT '프로필이미지', 
    `dept_cd`      INT            NULL        COMMENT '부서코드(xml에 필요)', 
    `reelection`   VARCHAR(5)     NULL        COMMENT '재선여부', 
    `crime`        TEXT           NULL        COMMENT '전과기록', 
    `sns`          TEXT           NULL        COMMENT 'SNS 계정', 
    `phone`        VARCHAR(11)    NULL        COMMENT '의원실전화번호', 
    `regist_date`  DATETIME       NOT NULL, 
    `update_date`  DATETIME       NOT NULL, 
    PRIMARY KEY (idx, regist_date, update_date)
);

CREATE TABLE vote_result
(
    `idx`          INT    NOT NULL    COMMENT '의원코드', 
    `like_cnt`     INT    NOT NULL    COMMENT '호감투표수', 
    `dislike_cnt`  INT    NOT NULL    COMMENT '비호감투표수', 
    PRIMARY KEY (idx)
);

ALTER TABLE vote_result COMMENT '매주 리셋';

ALTER TABLE vote_result ADD CONSTRAINT FK_vote_result_idx_legislator_idx FOREIGN KEY (idx)
 REFERENCES legislator (idx)  ON DELETE CASCADE ON UPDATE CASCADE;
 
 CREATE TABLE summary
(
    `code`         INT         NOT NULL    COMMENT '의원코드', 
    `like_cnt`     INT         NOT NULL    COMMENT '호감투표수', 
    `dislike_cnt`  INT         NOT NULL    COMMENT '비호감투표수', 
    `start_date`   DATETIME    NOT NULL, 
    `end_date`     DATETIME    NOT NULL, 
    PRIMARY KEY (code)
);

ALTER TABLE summary ADD CONSTRAINT FK_summary_code_legislator_legi_cd FOREIGN KEY (code)
 REFERENCES legislator (legi_cd)  ON DELETE CASCADE ON UPDATE CASCADE;