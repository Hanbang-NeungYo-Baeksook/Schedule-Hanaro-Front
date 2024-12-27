export type Status = '대기중' | '진행중' | '완료' | '취소';
// export const StatusDetails: Record<Status, string> = {
//   PENDING: '대기중',
//   PROGRESS: '진행중',
//   COMPLETE: '완료',
//   CANCELED: '취소',
// };

export type InquiryStatus =
  | '답변대기'
  | '답변완료'
  | 'PENDING'
  | 'REGISTRATIONCOMPLETE';
export const InquiryStatusDetails: Record<InquiryStatus, InquiryStatus> = {
  답변대기: 'PENDING',
  답변완료: 'REGISTRATIONCOMPLETE',
  PENDING: '답변대기',
  REGISTRATIONCOMPLETE: '답변완료',
};

// Category 타입 정의
export type Category =
  | '전체'
  | 'ALL'
  | '로그인'
  | 'SIGNIN'
  | '회원가입'
  | 'SIGNUP'
  | '인증'
  | 'AUTH'
  | '예금'
  | 'DEPOSIT'
  | '신탁'
  | 'TRUST'
  | '펀드'
  | 'FUND'
  | '대출'
  | 'LOAN'
  | '외환'
  | 'FOREX'
  | '인터넷뱅킹'
  | 'INTERNET_BANKING'
  | '하나원큐'
  | 'HANAONEQ'
  | '폰뱅킹'
  | 'PHONE_BANKING'
  | 'CD'
  | 'ATM'
  | '공과금납부'
  | 'UTILITY_BILL'
  | '해외'
  | 'FOREIGN'
  | '영업점'
  | 'BRANCH';

export const CategoryDetails: Record<Category, string> = {
  전체: '',
  로그인: 'SIGNIN',
  회원가입: 'SIGNUP',
  인증: 'AUTH',
  예금: 'DEPOSIT',
  신탁: 'TRUST',
  펀드: 'FUND',
  대출: 'LOAN',
  외환: 'FOREX',
  인터넷뱅킹: 'INTERNET_BANKING',
  하나원큐: 'HANAONEQ',
  폰뱅킹: 'PHONE_BANKING',
  CD: 'CD',
  ATM: 'ATM',
  공과금납부: 'UTILITY_BILL',
  해외: 'FOREIGN',
  영업점: 'BRANCH',

  ALL: '전체',
  SIGNIN: '로그인',
  SIGNUP: '회원가입',
  AUTH: '인증',
  DEPOSIT: '예금',
  TRUST: '신탁',
  FUND: '펀드',
  LOAN: '대출',
  FOREX: '외환',
  INTERNET_BANKING: '인터넷뱅킹',
  HANAONEQ: '하나원큐',
  PHONE_BANKING: '폰뱅킹',
  UTILITY_BILL: '공과금납부',
  FOREIGN: '해외',
  BRANCH: '영업점',
};
