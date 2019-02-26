# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Generation Time: 2019-02-26 07:39:29 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table article
# ------------------------------------------------------------

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '기사 인덱스',
  `title` varchar(300) NOT NULL COMMENT '제목',
  `office` varchar(45) DEFAULT NULL COMMENT '언론사',
  `article_content` varchar(300) DEFAULT NULL COMMENT '기사 내용',
  `link` varchar(300) NOT NULL COMMENT '기사 링크',
  `thumb_img` varchar(300) DEFAULT NULL COMMENT '썸네일 이미지',
  `main_img` varchar(300) DEFAULT NULL COMMENT '기사 안 메인 이미지',
  `registe_date` datetime NOT NULL COMMENT '등록 날짜',
  `update_date` datetime NOT NULL COMMENT '업데이트 날짜',
  `ranking` int(11) NOT NULL COMMENT '랭킹(1~30)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;

INSERT INTO `article` (`id`, `title`, `office`, `article_content`, `link`, `thumb_img`, `main_img`, `registe_date`, `update_date`, `ranking`)
VALUES
	(1,'title 01','office 01','article_content 01','link 01','thumb_img 01','main_img 01','2019-02-24 17:38:02','2019-02-24 17:38:02',1),
	(2,'title 02','office 02','article_content 02','link 02','thumb_img 02','main_img 02','2019-02-24 17:38:02','2019-02-24 17:38:02',2),
	(3,'title 03','office 03','article_content 03','link 03','thumb_img 03','main_img 03','2019-02-24 17:38:02','2019-02-24 17:38:02',3),
	(4,'title 04','office 04','article_content 04','link 04','thumb_img 04','main_img 04','2019-02-24 17:38:02','2019-02-24 17:38:02',4),
	(5,'title 05','office 05','article_content 05','link 05','thumb_img 05','main_img 05','2019-02-24 17:38:02','2019-02-24 17:38:02',5),
	(6,'title 06','office 06','article_content 06','link 06','thumb_img 06','main_img 06','2019-02-24 17:38:02','2019-02-24 17:38:02',6),
	(7,'title 07','office 07','article_content 07','link 07','thumb_img 07','main_img 07','2019-02-24 17:38:02','2019-02-24 17:38:02',7),
	(8,'title 08','office 08','article_content 08','link 08','thumb_img 08','main_img 08','2019-02-24 17:38:02','2019-02-24 17:38:02',8),
	(9,'title 09','office 09','article_content 09','link 09','thumb_img 09','main_img 09','2019-02-24 17:38:02','2019-02-24 17:38:02',9),
	(10,'title 10','office 10','article_content 10','link 10','thumb_img 10','main_img 10','2019-02-24 17:38:02','2019-02-24 17:38:02',10);

/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table city
# ------------------------------------------------------------

DROP TABLE IF EXISTS `city`;

