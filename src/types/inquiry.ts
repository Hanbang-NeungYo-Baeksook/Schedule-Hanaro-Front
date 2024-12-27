import { Category, InquiryStatus } from './enum';
import { PageData } from './page';

export type ActiveTab = '답변대기' | '답변완료' | '문의정보' | '고객정보';

export type CallDataType = {
  waitingNum: number;
  category: string;
  content: string;
  userName: string;
  resTime: string;
  now: boolean;
};

// API 관련 type
export type AdminInquiryDetail = {
  inquiry_id: number;
  inquiry_content: string;
  category: string;
  tags: string[];
  inquiry_created_at: string;
  customer_name: string;
  phone_number: string;
  reply_content?: string;
  reply_created_at?: string;
};

export type AdminInquiry = PageData<AdminInquiryData[]>;

export type AdminInquiryData = {
  category: Category;
  status: InquiryStatus;
  content: string;
  tags: string[];
  inquiry_id: number;
  inquiry_num: number;
  created_at: string;
  customer_name: string;
};
