export type Call = PageData<CallData[], Pagination>;
export type AdminCallListRes = PageData<AdminHistoryData[], Pagination>;

export type CallData = {
  call_id: number;
  call_date: string;
  call_time: string;
  call_num: number;
  category: string;
  status: string;
};

export type AdminCall = {
  progress: AdminCallData;
  waiting: AdminCallData[];
};

export type AdminCallData = {
  id: number;
  waiting_num: number;
  category: string;
  tags: string;
  content: string;
  reservation_time: string;
  start_time?: string;
  end_time?: string;
  customer_id: number;
  // user_name: string;
  // auth_id: string;
  // mobile: string;
  // birth_dt: string;
  // calls: AdminHistoryData[];
  // inquiries: AdminHistoryData[];
  memo?: string;
};

export type AdminHistoryData = {
  id: number;
  content: string;
  category: string;
};

export type AdminCallDetail = {
  content: string;
  category: string;
  tags: string;
  mobile: string;
  call_id: number;
  call_at: string;
  started_at?: string;
  ended_at?: string;
  customer_name: string;
  reply_content?: string;
};
