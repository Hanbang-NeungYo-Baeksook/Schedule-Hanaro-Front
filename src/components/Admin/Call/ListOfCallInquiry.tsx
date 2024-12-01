import { Badge } from '@/components/ui/badge'; // Badge 컴포넌트 import
import { useNavigate } from 'react-router-dom'; // 상세보기 이동을 위해 useNavigate 사용
import rightArrow from '../../../assets/icons/right_arrow.svg';
import { CallDetail } from '@/types/callDetail';

type ListOfCallInquiryProps = {
  inquiries: CallDetail[];
};

function ListOfCallInquiry({ inquiries }: ListOfCallInquiryProps) {
  const navigate = useNavigate();

  return (
    <div className='mx-auto w-full max-w-[1300px] rounded-lg border-gray-200 bg-white p-6 text-[1.25rem] font-bold leading-normal shadow-custom'>
      {/* 상단 영역 */}
      <div className='font-inter mb-1 flex items-center justify-between border-b pb-4 font-normal leading-normal'>
        <h2 className='text-[1.125rem] font-bold text-gray-800'>
          총{' '}
          <span className='text-[1.4rem] font-extrabold text-teal-600'>
            {inquiries.length}
          </span>{' '}
          건
        </h2>
      </div>

      {/* 리스트 영역 */}
      <ul>
        {inquiries.map(({ call_id, inquiry_content, category }, index) => (
          <li
            key={call_id}
            className='font-inter flex items-center justify-between border-b py-6 font-normal leading-normal'
          >
            <div className='flex items-center space-x-2'>
              <span className='ml-5 mr-5 font-medium text-gray-700'>
                {index + 1}
              </span>
              <span className='font-semibold text-gray-800'>
                {inquiry_content.length <= 15
                  ? inquiry_content
                  : `${inquiry_content.substring(0, 15)}...`}
              </span>
              <Badge
                variant='lightSolid'
                className='font-inter h-[1.8rem] w-auto justify-center rounded-full bg-teal-50 px-4 py-0.5 text-[0.8rem] font-normal leading-normal text-teal-600'
              >
                {category}
              </Badge>
            </div>
            <button
              className='mr-5 flex items-center text-[0.875rem] font-normal text-black'
              onClick={() => navigate(`/admin/online/call/${call_id}`)}
            >
              상세보기
              <img src={rightArrow} alt='Go' className='ml-0 inline-block' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListOfCallInquiry;
