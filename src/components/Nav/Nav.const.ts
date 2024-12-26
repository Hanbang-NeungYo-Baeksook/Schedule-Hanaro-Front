import { ReactComponent as Home } from '@/assets/icons/ic_home.svg';
import { ReactComponent as Calendar } from '@/assets/icons/nav_calendar.svg';
import { ReactComponent as Map } from '@/assets/icons/nav_map.svg';
import { ReactComponent as Mypage } from '@/assets/icons/nav_mypage.svg';
import { ReactComponent as List } from '@/assets/icons/nav_reservationList.svg';

type NavItem = {
  name: string;
  icon: React.ComponentType<{ fill?: string; stroke?: string }>; // 아이콘 컴포넌트 타입
  route: string;
};

export const NavIcons: NavItem[] = [
  {
    name: '지점찾기',
    icon: Map,
    route: 'map',
  },
  {
    name: '상담예약',
    icon: Calendar,
    route: 'register/type/call',
  },
  { name: '', icon: Home, route: '' },
  {
    name: '예약내역',
    icon: List,
    route: 'reservation/visit',
  },
  {
    name: '마이페이지',
    icon: Mypage,
    route: 'mypage',
  },
];
