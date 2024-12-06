import '@/index.css';
import CallList from '@/components/Reservation/CallList';
import { callListData } from '@/mock/mockReservationCall';
import { ReactComponent as RefreshIcon } from '@/assets/icons/reservation/refresh.svg';

export function ReservationCallPage() {
  const refreshButtonClick = () => {
    // 추후 새로고침 기능 추가
  };

  return (
    <>
      <div className='mx-auto flex h-screen w-[90%] flex-col pb-[7rem]'>
        <div className='flex h-full w-full flex-col space-y-[1.5rem] overflow-auto'>
          {callListData.map((call, index) => (
            <CallList key={index} {...call} idx={call.id} />
          ))}
        </div>
        <button
          onClick={refreshButtonClick}
          className='fixed z-10 flex h-[4rem] w-[4rem] sm:h-[3rem] sm:w-[3rem] lg:h-[5rem] lg:w-[5rem]'
          style={{ bottom: '10%', right: '8%' }}
        >
          <RefreshIcon className='h-[80%] w-[80%]' />
        </button>
      </div>
    </>
  );
}
