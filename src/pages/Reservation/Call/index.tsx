import '@/index.css';
import CallList from '@/components/Reservation/CallList';
import { callListData } from '@/mock/mockReservationCall';
// import { ReactComponent as RefreshIcon } from '@/assets/icons/reservation/refresh.svg';

export function ReservationCallPage() {
  return (
    <>
      <div className='mx-auto flex h-screen w-[100%] flex-col overflow-visible pb-[120px]'>
        <div className='flex h-full w-full flex-col space-y-[1.5rem] overflow-auto py-[1rem] scrollbar-hide'>
          {callListData.map((call, index) => (
            <CallList key={index} {...call} idx={call.id} />
          ))}
        </div>
        {/* <button
          onClick={refreshButtonClick}
          className='absolute bottom-[100px] right-4 z-50 flex h-[5rem] w-[5rem] min-[435px]:bottom-[110px] min-[800px]:bottom-[120px]'
          style={{ transform: 'translateZ(0)' }}
        >
          <RefreshIcon />
        </button> */}
        <div className='pb-[142px] min-[435px]:pb-[160px] min-[800px]:pb-[180px]'></div>
      </div>
    </>
  );
}
