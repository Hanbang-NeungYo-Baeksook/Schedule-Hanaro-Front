import { cn } from '@/lib/utils';
import { useState } from 'react';
import CallInfoBox from './CallInfoBox';
import CallMemoForm from './CallMemoForm';
import CurrentBox from './CurrentBox';
import WaitingList from './WaitingList';

function CallContainer() {
  const [selectedIdx, setSelectedIdx] = useState(123);
  const [openCallMemo, setOpenCallMemo] = useState(false);
  const toggleOpenCallMemo = () => setOpenCallMemo((prev) => !prev);

  return (
    <div className='mx-auto w-full space-y-5 text-left'>
      <span className='text-2xl font-bold'>전화 문의</span>
      <div className='flex w-full items-stretch gap-5'>
        <div className='flex w-[70%] flex-grow items-stretch gap-3 bg-[#F2F2F2] p-3'>
          <WaitingList
            selectedIdx={selectedIdx}
            setSelectedIdx={setSelectedIdx}
          />
          <div className='w-[65%]'>
            <CallInfoBox
              selectedIdx={selectedIdx}
              setSelectedIdx={setSelectedIdx}
              toggleOpen={toggleOpenCallMemo}
            />
          </div>
        </div>
        <CurrentBox />
      </div>
      <div
        className={cn(
          'w-full transform transition-all duration-500',
          openCallMemo ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <CallMemoForm
        // callId={selectedIdx}
        />
      </div>
    </div>
  );
}

export default CallContainer;
