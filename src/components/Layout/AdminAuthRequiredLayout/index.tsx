import { AccessTokenNames } from '@/api/Api';
import Header from '@/components/Admin/Header';
import { Toaster } from '@/components/ui/toaster';
import AdminSignInPage from '@/pages/Admin/Login';
import { Outlet } from 'react-router-dom';

export default function AdminAuthRequiredLayout() {
  const tokenName: AccessTokenNames = 'adminAccessToken';
  const token = window.localStorage.getItem(tokenName);

  const adminInfoStr = localStorage.getItem('adminInfo');
  console.log('Raw adminInfo:', adminInfoStr);

  const adminInfo = adminInfoStr ? JSON.parse(adminInfoStr) : {};
  console.log('Parsed adminInfo:', adminInfo);

  if (!token) {
    return <AdminSignInPage />;
  }

  return (
    <div className='flex'>
      <Header
        storeName={adminInfo.storeName}
        employeeName={`${adminInfo.name} 사원 [${adminInfo.id}]`}
      />
      <div className='flex-1 pb-0 pt-[8rem]'>
        <Toaster />
        <Outlet />
      </div>
    </div>
  );
}
