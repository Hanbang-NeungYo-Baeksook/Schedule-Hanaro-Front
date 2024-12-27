import { Badge } from '@/components/ui/badge'; // Badge 컴포넌트 import
import { AdminHistoryData } from '@/types/Call';
import { useNavigate } from 'react-router-dom'; // 상세보기 이동을 위해 useNavigate 사용
import rightArrow from '../../../assets/icons/right_arrow.svg';

function ListOfCallInquiry({
  calls,
  currentPage,
}: {
  calls: AdminHistoryData[];
  currentPage: number;
}) {
  const navigate = useNavigate();

  return (
    <div className='mx-auto w-full max-w-[1300px] rounded-lg border-gray-200 bg-white p-6 text-[1.25rem] font-bold leading-normal shadow-custom'>
      <div className='font-inter mb-1 flex items-center justify-between border-b pb-4 font-normal leading-normal'>
        <h2 className='text-[1.125rem] font-bold text-gray-800'>
          총{' '}
          <span className='text-[1.4rem] font-extrabold text-teal-600'>
            {calls.length}
          </span>{' '}
          건
        </h2>
      </div>

      <ul>
        {calls.map(({ id, content, category }, index) => (
          <li
            key={id}
            className='font-inter flex items-center justify-between border-b py-6 font-normal leading-normal'
          >
            <div className='flex items-center space-x-2'>
              <span className='ml-5 mr-5 font-medium text-gray-700'>
                {(currentPage - 1) + index + 1}
              </span>
              <span className='font-semibold text-gray-800'>
                {content.length <= 15
                  ? content
                  : `${content.substring(0, 15)}...`}
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
              onClick={() => navigate(`/admin/online/call/${id}`)}
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
