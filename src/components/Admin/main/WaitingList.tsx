import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AdminCallData } from '@/types/Call';
import { useState } from 'react';
import WaitingBox from './WaitingBox';

export type CallProps = {
  selectedIdx: number;
  changeIdx: (idx: number) => void;
  progress: AdminCallData;
  waiting: AdminCallData[];
};
function WaitingList({ selectedIdx, changeIdx, progress, waiting }: CallProps) {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const toggleShowDetail = () => setIsShowDetail((prev) => !prev);

  return (
    <div className='w-[35%] rounded-[30px] bg-white pt-5'>
      <div className='mx-auto flex w-[90%] items-center justify-between'>
        <span className='text-[1.125rem] font-medium'>대기목록</span>
        <span className='text-[0.8725rem] font-medium'>
          <span className='mr-1 text-[1.125rem] font-bold'>
            {waiting?.length - 1 >= 0 ? waiting?.length - 1 : 0}
          </span>
          명 대기중
        </span>
      </div>
      <div className='py-2 text-center'>
        <span className='mb-3 text-[1rem]'>현재 진행 중</span>
        {progress ? (
          <div
            className='border-t-[1px] border-[#D9D9D9]'
            onClick={() => changeIdx(progress.waiting_num)}
          >
            <WaitingBox
              isSelected={selectedIdx === progress.waiting_num}
              waitingNum={progress.waiting_num}
              category={progress.category}
              content={progress.content}
              resTime={progress.reservation_time}
            />
          </div>
        ) : (
          <div className='mt-2 flex h-[60px] w-full cursor-pointer flex-col items-center justify-center border-y-[1px] border-[#D9D9D9] bg-[#FAFAFA] px-5 py-2 text-center'>
            <span className='text-lightGrey'>진행 중인 상담이 없습니다.</span>
          </div>
        )}
      </div>
      <div className='pt-8 text-center text-[0.875rem]'>
        <span className='mb-3 text-[1rem]'>대기중</span>
        <ul
          className={cn(
            'flex h-[361px] flex-col border-y-[1px] border-[#D9D9D9] bg-[#FAFAFA]',
            isShowDetail && 'max-h-[361px] overflow-y-auto scrollbar-hide'
          )}
        >
          {waiting?.length ? (
            <>
              {(isShowDetail ? waiting : waiting.slice(0, 6)).map(
                ({ waiting_num, category, content, reservation_time }) => (
                  <li key={waiting_num} onClick={() => changeIdx(waiting_num)}>
                    <WaitingBox
                      isSelected={selectedIdx === waiting_num}
                      waitingNum={waiting_num}
                      category={category}
                      content={content}
                      resTime={reservation_time}
                    />
                  </li>
                )
              )}
            </>
          ) : (
            <div className='mt-2 flex h-full w-full items-center justify-center bg-[#FAFAFA] text-center'>
              <span className='text-[1rem] text-lightGrey'>
                대기 중인 상담이 없습니다.
              </span>
            </div>
          )}
        </ul>
      </div>
      <div className='mb-5 mt-2 text-center'>
        {!isShowDetail && waiting?.length > 6 ? (
          <Button
            variant='secondary'
            className='w-fit'
            onClick={toggleShowDetail}
          >
            더보기
          </Button>
        ) : (
          <div className='h-12 w-full'></div>
        )}
      </div>
    </div>
  );
}

export default WaitingList;
