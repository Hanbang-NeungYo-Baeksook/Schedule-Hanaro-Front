import CallContainer from '@/components/Admin/main/CallContainer';
import InquiryContainer from '@/components/Admin/main/InquiryContainer';

export function AdminMainPage() {
  return (
    <div className='mx-auto max-w-[1300px] space-y-16'>
      <CallContainer />
      <InquiryContainer />
    </div>
  );
}
