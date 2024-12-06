import '@/index.css';
import { inquiryListData } from '@/mock/mockReservationInquiry';
import InquiryList from '@/components/Reservation/InquiryList';

export function ReservationInquiryPage() {
  return (
    <>
      <div className='mx-auto flex w-[90%] items-center justify-center'>
        <div className='flex w-full flex-col'>
          <div className='space-y-[1.5rem]'>
            {inquiryListData.map((call, index) => (
              <InquiryList key={index} {...call} idx={call.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
