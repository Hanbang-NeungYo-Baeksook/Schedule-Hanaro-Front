import { CloseButton } from '../ui/close';
import { ReactComponent as Refresh } from '@/assets/icons/reservation/refresh2.svg';

function ReservationDetailHeader() {
  return (
    <div className='mx-auto flex w-full items-center justify-between justify-self-center pb-4 pt-6'>
      <Refresh className='h-[1.75rem] cursor-pointer lg:h-[2.1875rem]' />
      <CloseButton location='reservation/visit' />
    </div>
  );
}

export default ReservationDetailHeader;
