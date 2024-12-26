import InquiryList from '@/components/Reservation/InquiryList';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster } from '@/components/ui/toaster';
import useGetInquiryList from '@/hooks/query/customer/useGetInquiryList';
import '@/index.css';
import { inquiryStatusAtom } from '@/stores';
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';

export function ReservationInquiryPage() {
  const status = useAtomValue(inquiryStatusAtom);
  const {
    data: inquires,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useGetInquiryList({
    status,
  });
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
    <>
      <div className='mx-auto flex h-screen w-[100%] flex-col pb-[120px]'>
        <div className='flex h-full w-full flex-col space-y-[1.5rem] overflow-auto py-[1rem] scrollbar-hide'>
          {isLoading || !inquires ? (
            <>
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className='mx-auto h-36 w-[90%] animate-pulse space-y-[1.5rem] rounded-[0.9375rem] bg-white pb-[2.1875rem] pl-[1.1875rem] pr-[1.4688rem] pt-[1.75rem] drop-shadow'
                >
                  <Skeleton className='mx-auto h-[30%] w-[90%] rounded-full bg-[#F2F2F2]' />
                  <Skeleton className='mx-auto h-[30%] w-[90%] rounded-full bg-[#F2F2F2]' />
                </div>
              ))}
            </>
          ) : inquires.pages[0].data.length > 0 ? (
            inquires.pages.map((page) =>
              page.data.map(
                ({ inquiry_id, inquiry_num, content, category, status }) => (
                  <InquiryList
                    key={inquiry_id}
                    inquiryId={inquiry_id}
                    inquiryNumber={inquiry_num}
                    inquiryconsultationType={category}
                    consultationContents={content}
                    responseStatus={status}
                  />
                )
              )
            )
          ) : (
            <div className='flex h-[500px] items-center justify-center'>
              <span className='text-2xl font-bold text-[#464646]'>
                1:1 문의 내역이 없습니다.
              </span>
            </div>
          )}
          <div ref={loadMoreRef} />
        </div>
        <div className='relative pb-[142px] min-[435px]:pb-[160px] min-[800px]:pb-[180px]'></div>
      </div>
      <Toaster />
    </>
  );
}
