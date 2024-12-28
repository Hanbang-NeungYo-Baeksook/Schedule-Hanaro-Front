import DetailCustomerInfo from '@/components/Admin/Inquiry/DetailCustomerInfo';
import LoadingBasic from '@/components/Loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ADMIN_ROUTE } from '@/constants/route';
import useGetInquiryDetail from '@/hooks/query/admin/useGetInquiryDetail';
import usePostInquiryReply from '@/hooks/query/admin/usePostInquiryReply';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function AnswerInput() {
  const replyRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { id: inquiryId } = useParams<{ id: string }>();

  const { data: inquiryData, isLoading } = useGetInquiryDetail(
    +(inquiryId ?? 1)
  );
  const { mutate: postReply } = usePostInquiryReply();

  if (isLoading || !inquiryData) {
    // return (
    //   <div className='z-10 flex items-center space-x-4'>
    //     <Skeleton className='h-12 w-12 rounded-full bg-[#F2F2F2]' />
    //     <div className='w-full space-y-2'>
    //       <Skeleton className='h-4 w-full bg-[#F2F2F2]' />
    //       <Skeleton className='h-4 w-[80%] bg-[#F2F2F2]' />
    //     </div>
    //   </div>
    // );
    return <LoadingBasic />;
  }

  const {
    customer_name,
    phone_number,
    category,
    tags,
    inquiry_content,
    inquiry_created_at,
  } = inquiryData;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!replyRef?.current?.value) {
      alert('답변을 입력하세요');
      return;
    }

    const body = {
      content: replyRef.current.value,
    };

    postReply({ inquiryId: +(inquiryId ?? 1), body });
  };

  const handleCancel = () => {
    navigate(ADMIN_ROUTE.online.inquiry);
  };

  return (
    <div className='mx-auto w-full max-w-[1300px]'>
      {/* 고객 정보 컴포넌트 */}
      <DetailCustomerInfo
        name={customer_name}
        phoneNumber={phone_number}
        start_time={
          inquiry_created_at
            ? dayjs(inquiry_created_at).format('MM월 DD일 HH시 mm분')
            : ''
        }
        // end_time={format(new Date(inquiry_created_at), 'MM월 dd일 HH시 mm분')}
      />

      {/* 하얀색 상자 내부 */}
      <form
        onSubmit={handleSubmit}
        className='h-[calc(100vh-14rem)] w-full rounded-[1.875rem] bg-white p-[1.5rem] shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]'
      >
        {/* 문의 정보 */}
        <div className='mb-[1rem] flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <span className='text-left text-[1.5rem] font-bold text-[#464646]'>
              문의 내용
            </span>
            <Badge
              variant='lightSolid'
              className='rounded-full bg-teal-50 px-3 py-0.5 text-[1rem] font-normal text-teal-600'
            >
              {category}
            </Badge>
          </div>
        </div>
        <hr />
        <div className='mt-[1rem] flex items-center'>
          <p className='font-semibold text-gray-800'>
            {Array.isArray(inquiryData.tags) &&
              tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant='lightSolid'
                  className={`mr-2 h-[1.8rem] w-auto justify-center rounded-full bg-gray-500 px-3 py-0.5 text-sm font-medium text-white`}
                >
                  {'#' + tag}
                </Badge>
              ))}
          </p>
        </div>
        <div className='overflow-wrap break-word mb-[1rem] mt-[1rem] flex flex-wrap whitespace-pre-wrap text-left text-[1.2rem] font-medium text-[#666666]'>
          {inquiry_content}
        </div>

        {/* 답변 입력 */}
        <div className='mb-[0.5rem] mt-[2.6rem] text-left text-[1.5rem] font-bold text-[#464646]'>
          답변 입력
        </div>
        <Textarea
          className='mt-[1rem] h-[55%] w-full resize-none rounded-[1.875rem] border border-[#d9d9d9] p-[1rem] text-[1.2rem]'
          placeholder='답변을 입력하세요...'
          ref={replyRef}
          aria-label='답변 입력'
        />
        <div className='mt-[1rem] flex justify-end'>
          <Button
            className='inline-flex h-[3rem] w-[12rem] items-center justify-center gap-[0.625rem] rounded-[1.25rem] bg-white px-[3.8125rem] py-[0.625rem] shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] hover:bg-[#F8F8F8]'
            onClick={handleCancel}
            type='button'
          >
            <div className="font-['Inter'] text-[1.2rem] font-bold text-[#464646]">
              취소
            </div>
          </Button>
          <Button
            type='submit'
            className='ml-[1rem] inline-flex h-[3rem] w-[12rem] items-center justify-center gap-[0.625rem] rounded-[1.25rem] bg-[#464646] px-[3.8125rem] py-[0.625rem] shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] hover:bg-[#343434]'
          >
            <div className="font-['Inter'] text-[1.2rem] font-bold text-white">
              등록
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
}
