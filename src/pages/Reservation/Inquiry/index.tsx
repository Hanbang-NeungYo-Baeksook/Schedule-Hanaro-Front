import InquiryList from '@/components/Reservation/InquiryList';
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

  if (isLoading || !inquires) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className='mx-auto flex h-screen w-[100%] flex-col pb-[120px]'>
        <div className='flex h-full w-full flex-col space-y-[1.5rem] overflow-auto py-[1rem] scrollbar-hide'>
          {inquires.pages.map((page) =>
            page.data.map(
              (
                { inquiry_id, inquiry_num, content, category, status },
                index
              ) => (
                <InquiryList
                  key={index}
                  inquiryId={inquiry_id}
                  inquiryNumber={inquiry_num}
                  inquiryconsultationType={category}
                  consultationContents={content}
                  responseStatus={status}
                />
              )
            )
          )}
          <div ref={loadMoreRef} />
        </div>
        <div className='relative pb-[142px] min-[435px]:pb-[160px] min-[800px]:pb-[180px]'></div>
      </div>
      <Toaster />
    </>
  );
}
