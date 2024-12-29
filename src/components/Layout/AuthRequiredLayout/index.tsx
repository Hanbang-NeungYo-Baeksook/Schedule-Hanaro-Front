import { AccessTokenNames } from '@/api/Api';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/hooks/use-toast';
import { showToast } from '@/pages';
import SignInPage from '@/pages/Signin';
import { Outlet } from 'react-router-dom';

const isTokenExpired = (token: string) => {
  try {
    // JWT 디코딩 (Base64 URL Decoding)
    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(
      atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
    );

    // `exp` 필드 확인 (초 단위)
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Invalid token:', error);
    return true; // 토큰이 유효하지 않으면 만료로 간주
  }
};

export default function AuthRequiredLayout() {
  const tokenName: AccessTokenNames = 'customerAccessToken';
  const token = window.localStorage.getItem(tokenName);

  if (!token) {
    return <SignInPage />;
  }

  if (isTokenExpired(token)) {
    showToast(toast, '로그인 기간이 초과되었습니다.');
    window.localStorage.removeItem(tokenName);
    return <SignInPage />;
  }
  return (
    <div className={'App'}>
      <Outlet />
      <Toaster />
    </div>
  );
}
