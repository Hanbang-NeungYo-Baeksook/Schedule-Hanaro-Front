import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ReactComponent as DetailButton } from '@/assets/icons/reservation/reservationdetailbutton.svg';
import { useNavigate } from 'react-router-dom';
interface InquiryConsultationCardProps {
  inquiryNumber: number; // 대기 번호
  inquiryconsultationType: string; // 상담 종류
  consultationTitle: string; // 상담 제목
  consultationContents: string; // 상담 내용
  responseStatus: boolean; // 답변여부
  idx: string;
}

const InquiryList: React.FC<InquiryConsultationCardProps> = ({
  inquiryNumber,
  inquiryconsultationType,
  consultationTitle,
  consultationContents,
  responseStatus,
  idx,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className='rounded-[0.9375rem] bg-white pb-[2.1875rem] pl-[1.1875rem] pr-[1.4688rem] pt-[1.2rem] drop-shadow'
      onClick={() => navigate(`/reservation/inquiry/${idx}`)}
    >
      <div className='space-y-[1rem]'>
        <div className='flex items-center'>
          <div className='flex text-[2rem] font-bold text-[#2b2b2b]'>
            {inquiryNumber}
          </div>
          <Badge
            variant={responseStatus ? 'active' : 'outline'}
            className='ml-[0.5rem]'
          >
            {responseStatus ? '답변 완료' : '답변 대기'}
          </Badge>
          <div className='ml-auto'>
            <button>
              <DetailButton />
            </button>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='inline-flex gap-[1rem]'>
            <div className='text-[1rem] font-semibold text-[#2b2b2b]'>
              상담종류
            </div>
            <div className='text-[1rem] font-normal'>
              {inquiryconsultationType}
            </div>
          </div>
          <div className='ml-auto'>
            <div className='flex items-center text-[1rem] font-bold text-[#2b2b2b]'></div>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <div className='inline-flex gap-[1rem]'>
            <div className='text-[1rem] font-semibold text-[#2b2b2b]'>
              문의제목
            </div>
            <div className='overflow-hidden text-ellipsis whitespace-nowrap text-[1rem] font-normal text-[#2b2b2b]'>
              {consultationTitle}
            </div>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <div className='inline-flex gap-[1rem] overflow-hidden text-ellipsis whitespace-nowrap'>
            <div className='text-[1rem] font-semibold text-[#2b2b2b]'>
              문의내용
            </div>
            <div className='overflow-hidden text-ellipsis whitespace-nowrap text-[1rem] font-normal text-[#2b2b2b]'>
              {consultationContents}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryList;
