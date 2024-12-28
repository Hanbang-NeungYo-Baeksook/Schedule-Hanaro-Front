export enum ErrorCode {
  // 400
  MISSING_REQUEST_PARAMETER = 40001,
  WRONG_REQUEST_PARAMETER = 40002,
  FULL_CALL_RESERVATION = 40003,
  WRONG_CALL_STATUS = 40004,
  WRONG_INQUIRY_STATUS = 40005,
  ALREADY_RESERVED = 40006,
  VISIT_LIMIT_OVER = 40007,
  BRANCH_CLOSED = 40008,
  ALREADY_PROGRESS = 40009,
  INVALID_VISIT_NUMBER = 40010,
  INVALID_TOTAL_VISITOR_COUNT = 40011,
  VISIT_TIME_EXPIRED = 40012,
  ALREADY_COMPLETE = 40013,
  ALREADY_POST_MEMO = 40014,
  ALREADY_POST_RESPONSE = 40015,
  EMPTY_WAITS = 40016,
  ALREADY_PROGRESS_COUNSLATION = 40017,

  // 401
  EXPIRED_ACCESS_TOKEN = 40101,

  // 403
  FORBIDDEN_REQUEST = 40300,
  MALFORMED_ACCESS_TOKEN = 40301,
  NOT_FOUND_REFRESH_TOKEN = 40302,
  NOT_MATCHED_REFRESH_TOKEN = 40303,

  // 404
  NOT_FOUND_CUSTOMER = 40401,
  NOT_FOUND_ADMIN = 40402,
  NOT_FOUND_BRANCH = 40403,
  NOT_FOUND_VISIT = 40404,
  NOT_FOUND_CALL = 40405,
  NOT_FOUND_INQUIRY = 40406,
  NOT_FOUND_CALL_MEMO = 40407,
  NOT_FOUND_INQUIRY_RESPONSE = 40408,
  NOT_FOUND_SECTION = 40409,
  NOT_FOUND_CS_VISIT = 40410,
  NOT_FOUND_NEXT_VISITOR = 40411,
  NOT_FOUND_DATA = 40499,

  // 409
  CONCURRENT_VISIT_UPDATE = 40900,
  CONFLICTING_CALL_RESERVATION = 40901,
}

export class APIError extends Error {
  public readonly code: ErrorCode;
  public readonly message: string;

  constructor(code: ErrorCode, message?: string) {
    super(message || ErrorCode[code]);
    this.code = code;
    this.message = message || ErrorCode[code];
  }
}
