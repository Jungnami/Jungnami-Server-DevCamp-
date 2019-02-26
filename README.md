# 정치가 나의 미래다

* Smilegate Winter Dev Camp x Slimegate Orange Camp
* 개발 기간 : 2019년 1월 14일 ~ 2019년 2월 26일
* 서비스 소개 : 정나미(정치가 나의 미래다)는 **국회의원 인기투표 서비스**입니다. 자신이 호감/비호감을 느끼는 국회의원에게 투표를 하여 정치적 행동을 하며 민심을 표출할 수 있고 국회의원들은 이를 보고 민심을 즉각적으로 확인 할 수 있습니다. 

---

# 주요 기능

* 소셜 로그인 (Kakao, Facebook)
* 국회의원 순위 보여주기
  * 전체
  * 정당별
  * 지역별
* 투표 기능
* 기사 보기
  * 댓글 기능

---



# 폴더 구조

#### 서버

* /auth, /cms, /pms, /vote

#### admin 페이지
* /admin

#### 작업했던 문서와 발표자료
* /commons
  * /doc : 발표 자료
  * /img : 첨부이미지
  * /sqlDump : DB 생성 sql 파일
  * /utils : 자주 쓰이는 파일 및 모듈 일부
  



# Server Architecture

![Server Architecture](https://github.com/Jungnami/Jungnami-Server-DevCamp-/blob/master/commons/img/architecture.png)

### Auth
* 인증 서버
  * JWT를 이용하여 사용자에게 토큰을 발급하여 통신시 사용자를 인증하는 용도로 쓰인다
  * REDIS에 사용자의 토큰과 접속 시간을 저장하여 연속 접속 인수를 계산한다.
  * 의존성
  ```json
  "dependencies": {
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "ejs": "^2.6.1",
    "express": "~4.16.0",
    "express-session": "^1.15.6",
    "helmet": "^3.15.0",
    "http-errors": "~1.6.2",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.4.0",
    "moment": "^2.24.0",
    "morgan": "~1.9.0",
    "passport": "^0.4.0",
    "passport-kakao": "0.0.5",
    "passport-local": "^1.0.0",
    "passport-naver": "^1.0.6",
    "promise-mysql": "^3.3.1",
    "rand-token": "^0.4.0",
    "redis": "^2.8.0",
    "request": "^2.88.0",
    "request-promise": "^4.2.4"
  }```
  ```

### PMS
* 정치인 관리 서버
  * 의존성
  ```json
  "dependencies": {
    "axios": "^0.18.0",
    "connect-history-api-fallback": "^1.6.0",
    "cookie-parser": "^1.4.3",
    "debug": "~2.6.9",
    "express": "^4.16.4",
    "express-csp-header": "^2.2.0",
    "express-paginate": "^1.0.0",
    "fs": "0.0.1-security",
    "http-errors": "^1.6.3",
    "jade": "~1.11.0",
    "moment": "^2.24.0",
    "morgan": "^1.9.1",
    "mysql": "^2.16.0",
    "mz": "^2.7.0",
    "path": "^0.12.7",
    "promise-mysql": "^3.3.1",
    "pug": "^2.0.3",
    "redis": "^2.8.0",
    "request": "^2.88.0",
    "sync-request": "^6.0.0",
    "xml2json": "^0.11.2"
  }``` 
  ```

### CMS
* 컨텐츠 관리 서버
  * 기사 크롤링
    * 파이썬을 이용하여 기사를 크롤링하고 스케줄러를 통해 5분마다 기사를 트롤링해온다
  * 댓글 관리
  * 의존성
  ```json
  "dependencies": {
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "express": "~4.16.0",
    "fs": "0.0.1-security",
    "http-errors": "~1.6.2",
    "jade": "~1.11.0",
    "moment": "^2.24.0",
    "morgan": "~1.9.0",
    "node-cron": "^2.0.3",
    "nodemon": "^1.18.10",
    "promise-mysql": "^3.3.1",
    "redis": "^2.8.0"
  }```
  ```


### Vote
* 투표 관리 서비스
  * 매번 메인 뷰인 전체 투표리스트를 할 때 마다 DB 셀렉을 해올 수 없기 때문에(불필요한 통신) 5분마다 투표 결과를 빌드해놓고 그 결과를 보여준다.
  * 의존성
  ```json
  "dependencies": {
  "async": "^2.6.1",
  "aws-sdk": "^2.269.1",
  "cookie-parser": "^1.4.3",
  "debug": "^2.6.9",
  "express": "^4.16.3",
  "helmet": "^3.12.1",
  "http-errors": "^1.6.3",
  "jade": "^1.11.0",
  "jsonwebtoken": "^8.3.0",
  "moment": "^2.22.2",
  "morgan": "^1.9.0",
  "multer": "^1.3.1",
  "multer-s3": "^2.7.0",
  "promise-mysql": "^3.3.1"
  }}``` 
  ```



