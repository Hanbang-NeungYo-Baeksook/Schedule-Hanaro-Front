export const API_ROUTE = {
  customer: '/api',
  admin: '/admin/api',
};

export const CUSTOMER_ROUTE = {
  home: '/',
  login: '/signin',
};

export const ADMIN_ROUTE = {
  login: '/admin/login',
  online: {
    main: '/admin/online',

    call_detail: (callId: number) => `/admin/online/call/${callId}`,

    inquiry: '/admin/online/inquiry',
    inquiry_detail: (inquiryId: number) => `/admin/online/inquiry/${inquiryId}`,

    customer_detail: (userId: number) => `/admin/online/customer/${userId}`,
  },
};
