import ReservationHeader from '@/components/Header/ReservationHeader';
import Nav from '@/components/Nav/Nav';
import { Toaster } from '@/components/ui/toaster';
import { Outlet, useLocation } from 'react-router-dom';

export function ReservationLayout() {
  const location = useLocation();
  const tab = location.pathname.replace('/reservation/', '');
  const tabLocation = tab === 'visit' ? 'visit' : 'call';

  const noLayoutPaths = [
    '/reservation/visit/',
    '/reservation/call/',
    '/reservation/inquiry/',
  ];

  const hasNoLayout = noLayoutPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  if (hasNoLayout) {
    return <Outlet />;
  }

  return (
    <div className='relative h-screen w-full justify-self-center overflow-hidden'>
      <ReservationHeader
        tabLocation={tabLocation}
        key={tabLocation}
        toggleTitle={tab === 'call' ? '전화 상담 내역' : '1:1 상담 내역'}
      />
      <Outlet />
      <Nav />
      <Toaster />
    </div>
  );
}
