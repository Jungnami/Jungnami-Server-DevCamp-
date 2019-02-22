module.exports = {
    INVALID_TOKEN: "토큰값이 유효하지 않습니다.",
    EMPTY_TOKEN: "토큰값이 존재하지 않습니다.",
    EMPTY_REFRESH_TOKEN: "재발급 토큰이 존재하지 않습니다.",
    REFRESH_TOKEN: "토큰 재발급 완료.",

    NOT_ADMIN: "관리자가 아닙니다.",
    
    READ_USER: "회원 정보 조회 성공",
    NOT_FOUND_USER: "회원을 찾을 수 없습니다.",
    CREATED_USER: "회원 가입 성공",
    UPDATE_USER: "회원 정보 수정 성공",
    DELETE_USER: "회원 탈퇴 성공",

    LOGIN_SUCCESS: "로그인 성공",
    LOGIN_FAIL: "로그인 실패",

    LIST_SUCCESS: "리스트 조회 성공",
    LEGISLATOR_SUCCESS: "국회의원 정보 조회 성공",
    LEGISLATOR_DB_INSERT: "국회의원 정보 입력 성공",
    LEGISLATOR_DETAIL_SUCCESS: "국회의원 상세 정보 조회 성공",
    LEGISLATOR_DB_ERROR: "국회의원 데이터베이스 에러",

    PMS_ADMIN_LOAD_SUCCESS: "PMS ADMIN PAGE 로드 성공",
    PMS_ADMIN_SEARCH_SUCCESS: "PMS ADMIN PAGE 국회의원 정보 조회 성공",
    PMS_ADMIN_UPDATE_SUCCESS: "PMS ADMIN PAGE 국회의원 정보 업데이트 성공",
    
    DB_ERROR: "데이터베이스 에러",
    LEGI_VOTE_ERROR: "의원 투표 데이터베이스 에러",

    USER_BALLOT_SELECT_ERROR: "투표 조회 에러",
    USER_BALLOT_INCRESE_ERROR: "투표권 증가 에러",
    USER_BALLOT_DECRESE_ERROR: "투표권 감소 에러",
    USER_BALLOT_AMOUNT_LACK: "투표권 보유량 부족",
    USER_BALLOT_SUCCESS: "투표권 지급 완료",
    USER_VOTE_SUCCESS: "투표권 성공",

    VOTE_RESULT_BUILD_SUCCESS: "투표 결과 빌드 성공",
    VOTE_RESULT_BUILD_ERROR: "투표 결과 빌드 실패",
    VOTE_RESULT_FILE_READ_ERROR: "투표 결과 파일 읽기 실패",
    VOTE_RESULT_FILE_WRITE_ERROR: "투표 결과 파일 저장 실패",

    VOTE_SUMMARY_COPY_ERROR: "투표 결과 요약본 복사 에러",
    VOTE_RESULT_DELETE_ERROR: "투표 결과 초기화 에러",
    VOTE_SUMMARY_DATE_UPDATE_ERROR: "요약 날짜 업데이트 에러",
    VOTE_SUMMARY_SUCCESS: "투표 요약 성공",

    READ_VOTE_RESULT: "투표 결과 조회 성공",
    REDIS_VOTE_RESULT_READ_ERROR: "투표 결과 조회 실패",

    READ_SUMMARY: "과거 투표 결과 조회 성공",
    SUMMARY_READ_ERROR: "과거 투표 결과 조회 에러",


    NO_AUTHORITY: "수정/삭제 권한이 없습니다(작성자가 아닙니다)",
    REPLY_OK: "댓글 작성 성공",
    REPLY_READ:"댓글 읽기 성공",
    REPLY_READ_ERROR: "댓글 읽기 에러",
    REPLY_DB_INSERT_ERROR: "댓글 작성 에러",
    REPLY_DB_UPDATE_ERROR: "댓글 수정 에러",
    REPLY_DB_DELETE_ERROR: "댓글 삭제 에러",

    USER_POINT_INCRESE_ERROR: "유저 포인트 증가 에러",

    REPLY_LIKE_OK: "좋아요/싫어요 성공",
    REPLY_LIKE_CANCEL_OK: "좋아요/싫어요 취소 성공",
    REPLY_LIKE_ALREADY: "이미 좋아요 되어있습니다",
    REPLY_DISLIKE_ALREADY: "이미 싫어요 되어있습니다",
    REPLY_LIKE_READ_ERROR: "좋아요 읽기 에러",
    REPLY_LIKE_LIKE_ERROR: "좋아요 삽입 에러",
    REPLY_LIKE_DISLIKE_ERROR: "싫어요 삽입 에러",
    REPLY_LIKE_CANCEL_ERROR: "좋아요/싫어요 삽입 에러",

    REPLYNOTIFYOK: "신고하기 성공",
    REPLYNOTIFYDB_ERROR: "신고하기 DB 에러",
    USERNOTIFYCOUNT_ERROR: "신고수 증가 에러",
    REPLYNOTIFYTRANJECTION_ERROR: "신고하기 트렌젝션 에러",
};