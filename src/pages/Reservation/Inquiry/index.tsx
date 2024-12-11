import '@/index.css';
import { inquiryListData } from '@/mock/mockReservationInquiry';
import InquiryList from '@/components/Reservation/InquiryList';

export function ReservationInquiryPage() {
  return (
    <>
      <div className='mx-auto flex h-screen w-[100%] flex-col pb-[120px]'>
        <div className='flex h-full w-full flex-col space-y-[1.5rem] overflow-auto py-[1rem] scrollbar-hide'>
          {inquiryListData.map((call, index) => (
            <InquiryList key={index} {...call} idx={call.id} />
          ))}
        </div>
        <div className='relative pb-[142px] min-[435px]:pb-[160px] min-[800px]:pb-[180px]'></div>
      </div>
    </>
  );
}
