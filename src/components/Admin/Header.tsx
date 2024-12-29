import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import hanaLogoWhite from '../../assets/icons/hanaLogoWhite.svg';

type HeaderProps = {
  storeName: string;
  employeeName: string;
};

function Header({ storeName, employeeName }: HeaderProps) {
  const location = useLocation();
  const locationPath = location.pathname;

  const isActive = (path: string) => locationPath.startsWith(path);

  const navItems = [
    { path: '/admin/online/call', label: '전화 문의 목록' },
    { path: '/admin/online/inquiry', label: '1:1 문의 목록' },
    { path: '/admin/online/customer', label: '고객 관리' },
    { path: '/admin/online/mypage', label: '마이페이지' },
  ];

  const headerContent = isActive('/admin/offline') ? (
    <div className='flex h-full items-center text-[1.5625rem] font-extrabold text-[#FFFFFF]'>
      {storeName}
    </div>
  ) : (
    <nav className='flex h-full items-center justify-between p-[1rem]'>
      <div className='ml-[2rem] flex items-center space-x-2'>
        <Link to='/admin/online'>
          <img
            src={hanaLogoWhite}
            alt='하나은행 로고'
            className='h-full w-full'
          />
        </Link>
      </div>
      <ul className='ml-[10rem] flex space-x-[3.125rem] text-[1.25rem]'>
        {navItems.map(({ path, label }) => (
          <li
            key={path}
            className={cn('text-[#969696] hover:text-white', {
              'text-[#FFFFFF]': isActive(path),
            })}
          >
            <Link to={path}>{label}</Link>
          </li>
        ))}
      </ul>
      <div className='mr-[4.6875rem]'>
        <span className='text-[1.5625rem] font-extrabold text-[#FFFFFF]'>
          {employeeName}
        </span>
      </div>
    </nav>
  );

  return (
    <div className='fixed z-50 h-[9%] max-h-[6rem] w-full bg-[#464646] py-[1rem] pl-[1.5rem] text-left shadow-[0_4px_50px_10px_rgba(0,0,0,0.07)]'>
      {headerContent}
    </div>
  );
}

export default Header;
