export const API_ROUTE = {
  customer: '/api',
  admin: '/admin/api',
};

export const CUSTOMER_ROUTE = {
  home: '/',

  signin: '/auth/signin',
  signup: '/auth/signup',

  reservation: {
    call: '/reservation/call',
    callDetail: (callId: number) => `/reservation/call/${callId}`,

    inquiry: '/reservation/inquiry',
    inquiryDetail: (inquiryId: number) => `/reservation/inquiry/${inquiryId}`,

    visit: '/reservation/visit',
    visitDetail: (visitId: number) => `/reservation/visit/${visitId}`,
  },
};

export const ADMIN_ROUTE = {
  login: '/admin/auth/signin',
  online: {
    main: '/admin/online',

    call_detail: (callId: number) => `/admin/online/call/${callId}`,

    inquiry: '/admin/online/inquiry',
    inquiry_detail: (inquiryId: number) => `/admin/online/inquiry/${inquiryId}`,

    customer_detail: (userId: number) => `/admin/online/customer/${userId}`,
  },
};
