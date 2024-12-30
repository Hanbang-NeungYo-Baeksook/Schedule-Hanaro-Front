import { getCallWaitList } from '@/api/admin/calls';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import useGetCallWaitListQuery from '@/hooks/query/admin/useGetCallWaitList';
import usePatchCallProgress from '@/hooks/query/admin/usePatchCallProgress';
import { useWebSocket } from '@/hooks/useWebSocket';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import CallInfoBox from './CallInfoBox';
import CallMemoForm from './CallMemoForm';
import CallTimeSelector from './CallTimeSelector';
import CurrentBox from './CurrentBox';
import WaitingList from './WaitingList';

function CallContainer() {
  const [openCallMemo, setOpenCallMemo] = useState(false);
  const toggleOpenCallMemo = () => setOpenCallMemo((prev) => !prev);
  const closeCallMemo = () => setOpenCallMemo(false);
  const queryClient = useQueryClient();

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const changeIdx = (idx: number) => setSelectedIdx(idx);

  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);
  const [timeValue, setTimeValue] = useState<string | undefined>(undefined);

  const { data: waits, refetch } = useGetCallWaitListQuery({
    date: dateValue && dayjs(dateValue).format('YYYY-MM-DD'),
    time: timeValue !== '전체 시간대' ? timeValue?.split('~')[0] : undefined,
  });
  const { mutate: patchStart } = usePatchCallProgress();

  // const refetchList = useCallback(() => {
  //   queryClient.invalidateQueries({
  //     queryKey: [ADMIN_QUERY_KEYS.CALL_WAIT_LIST],
  //   });
  // }, [refetch]);

  const handleWebSocketMessage = useCallback(
    (message: { type: 'UPDATE_NEEDED'; topicId: number }) => {
      console.log('웹소켓 메시지 수신 - 상태 업데이트 필요:', message);

      refetch();
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.CALL_WAIT_LIST],
      });
      getCallWaitList({
        date: dateValue && dayjs(dateValue).format('YYYY-MM-DD'),
        time:
          timeValue !== '전체 시간대' ? timeValue?.split('~')[0] : undefined,
      });
    },
    [dateValue, queryClient, refetch, timeValue]
  );

  const { isConnected } = useWebSocket(1, 'CALL', handleWebSocketMessage);

  useEffect(() => {
    console.debug('전화 페이지 마운트, 웹소켓 연결 상태:', isConnected);
    refetch();
    queryClient.invalidateQueries({
      queryKey: [ADMIN_QUERY_KEYS.CALL_WAIT_LIST],
    });
  }, [isConnected, queryClient, refetch]);

  useEffect(() => {
    if (waits) {
      const newIdx = waits.progress?.id ?? waits.waiting?.[0]?.id ?? null;
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
              currentIdx={waits?.progress?.id ?? -1}
              selectedCall={
                selectedIdx === waits?.progress?.id
                  ? waits?.progress
                  : waits?.waiting.find(({ id }) => id === selectedIdx)
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
