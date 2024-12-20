import { Button } from '@/components/ui/button';
import { ReactComponent as CallReservationIcon } from '@/assets/icons/call_reservation.svg';
import { ReactComponent as InquiryReservationIcon } from '@/assets/icons/inquiry_reservation.svg';
type Props = {
  title: string;
  contents: string[];
  onClick: () => void;
};

export default function MyCard({ title, contents, onClick }: Props) {
  return (
    <div className='h-[10rem] w-1/2 rounded-[0.8rem] px-[0.9375rem] py-[0.85rem] shadow-[4px_4px_20px_0px_rgba(0,0,0,0.20)]'>
      <div className='flex h-full w-full flex-col items-start justify-between'>
        <div className='flex items-center gap-3'>
          {title === '전화상담' ? (
            <CallReservationIcon />
          ) : (
            <InquiryReservationIcon />
          )}
          <div className='text-[1.2rem] font-[600]'>{title}</div>
        </div>
        <div className='text-[0.925rem] font-[400] text-lightGrey'>
          {contents.length > 1 ? (
            <div className='flex flex-wrap justify-center gap-2'>
              {contents.map((content, idx) => (
                <span key={idx}>{content}</span>
              ))}
            </div>
          ) : (
            contents[0]
          )}
        </div>
        <Button onClick={onClick} className='h-[2.25rem] text-[1rem]'>
          예약하기
        </Button>
      </div>
    </div>
  );
}
