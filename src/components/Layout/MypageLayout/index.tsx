import Nav from '@/components/Nav/Nav';
import { Outlet } from 'react-router-dom';

function MypageLayout() {
  return (
    <div className='relative h-screen w-full justify-self-center overflow-hidden'>
      <Outlet />
      <Nav />
    </div>
  );
}

export default MypageLayout;
