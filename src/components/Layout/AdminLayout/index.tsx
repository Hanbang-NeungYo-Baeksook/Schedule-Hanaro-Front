import Header from '@/components/Admin/Header';
import { Outlet, useLocation } from 'react-router-dom';

function AdminLayout() {
  const location = useLocation();

  const isLoginPage = location.pathname === '/admin/login';
  return (
    <div className='flex'>
      {!isLoginPage && (
        <Header storeName='하나은행 강남점' employeeName='강능요 사원 [10]' />
      )}
      <div className='flex-1 pb-0 pt-[6rem]'>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
