import '@/index.css';
import CallList from '@/components/Reservation/CallList';
import { callListData } from '@/mock/mockReservationCall';

export function ReservationCallPage() {
  return (
    <>
      <div className='mx-auto flex h-screen w-[100%] flex-col pb-[120px]'>
        <div className='flex h-full w-full flex-col space-y-[1.5rem] overflow-auto py-[1rem] scrollbar-hide'>
          {callListData.map((call, index) => (
            <CallList key={index} {...call} idx={call.id} />
          ))}
        </div>

        <div className='relative pb-[142px] min-[435px]:pb-[160px] min-[800px]:pb-[180px]'></div>
      </div>
    </>
  );
}
