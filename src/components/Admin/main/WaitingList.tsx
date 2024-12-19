import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mockCallData } from '@/mock/adminInquiry';
import { useState } from 'react';
import WaitingBox from './WaitingBox';

export type CallProps = {
  selectedIdx: number;
  setSelectedIdx: React.Dispatch<React.SetStateAction<number>>;
};
function WaitingList({ selectedIdx, setSelectedIdx }: CallProps) {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const toggleShowDetail = () => setIsShowDetail((prev) => !prev);
  const nowData = mockCallData.filter(({ now }) => now)[0];
  return (
    <div className='w-[35%] rounded-[30px] bg-white pt-5'>
      <div className='mx-auto flex w-[90%] items-center justify-between'>
        <span className='text-[1.125rem] font-medium'>대기목록</span>
        <span className='text-[0.8725rem] font-medium'>
          <span className='text-[1.125rem] font-bold'>
            {mockCallData.length - 1}
          </span>
          명 대기중
        </span>
      </div>
      <div className='pt-5 text-center'>
        <span className='text-[0.875rem]'>현재 진행 중</span>
        <div
          className='border-t-[1px] border-[#D9D9D9]'
          onClick={() => setSelectedIdx(nowData.waitingNum)}
        >
          <WaitingBox
            isSelected={selectedIdx === nowData.waitingNum}
            waitingNum={nowData.waitingNum}
            category={nowData.category}
            content={nowData.content}
            userName={nowData.userName}
            resTime={nowData.resTime}
          />
        </div>
      </div>
      <div className='pt-8 text-center text-[0.875rem]'>
        <span className='pt-3 text-[0.875rem]'>대기중</span>
        <ul
          className={cn(
            'flex flex-col border-t-[1px] border-[#D9D9D9]',
            isShowDetail && 'max-h-[361px] overflow-y-auto scrollbar-hide'
          )}
        >
          {isShowDetail ? (
            <>
              {mockCallData
                .filter(({ now }) => !now)
                .map(({ waitingNum, category, content, userName, resTime }) => (
                  <li
                    key={waitingNum}
                    onClick={() => setSelectedIdx(waitingNum)}
                  >
                    <WaitingBox
                      isSelected={selectedIdx === waitingNum}
                      waitingNum={waitingNum}
                      category={category}
                      content={content}
                      userName={userName}
                      resTime={resTime}
                    />
                  </li>
                ))}
            </>
          ) : (
            <>
              {mockCallData
                .filter(({ now }, idx) => !now && idx < 7)
                .map(({ waitingNum, category, content, userName, resTime }) => (
                  <li
                    key={waitingNum}
                    onClick={() => setSelectedIdx(waitingNum)}
                  >
                    <WaitingBox
                      isSelected={selectedIdx === waitingNum}
                      waitingNum={waitingNum}
                      category={category}
                      content={content}
                      userName={userName}
                      resTime={resTime}
                    />
                  </li>
                ))}
            </>
          )}
        </ul>
      </div>
      <div className='mb-5 mt-2 text-center'>
        {!isShowDetail && (
          <Button
            variant='secondary'
            className='w-fit'
            onClick={toggleShowDetail}
          >
            더보기
          </Button>
        )}
      </div>
    </div>
  );
}

export default WaitingList;
