import { AccessTokenNames } from '@/api/Api';
import Header from '@/components/Admin/Header';
import { Toaster } from '@/components/ui/toaster';
import AdminSignInPage from '@/pages/Admin/Login';
import SignInPage from '@/pages/Signin';
import { Outlet } from 'react-router-dom';

type PageType = 'customer' | 'admin';

export function AuthRequiredLayout({ pageType }: { pageType: PageType }) {
  const tokenName: AccessTokenNames =
    pageType === 'customer' ? 'customerAccessToken' : 'adminAccessToken';
  const token = window.localStorage.getItem(tokenName);

  if (!token) {
    return pageType === 'customer' ? <SignInPage /> : <AdminSignInPage />;
  }

  return pageType === 'customer' ? (
    <div className={'App'}>
      <Outlet />
      <Toaster />
    </div>
  ) : (
    <div className='flex'>
      <Header storeName='하나은행 강남점' employeeName='강능요 사원 [10]' />
      <div className='flex-1 pb-0 pt-[8rem]'>
        <Toaster />
        <Outlet />
      </div>
    </div>
  );
}
