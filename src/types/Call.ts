export type Call = PageData<CallData[]>;

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
  waiting: AdminCallData;
};

export type AdminCallData = {
  id: number;
  waitingNum: number;
  category: string;
  tags: string[];
  content: string;
  reservationTime: Date;
  startTime?: Date;
  endTime?: Date;
  userName: string;
  email: string;
  mobile: string;
  birthdt: string;
  calls: AdminHistoryData[];
  inquiries: AdminHistoryData[];
};

export type AdminHistoryData = {
  id: number;
  content: string;
  category: string;
};
