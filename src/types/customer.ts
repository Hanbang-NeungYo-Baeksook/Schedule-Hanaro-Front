export type AdminCustomer = {
  data: AdminCustomerData[];
  current_page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
};

export type AdminCustomerDetail = Omit<AdminCustomerData, 'customer_id'>;

export type AdminCustomerHistory = {
  phone_inquiries: AdminCustomerCallHistory[];
  one_to_one_inquiries: AdminCustomerInquiryHistory[];
};

export type AdminCustomerData = {
  customer_id: number;
  auth_id: string;
  customer_name: string;
  phone_number: string;
  birth_date: string;
};

export type AdminCustomerCallHistory = {
  call_id: number;
  call_date: string;
  call_num: number;
  category: string;
  status: string;
  content: string;
  started_at: string;
  ended_at: string;
};

export type AdminCustomerInquiryHistory = {
  inquiry_id: number;
  content: string;
  category: string;
  status: string;
  created_at: string;
};
