// 방문 상태 enum
export enum Status {
  PENDING = 'PENDING',
  PROGRESS = 'PROGRESS',
  COMPLETE = 'COMPLETE',
  CANCELED = 'CANCELED',
}

// 섹션 타입 enum
export enum SectionType {
  DEPOSIT = 'DEPOSIT',
  PERSONAL_LOAN = 'PERSONAL_LOAN',
  BUSINESS_LOAN = 'BUSINESS_LOAN',
}

// 카테고리 enum
export enum Category {
  SIGNIN = 'SIGNIN',
  SIGNUP = 'SIGNUP',
  AUTH = 'AUTH',
  DEPOSIT = 'DEPOSIT',
  TRUST = 'TRUST',
  FUND = 'FUND',
  LOAN = 'LOAN',
  FOREX = 'FOREX',
  INERNET_BANKING = 'INERNET_BANKING',
  HANAONEQ = 'HANAONEQ',
  PHONE_BANKING = 'PHONE_BANKING',
  CD = 'CD',
  ATM = 'ATM',
  UTILITY_BILL = 'UTILITY_BILL',
  FOREIGN = 'FOREIGN',
  BRANCH = 'BRANCH',
}

// 방문 상담 상세 조회 응답 타입
export type AdminVisitInquiryInfoResponse = {
  visit_id: number;
  customer_id: number;
  category: string;
  content: string;
  tags: string;
};

// 섹션 정보 타입
export type SectionInfo = {
  section_id: number;
  section_type: string;
  current_num: number;
  wait_amount: number;
  wait_time: number;
  today_visitors: number;
};

// 방문 상태 업데이트 응답 타입
export type AdminVisitStatusUpdateResponse = {
  previous_num: number;
  previous_category: string;
  current_num: number;
  current_category: string;
  next_num: number;
  next_category: string;
  section_info: SectionInfo;
};
