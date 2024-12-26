import CallList from '@/components/Reservation/CallList';
import { Skeleton } from '@/components/ui/skeleton';
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

  return (
    <div className='mx-auto flex h-screen w-[100%] flex-col justify-between overflow-visible pb-[120px]'>
      <div className='flex h-full w-full flex-col space-y-[1.5rem] overflow-auto py-[1rem] scrollbar-hide'>
        {!calls || !calls.pages || isLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='mx-auto h-36 w-[90%] animate-pulse space-y-[1.5rem] rounded-[0.9375rem] bg-white pb-[2.1875rem] pl-[1.1875rem] pr-[1.4688rem] pt-[1.75rem] drop-shadow'
              >
                <Skeleton className='mx-auto h-[30%] w-[90%] rounded-full bg-[#F2F2F2]' />
                <Skeleton className='mx-auto h-[30%] w-[90%] rounded-full bg-[#F2F2F2]' />
              </div>
            ))}
          </>
        ) : calls.pages[0].data?.length > 0 ? (
          <>
            {calls.pages.map((page) =>
              page.data.map((call: CallData) => (
                <React.Fragment key={call.call_id}>
                  <CallList {...call} />
                </React.Fragment>
              ))
            )}
            <div ref={loadMoreRef} />
          </>
        ) : (
          <div className='relative pb-[142px] min-[435px]:pb-[160px] min-[800px]:pb-[180px]'>
            <div className='flex h-[500px] items-center justify-center'>
              <span className='text-2xl font-bold text-[#464646]'>
                전화 상담 예약 내역이 없습니다.
              </span>
            </div>
          </div>
        )}
        <div className='pb-[142px] min-[435px]:pb-[160px] min-[900px]:pb-[190px]'></div>
      </div>
    </div>
  );
}

export default ReservationCallPage;
