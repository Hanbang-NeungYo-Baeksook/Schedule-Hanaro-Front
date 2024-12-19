import { Button } from '@/components/ui/button';

function CurrentBox() {
  return (
    <div className='z-10 flex w-[30%] flex-col items-center justify-center'>
      <div className='relative z-10 h-[50%] w-full max-w-md bg-lightGrey px-4 pt-10'>
        <div className='z-30 mb-6 text-center text-white'>
          <p className='text-sm font-semibold'>현재 순번 고객</p>
          <h1 className='text-4xl font-bold'>123번</h1>
        </div>

        <div className='z-30 mb-6 space-y-2 rounded-[30px] bg-white px-4 py-6 shadow-[0px_4px_10px_5px_rgba(0,0,0,0.1)]'>
          <p className='flex items-center justify-between text-sm'>
            <span className='font-regular font-[0.75rem] text-lightGrey'>
              고객명
            </span>
            <span>문해빈</span>
          </p>
          <p className='flex items-center justify-between text-sm'>
            <span className='font-regular font-[0.75rem] text-lightGrey'>
              이메일
            </span>
            <span>asdf@naver.com</span>
          </p>
          <p className='flex items-center justify-between text-sm'>
            <span className='font-regular font-[0.75rem] text-lightGrey'>
              전화번호
            </span>
            <span>010-1111-2222</span>
          </p>
          <p className='flex items-center justify-between text-sm'>
            <span className='font-regular font-[0.75rem] text-lightGrey'>
              생년월일
            </span>
            <span>1970년 08월 11일</span>
          </p>
        </div>
      </div>

      <div className='relative z-10 flex h-[58%] w-full max-w-md flex-col justify-between rounded-lg bg-[#fafafa] p-4'>
        <div>
          <p className='mb-2 mt-2'>
            <span className='mr-3 text-[0.875rem] font-bold text-black'>
              상담정보
            </span>
            <span className='text-[0.75rem] font-bold text-main'>
              23<span className='text-[0.625rem]'>분째 진행 중</span>
            </span>
          </p>
          <div className='mb-4 space-y-2 rounded-[10px] border-[0.5px] border-border bg-[#fff] p-4'>
            <p className='flex items-center justify-between text-sm'>
              <span className='font-regular font-[0.75rem] text-lightGrey'>
                예정 시작 시간
              </span>
              <span>12:00</span>
            </p>
            <p className='flex items-center justify-between text-sm'>
              <span className='font-regular font-[0.75rem] text-lightGrey'>
                실제 시작 시간
              </span>
              <span>12:13</span>
            </p>
          </div>

          <p className='mb-2 text-[0.875rem] font-bold text-main'>
            <span className='mr-3 text-black'>상담이력</span>
          </p>
          <div className='mb-4 space-y-2 rounded-[10px] border-[0.5px] border-border bg-[#fff] p-4'>
            <p className='flex items-center justify-between text-sm'>
              <span className='font-regular font-[0.75rem] text-lightGrey'>
                전화문의
              </span>
              <span>2회</span>
            </p>
            <p className='flex items-center justify-between text-sm'>
              <span className='font-regular font-[0.75rem] text-lightGrey'>
                1:1 문의
              </span>
              <span>1회</span>
            </p>
          </div>
        </div>

        <Button className='hover w-full rounded-lg bg-gray-800 py-2 text-white hover:bg-gray-700'>
          상담 완료
        </Button>
      </div>
    </div>
  );
}

export default CurrentBox;
