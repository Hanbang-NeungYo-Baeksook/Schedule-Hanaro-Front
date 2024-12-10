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
      <div className='mx-auto flex h-screen w-[100%] flex-col pb-[120px]'>
        <div className='flex h-full w-full flex-col space-y-[1.5rem] overflow-auto py-[1rem] scrollbar-hide'>
          {callListData.map((call, index) => (
            <CallList key={index} {...call} idx={call.id} />
          ))}
        </div>

        <div className='relative pb-[142px] min-[435px]:pb-[160px] min-[800px]:pb-[180px]'>
          <button
            onClick={refreshButtonClick}
            className='absolute bottom-[170px] right-4 z-40 flex h-[5rem] w-[5rem] min-[435px]:bottom-[180px] min-[800px]:bottom-[200px]'
          >
            <RefreshIcon />
          </button>
        </div>
      </div>
    </>
  );
}
