import { ADMIN_ROUTE } from '@/constants/route';
import { useNavigate } from 'react-router-dom';

export type CurtomerBoxProps = {
  userId: number;
  idx: number;
  name: string;
  mobile: string;
  birthdt: string;
  authId: string;
};

function CustomerBox({
  userId,
  idx,
  name,
  mobile,
  birthdt,
  authId,
}: CurtomerBoxProps) {
  const navigate = useNavigate();

  return (
    <li className='mx-auto flex w-full border-b-[1px] border-border py-7'>
      <span className='font-regular w-[5%] text-center text-[1.125rem] text-black'>
        {idx}
      </span>
      <span className='font-regular w-[15%] text-center text-[1rem] text-lightGrey'>
        {name}
      </span>
      <span className='font-regular w-[20%] text-center text-[1rem] text-lightGrey'>
        {mobile}
      </span>
      <span className='font-regular w-[25%] text-center text-[1rem] text-lightGrey'>
        {birthdt}
      </span>
      <span className='font-regular w-[25%] text-center text-[1rem] text-lightGrey'>
        {authId}
      </span>
      <span
        className='font-regular w-[10%] cursor-pointer text-center text-[1rem] text-black'
        onClick={() => navigate(ADMIN_ROUTE.online.customer_detail(userId))}
      >
        상세보기
      </span>
    </li>
  );
}

export default CustomerBox;
