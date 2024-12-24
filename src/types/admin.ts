export type AdminInfo = {
  adminId: number;
  adminInfo: AdminInfoState;
  phoneInquiryStats: AdminCallState;
  oneToOneInquiryStats: AdminInquiryState;
};

export type AdminInfoState = {
  name: string;
  profileImage: string;
  position: string;
};

export type AdminCallState = {
  today: number;
  weekly: number;
  monthly: number;
  total: number;
};

export type AdminInquiryState = {
  today: number;
  weekly: number;
  monthly: number;
  total: number;
};
