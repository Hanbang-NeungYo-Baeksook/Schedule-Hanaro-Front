import { Toaster } from '@/components/ui/toaster';
import { Outlet } from 'react-router-dom';

export function ClientLayout() {
  return (
    <div className='App'>
      <Outlet />
      <Toaster />
    </div>
  );
}
