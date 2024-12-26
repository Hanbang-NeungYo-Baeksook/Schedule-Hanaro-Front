import CallList from '@/components/Reservation/CallList';
import useGetCallList from '@/hooks/query/customer/useGetCallList';
import '@/index.css';
import { callStatusAtom } from '@/stores';
import { CallData } from '@/types/Call';
import { useAtomValue } from 'jotai';
import React, { useEffect, useRef } from 'react';

export function ReservationCallPage() {
  const status = useAtomValue(callStatusAtom);
  const {
    data: calls,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useGetCallList({ status });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  if (isLoading || !calls) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className='mx-auto flex h-screen w-[100%] flex-col justify-between overflow-visible pb-[120px]'>
        <div className='flex h-full w-full flex-col space-y-[1.5rem] overflow-auto py-[1rem] scrollbar-hide'>
          {calls.pages.map((page) =>
            page.data.map((call: CallData) => (
              <React.Fragment key={call.call_id}>
                <CallList {...call} />
              </React.Fragment>
            ))
          )}
          <div ref={loadMoreRef} />
        </div>
        <div className='relative pb-[142px] min-[435px]:pb-[160px] min-[800px]:pb-[180px]'></div>
      </div>
    </>
  );
}

export default ReservationCallPage;
