USE jungnami;

CREATE TABLE party(
	party_cd INT PRIMARY KEY,
    party_name VARCHAR(20)
);

CREATE TABLE region(
	region_cd INT PRIMARY KEY,
    city VARCHAR(15),
    region_name VARCHAR(50)
);

CREATE TABLE city (
	city_cd INT PRIMARY KEY AUTO_INCREMENT, 
	city_name VARCHAR(15)
); 
ALTER TABLE city AUTO_INCREMENT=10001;

CREATE TABLE legislator(
	idx INT  AUTO_INCREMENT PRIMARY KEY,
    legi_cd INT,
    legi_name VARCHAR(10),
    party_name VARCHAR(20),
    city_cd INT,
    region VARCHAR(45),
    ordinal INT,
    profile_img TEXT,
    dept_cd INT,
    regist_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE detail_legislator(
	idx INT PRIMARY KEY,
    reelection VARCHAR(20),
    crime TEXT,
    sns TEXT,
    phone VARCHAR(20),
    regist_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE vote_result (
	idx INT PRIMARY KEY,
    like_cnt INT,
    dislike_cnt INT
);

CREATE TABLE politician(
	legi_cd INT PRIMARY KEY,
    legi_name VARCHAR(10)
);