CREATE TABLE `city` (
  `city_cd` int(11) NOT NULL AUTO_INCREMENT,
  `city_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`city_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='시도 코드';

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;

INSERT INTO `city` (`city_cd`, `city_name`)
VALUES
	(10001,'강원'),
	(10002,'경기'),
	(10003,'경남'),
	(10004,'경북'),
	(10005,'광주'),
	(10006,'대구'),
	(10007,'대전'),
	(10008,'부산'),
	(10009,'비례대표'),
	(10010,'서울'),
	(10011,'세종특별자치시'),
	(10012,'울산'),
	(10013,'인천'),
	(10014,'전남'),
	(10015,'전북'),
	(10016,'제주'),
	(10017,'충남'),
	(10018,'충북');

/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table legislator
# ------------------------------------------------------------

DROP TABLE IF EXISTS `legislator`;

CREATE TABLE `legislator` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `legi_cd` int(11) NOT NULL COMMENT '의원코드',
  `legi_name` varchar(10) NOT NULL COMMENT '이름',
  `party_cd` int(11) DEFAULT NULL COMMENT '정당코드',
  `party_name` varchar(45) DEFAULT NULL COMMENT '정당이름',
  `city_cd` int(11) DEFAULT NULL COMMENT '도시코드',
  `city_name` varchar(45) DEFAULT NULL COMMENT '도시이름',
  `region` varchar(45) DEFAULT NULL COMMENT '지역구',
  `ordinal` int(11) DEFAULT NULL COMMENT '당선대수',
  `profile_img` text COMMENT '프로필이미지',
  `dept_cd` int(11) DEFAULT NULL COMMENT '부서코드(xml에 필요)',
  `reelection` varchar(5) DEFAULT NULL COMMENT '재선여부',
  `crime` text COMMENT '전과기록',
  `twitter` text COMMENT 'SNS 계정',
  `facebook` text,
  `blog` text,
  `phone` varchar(11) DEFAULT NULL COMMENT '의원실전화번호',
  `regist_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `legislator` WRITE;
/*!40000 ALTER TABLE `legislator` DISABLE KEYS */;

INSERT INTO `legislator` (`idx`, `legi_cd`, `legi_name`, `party_cd`, `party_name`, `city_cd`, `city_name`, `region`, `ordinal`, `profile_img`, `dept_cd`, `reelection`, `crime`, `twitter`, `facebook`, `blog`, `phone`, `regist_date`, `update_date`)
VALUES
	(1,153,'강길부',101030,'무소속',10012,'울산','울산 울주군',20,'http://www.assembly.go.kr/photo/9770276.jpg',9770276,'4선',NULL,'https://twitter.com/uljukang','https://www.facebook.com/ghilboo.kang','http://www.uljukang.org/','02-788-2708','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(2,2892,'강병원',101182,'더불어민주당',10010,'서울','서울 은평구을',20,'http://www.assembly.go.kr/photo/9770933.jpg',9770933,'초선',NULL,'https://twitter.com/kbw89','https://www.facebook.com/kbw89','http://blog.naver.com/kangbw89','02-784-1422','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(3,2927,'강석진',101186,'자유한국당',10003,'경남','경남 산청군함양군거창군합천군',20,'http://www.assembly.go.kr/photo/9771036.jpg',9771036,'초선',NULL,'','https://www.facebook.com/kksj7900','http://blog.naver.com/kksj7900','02-784-1460','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(4,2788,'강석호',101186,'자유한국당',10004,'경북','경북 영양군영덕군봉화군울진군',20,'http://www.assembly.go.kr/photo/9770512.jpg',9770512,'3선',NULL,'https://twitter.com/kangsh314','https://www.facebook.com/kangsh314','http://www.kangsh.kr/','02-784-2376','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(5,155,'강창일',101182,'더불어민주당',10016,'제주','제주 제주시갑',20,'http://www.assembly.go.kr/photo/9770279.jpg',9770279,'4선',NULL,'https://twitter.com/kangci52','https://www.facebook.com/kangci52','http://blog.daum.net/kangci809','02-784-6084','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(6,2852,'강효상',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771054.jpg',9771054,'초선',NULL,'','https://www.facebook.com/profile.php?id=100010914570054','','02-784-6195','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(7,2855,'강훈식',101182,'더불어민주당',10017,'충남','충남 아산시을',20,'http://www.assembly.go.kr/photo/9771007.jpg',9771007,'초선',NULL,'','https://www.facebook.com/gohoonsik','http://blog.naver.com/kanghunsik','02-784-1045','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(8,2680,'경대수',101186,'자유한국당',10018,'충북','충북 증평군진천군음성군',20,'http://www.assembly.go.kr/photo/9770708.jpg',9770708,'재선',NULL,'https://twitter.com/kyungds79','https://www.facebook.com/kyungds79','http://blog.naver.com/dskyung79','02-784-3977','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(9,2952,'고용진',101182,'더불어민주당',10010,'서울','서울 노원구갑',20,'http://www.assembly.go.kr/photo/9770931.jpg',9770931,'초선',NULL,'','https://www.facebook.com/yongjin.koh','http://blog.naver.com/kohyj64','02-784-4840','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(10,2862,'곽대훈',101186,'자유한국당',10006,'대구','대구 달서구갑',20,'http://www.assembly.go.kr/photo/9770961.jpg',9770961,'초선',NULL,'','https://www.facebook.com/kwak605','http://blog.naver.com/dhkwak605','02-784-0790','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(11,2969,'곽상도',101186,'자유한국당',10006,'대구','대구 중구남구',20,'http://www.assembly.go.kr/photo/9770956.jpg',9770956,'초선',NULL,'https://twitter.com/sangdokwak','https://www.facebook.com/sangdokwak','http://blog.naver.com/sangdokwak','02-784-8450','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(12,2846,'권미혁',101182,'더불어민주당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771066.jpg',9771066,'초선',NULL,'','https://www.facebook.com/rolrol994','http://blog.naver.com/kwonmh931','02-784-7727','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(13,2541,'권성동',101186,'자유한국당',10001,'강원','강원 강릉시',20,'http://www.assembly.go.kr/photo/9770679.jpg',9770679,'3선',NULL,'https://twitter.com/ksdd22','https://www.facebook.com/ksdd22','http://www.ksdd.net/5namu/1namu.php','02-784-3396','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(14,2824,'권은희',101192,'바른미래당',10005,'광주','광주 광산구을',20,'http://www.assembly.go.kr/photo/9770977.jpg',9770977,'재선',NULL,'https://twitter.com/kwoneunhee0215','https://www.facebook.com/kwoneh','http://keh.kr/','02-784-1813','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(15,2842,'권칠승',101182,'더불어민주당',10002,'경기','경기 화성시병',20,'http://www.assembly.go.kr/photo/9770998.jpg',9770998,'초선',NULL,'https://twitter.com/k7win_','https://www.facebook.com/people/권칠승/100011077455328','http://blog.naver.com/k7wins','02-784-1250','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(16,2851,'금태섭',101182,'더불어민주당',10010,'서울','서울 강서구갑',20,'http://www.assembly.go.kr/photo/9770937.jpg',9770937,'초선',NULL,'https://twitter.com/gtaeboy','https://www.facebook.com/tae.s.keum','http://www.gsgold.kr','02-784-9761','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(17,2968,'기동민',101182,'더불어민주당',10010,'서울','서울 성북구을',20,'http://www.assembly.go.kr/photo/9770927.jpg',9770927,'초선',NULL,'','https://www.facebook.com/dongmin.gi','http://blog.naver.com/gidongmin','02-784-3181','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(18,2946,'김경진',101191,'민주평화당',10005,'광주','광주 북구갑',20,'http://www.assembly.go.kr/photo/9770970.jpg',9770970,'초선',NULL,'https://twitter.com/kimkj008','https://www.facebook.com/goodmankimkj','http://kimklan88.blog.me/','02-784-2601','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(19,2606,'김경협',101182,'더불어민주당',10002,'경기','경기 부천시원미구갑',20,'http://www.assembly.go.kr/photo/9770712.jpg',9770712,'재선',NULL,'https://twitter.com/kimghkr','https://www.facebook.com/kimghkr','http://ggh000.blog.me/','02-784-1190','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(20,2457,'김관영',101192,'바른미래당',10015,'전북','전북 군산시',20,'http://www.assembly.go.kr/photo/9770713.jpg',9770713,'재선',NULL,'https://twitter.com/usekky','https://www.facebook.com/usekky','http://usekky.com/','02-784-1781','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(21,2740,'김광림',101186,'자유한국당',10004,'경북','경북 안동시',20,'http://www.assembly.go.kr/photo/9770523.jpg',9770523,'3선',NULL,'https://twitter.com/glkim333','https://www.facebook.com/glkim333','http://blog.naver.com/glkim1055','02-784-3063','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(22,2838,'김광수',101191,'민주평화당',10015,'전북','전북 전주시갑',20,'http://www.assembly.go.kr/photo/9771011.jpg',9771011,'초선',NULL,'https://twitter.com/ks_1958','https://www.facebook.com/profile.php?id=100003212864448','http://blog.naver.com/ks-1958','02-784-5970','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(23,2923,'김규환',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771044.jpg',9771044,'초선',NULL,'','','','02-784-5680','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(24,2525,'김기선',101186,'자유한국당',10001,'강원','강원 원주시갑',20,'http://www.assembly.go.kr/photo/9770716.jpg',9770716,'재선',NULL,'https://twitter.com/gambakim','https://www.facebook.com/kksun290','http://blog.naver.com/kksun290','02-784-1511','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(25,2607,'김도읍',101186,'자유한국당',10008,'부산','부산 북구강서구을',20,'http://www.assembly.go.kr/photo/9770719.jpg',9770719,'재선',NULL,'https://twitter.com/ldek3525','https://www.facebook.com/ldek3525','http://blog.naver.com/ldek3525','02-784-1740','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(26,165,'김동철',101192,'바른미래당',10005,'광주','광주 광산구갑',20,'http://www.assembly.go.kr/photo/9770295.jpg',9770295,'4선',NULL,'https://twitter.com/kdc2000','https://www.facebook.com/kdc2000','http://www.kdc2000.com/','02-788-2695','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(27,2836,'김두관',101182,'더불어민주당',10002,'경기','경기 김포시갑',20,'http://www.assembly.go.kr/photo/9770997.jpg',9770997,'초선',NULL,'https://twitter.com/dookwan','https://www.facebook.com/KimDookwan','http://blog.naver.com/kikdok','02-784-2566','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(28,2450,'김명연',101186,'자유한국당',10002,'경기','경기 안산시단원구갑',20,'http://www.assembly.go.kr/photo/9770721.jpg',9770721,'재선',NULL,'https://twitter.com/mmy523400','https://www.facebook.com/manfromansan?fref=ts','http://blog.naver.com/kk0969','02-784-1797','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(29,454,'김무성',101186,'자유한국당',10008,'부산','부산 중구영도구',20,'http://www.assembly.go.kr/photo/9770895.jpg',9770895,'6선',NULL,'https://twitter.com/kimmoosung','https://www.facebook.com/moosung4u','http://blog.naver.com/moosung4u','02-784-5274','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(30,2576,'김민기',101182,'더불어민주당',10002,'경기','경기 용인시을',20,'http://www.assembly.go.kr/photo/9770723.jpg',9770723,'재선',NULL,'https://twitter.com/kimminki84','https://www.facebook.com/kminki84','http://www.kimminki.co.kr/','02-784-1930','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(31,2860,'김병관',101182,'더불어민주당',10002,'경기','경기 성남시분당구갑',20,'http://www.assembly.go.kr/photo/9770983.jpg',9770983,'초선',NULL,'https://twitter.com/bgkimjhs','https://www.facebook.com/byounggwan','http://blog.naver.com/bgkim','02-784-5490','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(32,2902,'김병기',101182,'더불어민주당',10010,'서울','서울 동작구갑',20,'http://www.assembly.go.kr/photo/9770941.jpg',9770941,'초선',NULL,'https://twitter.com/thekimweapon','https://www.facebook.com/the.kim.weapon','','02-784-1322','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(33,2929,'김병욱',101182,'더불어민주당',10002,'경기','경기 성남시분당구을',20,'http://www.assembly.go.kr/photo/9770984.jpg',9770984,'초선',NULL,'https://twitter.com/777byung1','https://www.facebook.com/777byung','http://blog.naver.com/777byung','02-784-3670','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(34,305,'김부겸',101182,'더불어민주당',10006,'대구','대구 수성구갑',20,'http://www.assembly.go.kr/photo/9770960.jpg',9770960,'4선',NULL,'','','','02-784-4367','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(35,2975,'김삼화',101192,'바른미래당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771077.jpg',9771077,'초선',NULL,'','https://www.facebook.com/kimshlaw','http://blog.naver.com/kimshlaw','02-784-8231','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(36,2591,'김상훈',101186,'자유한국당',10006,'대구','대구 서구',20,'http://www.assembly.go.kr/photo/9770725.jpg',9770725,'재선',NULL,'https://twitter.com/kshdg11','https://www.facebook.com/kshdg11','http://blog.naver.com/kshdg11','02-784-2310','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(37,2760,'김상희',101182,'더불어민주당',10002,'경기','경기 부천시소사구',20,'http://www.assembly.go.kr/photo/9770527.jpg',9770527,'3선',NULL,'https://twitter.com/SosaKim','https://www.facebook.com/sosakim407','http://www.cleankim.kr/','02-784-4173','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(38,2878,'김석기',101186,'자유한국당',10004,'경북','경북 경주시',20,'http://www.assembly.go.kr/photo/9771024.jpg',9771024,'초선',NULL,'','https://www.facebook.com/podoripapa','http://blog.naver.com/podoriksk/','02-784-4170','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(39,2705,'김선동',101186,'자유한국당',10010,'서울','서울 도봉구을',20,'http://www.assembly.go.kr/photo/9770930.jpg',9770930,'재선',NULL,'https://twitter.com/kim_seondong','https://www.facebook.com/1kimseondong','','02-784-8971','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(40,2875,'김성수',101182,'더불어민주당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771065.jpg',9771065,'초선',NULL,'','','/opages/blog.naver.com/kss_0909','02-784-8780','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(41,2704,'김성식',101192,'바른미래당',10010,'서울','서울 관악구갑',20,'http://www.assembly.go.kr/photo/9770942.jpg',9770942,'재선',NULL,'https://twitter.com/okkimss','https://www.facebook.com/okkimss','http://blog.naver.com/okkimss','02-784-2051','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(42,2911,'김성원',101186,'자유한국당',10002,'경기','경기 동두천시연천군',20,'http://www.assembly.go.kr/photo/9770985.jpg',9770985,'초선',NULL,'https://twitter.com/sungwon3379','https://www.facebook.com/sungwon3379','http://blog.naver.com/v0413ksw','02-784-6566','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(43,2593,'김성찬',101186,'자유한국당',10003,'경남','경남 창원시진해구',20,'http://www.assembly.go.kr/photo/9770727.jpg',9770727,'재선',NULL,'https://twitter.com/kscjinhaesarang','https://www.facebook.com/ksc2385','http://blog.naver.com/ksc2385','02-784-2477','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(44,2643,'김성태',101186,'자유한국당',10010,'서울','서울 강서구을',20,'http://www.assembly.go.kr/photo/9770974.jpg',9770974,'3선',NULL,'https://twitter.com/kimsungtae','https://www.facebook.com/winkst','http://www.winkst.org/','02-788-2309','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(45,2959,'김성태',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771046.jpg',9771046,'초선',NULL,'https://twitter.com/kimsungtae','https://www.facebook.com/winkst','http://www.winkst.org/','02-784-6651','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(46,2887,'김성환',101182,'더불어민주당',10010,'서울','서울 노원구병',20,'http://www.assembly.go.kr/photo/9771089.jpg',9771089,'초선',NULL,'','','','02-784-6271','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(47,2650,'김세연',101186,'자유한국당',10008,'부산','부산 금정구',20,'http://www.assembly.go.kr/photo/9770534.jpg',9770534,'3선',NULL,'https://twitter.com/seyeonkim72','https://www.facebook.com/profile.php?id=100006028696877','http://www.ksy.or.kr/','02-788-2839','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(48,2867,'김수민',101192,'바른미래당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771075.jpg',9771075,'초선',NULL,'','https://www.facebook.com/sumin.kim.3532','','02-784-1534','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(49,2916,'김순례',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771053.jpg',9771053,'초선',NULL,'','','http://blog.naver.com/ksrye6259','02-784-2890','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(50,2973,'김승희',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771049.jpg',9771049,'초선',NULL,'','https://www.facebook.com/biokimshee','','02-784-8191','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(51,2732,'김영우',101186,'자유한국당',10002,'경기','경기 포천시가평군',20,'http://www.assembly.go.kr/photo/9770538.jpg',9770538,'3선',NULL,'https://twitter.com/kim_youngwoo','https://www.facebook.com/ywkim1','http://www.ywkim.co.kr/','02-788-2014','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(52,145,'김영주',101182,'더불어민주당',10010,'서울','서울 영등포구갑',20,'http://www.assembly.go.kr/photo/9770975.jpg',9770975,'3선',NULL,'https://twitter.com/yjkim550727','https://www.facebook.com/youngjoo2012','http://youngjoo.kr/','02-784-2470','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(53,2971,'김영진',101182,'더불어민주당',10002,'경기','경기 수원시병',20,'http://www.assembly.go.kr/photo/9770981.jpg',9770981,'초선',NULL,'https://twitter.com/minjoop','https://www.facebook.com/yjkimk','http://blog.naver.com/ersd34','02-784-8410','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(54,222,'김영춘',101182,'더불어민주당',10008,'부산','부산 부산진구갑',20,'http://www.assembly.go.kr/photo/9770949.jpg',9770949,'3선',NULL,'','','','02-784-1091','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(55,2865,'김영호',101182,'더불어민주당',10010,'서울','서울 서대문구을',20,'http://www.assembly.go.kr/photo/9770934.jpg',9770934,'초선',NULL,'https://twitter.com/minjoo05','','http://blog.naver.com/frencisco','02-784-4020','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(56,2689,'김용태',101186,'자유한국당',10010,'서울','서울 양천구을',20,'http://www.assembly.go.kr/photo/9770542.jpg',9770542,'3선',NULL,'https://twitter.com/ytnetwork','https://www.facebook.com/ytnetwork','http://ytnetwork.or.kr/','02-784-5076','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(57,147,'김재경',101186,'자유한국당',10003,'경남','경남 진주시을',20,'http://www.assembly.go.kr/photo/9770310.jpg',9770310,'4선',NULL,'https://twitter.com/powerjinju','https://www.facebook.com/profile.php?id=100011683522543&fref=ts','http://www.youngjinju.co.kr/','02-784-0054','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(58,148,'김재원',101186,'자유한국당',10004,'경북','경북 상주시군위군의성군청송군',20,'http://www.assembly.go.kr/photo/9771087.jpg',9771087,'3선',NULL,'https://twitter.com/2020jwk','https://www.facebook.com/2020jwk','http://www.kimjaewon.or.kr/','02-784-3190','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(59,2866,'김정우',101182,'더불어민주당',10002,'경기','경기 군포시갑',20,'http://www.assembly.go.kr/photo/9770993.jpg',9770993,'초선',NULL,'https://twitter.com/bravokorea00','https://www.facebook.com/bravokorea','http://gunpokcw.blog.me','02-784-2417','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(60,2970,'김정재',101186,'자유한국당',10004,'경북','경북 포항시북구',20,'http://www.assembly.go.kr/photo/9771023.jpg',9771023,'초선',NULL,'','https://www.facebook.com/lawjj2016','http://blog.naver.com/lawjj','02-784-6831','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(61,2939,'김정호',101182,'더불어민주당',10003,'경남','경남 김해시을',20,'http://www.assembly.go.kr/photo/9771090.jpg',9771090,'초선',NULL,'','','','02-784-5871','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(62,2199,'김정훈',101186,'자유한국당',10008,'부산','부산 남구갑',20,'http://www.assembly.go.kr/photo/9770316.jpg',9770316,'4선',NULL,'https://twitter.com/kjh8007','https://www.facebook.com/kjh8007','http://www.namgu21.com/','02-784-0680','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(63,2839,'김종대',101180,'정의당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771083.jpg',9771083,'초선',NULL,'','https://www.facebook.com/jdkim.justice','http://blog.naver.com/jdkim549','02-784-7612','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(64,2833,'김종민',101182,'더불어민주당',10017,'충남','충남 논산시계룡시금산군',20,'http://www.assembly.go.kr/photo/9771009.jpg',9771009,'초선',NULL,'https://twitter.com/socmind','https://www.facebook.com/socmind','http://blog.naver.com/socmind/220717062835','02-784-5920','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(65,2919,'김종석',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771048.jpg',9771048,'초선',NULL,'','https://www.facebook.com/jongseok1','http://kimjongseok.com/','02-784-6430','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(66,2953,'김종회',101191,'민주평화당',10015,'전북','전북 김제시부안군',20,'http://www.assembly.go.kr/photo/9771016.jpg',9771016,'초선',NULL,'https://twitter.com/weemin21','https://www.facebook.com/KimJonghoi','http://blog.naver.com/weemin21','02-784-2704','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(67,2958,'김종훈',101190,'민중당',10012,'울산','울산 동구',20,'http://www.assembly.go.kr/photo/9770978.jpg',9770978,'초선',NULL,'','https://www.facebook.com/donggulove','http://blog.naver.com/donggulove1234','02-784-9630','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(68,2962,'김중로',101192,'바른미래당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771078.jpg',9771078,'초선',NULL,'','https://www.facebook.com/joongrokim','http://blog.naver.com/kjroffice','02-784-9160','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(69,2640,'김진태',101186,'자유한국당',10001,'강원','강원 춘천시',20,'http://www.assembly.go.kr/photo/9770740.jpg',9770740,'재선',NULL,'https://twitter.com/jtkim1013','https://www.facebook.com/jtkim1013','http://www.kimjintae.co.kr/','02-784-3760','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(70,2775,'김진표',101182,'더불어민주당',10002,'경기','경기 수원시무',20,'http://www.assembly.go.kr/photo/9770982.jpg',9770982,'4선',NULL,'','','','02-784-3807','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(71,2967,'김철민',101182,'더불어민주당',10002,'경기','경기 안산시상록구을',20,'http://www.assembly.go.kr/photo/9770986.jpg',9770986,'초선',NULL,'https://twitter.com/kimcm8764','https://www.facebook.com/kcm8764','http://blog.naver.com/kcm8764','02-784-2135','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(72,556,'김태년',101182,'더불어민주당',10002,'경기','경기 성남시수정구',20,'http://www.assembly.go.kr/photo/9770741.jpg',9770741,'3선',NULL,'https://twitter.com/kimtaenyeon','https://www.facebook.com/kimtaenyeon','http://www.ktn21.com/','02-784-4570','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(73,2575,'김태흠',101186,'자유한국당',10017,'충남','충남 보령시서천군',20,'http://www.assembly.go.kr/photo/9770742.jpg',9770742,'재선',NULL,'https://twitter.com/ktheum','https://www.facebook.com/ktheum','http://kimtaeheum.com/','02-784-4710','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(74,2630,'김학용',101186,'자유한국당',10002,'경기','경기 안성시',20,'http://www.assembly.go.kr/photo/9770670.jpg',9770670,'3선',NULL,'https://twitter.com/kimhackyong','https://www.facebook.com/KimHackYong','http://ansung365.com/','02-784-3860','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(75,2932,'김한정',101182,'더불어민주당',10002,'경기','경기 남양주시을',20,'http://www.assembly.go.kr/photo/9770991.jpg',9770991,'초선',NULL,'https://twitter.com/hanjungok','https://www.facebook.com/hanjungkim21','http://blog.naver.com/hanjungkim','02-784-0496','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(76,2543,'김한표',101186,'자유한국당',10003,'경남','경남 거제시',20,'http://www.assembly.go.kr/photo/9770744.jpg',9770744,'재선',NULL,'https://twitter.com/khp1001','https://www.facebook.com/khpgeoje','http://blog.naver.com/khpgeoje','02-784-4760','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(77,2925,'김해영',101182,'더불어민주당',10008,'부산','부산 연제구',20,'http://www.assembly.go.kr/photo/9770953.jpg',9770953,'초선',NULL,'https://twitter.com/hykim0417','https://www.facebook.com/hyk0417','http://blog.naver.com/hykim0417','02-784-1051','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(78,2879,'김현권',101182,'더불어민주당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771061.jpg',9771061,'초선',NULL,'https://twitter.com/hanwooabi','https://www.facebook.com/hanwooabi','http://blog.naver.com/farmhk20','02-784-2841','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(79,128,'김현미',101182,'더불어민주당',10002,'경기','경기 고양시정',20,'http://www.assembly.go.kr/photo/9770746.jpg',9770746,'3선',NULL,'https://twitter.com/hyunmeek','https://www.facebook.com/hyunmeek','http://hyunmee.net/main/ko/index.html','02-784-4990','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(80,491,'김현아',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771055.jpg',9771055,'초선',NULL,'','https://www.facebook.com/dposhyun','http://blog.naver.com/dposhyun','02-784-5601','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(81,131,'나경원',101186,'자유한국당',10010,'서울','서울 동작구을',20,'http://www.assembly.go.kr/photo/9770903.jpg',9770903,'4선',NULL,'https://twitter.com/nakw','https://www.facebook.com/nakw1963','http://blog.naver.com/nakw63','02-784-3103','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(82,2618,'남인순',101182,'더불어민주당',10010,'서울','서울 송파구병',20,'http://www.assembly.go.kr/photo/9770752.jpg',9770752,'재선',NULL,'https://twitter.com/nisoon','https://www.facebook.com/nisoon','http://blog.naver.com/nisoon','02-784-5980','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(83,133,'노웅래',101182,'더불어민주당',10010,'서울','서울 마포구갑',20,'http://www.assembly.go.kr/photo/9770753.jpg',9770753,'3선',NULL,'https://twitter.com/GoWith_WRaenoh','https://www.facebook.com/gowithwrae/','http://blog.naver.com/with_wraenoh','02-788-2203','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(84,2585,'도종환',101182,'더불어민주당',10018,'충북','충북 청주시흥덕구',20,'http://www.assembly.go.kr/photo/9770755.jpg',9770755,'재선',NULL,'','https://www.facebook.com/djhpoem','http://djh333.co.kr/','02-784-2537','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(85,2888,'맹성규',101182,'더불어민주당',10013,'인천','인천 남동구갑',20,'http://www.assembly.go.kr/photo/9771091.jpg',9771091,'초선',NULL,'','','','02-784-6181','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(86,2897,'문진국',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771042.jpg',9771042,'초선',NULL,'','','http://blog.naver.com/kook4616','02-784-9340','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(87,209,'문희상',101030,'무소속',10002,'경기','경기 의정부시갑',20,'http://www.assembly.go.kr/photo/9770084.jpg',9770084,'6선',NULL,'https://twitter.com/moonhstw','https://www.facebook.com/moonhsface','http://blog.naver.com/moonhs1001','02-784-1261','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(88,2845,'민경욱',101186,'자유한국당',10013,'인천','인천 연수구을',20,'http://www.assembly.go.kr/photo/9770964.jpg',9770964,'초선',NULL,'https://twitter.com/minkyungwook','https://www.facebook.com/minkyungwookk','http://blog.naver.com/minkyungwook','02-784-4071','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(89,110,'민병두',101182,'더불어민주당',10010,'서울','서울 동대문구을',20,'http://www.assembly.go.kr/photo/9770761.jpg',9770761,'3선',NULL,'https://twitter.com/bdmin1958','https://www.facebook.com/bdmin','http://www.bdmin.net/','02-788-2256','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(90,2615,'민홍철',101182,'더불어민주당',10003,'경남','경남 김해시갑',20,'http://www.assembly.go.kr/photo/9770764.jpg',9770764,'재선',NULL,'https://twitter.com/minstar21c','https://www.facebook.com/hongchul.min.1','http://blog.daum.net/minhongcheol','02-784-6490','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(91,2918,'박경미',101182,'더불어민주당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771056.jpg',9771056,'초선',NULL,'','','','02-784-6120','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(92,2823,'박광온',101182,'더불어민주당',10002,'경기','경기 수원시정',20,'http://www.assembly.go.kr/photo/9770911.jpg',9770911,'재선',NULL,'https://twitter.com/parkkwangon','https://www.facebook.com/mentpko','http://blog.naver.com/kopark2012','02-784-5364','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(93,2768,'박대출',101186,'자유한국당',10003,'경남','경남 진주시갑',20,'http://www.assembly.go.kr/photo/9770767.jpg',9770767,'재선',NULL,'https://twitter.com/dcparkjj','https://www.facebook.com/daechul.bag','http://blog.naver.com/dcparkjj','02-784-6750','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(94,2488,'박덕흠',101186,'자유한국당',10018,'충북','충북 보은군옥천군영동군괴산군',20,'http://www.assembly.go.kr/photo/9770768.jpg',9770768,'재선',NULL,'https://twitter.com/parkdukhyum','https://www.facebook.com/parkdukhyum','http://parkdukhyum.blog.me/','02-784-6550','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(95,2827,'박맹우',101186,'자유한국당',10012,'울산','울산 남구을',20,'http://www.assembly.go.kr/photo/9770908.jpg',9770908,'재선',NULL,'','https://www.facebook.com/ulsanpmw','http://blog.naver.com/ulsanpmw','02-788-2259','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(96,2819,'박명재',101186,'자유한국당',10004,'경북','경북 포항시남구울릉군',20,'http://www.assembly.go.kr/photo/9770899.jpg',9770899,'재선',NULL,'https://twitter.com/mjepark531','https://www.facebook.com/mjepark531','http://blog.naver.com/mjpark531','02-788-2174','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(97,2580,'박범계',101182,'더불어민주당',10007,'대전','대전 서구을',20,'http://www.assembly.go.kr/photo/9770770.jpg',9770770,'재선',NULL,'https://twitter.com/bkfire1004','https://www.facebook.com/bkfire','http://blog.naver.com/bkfire1004','02-784-6960','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(98,211,'박병석',101182,'더불어민주당',10007,'대전','대전 서구갑',20,'http://www.assembly.go.kr/photo/9770090.jpg',9770090,'5선',NULL,'','https://www.facebook.com/okpbs','http://blog.naver.com/pbs2100','02-788-2306','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(99,2753,'박선숙',101192,'바른미래당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771073.jpg',9771073,'재선',NULL,'','','','02-784-2390','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(100,492,'박성중',101186,'자유한국당',10010,'서울','서울 서초구을',20,'http://www.assembly.go.kr/photo/9770944.jpg',9770944,'초선',NULL,'https://twitter.com/parksungjoong','https://www.facebook.com/sjpark101','http://blog.naver.com/sjpark580801','02-784-4364','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(101,114,'박순자',101186,'자유한국당',10002,'경기','경기 안산시단원구을',20,'http://www.assembly.go.kr/photo/9770987.jpg',9770987,'3선',NULL,'','https://www.facebook.com/hisoonja','','02-784-1606','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(102,116,'박영선',101182,'더불어민주당',10010,'서울','서울 구로구을',20,'http://www.assembly.go.kr/photo/9770347.jpg',9770347,'4선',NULL,'https://twitter.com/Park_Youngsun','https://www.facebook.com/Parkyoungsun21','http://blog.pys21.net/','02-784-3870','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(103,2964,'박완수',101186,'자유한국당',10003,'경남','경남 창원시의창구',20,'http://www.assembly.go.kr/photo/9771030.jpg',9771030,'초선',NULL,'','https://www.facebook.com/wansu2u','http://blog.naver.com/wansu2u','02-784-7773','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(104,2608,'박완주',101182,'더불어민주당',10017,'충남','충남 천안시을',20,'http://www.assembly.go.kr/photo/9770774.jpg',9770774,'재선',NULL,'https://twitter.com/park_wanju','https://www.facebook.com/parkwanju','http://blog.naver.com/withwanju','02-784-7560','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(105,489,'박용진',101182,'더불어민주당',10010,'서울','서울 강북구을',20,'http://www.assembly.go.kr/photo/9770929.jpg',9770929,'초선',NULL,'https://twitter.com/hopeparkyongjin','https://www.facebook.com/yongjin.bag','','02-784-9721','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(106,2592,'박인숙',101186,'자유한국당',10010,'서울','서울 송파구갑',20,'http://www.assembly.go.kr/photo/9770776.jpg',9770776,'재선',NULL,'https://twitter.com/ispark0530','https://www.facebook.com/ispark0530','http://www.parkinsook.co.kr/','02-784-7810','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(107,2943,'박재호',101182,'더불어민주당',10008,'부산','부산 남구을',20,'http://www.assembly.go.kr/photo/9770950.jpg',9770950,'초선',NULL,'https://twitter.com/ourpark','https://www.facebook.com/parkjaeho','http://blog.naver.com/pjh0586','02-784-5512','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(108,2844,'박정',101182,'더불어민주당',10002,'경기','경기 파주시을',20,'http://www.assembly.go.kr/photo/9770995.jpg',9770995,'초선',NULL,'https://twitter.com/pjkorea21c','https://www.facebook.com/pjkorea21c','http://blog.naver.com/pjkorea21c','02-784-3781','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(109,2915,'박주민',101182,'더불어민주당',10010,'서울','서울 은평구갑',20,'http://www.assembly.go.kr/photo/9770932.jpg',9770932,'초선',NULL,'https://twitter.com/yoeman6310','https://www.facebook.com/eunpyoung.joomin','http://joomincenter.com/','02-784-8690','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(110,190,'박주선',101192,'바른미래당',10005,'광주','광주 동구남구을',20,'http://www.assembly.go.kr/photo/9770566.jpg',9770566,'4선',NULL,'https://twitter.com/parkjoosun','https://www.facebook.com/parkjoosun','http://blog.naver.com/pjoos0531','02-784-5288','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(111,2870,'박주현',101192,'바른미래당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771071.jpg',9771071,'초선',NULL,'https://twitter.com/polarbear9782','','','02-784-6341','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(112,2533,'박지원',101191,'민주평화당',10014,'전남','전남 목포시',20,'http://www.assembly.go.kr/photo/9770568.jpg',9770568,'4선',NULL,'https://twitter.com/jwp615','https://www.facebook.com/jwp615','http://blog.naver.com/jwp615','02-784-4179','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(113,2945,'박찬대',101182,'더불어민주당',10013,'인천','인천 연수구갑',20,'http://www.assembly.go.kr/photo/9770963.jpg',9770963,'초선',NULL,'','https://www.facebook.com/whiparam','http://blog.naver.com/starhanmia','02-784-5477','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(114,2767,'박홍근',101182,'더불어민주당',10010,'서울','서울 중랑구을',20,'http://www.assembly.go.kr/photo/9770779.jpg',9770779,'재선',NULL,'https://twitter.com/maumgil','https://www.facebook.com/maumgil','http://blog.naver.com/bakhonggeun','02-784-8370','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(115,2898,'백승주',101186,'자유한국당',10004,'경북','경북 구미시갑',20,'http://www.assembly.go.kr/photo/9771025.jpg',9771025,'초선',NULL,'','https://www.facebook.com/gumibsj1778','http://blog.naver.com/gumibsj1778','02-784-6730','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(116,2692,'백재현',101182,'더불어민주당',10002,'경기','경기 광명시갑',20,'http://www.assembly.go.kr/photo/9770573.jpg',9770573,'3선',NULL,'https://twitter.com/jhok100','https://www.facebook.com/jhok100','http://blog.naver.com/bjdj100','788-2326(국회','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(117,2871,'백혜련',101182,'더불어민주당',10002,'경기','경기 수원시을',20,'http://www.assembly.go.kr/photo/9770980.jpg',9770980,'초선',NULL,'https://twitter.com/100HyeRyun','https://www.facebook.com/100hyeryun1','http://blog.naver.com/100hyeryun','02-784-6130','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(118,122,'변재일',101182,'더불어민주당',10018,'충북','충북 청주시청원구',20,'http://www.assembly.go.kr/photo/9770356.jpg',9770356,'4선',NULL,'https://twitter.com/byunjaeill','https://www.facebook.com/open1197','http://blog.naver.com/open1197news','02-784-1626','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(119,2940,'서삼석',101182,'더불어민주당',10014,'전남','전남 영암군무안군신안군',20,'http://www.assembly.go.kr/photo/9771092.jpg',9771092,'초선',NULL,'','','','02-784-9501','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(120,2611,'서영교',101182,'더불어민주당',10010,'서울','서울 중랑구갑',20,'http://www.assembly.go.kr/photo/9770784.jpg',9770784,'재선',NULL,'https://twitter.com/seoyoungkyo','https://www.facebook.com/youngkyone','http://blog.naver.com/youngkyos','02-784-8490','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(121,470,'서청원',101030,'무소속',10002,'경기','경기 화성시갑',20,'http://www.assembly.go.kr/photo/9770898.jpg',9770898,'8선',NULL,'https://twitter.com/scw0403','https://www.facebook.com/suhchungwon','http://blog.naver.com/scw0714','02-788-2078','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(122,2873,'서형수',101182,'더불어민주당',10003,'경남','경남 양산시을',20,'http://www.assembly.go.kr/photo/9771035.jpg',9771035,'초선',NULL,'','https://www.facebook.com/shsyangsan?fref=ts','http://blog.naver.com/shsoo2016/220738025890','02-784-1524','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(123,488,'설훈',101182,'더불어민주당',10002,'경기','경기 부천시원미구을',20,'http://www.assembly.go.kr/photo/9770786.jpg',9770786,'4선',NULL,'https://twitter.com/sulhoon','','http://blog.naver.com/sulhoon21','02-784-8570','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(124,2920,'성일종',101186,'자유한국당',10017,'충남','충남 서산시태안군',20,'http://www.assembly.go.kr/photo/9771008.jpg',9771008,'초선',NULL,'','https://www.facebook.com/sij5140','http://www.sungij.co.kr','02-784-6290','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(125,2863,'소병훈',101182,'더불어민주당',10002,'경기','경기 광주시갑',20,'http://www.assembly.go.kr/photo/9770999.jpg',9770999,'초선',NULL,'https://twitter.com/sotongsa','https://www.facebook.com/sotongsa1','http://blog.naver.com/sotongsa','02-784-5020','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(126,2901,'손금주',101030,'무소속',10014,'전남','전남 나주시화순군',20,'http://www.assembly.go.kr/photo/9771019.jpg',9771019,'초선',NULL,'','https://www.facebook.com/nowjs','http://blog.naver.com/nowjs21','02-784-9401','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(127,2974,'손혜원',101030,'무소속',10010,'서울','서울 마포구을',20,'http://www.assembly.go.kr/photo/9770935.jpg',9770935,'초선',NULL,'https://twitter.com/sohnhyewon','https://www.facebook.com/sohnhyewon','','02-784-9241','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(128,2972,'송갑석',101182,'더불어민주당',10005,'광주','광주 서구갑',20,'http://www.assembly.go.kr/photo/9771093.jpg',9771093,'초선',NULL,'','','','02-784-5750','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(129,2928,'송기헌',101182,'더불어민주당',10001,'강원','강원 원주시을',20,'http://www.assembly.go.kr/photo/9771001.jpg',9771001,'초선',NULL,'','https://www.facebook.com/withsong','/opages/www.peacesong1.blog.me','02-784-6150','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(130,2880,'송석준',101186,'자유한국당',10002,'경기','경기 이천시',20,'http://www.assembly.go.kr/photo/9770996.jpg',9770996,'초선',NULL,'','https://www.facebook.com/icheonsarang','http://icheonsarang.com/','02-784-3161','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(131,2977,'송언석',101186,'자유한국당',10004,'경북','경북 김천시',20,'http://www.assembly.go.kr/photo/9771094.jpg',9771094,'초선',NULL,'','','','02-784-3011','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(132,202,'송영길',101182,'더불어민주당',10013,'인천','인천 계양구을',20,'http://www.assembly.go.kr/photo/9770967.jpg',9770967,'4선',NULL,'','','','02-784-8957','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(133,2882,'송옥주',101182,'더불어민주당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771058.jpg',9771058,'초선',NULL,'','','','02-784-9470','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(134,490,'송희경',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771039.jpg',9771039,'초선',NULL,'','https://www.facebook.com/ITssong','http://blog.naver.com/alpha-song','02)784-2455','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(135,2485,'신경민',101182,'더불어민주당',10010,'서울','서울 영등포구을',20,'http://www.assembly.go.kr/photo/9770792.jpg',9770792,'재선',NULL,'https://twitter.com/mentshin','https://www.facebook.com/mentshin','http://blog.naver.com/mentshin','02-784-8950','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(136,2937,'신동근',101182,'더불어민주당',10013,'인천','인천 서구을',20,'http://www.assembly.go.kr/photo/9770968.jpg',9770968,'초선',NULL,'https://twitter.com/skdc2875','https://www.facebook.com/shindk2016','http://shindk.kr','02-784-6142','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(137,2893,'신보라',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771045.jpg',9771045,'초선',NULL,'','https://www.facebook.com/qhfk111','http://blog.naver.com/qhepd111','02-784-8731','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(138,2667,'신상진',101186,'자유한국당',10002,'경기','경기 성남시중원구',20,'http://www.assembly.go.kr/photo/9770921.jpg',9770921,'4선',NULL,'https://twitter.com/21cssj','https://www.facebook.com/smedass','http://www.ssj.or.kr/','02-782-9901','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(139,2921,'신용현',101192,'바른미래당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771069.jpg',9771069,'초선',NULL,'','','','02-784-2620','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(140,2941,'신창현',101182,'더불어민주당',10002,'경기','경기 의왕시과천시',20,'http://www.assembly.go.kr/photo/9770989.jpg',9770989,'초선',NULL,'','https://www.facebook.com/shin2016','http://blog.naver.com/shin_2012','02-784-5285','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(141,2955,'심기준',101182,'더불어민주당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771086.jpg',9771086,'초선',NULL,'https://twitter.com/simkijoon','https://www.facebook.com/simkijoon','','02-784-8870','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(142,102,'심상정',101180,'정의당',10002,'경기','경기 고양시갑',20,'http://www.assembly.go.kr/photo/9770869.jpg',9770869,'3선',NULL,'https://twitter.com/sangjungsim','https://www.facebook.com/simsangjung','http://www.minsim.or.kr/','02-784-9530','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(143,178,'심재권',101182,'더불어민주당',10010,'서울','서울 강동구을',20,'http://www.assembly.go.kr/photo/9770798.jpg',9770798,'3선',NULL,'https://twitter.com/sjk0815','https://www.facebook.com/jkshim0588','http://blog.naver.com/shimjk815','02-788-2485','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(144,179,'심재철',101186,'자유한국당',10002,'경기','경기 안양시동안구을',20,'http://www.assembly.go.kr/photo/9770138.jpg',9770138,'5선',NULL,'https://twitter.com/cleanshim','https://www.facebook.com/cleanshim','http://cleanshim.blog.me/','02-784-4164','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(145,2659,'안규백',101182,'더불어민주당',10010,'서울','서울 동대문구갑',20,'http://www.assembly.go.kr/photo/9770587.jpg',9770587,'3선',NULL,'https://twitter.com/agbhope','https://www.facebook.com/AGBhope','http://blog.naver.com/agbhope','02-784-4181','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(146,105,'안민석',101182,'더불어민주당',10002,'경기','경기 오산시',20,'http://www.assembly.go.kr/photo/9770372.jpg',9770372,'4선',NULL,'https://twitter.com/eduhimang','https://www.facebook.com/osan21','http://blog.naver.com/ams0506','02-784-3877','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(147,2020,'안상수',101186,'자유한국당',10013,'인천','인천 중구동구강화군옹진군',20,'http://www.assembly.go.kr/photo/9770919.jpg',9770919,'3선',NULL,'https://twitter.com/ahnssoo','https://www.facebook.com/ahnssoo1','http://blog.naver.com/ahnssoo1','02-784-2690','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(148,2906,'안호영',101182,'더불어민주당',10015,'전북','전북 완주군진안군무주군장수군',20,'http://www.assembly.go.kr/photo/9771017.jpg',9771017,'초선',NULL,'','https://www.facebook.com/ahnho065','http://blog.naver.com/lawanhoyoung','02-784-9751','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(149,2861,'어기구',101182,'더불어민주당',10017,'충남','충남 당진시',20,'http://www.assembly.go.kr/photo/9771010.jpg',9771010,'초선',NULL,'','','http://blog.naver.com/kiyku','02-784-4360','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(150,2944,'엄용수',101186,'자유한국당',10003,'경남','경남 밀양시의령군함안군창녕군',20,'http://www.assembly.go.kr/photo/9771034.jpg',9771034,'초선',NULL,'','https://www.facebook.com/miraeyongsoo','http://blog.naver.com/mypr3814','02-784-2316','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(151,2747,'여상규',101186,'자유한국당',10003,'경남','경남 사천시남해군하동군',20,'http://www.assembly.go.kr/photo/9770591.jpg',9770591,'3선',NULL,'https://twitter.com/sky435','https://www.facebook.com/sky435','http://blog.naver.com/bluesky435','02-784-1845','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(152,2544,'염동열',101186,'자유한국당',10001,'강원','강원 태백시횡성군영월군평창군정선군',20,'http://www.assembly.go.kr/photo/9770802.jpg',9770802,'재선',NULL,'https://twitter.com/DY_YEOM','https://www.facebook.com/yeomdy','http://blog.naver.com/namjo335','02-784-9820','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(153,2831,'오신환',101192,'바른미래당',10010,'서울','서울 관악구을',20,'http://www.assembly.go.kr/photo/9770918.jpg',9770918,'재선',NULL,'https://twitter.com/arang301','https://www.facebook.com/arang301','http://blog.naver.com/arang301','02-784-5761','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(154,2840,'오영훈',101182,'더불어민주당',10016,'제주','제주 제주시을',20,'http://www.assembly.go.kr/photo/9771037.jpg',9771037,'초선',NULL,'','https://www.facebook.com/younghun21','http://blog.naver.com/younghun3706','02-784-5621','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(155,84,'오제세',101182,'더불어민주당',10018,'충북','충북 청주시서원구',20,'http://www.assembly.go.kr/photo/9770380.jpg',9770380,'4선',NULL,'','https://www.facebook.com/ojs0126','http://www.ojs.or.kr/','02-788-2303','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(156,2453,'우상호',101182,'더불어민주당',10010,'서울','서울 서대문구갑',20,'http://www.assembly.go.kr/photo/9770871.jpg',9770871,'3선',NULL,'','https://www.facebook.com/woosangho','http://www.woosangho.net/','02-784-3071','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(157,85,'우원식',101182,'더불어민주당',10010,'서울','서울 노원구을',20,'http://www.assembly.go.kr/photo/9770872.jpg',9770872,'3선',NULL,'https://twitter.com/wonsikw','https://www.facebook.com/wonsikw','http://www.xn--wv4bz3e0c.kr/','02-784-3601','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(158,1804,'원유철',101186,'자유한국당',10002,'경기','경기 평택시갑',20,'http://www.assembly.go.kr/photo/9770592.jpg',9770592,'5선',NULL,'https://twitter.com/won6767','https://www.facebook.com/wantyou67','http://www.won21.or.kr/','02-784-4441','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(159,89,'원혜영',101182,'더불어민주당',10002,'경기','경기 부천시오정구',20,'http://www.assembly.go.kr/photo/9770386.jpg',9770386,'5선',NULL,'https://twitter.com/wonhyeyoung','https://www.facebook.com/whywon','http://www.wonhyeyoung.or.kr/','02-784-3106','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(160,2859,'위성곤',101182,'더불어민주당',10016,'제주','제주 서귀포시',20,'http://www.assembly.go.kr/photo/9771038.jpg',9771038,'초선',NULL,'https://twitter.com/wisg1128','https://www.facebook.com/wisg1128','http://wishjeju.kr','02-784-6450','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(161,90,'유기준',101186,'자유한국당',10008,'부산','부산 서구동구',20,'http://www.assembly.go.kr/photo/9770387.jpg',9770387,'4선',NULL,'https://twitter.com/yookijune','https://www.facebook.com/YOOKIJUNE','http://www.seogu21c.com/','02-788-2493','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(162,2885,'유동수',101182,'더불어민주당',10013,'인천','인천 계양구갑',20,'http://www.assembly.go.kr/photo/9770966.jpg',9770966,'초선',NULL,'','https://www.facebook.com/newds2016','http://blog.naver.com/newds61','02-784-3543','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(163,2894,'유민봉',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771050.jpg',9771050,'초선',NULL,'','https://www.facebook.com/mbyoo1015','','02-784-2060','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(164,2759,'유성엽',101191,'민주평화당',10015,'전북','전북 정읍시고창군',20,'http://www.assembly.go.kr/photo/9770594.jpg',9770594,'3선',NULL,'https://twitter.com/ya_jeong','https://www.facebook.com/yajeong','http://www.yajeong.or.kr/','02-788-2209','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(165,406,'유승민',101192,'바른미래당',10006,'대구','대구 동구을',20,'http://www.assembly.go.kr/photo/9770497.jpg',9770497,'4선',NULL,'','https://www.facebook.com/sminyoo','http://www.ysm21.com/','02-784-1840','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(166,91,'유승희',101182,'더불어민주당',10010,'서울','서울 성북구갑',20,'http://www.assembly.go.kr/photo/9770874.jpg',9770874,'3선',NULL,'https://twitter.com/337ysh','https://www.facebook.com/youseunghee','http://www.yoush.org/','02-784-4091','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(167,2676,'유은혜',101182,'더불어민주당',10002,'경기','경기 고양시병',20,'http://www.assembly.go.kr/photo/9770807.jpg',9770807,'재선',NULL,'https://twitter.com/way2yoo','https://www.facebook.com/way2yoo','http://way2yoo.com/','02-784-4291','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(168,2820,'유의동',101192,'바른미래당',10002,'경기','경기 평택시을',20,'http://www.assembly.go.kr/photo/9770912.jpg',9770912,'재선',NULL,'','https://www.facebook.com/euidongyu','http://yueuidong.com/','02-784-7351','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(169,2765,'유재중',101186,'자유한국당',10008,'부산','부산 수영구',20,'http://www.assembly.go.kr/photo/9770596.jpg',9770596,'3선',NULL,'https://twitter.com/Yoojaejung','','http://www.yjj21.co.kr/','02-784-6066','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(170,2481,'윤관석',101182,'더불어민주당',10013,'인천','인천 남동구을',20,'http://www.assembly.go.kr/photo/9770808.jpg',9770808,'재선',NULL,'https://twitter.com/yks0817','https://www.facebook.com/yks0817','http://blog.naver.com/winneryks','02-784-4380','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(171,2883,'윤상직',101186,'자유한국당',10008,'부산','부산 기장군',20,'http://www.assembly.go.kr/photo/9770955.jpg',9770955,'초선',NULL,'https://twitter.com/victorysangick','https://www.facebook.com/yoonsangjick','http://blog.naver.com/dbs160413','02-784-8940','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(172,2638,'윤상현',101186,'자유한국당',10013,'인천','인천 미추홀구을',20,'http://www.assembly.go.kr/photo/9770598.jpg',9770598,'3선',NULL,'https://twitter.com/sanghyun_yoon','https://www.facebook.com/yoonsanghyun1962','http://www.shyoon.co.kr/','02-788-2805','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(173,2841,'윤소하',101180,'정의당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771085.jpg',9771085,'초선',NULL,'','https://www.facebook.com/yunsoha','http://blog.daum.net/yunsoha','02-784-3080','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(174,2547,'윤영석',101186,'자유한국당',10003,'경남','경남 양산시갑',20,'http://www.assembly.go.kr/photo/9770811.jpg',9770811,'재선',NULL,'','https://www.facebook.com/yyshangomy','http://www.hangomy.co.kr/','02-784-4861','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(175,2917,'윤영일',101191,'민주평화당',10014,'전남','전남 해남군완도군진도군',20,'http://www.assembly.go.kr/photo/9771021.jpg',9771021,'초선',NULL,'https://twitter.com/yoon571104','https://www.facebook.com/yoon571104','http://blog.naver.com/yiyoon0101','02-784-1571','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(176,2890,'윤일규',101182,'더불어민주당',10017,'충남','충남 천안시병',20,'http://www.assembly.go.kr/photo/9771095.jpg',9771095,'초선',NULL,'','','',NULL,'2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(177,2442,'윤재옥',101186,'자유한국당',10006,'대구','대구 달서구을',20,'http://www.assembly.go.kr/photo/9770812.jpg',9770812,'재선',NULL,'https://twitter.com/yunjaeok','https://www.facebook.com/yunjaeok','http://www.yunjaeok.com/','02-784-4871','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(178,2881,'윤종필',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771051.jpg',9771051,'초선',NULL,'','https://www.facebook.com/jpyoon605','http://blog.naver.com/jpyoon605','02-784-7141','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(179,2938,'윤준호',101182,'더불어민주당',10008,'부산','부산 해운대구을',20,'http://www.assembly.go.kr/photo/9771096.jpg',9771096,'초선',NULL,'','','','02-784-0797','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(180,2876,'윤한홍',101186,'자유한국당',10003,'경남','경남 창원시마산회원구',20,'http://www.assembly.go.kr/photo/9771032.jpg',9771032,'초선',NULL,'','https://www.facebook.com/uhh609','http://blog.naver.com/uhh609','02-784-2371','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(181,57,'윤호중',101182,'더불어민주당',10002,'경기','경기 구리시',20,'http://www.assembly.go.kr/photo/9770876.jpg',9770876,'3선',NULL,'https://twitter.com/dpcorea','https://www.facebook.com/hojung.yun','http://blog.naver.com/hjyun327','02-784-4961','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(182,2573,'윤후덕',101182,'더불어민주당',10002,'경기','경기 파주시갑',20,'http://www.assembly.go.kr/photo/9770813.jpg',9770813,'재선',NULL,'https://twitter.com/yoons609','https://www.facebook.com/yoons609','http://pajulove.kr/','02-788-2587','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(183,1967,'이개호',101182,'더불어민주당',10014,'전남','전남 담양군함평군영광군장성군',20,'http://www.assembly.go.kr/photo/9770905.jpg',9770905,'재선',NULL,'','https://www.facebook.com/LeeGaeHo','http://www.leegaeho.co.kr/','02-784-2165','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(184,2935,'이규희',101182,'더불어민주당',10017,'충남','충남 천안시갑',20,'http://www.assembly.go.kr/photo/9771097.jpg',9771097,'초선',NULL,'','','',NULL,'2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(185,2912,'이동섭',101192,'바른미래당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771080.jpg',9771080,'초선',NULL,'https://twitter.com/leedongsup','https://www.facebook.com/dongsup.lee.9','http://blog.daum.net/nowonlife','02-784-2577','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(186,2965,'이만희',101186,'자유한국당',10004,'경북','경북 영천시청도군',20,'http://www.assembly.go.kr/photo/9771028.jpg',9771028,'초선',NULL,'https://twitter.com/yc20002','https://www.facebook.com/yc20002','http://blog.naver.com/yc20002','02-784-5901','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(187,2764,'이명수',101186,'자유한국당',10017,'충남','충남 아산시갑',20,'http://www.assembly.go.kr/photo/9770602.jpg',9770602,'3선',NULL,'https://twitter.com/asanworld','https://www.facebook.com/asanpride','http://www.mslee.co.kr/','02-788-2891','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(188,2903,'이상돈',101192,'바른미래당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771072.jpg',9771072,'초선',NULL,'','','http://blog.naver.com/sdl1951','02-784-4750','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(189,342,'이상민',101182,'더불어민주당',10007,'대전','대전 유성구을',20,'http://www.assembly.go.kr/photo/9770414.jpg',9770414,'4선',NULL,'https://twitter.com/esangmin','https://www.facebook.com/esangmin','http://blog.naver.com/lawlsm123','02-784-0924','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(190,2907,'이상헌',101182,'더불어민주당',10012,'울산','울산 북구',20,'http://www.assembly.go.kr/photo/9771098.jpg',9771098,'초선',NULL,'','','','02-784-8630','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(191,281,'이석현',101182,'더불어민주당',10002,'경기','경기 안양시동안구갑',20,'http://www.assembly.go.kr/photo/9770416.jpg',9770416,'6선',NULL,'https://twitter.com/lsh4u','https://www.facebook.com/lsh4u','http://www.lsh4u.kr/','02-784-1631','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(192,2886,'이수혁',101182,'더불어민주당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771088.jpg',9771088,'초선',NULL,'','','','02-784-9671','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(193,493,'이양수',101186,'자유한국당',10001,'강원','강원 속초시고성군양양군',20,'http://www.assembly.go.kr/photo/9771003.jpg',9771003,'초선',NULL,'https://twitter.com/2yangs6288','https://www.facebook.com/2yangs6288','http://blog.naver.com/2yangs6288','02-784-8150','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(194,2577,'이언주',101192,'바른미래당',10002,'경기','경기 광명시을',20,'http://www.assembly.go.kr/photo/9770822.jpg',9770822,'재선',NULL,'https://twitter.com/k2newface','https://www.facebook.com/leeuj72','http://www.leeunju.com/','02-784-6201','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(195,2587,'이완영',101186,'자유한국당',10004,'경북','경북 고령군성주군칠곡군',20,'http://www.assembly.go.kr/photo/9770824.jpg',9770824,'재선',NULL,'https://twitter.com/yiwy57','https://www.facebook.com/wanyoung77','http://www.leedandi.kr/index.php','02-784-6351','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(196,2922,'이용득',101182,'더불어민주당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771067.jpg',9771067,'초선',NULL,'https://twitter.com/ydlee03','https://www.facebook.com/yongdeuk.lee.92','','02-784-1730','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(197,2910,'이용주',101191,'민주평화당',10014,'전남','전남 여수시갑',20,'http://www.assembly.go.kr/photo/9771018.jpg',9771018,'초선',NULL,'','https://www.facebook.com/100009103596004','','02-784-6090','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(198,2835,'이용호',101030,'무소속',10015,'전북','전북 남원시임실군순창군',20,'http://www.assembly.go.kr/photo/9771015.jpg',9771015,'초선',NULL,'','https://www.facebook.com/victoryyongho','http://blog.naver.com/614lyh','02-784-2570','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(199,2551,'이우현',101186,'자유한국당',10002,'경기','경기 용인시갑',20,'http://www.assembly.go.kr/photo/9770825.jpg',9770825,'재선',NULL,'https://twitter.com/lwh99_','https://www.facebook.com/bravolwh','http://blog.naver.com/bravolwh','02-784-6441','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(200,2522,'이원욱',101182,'더불어민주당',10002,'경기','경기 화성시을',20,'http://www.assembly.go.kr/photo/9770826.jpg',9770826,'재선',NULL,'https://twitter.com/ewon33','https://www.facebook.com/ewon33','http://blog.naver.com/ewon33','02-784-6471','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(201,2899,'이은권',101186,'자유한국당',10007,'대전','대전 중구',20,'http://www.assembly.go.kr/photo/9770972.jpg',9770972,'초선',NULL,'https://twitter.com/leeeunkwon','https://www.facebook.com/junggu1','http://blog.naver.com/leeek1105','02-784-3457','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(202,2639,'이은재',101186,'자유한국당',10010,'서울','서울 강남구병',20,'http://www.assembly.go.kr/photo/9770947.jpg',9770947,'재선',NULL,'','https://www.facebook.com/eunjaeleekorea','http://blog.naver.com/eunjaelee_korea','02-784-1751','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(203,47,'이인영',101182,'더불어민주당',10010,'서울','서울 구로구갑',20,'http://www.assembly.go.kr/photo/9770878.jpg',9770878,'3선',NULL,'https://twitter.com/lee_inyoung','https://www.facebook.com/bigbang1003','http://inyoung.net/','02-784-6811','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(204,2594,'이장우',101186,'자유한국당',10007,'대전','대전 동구',20,'http://www.assembly.go.kr/photo/9770829.jpg',9770829,'재선',NULL,'https://twitter.com/jangwoo2020','https://www.facebook.com/jwoo37','http://blog.naver.com/jwoo37','02-784-6931','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(205,2848,'이재정',101182,'더불어민주당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771060.jpg',9771060,'초선',NULL,'','','http://blog.naver.com/leejjlaw','02-788-2619','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(206,2966,'이정미',101180,'정의당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771082.jpg',9771082,'초선',NULL,'https://twitter.com/jinbo27','https://www.facebook.com/jinbo27','http://justice551.tistory.com/','02-784-4591','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(207,2658,'이정현',101030,'무소속',10014,'전남','전남 순천시',20,'http://www.assembly.go.kr/photo/9770916.jpg',9770916,'3선',NULL,'','https://www.facebook.com/junghyun58','http://blog.naver.com/jhlee_office','02)784-5031','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(208,247,'이종걸',101182,'더불어민주당',10002,'경기','경기 안양시만안구',20,'http://www.assembly.go.kr/photo/9770194.jpg',9770194,'5선',NULL,'https://twitter.com/leejongkul','https://www.facebook.com/leejongkul','http://www.ljk.co.kr/','02-788-2694','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(209,49,'이종구',101186,'자유한국당',10010,'서울','서울 강남구갑',20,'http://www.assembly.go.kr/photo/9770945.jpg',9770945,'3선',NULL,'','https://www.facebook.com/leejongkoo','','02-784-3136','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(210,2895,'이종명',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771040.jpg',9771040,'초선',NULL,'','https://www.facebook.com/88leejm','http://blog.naver.com/88leejm','02-784-2174','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(211,2826,'이종배',101186,'자유한국당',10018,'충북','충북 충주시',20,'http://www.assembly.go.kr/photo/9770914.jpg',9770914,'재선',NULL,'https://twitter.com/leejongbae1026','https://www.facebook.com/profile.php?id=100002935083139','http://blog.naver.com/victorleejb','02-784-4131','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(212,249,'이주영',101186,'자유한국당',10003,'경남','경남 창원시마산합포구',20,'http://www.assembly.go.kr/photo/9770499.jpg',9770499,'5선',NULL,'https://twitter.com/newmasan','https://www.facebook.com/newmasan315','http://112.218.68.156/','02-784-0921','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(213,2792,'이진복',101186,'자유한국당',10008,'부산','부산 동래구',20,'http://www.assembly.go.kr/photo/9770621.jpg',9770621,'3선',NULL,'https://twitter.com/jinbok57','https://www.facebook.com/leejinbok57','http://www.leejinbok.co.kr/','02-784-4316','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(214,2540,'이찬열',101192,'바른미래당',10002,'경기','경기 수원시갑',20,'http://www.assembly.go.kr/photo/9770678.jpg',9770678,'3선',NULL,'https://twitter.com/leecy_jangan','https://www.facebook.com/2chan10','http://blog.naver.com/leecyhs','02-788-2975','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(215,2467,'이채익',101186,'자유한국당',10012,'울산','울산 남구갑',20,'http://www.assembly.go.kr/photo/9770835.jpg',9770835,'재선',NULL,'https://twitter.com/lci8572','https://www.facebook.com/cheik.lee','http://www.xn--hu5bc608a.com/','02-784-8011','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(216,2951,'이철규',101186,'자유한국당',10001,'강원','강원 동해시삼척시',20,'http://www.assembly.go.kr/photo/9771002.jpg',9771002,'초선',NULL,'','https://www.facebook.com/01056571448.cglee7','http://blog.naver.com/cglee7','02-784-9811','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(217,2924,'이철희',101182,'더불어민주당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771063.jpg',9771063,'초선',NULL,'https://twitter.com/assembly923','','http://blog.naver.com/assembly923','02-784-5081','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(218,2731,'이춘석',101182,'더불어민주당',10015,'전북','전북 익산시갑',20,'http://www.assembly.go.kr/photo/9770623.jpg',9770623,'3선',NULL,'https://twitter.com/lcs1747','https://www.facebook.com/chunseog.i','http://lcs1747.tistory.com/','02-784-3285','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(219,2914,'이태규',101192,'바른미래당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771076.jpg',9771076,'초선',NULL,'','https://www.facebook.com/leetkgo','http://ltk2016635.blog.me','02-784-8101','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(220,2683,'이학영',101182,'더불어민주당',10002,'경기','경기 군포시을',20,'http://www.assembly.go.kr/photo/9770836.jpg',9770836,'재선',NULL,'https://twitter.com/hackyoung1','https://www.facebook.com/hackyoung','http://www.ofthepeople.kr/','02-784-8051','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(221,2712,'이학재',101186,'자유한국당',10013,'인천','인천 서구갑',20,'http://www.assembly.go.kr/photo/9770625.jpg',9770625,'3선',NULL,'https://twitter.com/hjv6465','https://www.facebook.com/hjv6465','http://blog.naver.com/hjv6465','02-784-1884','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(222,746,'이해찬',101182,'더불어민주당',10011,'세종특별자치시','세종특별자치시',20,'http://www.assembly.go.kr/photo/9770879.jpg',9770879,'7선',NULL,'https://twitter.com/lhc21net','https://www.facebook.com/lhc21net','http://lhc21net.blog.me/','02-784-7901','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(223,2682,'이헌승',101186,'자유한국당',10008,'부산','부산 부산진구을',20,'http://www.assembly.go.kr/photo/9770837.jpg',9770837,'재선',NULL,'https://twitter.com/g7member','https://www.facebook.com/ilovebusanjin','http://blog.naver.com/g7member','02-784-7911','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(224,2482,'이현재',101186,'자유한국당',10002,'경기','경기 하남시',20,'http://www.assembly.go.kr/photo/9770838.jpg',9770838,'재선',NULL,'https://twitter.com/hannaralhj','https://www.facebook.com/hannaralhj','http://www.lhj21.com','02-784-8071','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(225,52,'이혜훈',101192,'바른미래당',10010,'서울','서울 서초구갑',20,'http://www.assembly.go.kr/photo/9770943.jpg',9770943,'3선',NULL,'','https://www.facebook.com/hyehoon.lee.7','http://blog.naver.com/leehyehoon','02-784-4467','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(226,2976,'이후삼',101182,'더불어민주당',10018,'충북','충북 제천시단양군',20,'http://www.assembly.go.kr/photo/9771099.jpg',9771099,'초선',NULL,'','','',NULL,'2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(227,2933,'이훈',101182,'더불어민주당',10010,'서울','서울 금천구',20,'http://www.assembly.go.kr/photo/9770939.jpg',9770939,'초선',NULL,'','https://www.facebook.com/hooney4us','http://blog.naver.com/woogyoo','02-784-8430','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(228,2609,'인재근',101182,'더불어민주당',10010,'서울','서울 도봉구갑',20,'http://www.assembly.go.kr/photo/9770839.jpg',9770839,'재선',NULL,'https://twitter.com/JGT_FOREVER','https://www.facebook.com/ijk2012','http://blog.naver.com/ijkgt','02-784-1358','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(229,2936,'임이자',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771041.jpg',9771041,'초선',NULL,'','','http://blog.naver.com/llj11','02-784-6970','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(230,2908,'임재훈',101192,'바른미래당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771101.jpg',9771101,'초선',NULL,'','','','02-784-9518','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(231,2858,'임종성',101182,'더불어민주당',10002,'경기','경기 광주시을',20,'http://www.assembly.go.kr/photo/9771000.jpg',9771000,'초선',NULL,'https://twitter.com/5321tempia','https://www.facebook.com/ijs5321','http://blog.naver.com/ijs5321','02-784-8380','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(232,2568,'장병완',101191,'민주평화당',10005,'광주','광주 동구남구갑',20,'http://www.assembly.go.kr/photo/9770688.jpg',9770688,'3선',NULL,'https://twitter.com/cbwhope','https://www.facebook.com/ChangByoungWan','http://blog.naver.com/cbwhope','02-784-5270','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(233,2913,'장석춘',101186,'자유한국당',10004,'경북','경북 구미시을',20,'http://www.assembly.go.kr/photo/9771026.jpg',9771026,'초선',NULL,'','https://www.facebook.com/jangseokchoon','http://blog.naver.com/firstgumi','02-784-7380','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(234,2837,'장정숙',101192,'바른미래당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771079.jpg',9771079,'초선',NULL,'','','','02-784-1530','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(235,2711,'장제원',101186,'자유한국당',10008,'부산','부산 사상구',20,'http://www.assembly.go.kr/photo/9770954.jpg',9770954,'재선',NULL,'https://twitter.com/changjewon','https://www.facebook.com/bravojewon','http://blog.jfirst21.com/','02-784-3851','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(236,2850,'전재수',101182,'더불어민주당',10008,'부산','부산 북구강서구갑',20,'http://www.assembly.go.kr/photo/9770951.jpg',9770951,'초선',NULL,'https://twitter.com/niceJaesoo','https://www.facebook.com/niceJaesoo','http://blog.naver.com/jsstory7','02-784-7431','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(237,2613,'전해철',101182,'더불어민주당',10002,'경기','경기 안산시상록구갑',20,'http://www.assembly.go.kr/photo/9770846.jpg',9770846,'재선',NULL,'https://twitter.com/HaeC_J','https://www.facebook.com/jhc930','http://haec-jeon.tistory.com','02-784-8901','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(238,2665,'전현희',101182,'더불어민주당',10010,'서울','서울 강남구을',20,'http://www.assembly.go.kr/photo/9770946.jpg',9770946,'재선',NULL,'https://twitter.com/hyunheejeon','https://www.facebook.com/okjeonhyunhyi','http://blog.naver.com/elysiaj','02-784-6950','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(239,2690,'전혜숙',101182,'더불어민주당',10010,'서울','서울 광진구갑',20,'http://www.assembly.go.kr/photo/9770926.jpg',9770926,'재선',NULL,'','https://www.facebook.com/winner1219','http://blog.naver.com/jhsook7612','02-784-8340','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(240,2847,'전희경',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771047.jpg',9771047,'초선',NULL,'','https://www.facebook.com/100006411270507','','02-784-4630','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(241,231,'정갑윤',101186,'자유한국당',10012,'울산','울산 중구',20,'http://www.assembly.go.kr/photo/9770439.jpg',9770439,'5선',NULL,'','https://www.facebook.com/mrjung2','http://blog.naver.com/jungkabyoon','02-784-5275','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(242,358,'정동영',101191,'민주평화당',10015,'전북','전북 전주시병',20,'http://www.assembly.go.kr/photo/9771013.jpg',9771013,'4선',NULL,'https://twitter.com/coreacdy','https://www.facebook.com/coreacdy','http://cdy21.tistory.com/','02-784-9540','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(243,234,'정병국',101192,'바른미래당',10002,'경기','경기 여주시양평군',20,'http://www.assembly.go.kr/photo/9770229.jpg',9770229,'5선',NULL,'https://twitter.com/withbg','https://www.facebook.com/withbg','http://blog.naver.com/withbg','02-788-2210','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(244,2,'정성호',101182,'더불어민주당',10002,'경기','경기 양주시',20,'http://www.assembly.go.kr/photo/9770881.jpg',9770881,'3선',NULL,'https://twitter.com/JungSungho1','https://www.facebook.com/JungSungho1','http://blog.naver.com/jsh35351','02-788-2816','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(245,365,'정세균',101182,'더불어민주당',10010,'서울','서울 종로구',20,'http://www.assembly.go.kr/photo/9770230.jpg',9770230,'6선',NULL,'https://twitter.com/sk0926','https://www.facebook.com/peopleinside2012','http://blog.naver.com/skchung926','02-788-2895','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(246,2644,'정양석',101186,'자유한국당',10010,'서울','서울 강북구갑',20,'http://www.assembly.go.kr/photo/9770928.jpg',9770928,'재선',NULL,'https://twitter.com/okcys','https://www.facebook.com/okcys','http://blog.naver.com/wjddidtjr4u/','02-784-5260','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(247,2821,'정용기',101186,'자유한국당',10007,'대전','대전 대덕구',20,'http://www.assembly.go.kr/photo/9770907.jpg',9770907,'재선',NULL,'','https://www.facebook.com/jbrave119','http://blog.naver.com/jbrave119','02-784-7190','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(248,382,'정우택',101186,'자유한국당',10018,'충북','충북 청주시상당구',20,'http://www.assembly.go.kr/photo/9770847.jpg',9770847,'4선',NULL,'https://twitter.com/bigwtc','https://www.facebook.com/bigwtc','http://blog.naver.com/bigwtc','02-784-9071','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(249,2843,'정운천',101192,'바른미래당',10015,'전북','전북 전주시을',20,'http://www.assembly.go.kr/photo/9771012.jpg',9771012,'초선',NULL,'https://twitter.com/gbs2008','https://www.facebook.com/gbs2008','http://blog.naver.com/gbs365','02-784-8975','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(250,2896,'정유섭',101186,'자유한국당',10013,'인천','인천 부평구갑',20,'http://www.assembly.go.kr/photo/9770965.jpg',9770965,'초선',NULL,'','https://www.facebook.com/jungyousub','http://blog.naver.com/jungmomaf','02-784-9423','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(251,2857,'정인화',101191,'민주평화당',10014,'전남','전남 광양시곡성군구례군',20,'http://www.assembly.go.kr/photo/9771020.jpg',9771020,'초선',NULL,'','https://www.facebook.com/JeongInHwa31','http://blog.naver.com/101bbb','02-784-3770','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(252,2963,'정재호',101182,'더불어민주당',10002,'경기','경기 고양시을',20,'http://www.assembly.go.kr/photo/9770988.jpg',9770988,'초선',NULL,'https://twitter.com/2wa5','https://www.facebook.com/2wa5.jjh','http://nice929ho.kr/','02-784-0712','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(253,2957,'정종섭',101186,'자유한국당',10006,'대구','대구 동구갑',20,'http://www.assembly.go.kr/photo/9770957.jpg',9770957,'초선',NULL,'','https://www.facebook.com/jschong57','http://blog.naver.com/jschong57','02-784-6513','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(254,237,'정진석',101186,'자유한국당',10017,'충남','충남 공주시부여군청양군',20,'http://www.assembly.go.kr/photo/9771006.jpg',9771006,'4선',NULL,'https://twitter.com/js0904','https://www.facebook.com/jinsukdream','http://blog.naver.com/chungjinsuk','02-784-5070','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(255,2950,'정춘숙',101182,'더불어민주당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771068.jpg',9771068,'초선',NULL,'https://twitter.com/jchounsook','','http://blog.naver.com/chounsook_jung','02-784-3740','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(256,2942,'정태옥',101186,'자유한국당',10006,'대구','대구 북구갑',20,'http://www.assembly.go.kr/photo/9770958.jpg',9770958,'초선',NULL,'https://twitter.com/jtaeok','https://www.facebook.com/okjtaeok','http://blog.naver.com/okjtaeok','02-784-2820','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(257,2930,'제윤경',101182,'더불어민주당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771064.jpg',9771064,'초선',NULL,'https://twitter.com/gyurl','https://www.facebook.com/freedebt553','http://freedebt553.tistory.com/','02-784-7451','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(258,38,'조경태',101186,'자유한국당',10008,'부산','부산 사하구을',20,'http://www.assembly.go.kr/photo/9770450.jpg',9770450,'4선',NULL,'','https://www.facebook.com/Choforce','http://blog.naver.com/dangdangcamp','02-784-6380','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(259,239,'조배숙',101191,'민주평화당',10015,'전북','전북 익산시을',20,'http://www.assembly.go.kr/photo/9771014.jpg',9771014,'4선',NULL,'','https://www.facebook.com/chobaesook','http://blog.naver.com/victory_cho','02-784-6264','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(260,2872,'조승래',101182,'더불어민주당',10007,'대전','대전 유성구갑',20,'http://www.assembly.go.kr/photo/9770973.jpg',9770973,'초선',NULL,'','https://www.facebook.com/profile.php?id=1809560279','http://blog.naver.com/yuseong0413','02-784-2640','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(261,2761,'조원진',101188,'대한애국당',10006,'대구','대구 달서구병',20,'http://www.assembly.go.kr/photo/9770648.jpg',9770648,'3선',NULL,'','https://www.facebook.com/chowonjin88','http://www.chowonjin.com/','02-784-4165','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(262,2869,'조응천',101182,'더불어민주당',10002,'경기','경기 남양주시갑',20,'http://www.assembly.go.kr/photo/9770990.jpg',9770990,'초선',NULL,'https://twitter.com/chopros','https://www.facebook.com/chopros','http://blog.naver.com/chopros','02-784-2717','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(263,41,'조정식',101182,'더불어민주당',10002,'경기','경기 시흥시을',20,'http://www.assembly.go.kr/photo/9770456.jpg',9770456,'4선',NULL,'https://twitter.com/chojs21','https://www.facebook.com/chojs21','http://cjs.or.kr/','02-784-2760','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(264,2904,'조훈현',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771052.jpg',9771052,'초선',NULL,'','','http://blog.naver.com/chohoonhyun','02-784-2187','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(265,2655,'주광덕',101186,'자유한국당',10002,'경기','경기 남양주시병',20,'http://www.assembly.go.kr/photo/9770992.jpg',9770992,'재선',NULL,'','https://www.facebook.com/jkd2311','http://blog.naver.com/jkd2311','02-784-2855','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(266,16,'주승용',101192,'바른미래당',10014,'전남','전남 여수시을',20,'http://www.assembly.go.kr/photo/9770458.jpg',9770458,'4선',NULL,'https://twitter.com/joo350','https://www.facebook.com/joo350','http://www.joo-sy.com/','02-788-2153','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(267,730,'주호영',101186,'자유한국당',10006,'대구','대구 수성구을',20,'http://www.assembly.go.kr/photo/9770883.jpg',9770883,'4선',NULL,'https://twitter.com/sangtoil','https://www.facebook.com/sangtoil','http://www.joohoyoung.or.kr/','02-788-2137','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(268,2856,'지상욱',101192,'바른미래당',10010,'서울','서울 중구성동구을',20,'http://www.assembly.go.kr/photo/9770925.jpg',9770925,'초선',NULL,'','https://www.facebook.com/sangwuk.ji','http://blog.naver.com/strenue','02-784-9640','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(269,2454,'진선미',101182,'더불어민주당',10010,'서울','서울 강동구갑',20,'http://www.assembly.go.kr/photo/9770852.jpg',9770852,'재선',NULL,'https://twitter.com/sunmee_Jin','','http://smjin.com/','02-784-9591','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(270,19,'진영',101182,'더불어민주당',10010,'서울','서울 용산구',20,'http://www.assembly.go.kr/photo/9770462.jpg',9770462,'4선',NULL,'https://twitter.com/Chinyoung0413','https://www.facebook.com/chinyoung21','http://blog.naver.com/ychin21','02-788-2925','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(271,2934,'채이배',101192,'바른미래당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771074.jpg',9771074,'초선',NULL,'','https://www.facebook.com/justin.chae.5','http://blog.naver.com/cyber633','02-784-9480','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(272,372,'천정배',101191,'민주평화당',10005,'광주','광주 서구을',20,'http://www.assembly.go.kr/photo/9770920.jpg',9770920,'6선',NULL,'https://twitter.com/jb_1000','https://www.facebook.com/jeongbaec','http://hope_1000.blog.me/','02-784-9850','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(273,22,'최경환',101186,'자유한국당',10004,'경북','경북 경산시',20,'http://www.assembly.go.kr/photo/9771029.jpg',9771029,'4선',NULL,'https://twitter.com/choigyunghwan','https://www.facebook.com/gyunghwan.choi','http://blog.daum.net/beyondi','02-788-2458','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(274,2956,'최경환',101191,'민주평화당',10005,'광주','광주 북구을',20,'http://www.assembly.go.kr/photo/9770976.jpg',9770976,'초선',NULL,'https://twitter.com/choigyunghwan','https://www.facebook.com/gyunghwan.choi','http://blog.daum.net/beyondi','02-784-5891','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(275,2877,'최교일',101186,'자유한국당',10004,'경북','경북 영주시문경시예천군',20,'http://www.assembly.go.kr/photo/9771027.jpg',9771027,'초선',NULL,'','https://www.facebook.com/gyoil.choi','http://blog.naver.com/choi_gyoil','02-784-4195','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(276,2949,'최도자',101192,'바른미래당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771081.jpg',9771081,'초선',NULL,'https://twitter.com/choidoja','','','02-784-8640','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(277,2926,'최연혜',101186,'자유한국당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771043.jpg',9771043,'초선',NULL,'https://twitter.com/Choi_Yeonhye','https://www.facebook.com/choiyeonhye','','02-784-5087','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(278,2874,'최운열',101182,'더불어민주당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771059.jpg',9771059,'초선',NULL,'','','','02-784-2350','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(279,2948,'최인호',101182,'더불어민주당',10008,'부산','부산 사하구갑',20,'http://www.assembly.go.kr/photo/9770952.jpg',9770952,'초선',NULL,'https://twitter.com/LoveSahagu','https://www.facebook.com/LoveSaha','http://blog.naver.com/cih1966','02-784-2195','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(280,2374,'최재성',101182,'더불어민주당',10010,'서울','서울 송파구을',20,'http://www.assembly.go.kr/photo/9771100.jpg',9771100,'4선',NULL,'https://twitter.com/withjs21','https://www.facebook.com/withjs21','http://blog.naver.com/nyj_2004','02-784-1307','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(281,2868,'추경호',101186,'자유한국당',10006,'대구','대구 달성군',20,'http://www.assembly.go.kr/photo/9770962.jpg',9770962,'초선',NULL,'','https://www.facebook.com/ChooKyungho','http://blog.naver.com/khchoo1224','02-784-8946','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(282,482,'추미애',101182,'더불어민주당',10010,'서울','서울 광진구을',20,'http://www.assembly.go.kr/photo/9770659.jpg',9770659,'5선',NULL,'https://twitter.com/choomiae','https://www.facebook.com/choomiae','http://blog.naver.com/choovision','02-784-1270','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(283,2853,'추혜선',101180,'정의당',10009,'비례대표','비례대표',20,'http://www.assembly.go.kr/photo/9771084.jpg',9771084,'초선',NULL,'https://twitter.com/choojustice','https://www.facebook.com/lowskysora','http://blog.naver.com/choojustice','02-784-9740','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(284,2834,'표창원',101182,'더불어민주당',10002,'경기','경기 용인시정',20,'http://www.assembly.go.kr/photo/9770994.jpg',9770994,'초선',NULL,'https://twitter.com/drpyo','https://www.facebook.com/cwpyo','http://blog.naver.com/pyogo413','02-784-9030','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(285,2597,'하태경',101192,'바른미래당',10008,'부산','부산 해운대구갑',20,'http://www.assembly.go.kr/photo/9770858.jpg',9770858,'재선',NULL,'https://twitter.com/taekyungh','https://www.facebook.com/radiohahapage','http://www.radiohaha.net/','02-784-2491','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(286,390,'한선교',101186,'자유한국당',10002,'경기','경기 용인시병',20,'http://www.assembly.go.kr/photo/9770477.jpg',9770477,'4선',NULL,'https://twitter.com/hansunkyo','https://www.facebook.com/hansunkyo','http://blog.naver.com/hsunkyo','02-784-2066','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(287,2469,'한정애',101182,'더불어민주당',10010,'서울','서울 강서구병',20,'http://www.assembly.go.kr/photo/9770859.jpg',9770859,'재선',NULL,'https://twitter.com/dudehowru','https://www.facebook.com/jeongae.han','http://blog.naver.com/gangseo5502','02-784-3051','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(288,2548,'함진규',101186,'자유한국당',10002,'경기','경기 시흥시갑',20,'http://www.assembly.go.kr/photo/9770860.jpg',9770860,'재선',NULL,'https://twitter.com/dreamham7','https://www.facebook.com/dreamham7','http://blog.naver.com/dreamham7','02-784-4277','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(289,280,'홍문종',101186,'자유한국당',10002,'경기','경기 의정부시을',20,'http://www.assembly.go.kr/photo/9770862.jpg',9770862,'4선',NULL,'https://twitter.com/mjhong','https://www.facebook.com/mjhong2004','http://blog.naver.com/mjhong2004','02-784-4777','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(290,736,'홍문표',101186,'자유한국당',10017,'충남','충남 홍성군예산군',20,'http://www.assembly.go.kr/photo/9770886.jpg',9770886,'3선',NULL,'https://twitter.com/mphonglove','https://www.facebook.com/munpyo.hong','http://blog.daum.net/mphonglove','02-788-2954','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(291,2537,'홍영표',101182,'더불어민주당',10013,'인천','인천 부평구을',20,'http://www.assembly.go.kr/photo/9770676.jpg',9770676,'3선',NULL,'https://twitter.com/YoungpyoHong','https://www.facebook.com/ypbupyeong','http://www.dreamyp.or.kr/','02-784-3143','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(292,2675,'홍의락',101182,'더불어민주당',10006,'대구','대구 북구을',20,'http://www.assembly.go.kr/photo/9770959.jpg',9770959,'재선',NULL,'https://twitter.com/rockysounds','https://www.facebook.com/euirak.hong','http://blog.daum.net/tkrakrak','02-784-6277','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(293,2478,'홍익표',101182,'더불어민주당',10010,'서울','서울 중구성동구갑',20,'http://www.assembly.go.kr/photo/9770864.jpg',9770864,'재선',NULL,'https://twitter.com/peace_hong','https://www.facebook.com/peacehong','http://blog.naver.com/peace_hong','02-784-6887','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(294,2782,'홍일표',101186,'자유한국당',10013,'인천','인천 미추홀구갑',20,'http://www.assembly.go.kr/photo/9770665.jpg',9770665,'3선',NULL,'https://twitter.com/HongIP','https://www.facebook.com/HONG.ILPYO','http://blog.naver.com/2008hip','02-784-6346','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(295,2830,'홍철호',101186,'자유한국당',10002,'경기','경기 김포시을',20,'http://www.assembly.go.kr/photo/9770913.jpg',9770913,'재선',NULL,'https://twitter.com/victorygimpo','https://www.facebook.com/victorygimpo','http://blog.naver.com/victorygimpo','02-784-5961','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(296,2632,'황영철',101186,'자유한국당',10001,'강원','강원 홍천군철원군화천군양구군인제군',20,'http://www.assembly.go.kr/photo/9770669.jpg',9770669,'3선',NULL,'https://twitter.com/hhhyc','https://www.facebook.com/hhhyc1','http://blog.naver.com/hhhyc','02-784-5705','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(297,2811,'황주홍',101191,'민주평화당',10014,'전남','전남 고흥군보성군장흥군강진군',20,'http://www.assembly.go.kr/photo/9770867.jpg',9770867,'재선',NULL,'https://twitter.com/Hwangjuhong','https://www.facebook.com/Hwangjuhong2','http://blog.naver.com/pv21c','02-784-8834','2019-02-25 20:00:19','2019-02-25 20:08:05'),
	(298,2905,'황희',101182,'더불어민주당',10010,'서울','서울 양천구갑',20,'http://www.assembly.go.kr/photo/9770936.jpg',9770936,'초선',NULL,'','https://www.facebook.com/sebhwang','http://blog.naver.com/hwanghee67','02-784-8551','2019-02-25 20:00:19','2019-02-25 20:08:05');

/*!40000 ALTER TABLE `legislator` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table legislator_comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `legislator_comment`;

CREATE TABLE `legislator_comment` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `legi_idx` int(11) NOT NULL,
  `writer` int(11) NOT NULL,
  `content` text NOT NULL,
  `writetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `legislator_comment` WRITE;
/*!40000 ALTER TABLE `legislator_comment` DISABLE KEYS */;

INSERT INTO `legislator_comment` (`idx`, `legi_idx`, `writer`, `content`, `writetime`)
VALUES
	(2,100014,1,'this is reply about cms. about article. iam sujin','2019-02-26 03:59:28');

/*!40000 ALTER TABLE `legislator_comment` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table legislator_comment_like
# ------------------------------------------------------------

DROP TABLE IF EXISTS `legislator_comment_like`;

CREATE TABLE `legislator_comment_like` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `comment_idx` int(11) NOT NULL,
  `like_flag` tinyint(4) NOT NULL,
  `user_idx` int(11) NOT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table legislator_comment_notify
# ------------------------------------------------------------

DROP TABLE IF EXISTS `legislator_comment_notify`;

CREATE TABLE `legislator_comment_notify` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `user_idx` int(11) NOT NULL,
  `comment_idx` int(11) NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `legislator_comment_notify` WRITE;
/*!40000 ALTER TABLE `legislator_comment_notify` DISABLE KEYS */;

INSERT INTO `legislator_comment_notify` (`idx`, `user_idx`, `comment_idx`, `timestamp`)
VALUES
	(2,1,2,'2019-02-26 06:52:54'),
	(3,1,2,'2019-02-26 07:10:03');

/*!40000 ALTER TABLE `legislator_comment_notify` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table legislatorInfo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `legislatorInfo`;

CREATE TABLE `legislatorInfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `l_name` varchar(200) DEFAULT NULL,
  `blog` varchar(200) DEFAULT NULL,
  `twitter` varchar(200) DEFAULT NULL,
  `fb` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table membership
# ------------------------------------------------------------

DROP TABLE IF EXISTS `membership`;

CREATE TABLE `membership` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `auth_type` varchar(45) NOT NULL COMMENT '로그인 방법(0:naver, 1:kakao)',
  `id` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `profile_img` varchar(45) NOT NULL,
  `age` varchar(45) DEFAULT NULL,
  `gender` tinyint(4) DEFAULT NULL COMMENT '(0 : 남자, 1 : 여자)',
  `status` tinyint(4) NOT NULL COMMENT '회원 상태(0 : inactive, 1 : active)',
  `grade` tinyint(4) NOT NULL DEFAULT '1' COMMENT '회원 등급(0 : admin, 1 : normal, 2 : 우수, 3 : vip)',
  `point` int(11) NOT NULL COMMENT '포인트',
  `fcm_token` text COMMENT '푸쉬알림 토큰',
  `refresh_token` text NOT NULL COMMENT '통신 토큰 재발급용 토큰',
  `access_date` datetime NOT NULL,
  `regist_date` datetime NOT NULL,
  `cumulative_notify` int(11) DEFAULT '0' COMMENT '누적 신고수',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `membership` WRITE;
/*!40000 ALTER TABLE `membership` DISABLE KEYS */;

INSERT INTO `membership` (`idx`, `auth_type`, `id`, `name`, `profile_img`, `age`, `gender`, `status`, `grade`, `point`, `fcm_token`, `refresh_token`, `access_date`, `regist_date`, `cumulative_notify`)
VALUES
	(1,'1','1012848080','현진','http://k.kakaocdn.net/dn/pRbAR/btqr4WwUvHf/gR',NULL,NULL,1,1,110,NULL,'AJQ5GXrqSszuEWsAi2NaRelTNUICO8TKeG1vwj16plCpzWyXDhobh2PXbomhmZOkjunucuDyG4iPBZWgXyedcUfZsiK0sRT0ScBu3wB3Rm9hRsczNVNBUzd3n8bMuNbGnMIDlcqWw3f5phNY3QtfYDTllJXAh2vZnK0OOcwyyK4TfoHnP3bwl4y17gy0qp58GLa11GxfcmPxBUJWnvV8p4OdwnGh7ggdCUfB8GQRAAyiyMiMZ2Tl3UQqF7BEnnSk','2019-02-04 04:56:23','2019-02-04 04:56:23',5),
	(3,'1','1022440656','김다혜','http://k.kakaocdn.net/dn/iEqdB/btqsyJx6uSL/EG',NULL,NULL,1,1,100,NULL,'wPZJqxFYTjSdZRzGczj2Mojy2CBI36thxwOlKvMFcK0YWfA3VrLIRUSifq4vAofEqwI1uMPNBRw7ktOEwiPxwTRS7w32PF4TTck9EetZD3juXVcbUxeSrnIeJllh6ZlQlkcqhbUzC5T3goNU4V5iGn8hYxgtBtGvqqskaztMB4Qpqk8xPOvz16RWhsr7MkUTSy6BkvNd1vCAgosgaURTh2w31HF2o1OMld7SL3B168pcwF1eW0IPJcZQB0Ae0CTS','2019-02-07 01:56:54','2019-02-07 01:56:54',0),
	(10,'1','809253344','강수진','http://k.kakaocdn.net/dn/0araF/btqncts2KTc/kx','20',1,1,1,100,'dede','TwTayEPrgHpfc9ivghcCv53Y2gMsA5eDN8opgI8m4Y7QfUKyHtQDuCIMmjXgh7bgVjHbuuQVLyFgq9SHN1eAzuGuerxgoWSxU2Ly8QPb4xC1zViPZ3ke3oOUjXP8Y4VNDYdKFfCI0aK4yPL1CmCslWBzrXjTBvKUVu9sEzajUrGH1Sm3fXOVi0dfsZMau8Pu75vFQ1wsk9TvIXvnnINKjlnBl9zoZGkr5t0EV8fb5m1ic9dT0Mz5lNjeRt4qwmpO','2019-02-26 04:18:53','2019-02-26 04:18:53',0);

/*!40000 ALTER TABLE `membership` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table notify
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notify`;

CREATE TABLE `notify` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `user_idx` int(11) NOT NULL COMMENT '유저 인덱스',
  `reply_idx` int(11) NOT NULL COMMENT '댓글 인덱스',
  `timestamp` datetime NOT NULL COMMENT '신고한 시간',
  `reason` text COMMENT '신고 이유',
  PRIMARY KEY (`idx`),
  KEY `FK_notify_reply_idx_reply_idx` (`reply_idx`),
  KEY `FK_notify_user_idx_membership_idx` (`user_idx`),
  CONSTRAINT `FK_notify_reply_idx_reply_idx` FOREIGN KEY (`reply_idx`) REFERENCES `reply` (`idx`),
  CONSTRAINT `FK_notify_user_idx_membership_idx` FOREIGN KEY (`user_idx`) REFERENCES `membership` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `notify` WRITE;
/*!40000 ALTER TABLE `notify` DISABLE KEYS */;

INSERT INTO `notify` (`idx`, `user_idx`, `reply_idx`, `timestamp`, `reason`)
VALUES
	(2,1,2,'2019-02-26 10:25:12','그냥'),
	(5,1,7,'2019-02-26 03:38:14','so sad..'),
	(6,1,8,'2019-02-26 03:50:34','so sad..');

/*!40000 ALTER TABLE `notify` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table party
# ------------------------------------------------------------

DROP TABLE IF EXISTS `party`;

CREATE TABLE `party` (
  `party_cd` int(11) NOT NULL COMMENT '정당코드',
  `party_name` varchar(45) DEFAULT NULL COMMENT '정당이름',
  PRIMARY KEY (`party_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `party` WRITE;
/*!40000 ALTER TABLE `party` DISABLE KEYS */;

INSERT INTO `party` (`party_cd`, `party_name`)
VALUES
	(101030,'무소속'),
	(101180,'정의당'),
	(101182,'더불어민주당'),
	(101186,'자유한국당'),
	(101188,'대한애국당'),
	(101190,'민중당'),
	(101191,'민주평화당'),
	(101192,'바른미래당');

/*!40000 ALTER TABLE `party` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table reply
# ------------------------------------------------------------

DROP TABLE IF EXISTS `reply`;

CREATE TABLE `reply` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NOT NULL COMMENT '기사 인덱스',
  `writer` int(11) NOT NULL COMMENT '댓글 작성자',
  `content` text NOT NULL COMMENT '댓글 내용',
  `writetime` datetime NOT NULL COMMENT '댓글 작성 시간',
  `parent` int(11) DEFAULT NULL COMMENT '대댓글한 댓글 인덱스',
  `depth` int(11) DEFAULT NULL COMMENT '대댓글 순서',
  `like_cnt` int(11) DEFAULT '0',
  `dislike_cnt` int(11) DEFAULT '0',
  PRIMARY KEY (`idx`),
  KEY `FK_reply_article_id_article_id` (`article_id`),
  CONSTRAINT `FK_reply_article_id_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;

INSERT INTO `reply` (`idx`, `article_id`, `writer`, `content`, `writetime`, `parent`, `depth`, `like_cnt`, `dislike_cnt`)
VALUES
	(1,1,1,'안녕하세','2019-02-25 03:06:34',0,0,1,1),
	(2,1,1,'잘부탁드립니','2019-02-25 03:11:25',0,0,0,0),
	(3,1,1,'저','2019-02-25 03:12:23',1,1,0,0),
	(4,1,1,'입니','2019-02-25 03:12:37',1,2,0,0),
	(5,1,1,'김현','2019-02-25 03:14:45',3,1,0,0),
	(7,1,1,'this is cms. about article. iam sujin','2019-02-26 03:24:16',0,0,1,1),
	(8,1,1,'i am naljin. this is rereply for cms','2019-02-26 03:25:31',7,1,0,0);

/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table reply_like
# ------------------------------------------------------------

DROP TABLE IF EXISTS `reply_like`;

CREATE TABLE `reply_like` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `reply_idx` int(11) NOT NULL COMMENT '댓글 인덱스',
  `like_flag` tinyint(4) NOT NULL COMMENT '좋아요(1), 싫어요(0)',
  `user_idx` int(11) NOT NULL COMMENT '유저 인덱스',
  PRIMARY KEY (`idx`),
  KEY `FK_reply_like_reply_idx_reply_idx` (`reply_idx`),
  KEY `FK_reply_like_user_idx_membership_idx` (`user_idx`),
  CONSTRAINT `FK_reply_like_reply_idx_reply_idx` FOREIGN KEY (`reply_idx`) REFERENCES `reply` (`idx`),
  CONSTRAINT `FK_reply_like_user_idx_membership_idx` FOREIGN KEY (`user_idx`) REFERENCES `membership` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `reply_like` WRITE;
/*!40000 ALTER TABLE `reply_like` DISABLE KEYS */;

INSERT INTO `reply_like` (`idx`, `reply_idx`, `like_flag`, `user_idx`)
VALUES
	(8,1,0,1),
	(10,1,1,1),
	(13,7,1,1),
	(15,7,0,1);

/*!40000 ALTER TABLE `reply_like` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table summary
# ------------------------------------------------------------

DROP TABLE IF EXISTS `summary`;

CREATE TABLE `summary` (
  `code` int(11) NOT NULL COMMENT '의원코드',
  `like_cnt` int(11) NOT NULL COMMENT '호감투표수',
  `dislike_cnt` int(11) NOT NULL COMMENT '비호감투표수',
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`code`),
  CONSTRAINT `FK_summary_code` FOREIGN KEY (`code`) REFERENCES `legislator` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table vote
# ------------------------------------------------------------

DROP TABLE IF EXISTS `vote`;

CREATE TABLE `vote` (
  `idx` int(11) NOT NULL COMMENT '유저 인덱스',
  `ballot` int(11) NOT NULL COMMENT '투표권 개수',
  `update_date` datetime NOT NULL COMMENT '투표권 갱신 날짜',
  `sequence` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idx`),
  CONSTRAINT `FK_vote_idx_membership_idx` FOREIGN KEY (`idx`) REFERENCES `membership` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;

INSERT INTO `vote` (`idx`, `ballot`, `update_date`, `sequence`)
VALUES
	(1,973,'2019-02-07 02:36:01',1),
	(3,4,'0000-00-00 00:00:00',1),
	(10,5,'2019-02-26 04:18:53',1);

/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table vote_result
# ------------------------------------------------------------

DROP TABLE IF EXISTS `vote_result`;

CREATE TABLE `vote_result` (
  `idx` int(11) NOT NULL COMMENT '의원코드',
  `like_cnt` int(11) NOT NULL DEFAULT '0' COMMENT '호감투표수',
  `dislike_cnt` int(11) NOT NULL DEFAULT '0' COMMENT '비호감투표수',
  PRIMARY KEY (`idx`),
  CONSTRAINT `FK_vote_result_idx_legislator_idx` FOREIGN KEY (`idx`) REFERENCES `legislator` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='매주 리셋';

LOCK TABLES `vote_result` WRITE;
/*!40000 ALTER TABLE `vote_result` DISABLE KEYS */;

INSERT INTO `vote_result` (`idx`, `like_cnt`, `dislike_cnt`)
VALUES
	(1,4,5),
	(4,20,4),
	(5,0,22),
	(12,10,1),
	(70,41,12),
	(110,20,30);

/*!40000 ALTER TABLE `vote_result` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
