import { AccessTokenNames } from '@/api/Api';
import { Toaster } from '@/components/ui/toaster';
import SignInPage from '@/pages/Signin';
import { Outlet } from 'react-router-dom';

export function AuthRequiredLayout() {
  const tokenName: AccessTokenNames = 'customerAccessToken';
  const token = window.localStorage.getItem(tokenName);

  if (!token) {
    return <SignInPage />;
  }

  return (
    <div className='App'>
      <Outlet />
      <Toaster />
    </div>
  );
}
