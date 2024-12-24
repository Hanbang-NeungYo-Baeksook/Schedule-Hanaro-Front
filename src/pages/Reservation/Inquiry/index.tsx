import { InquiryStatus } from '@/api/customer/inquires';
import InquiryList from '@/components/Reservation/InquiryList';
import { Toaster } from '@/components/ui/toaster';
import useGetInquiryList from '@/hooks/query/customer/useGetInquiryList';
import '@/index.css';
import { inquiryStatusAtom } from '@/stores';
import { useAtomValue } from 'jotai';

type ReservationInquiryParams = {
  inquiry_id: number;
  inquiry_num: number;
  category: string;
  status: InquiryStatus;
};
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
            (
              {
                inquiry_id,
                inquiry_num,
                category,
                status,
              }: ReservationInquiryParams,
              index
            ) => (
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
