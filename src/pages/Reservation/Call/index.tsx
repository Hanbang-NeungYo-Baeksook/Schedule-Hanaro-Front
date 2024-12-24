import CallList from '@/components/Reservation/CallList';
import useGetCallList from '@/hooks/query/customer/useGetCallList';
import '@/index.css';
import { callStatusAtom } from '@/stores';
import { CallData } from '@/types/Call';
import { useAtomValue } from 'jotai';
import React from 'react';

export function ReservationCallPage() {
  const status = useAtomValue(callStatusAtom);
  const { data: calls, isLoading } = useGetCallList({ status });

  if (isLoading || !calls) {
    <>Loading...</>;
  }
  return (
    <>
      <div className='mx-auto flex h-screen w-[100%] flex-col overflow-visible pb-[120px]'>
        <div className='flex h-full w-full flex-col space-y-[1.5rem] overflow-auto py-[1rem] scrollbar-hide'>
          {calls?.data?.map((call: CallData) => (
            <React.Fragment key={call.call_id}>
              <CallList {...call} />
            </React.Fragment>
          ))}
        </div>
        <div className='pb-[142px] min-[435px]:pb-[160px] min-[800px]:pb-[180px]'></div>
      </div>
    </>
  );
}
