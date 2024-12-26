import arrowLeft from '@/assets/icons/arrow_left.svg';
import DetailCustomerInfo from '@/components/Admin/Inquiry/DetailCustomerInfo';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import useGetCallDetail from '@/hooks/query/admin/useGetCallDetail';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';

export function CallAnswerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: detailData } = useGetCallDetail(+(id ?? 1));

  if (!detailData) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  const {
    content,
    category,
    tags,
    mobile: phone_number,
    // call_id,
    // call_at,
    started_at,
    ended_at,
    customer_name: name,
    reply_content,
  } = detailData;
  return (
    <div className='mx-auto h-[90%] max-w-[1300px]'>
      <button
        className='mb-[1rem] mt-4 flex items-center text-gray-600 hover:text-gray-800'
        onClick={() => navigate(-1)}
      >
        <span className='mr-[0.1rem] flex justify-center text-[1.2rem]'>
          <img src={arrowLeft} alt='점' className='h-[0.825rem] w-full' />
        </span>
        <span className='text-[1.2rem] font-bold text-[#464646]'>뒤로가기</span>
      </button>
      <DetailCustomerInfo
        name={name}
        phoneNumber={phone_number}
        start_time={
          started_at ? format(new Date(started_at), 'MM월 dd일 HH시 mm분') : ''
        }
        end_time={
          ended_at ? format(new Date(ended_at), 'MM월 dd일 HH시 mm분') : ''
        }
      />
      <div className='mx-auto h-[85%] rounded-[1.875rem] bg-white p-[1.5rem] shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]'>
        <div className='overflow-wrap break-word mb-3 text-left text-[1.5rem] font-bold text-[#464646]'>
          문의 내용
          <Badge
            variant='lightSolid'
            className='ml-4 rounded-full bg-teal-50 px-3 py-0.5 align-middle text-[1rem] font-light text-teal-600'
          >
            {category}
          </Badge>
        </div>
        <hr />
        <div className='mt-[1rem] flex items-center'>
          <p className='font-semibold text-gray-800'>
            {/* TODO: 태그 파싱 */}
            {/* {Array.isArray(tags) &&
              inquiryData.tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant='lightSolid'
                  className={`mr-2 h-[1.8rem] w-auto justify-center rounded-full bg-gray-500 px-3 py-0.5 text-sm font-medium text-white`}
                >
                  {'#' + tag}
                </Badge>
              ))} */}
            {tags}
          </p>
        </div>

        <div className='overflow-wrap break-word mb-[1rem] mt-[1rem] flex flex-wrap whitespace-pre-wrap text-left text-[1.2rem] font-medium text-[#666666]'>
          {content}
        </div>

        <div className='mb-[0.5rem] mt-[3rem] text-left text-[1.5rem] font-bold text-[#464646]'>
          답변 내용
        </div>
        <hr />
        <div className='overflow-wrap break-word whitespace-pre-wraptext-left mb-[1rem] mt-[1rem] flex flex-wrap text-left text-[1rem] font-medium text-[#666666]'>
          {reply_content}
        </div>
      </div>
    </div>
  );
}
