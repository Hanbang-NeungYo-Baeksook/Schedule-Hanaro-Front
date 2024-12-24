import '@/index.css';
import InquiryList from '@/components/Reservation/InquiryList';
import { useAtomValue } from 'jotai';
import { inquiryStatusAtom } from '@/stores';
import useGetInquiryList from '@/hooks/query/customer/useGetInquiryList';
import { Toaster } from '@/components/ui/toaster';

export function ReservationInquiryPage() {
  const status = useAtomValue(inquiryStatusAtom);
  const { data: inquires, isLoading } = useGetInquiryList({
    status,
    page: 1,
    size: 20,
  });

  if (isLoading || !inquires) {
    return <>Loading...</>;
  }
  return (
    <>
      <div className='mx-auto flex h-screen w-[100%] flex-col pb-[120px]'>
        <div className='flex h-full w-full flex-col space-y-[1.5rem] overflow-auto py-[1rem] scrollbar-hide'>
          {inquires.data.map(
            ({ inquiry_id, inquiry_num, category, status }, index) => (
              <InquiryList
                key={index}
                inquiryId={inquiry_id}
                inquiryNumber={inquiry_num}
                inquiryconsultationType={category}
                consultationContents={'content'}
                responseStatus={status}
              />
            )
          )}
        </div>
        <div className='relative pb-[142px] min-[435px]:pb-[160px] min-[800px]:pb-[180px]'></div>
      </div>
      <Toaster />
    </>
  );
}
