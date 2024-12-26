import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import useGetCallWaitListQuery from '@/hooks/query/admin/useGetCallWaitList';
import usePatchCallProgress from '@/hooks/query/admin/usePatchCallProgress';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import CallInfoBox from './CallInfoBox';
import CallMemoForm from './CallMemoForm';
import CallTimeSelector from './CallTimeSelector';
import CurrentBox from './CurrentBox';
import WaitingList from './WaitingList';

function CallContainer() {
  const [openCallMemo, setOpenCallMemo] = useState(false);
  const toggleOpenCallMemo = () => setOpenCallMemo((prev) => !prev);
  const closeCallMemo = () => setOpenCallMemo(false);

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const changeIdx = (idx: number) => setSelectedIdx(idx);

  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);
  const [timeValue, setTimeValue] = useState<string | undefined>(undefined);

  const { data: waits } = useGetCallWaitListQuery({
    date: dateValue && dayjs(dateValue).format('YYYY-MM-DD'),
    time: timeValue && timeValue?.split('~')[0],
  });
  const { mutate: patchStart } = usePatchCallProgress();

  // Web socket
  const webSocket = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    webSocket.current = new WebSocket('ws://localhost:8080/ws/test');
    webSocket.current.onopen = () => {
      console.log('WebSocket 연결!');
    };
    webSocket.current.onclose = (error) => {
      console.log(error);
    };
    webSocket.current.onerror = (error) => {
      console.log(error);
    };
    webSocket.current.onmessage = (event: MessageEvent) => {
      console.log(event);
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.CALL_WAIT_LIST],
      });
    };

    return () => {
      webSocket.current?.close();
    };
  }, [queryClient]);

  useEffect(() => {
    if (waits) {
      const newIdx =
        waits.progress?.waiting_num ?? waits.waiting?.[0]?.waiting_num ?? null;
      setSelectedIdx(newIdx);
    }
  }, [waits]);

  if (!waits || !waits.waiting) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  const startCoun = () => patchStart();

  return (
    <div className='mx-auto w-full space-y-5 text-left'>
      <div className='flex w-full items-center justify-between'>
        <span className='text-2xl font-bold'>전화 문의</span>
      </div>

      <div className='flex w-full items-center justify-between'>
        <CallTimeSelector
          dateValue={dateValue}
          setDateValue={setDateValue}
          timeValue={timeValue}
          setTimeValue={setTimeValue}
        />
        {!waits.progress && (
          <Button
            className='w-fit rounded-[20px] bg-gray-800 px-10 py-2 text-white hover:bg-gray-700'
            onClick={startCoun}
          >
            상담 시작
          </Button>
        )}
      </div>

      <div className='flex w-full items-stretch space-x-5'>
        <div className='flex w-[70%] flex-grow items-stretch gap-3 bg-[#F2F2F2] p-3'>
          <WaitingList
            selectedIdx={selectedIdx ?? -1}
            changeIdx={changeIdx}
            progress={waits?.progress}
            waiting={waits.waiting}
          />
          <div className='w-[65%]'>
            <CallInfoBox
              changeIdx={changeIdx}
              toggleOpen={toggleOpenCallMemo}
              currentIdx={waits?.progress?.waiting_num ?? -1}
              selectedCall={
                selectedIdx === waits?.progress?.waiting_num
                  ? waits?.progress
                  : waits?.waiting.find(
                      ({ waiting_num }) => waiting_num === selectedIdx
                    )
              }
            />
          </div>
        </div>
        {waits.progress ? (
          <CurrentBox progress={waits.progress} toggleOpen={closeCallMemo} />
        ) : null}
      </div>
      <div
        className={cn(
          'w-full transform transition-all duration-500',
          openCallMemo ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        {waits?.progress?.memo ? (
          <div className='flex w-full flex-col space-y-5 bg-[#F2F2F2] p-6'>
            <span className='font-bold text-lightText'>상담 내용</span>
            <div className='w-full rounded-xl bg-[#F9F9F9] p-5 text-[1.25rem]'>
              {waits?.progress?.memo}
            </div>
            <div className='flex w-full justify-end'>
              <Button
                className='w-fit rounded-full bg-lightText px-10 hover:bg-[#202020]'
                onClick={toggleOpenCallMemo}
              >
                닫기
              </Button>
            </div>
          </div>
        ) : (
          <CallMemoForm
            callId={waits?.progress?.id ?? -1}
            toggleOpenCallMemo={toggleOpenCallMemo}
          />
        )}
      </div>
    </div>
  );
}

export default CallContainer;
