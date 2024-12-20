import { CallDetail } from '@/types/callDetail';

export const mockCallInquiryData: CallDetail[] = [
  {
    call_id: 1,
    user_id: 1,
    call_date: 1732342935821,
    name: '이규호',
    phone_number: '010-1111-1111',
    start_time: 1732342815821,
    end_time: 1732343055821,
    category: '예적금',
    inquiry_content: '예금 상품의 이율과 혜택을 알고 싶습니다.',
    banker_reply_content: '블라블라',
    recommended_reply_content: '어쩌구저쩌구',
    recommended_entry_time: 1732342935821,
    tags: ['인증', '발급'],
  },
  {
    call_id: 2,
    user_id: 2,
    call_date: 1732342935821,
    name: '이규호호',
    phone_number: '010-2111-1111',
    start_time: 1732342815821,
    end_time: 1732343055821,
    category: '대출',
    inquiry_content: '대출 상환일을 변경할 수 있나요?',
    banker_reply_content: '블라블라',
    recommended_reply_content: '어쩌구저쩌구',
    recommended_entry_time: 1732342935821,
    tags: ['인증', '오류'],
  },
  {
    call_id: 3,
    user_id: 3,
    call_date: 1732342935821,
    name: '이규호호호',
    phone_number: '010-3111-1111',
    start_time: 1732342815821,
    end_time: 1732343055821,
    category: '금리',
    inquiry_content: '현재 적용 중인 금리 정보가 궁금합니다.',
    banker_reply_content: '블라블라',
    recommended_reply_content: '어쩌구저쩌구',
    recommended_entry_time: 1732342935821,
    tags: ['인증', '시세'],
  },
  {
    call_id: 4,
    user_id: 4,
    call_date: 1732342935821,
    name: '이규호호호호',
    phone_number: '010-4111-1111',
    start_time: 1732342815821,
    end_time: 1732343055821,
    category: '예적금',
    inquiry_content: '정기 예금을 해지하려면 어떻게 하나요?',
    banker_reply_content: '블라블라',
    recommended_reply_content: '어쩌구저쩌구',
    recommended_entry_time: 1732342935821,
    tags: ['발급'],
  },
  {
    call_id: 5,
    user_id: 5,
    call_date: 1732342935821,
    name: '이규호호호호호',
    phone_number: '010-5111-1111',
    start_time: 1732342815821,
    end_time: 1732343055821,
    category: '청약',
    inquiry_content: '청약 가점 계산 방법을 알고 싶습니다.',
    banker_reply_content: '블라블라',
    recommended_reply_content: '어쩌구저쩌구',
    recommended_entry_time: 1732342935821,
    tags: ['보안', '발급'],
  },
];
