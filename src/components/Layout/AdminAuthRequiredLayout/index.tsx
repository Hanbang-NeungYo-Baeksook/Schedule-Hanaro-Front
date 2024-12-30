import { AccessTokenNames } from '@/api/Api';
import Header from '@/components/Admin/Header';
import { Toaster } from '@/components/ui/toaster';
import AdminSignInPage from '@/pages/Admin/Login';
import { Outlet } from 'react-router-dom';

export default function AdminAuthRequiredLayout() {
  const tokenName: AccessTokenNames = 'adminAccessToken';
  const token = window.localStorage.getItem(tokenName);

  if (!token) {
    return <AdminSignInPage />;
  }

  return (
    <div className='flex'>
      <Header storeName='하나은행 강남점' employeeName='문해빈 사원 [10]' />
      <div className='flex-1 pb-0 pt-[8rem]'>
        <Toaster />
        <Outlet />
      </div>
    </div>
  );
}
