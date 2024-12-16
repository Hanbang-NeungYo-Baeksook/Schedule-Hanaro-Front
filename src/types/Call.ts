export type Call = {
  CallData: CallData[];
  Pagination: Pagination;
};

export type CallData = {
  call_id: number;
  call_date: string;
  call_time: string;
  call_num: number;
  category: string;
  status: string;
};
