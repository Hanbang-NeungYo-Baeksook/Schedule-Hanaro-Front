import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavIcons } from './Nav.const';

type NavItemProps = {
  icon: React.ComponentType<{ fill?: string; stroke?: string }>;
  name: string;
  route: string;
};
const Item = ({ icon: Icon, name, route }: NavItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedPath =
    location.pathname === ''
      ? location.pathname
      : location.pathname.split('/').slice(1, 3).join('/');
  const iconFill = selectedPath === route.split('?')[0] ? '#777777' : '#D9D9D9';

  const handleRoute = () => {
    navigate(`/${route}`);
  };

  return (
    <div
      className={`flex h-[2.625rem] w-[2.625rem] cursor-pointer items-center justify-center bg-[#1A9091] ${
        name === '' ? 'rounded-xl' : ''
      }`}
    >
      <div
        className='flex flex-col items-center gap-1 whitespace-nowrap'
        onClick={handleRoute}
      >
        {route.split('?')[0] === 'reservation/visit' ? (
          <Icon stroke={iconFill} fill={iconFill} />
        ) : route.split('?')[0] === '' ? (
          <Icon />
        ) : (
          <Icon fill={iconFill} />
        )}
        {name && (
          <span
            className={`text-[0.75rem] font-medium ${selectedPath === route.split('?')[0] ? 'text-[#777777]' : 'text-[#D9D9D9]'}`}
          >
            {name}
          </span>
        )}
      </div>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className='navbar fixed bottom-0 z-[50] flex items-center justify-around rounded-t-[1.875rem] bg-[#1A9091] py-6 shadow-[0_-4px_10px_0_rgba(0,0,0,0.1)]'>
      {NavIcons.map((item) => (
        <React.Fragment key={item.name}>
          <Item icon={item.icon} name={item.name} route={item.route} />
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Nav;
