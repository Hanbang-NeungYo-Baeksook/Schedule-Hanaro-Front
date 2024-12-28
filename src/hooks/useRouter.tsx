import { createBrowserRouter } from 'react-router-dom';
import {
  MainLayout,
  MapLayout,
  RegisterLayout,
  SignUpLayout,
} from '@/components/Layout';
import {
  AdminMainPage,
  AdminMyPage,
  AiAnswer,
  AiQuestion,
  BranchDetailPage,
  DirectionPage,
  InquiryDetailPage,
  InquiryPage,
  MapPage,
  RegisterCallFormPage,
  RegisterInquiryFormPage,
  RegisterVisitFormPage,
  ReservationCallPage,
  ReservationDetailCallPage,
  ReservationDetailInquiryPage,
  ReservationDetailVisitPage,
  ReservationInquiryPage,
  ReservationPage,
  ReservationVisitPage,
  SignUpPage,
} from '@/pages';
import AdminAuthRequiredLayout from '@/components/Layout/AdminAuthRequiredLayout';
import AuthRequiredLayout from '@/components/Layout/AuthRequiredLayout';
import MypageLayout from '@/components/Layout/MypageLayout';
import ReservationLayout from '@/components/Layout/ReservationLayout';
import SignInPage from '@/pages/Signin';
import AdminSignInPage from '@/pages/Admin/Login';
import NotFound from '@/pages/NotFound';
import CallPage from '@/pages/Admin/online/Call';
import { CallAnswerDetail } from '@/pages/Admin/online/Call/Detail';
import { AnswerInput } from '@/pages/Admin/online/Inquiry/Answer/Input';
import { AnswerDetail } from '@/pages/Admin/online/Inquiry/Answer/Detail';
import AdminCustomerDetailPage from '@/pages/Admin/online/customer/detail';
import AdminCustomerPage from '@/pages/Admin/online/customer';
import VisitPage from '@/pages/Admin/offline';
import Mypage from '@/pages/Mypage';
export const useRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <AuthRequiredLayout />,
      children: [
        { index: true, element: <MainLayout /> },
        {
          path: '/map',
          element: <MapLayout />,
          children: [{ index: true, element: <MapPage /> }],
        },
        {
          path: '/direction',
          element: <DirectionPage />,
        },
        {
          path: '/branch/:branchId',
          element: <BranchDetailPage />,
        },
        {
          path: '/ai',
          element: <SignUpLayout />,
          children: [
            {
              path: '/ai/question',
              element: <AiQuestion />,
            },
            {
              path: '/ai/answer/:registerType',
              element: <AiAnswer />,
            },
          ],
        },
        {
          path: '/reservation',
          element: <ReservationLayout />,
          children: [
            // { index: true, element: <ReservationPage /> },
            {
              path: '/reservation/call',
              children: [
                { index: true, element: <ReservationCallPage /> },
                {
                  path: '/reservation/call/:callId',
                  children: [
                    { index: true, element: <ReservationDetailCallPage /> },
                  ],
                },
              ],
            },
            {
              path: '/reservation/inquiry',
              children: [
                { index: true, element: <ReservationInquiryPage /> },
                {
                  path: '/reservation/inquiry/:inquiryId',
                  children: [
                    { index: true, element: <ReservationDetailInquiryPage /> },
                  ],
                },
                {
                  path: '/reservation/inquiry/:id/detail',
                  children: [{ index: true, element: <InquiryDetailPage /> }],
                },
              ],
            },
            {
              path: '/reservation/visit',
              children: [
                { index: true, element: <ReservationVisitPage /> },
                {
                  path: '/reservation/visit/:visitId',
                  children: [
                    { index: true, element: <ReservationDetailVisitPage /> },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: '/register',
          element: <RegisterLayout />,
          children: [
            {
              path: '/register/selection',
              element: <ReservationPage />,
            },
            {
              path: '/register/call',
              element: <RegisterCallFormPage />,
            },
            {
              path: '/register/inquiry',
              element: <RegisterInquiryFormPage />,
            },
            {
              path: '/register/visit/:branchId',
              element: <RegisterVisitFormPage />,
            },
          ],
        },
        {
          path: '/mypage',
          element: <MypageLayout />,
          children: [{ index: true, element: <Mypage /> }],
        },
        {
          path: '/signin',
          element: <SignInPage />,
        },
      ],
    },
    {
      path: '/admin',
      element: <AdminAuthRequiredLayout />,
      children: [
        { index: true, element: <VisitPage /> },
        {
          path: '/admin/offline',
          element: <VisitPage />,
        },
        {
          path: '/admin/online',
          element: <AdminMainPage />,
        },
        {
          path: '/admin/online/customer',
          element: <AdminCustomerPage />,
        },
        {
          path: '/admin/online/customer/:id',
          element: <AdminCustomerDetailPage />,
        },
        {
          path: '/admin/online/inquiry',
          element: <InquiryPage />,
        },
        {
          path: '/admin/online/inquiry/:id',
          element: <AnswerDetail />,
        },
        {
          path: '/admin/online/inquiry/register/:id',
          element: <AnswerInput />,
        },
        { path: '/admin/online/call', element: <CallPage /> },
        { path: '/admin/online/call/:id', element: <CallAnswerDetail /> },
        { path: '/admin/online/mypage', element: <AdminMyPage /> },
      ],
    },
    {
      path: '/auth/signup',
      element: <SignUpPage />,
    },
    {
      path: '/auth/signin',
      element: <SignInPage />,
    },

    {
      path: '/admin/auth/signin',
      element: <AdminSignInPage />,
    },
    {
      path: '/*',
      element: <NotFound />,
    },
  ]);
