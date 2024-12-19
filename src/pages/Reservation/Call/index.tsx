import CallList from '@/components/Reservation/CallList';
import useGetCallListQuery from '@/hooks/query/customer/useGetCallListQuery';
import '@/index.css';
import React from 'react';
// import { ReactComponent as RefreshIcon } from '@/assets/icons/reservation/refresh.svg';

export function ReservationCallPage() {
  const { data: calls, isLoading } = useGetCallListQuery();

  if (isLoading || !calls) {
    <>Loading...</>;
  }
  return (
    <>
      <div className='mx-auto flex h-screen w-[100%] flex-col overflow-visible pb-[120px]'>
        <div className='flex h-full w-full flex-col space-y-[1.5rem] overflow-auto py-[1rem] scrollbar-hide'>
          {calls?.data?.map((call, index) => (
            <React.Fragment key={call.call_id}>
              <CallList key={index} {...call} />
            </React.Fragment>
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