---

# Develop Framework & Environment

[Node.js](https://nodejs.org/ko/) - Chrome V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임
- [Express.js](http://expressjs.com/ko/) - Node.js 웹 애플리케이션 프레임워크
- [NPM](https://rometools.github.io/rome/) - 자바 스크립트 패키지 관리자
- [PM2](http://pm2.keymetrics.io/) - Express 앱용 프로세스 관리자
- [vscode](https://code.visualstudio.com/) - 편집기
- [Mysql](https://www.mysql.com/) - DataBase
- [AWS EC2](https://aws.amazon.com/ko/ec2/?sc_channel=PS&sc_campaign=acquisition_KR&sc_publisher=google&sc_medium=english_ec2_b&sc_content=ec2_e&sc_detail=aws%20ec2&sc_category=ec2&sc_segment=177228231544&sc_matchtype=e&sc_country=KR&s_kwcid=AL!4422!3!177228231544!e!!g!!aws%20ec2&ef_id=WkRozwAAAnO-lPWy:20180412120123:s) - 클라우드 환경 컴퓨팅 시스템
- [AWS RDS](https://aws.amazon.com/ko/rds/) - 클라우드 환경 데이터베이스 관리 시스템
- [Python 3](https://www.python.org/)
- [PyCharm](https://www.jetbrains.com/pycharm/download/#section=mac) - 편집기


* MYSQL v5.7 (Workbench)
* Sequal Pro

---


# 사용 Module

* [Async & Await](https://www.npmjs.com/package/async)

* [node-cron](https://www.npmjs.com/package/node-schedule) : 스케줄링

* [JWT(JsonWebTokens)](https://www.npmjs.com/package/jsonwebtoken)

* [helmet](https://github.com/helmetjs/helmet)

* [fs](https://nodejs.org/api/fs.html) : 파일 시스템

---

# Security

* [JWT(JsonWebTokens)](http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html)

<!-- 
* JsonWebTokens의 유효성을 검사하고 req.user를 설정하는 미들웨어.

* 이 모듈을 사용하면 Node.js 응용 프로그램에서 JWT 토큰을 사용하여 HTTP 요청을 인증 할 수 있습니다.

* Jungnami Server side에서는 다음과 같은 방식으로 JWT를 사용하였습니다.
  1. 클라이언트는 카카오톡 AccessToken을 서버로 전송
  2. 서버는 AccessToken으로 카카오톡에 사용자 정보 요청
  3. 카카오톡으로부터 받은 유저정보(idx, id, grade)를 JWT를 이용하여 토큰 생성 후 응답 // membershop db 접근 최소화
  4. 클라이언트는 응답받은 토큰을 서버 통신 시 헤더부분에 포힘하여 전송
  5. 헤더에 포함된 토큰으로 서버는 로그인 유무 확인 -->


* [Helmet](http://badge.fury.io/js/helmet)

<!-- Helmet은 Application을 보호하기 위한 미들웨어로, 다양한 HTTP headers 설정을 통해 잘 알려진 웹의 취약점으로 부터 보호합니다. -->


# 개발자
* 김현진 ([hyunjkluz](https://github.com/hyunjkluz))
* 이해은 ([ihaeeun](https://github.com/ihaeeun))
* 강수진 ([sujinnaljin](https://github.com/sujinnaljin))

[기여자 목록](https://github.com/Jungnami/Jungnami-Server-DevCamp-/graphs/contributors)을 확인하여 이 프로젝트에 참가하신 분들을 보실 수 있습니다.

# 연관 프로젝트
* [iOS](https://github.com/Jungnami/Jungnami-iOS)
