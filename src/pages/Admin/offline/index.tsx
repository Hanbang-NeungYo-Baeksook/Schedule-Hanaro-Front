import InfoCard from '@/components/Admin/Infocard';
import WaitingNumber from '@/components/Admin/WaitingNum';
import { useCallback, useEffect, useState } from 'react';
// import CallInfoBox from '@/components/Admin/main/CallInfoBox';
import { getVisitStatus } from '@/api/admin/visit';
import CallInfoBox from '@/components/Admin/main/CallInfoBox';
import useUpdateVisitStatusMutation from '@/hooks/mutation/admin/useUpdateVisitStatus';
import useGetVisitDetailQuery from '@/hooks/query/admin/useGetVisitDetail';
import { useWebSocket } from '@/hooks/useWebSocket';
import { AdminVisitStatusUpdateResponse } from '@/types/Visit';
import Next from '../../../components/Admin/Next';

const ROTATE_ANGLE = 45;
const SECTION_ID = 7;

function VisitPage() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const { data: visitDetail } = useGetVisitDetailQuery(selectedIdx ?? 0);
  const [numbers, setNumbers] = useState<number[]>(Array(8).fill(0));
  const [categories, setCategories] = useState<string[]>(Array(8).fill(''));
  const [angle, setAngle] = useState(0);
  const [displayNum, setDisplayNum] = useState([7, 0, 1]);
  const [waitingInfo, setWaitingInfo] =
    useState<AdminVisitStatusUpdateResponse | null>(null);

  const updateVisitMutation = useUpdateVisitStatusMutation();

  const fetchInitialData = useCallback(async () => {
    try {
      const initialStatus = await getVisitStatus(SECTION_ID);
      setWaitingInfo(initialStatus);
      setSelectedIdx(initialStatus.current_num);

      // numbers 배열 업데이트
      const updatedNumbers = Array(8).fill(0);
      displayNum.forEach((index, i) => {
        if (i === 0) updatedNumbers[index] = initialStatus.previous_num;
        if (i === 1) updatedNumbers[index] = initialStatus.current_num;
        if (i === 2) updatedNumbers[index] = initialStatus.next_num;
      });
      setNumbers(updatedNumbers);
    } catch (error) {
      console.error('초기 데이터 로드 실패:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SECTION_ID, displayNum]);

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleWebSocketMessage = useCallback(
    async (message: { type: 'UPDATE_NEEDED'; topicId: number }) => {
      console.debug('웹소켓 메시지 수신:', message);

      if (message.type === 'UPDATE_NEEDED' && message.topicId === SECTION_ID) {
        const newStatus = await getVisitStatus(SECTION_ID);
        setWaitingInfo(newStatus);

        // 현재 displayNum 위치 유지하면서 새로운 번호들 업데이트
        const updatedNumbers = Array(8).fill(0);
        displayNum.forEach((index, i) => {
          if (i === 0) updatedNumbers[index] = newStatus.previous_num;
          if (i === 1) updatedNumbers[index] = newStatus.current_num;
          if (i === 2) updatedNumbers[index] = newStatus.next_num;
        });

        setNumbers(updatedNumbers);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [SECTION_ID, displayNum]
  );

  const { isConnected } = useWebSocket(
    SECTION_ID,
    'VISIT',
    handleWebSocketMessage
  );

  const handleNext = async () => {
    try {
      console.debug('다음 버튼 클릭, waitingInfo:', waitingInfo);
      if (!waitingInfo?.next_num) {
        console.debug(
          '현재 대기중인 방문이 없습니다. next_num:',
          waitingInfo?.next_num
        );
        return;
      }

      // 웹소켓 연결 상태 확인
      if (!isConnected) {
        console.warn('웹소켓이 연결되지 않은 상태입니다.');
        return;
      }

      const response = await updateVisitMutation.mutateAsync(
        waitingInfo.next_num
      );
      console.debug('다음 번호 호출 결과:', response);

      // 상태 업데이트를 한 번에 처리
      setWaitingInfo(response);
      setSelectedIdx(response.current_num);

      const newDisplayNum = displayNum.map((num) =>
        num + 1 > 7 ? 0 : num + 1
      );
      setDisplayNum(newDisplayNum);

      const updatedNumbers = Array(8).fill(0);
      newDisplayNum.forEach((index, i) => {
        if (i === 0) updatedNumbers[index] = response.previous_num;
        if (i === 1) updatedNumbers[index] = response.current_num;
        if (i === 2) updatedNumbers[index] = response.next_num;
      });

      setNumbers(updatedNumbers);
      setAngle((prev) => prev + ROTATE_ANGLE);
    } catch (error) {
      console.error('다음 번호 호출 실패:', error);
    }
  };

  // 초소켓 연결 상태 모니터링을 위한 로그 추가
  useEffect(() => {
    console.debug('웹소켓 연결 상태 변경:', isConnected);

    // 연결이 끊어졌다가 다시 연결되는지 확인
    if (!isConnected) {
      console.debug('웹소켓 연결이 끊어짐');
    }
  }, [isConnected]);

  useEffect(() => {
    if (waitingInfo) {
      const newNumbers = [...Array(8).fill(0)];
      const newCategories = [...Array(8).fill('')];

      displayNum.forEach((index, i) => {
        if (i === 0) {
          newNumbers[index] = waitingInfo.previous_num;
          newCategories[index] = waitingInfo.previous_category;
        }
        if (i === 1) {
          newNumbers[index] = waitingInfo.current_num;
          newCategories[index] = waitingInfo.current_category;
        }
        if (i === 2) {
          newNumbers[index] = waitingInfo.next_num;
          newCategories[index] = waitingInfo.next_category;
        }
      });

      setNumbers(newNumbers);
      setCategories(newCategories);
      console.debug(...newNumbers);
    }
  }, [waitingInfo, displayNum]);

  // 수동으로 번호를 선택할 때만 CallInfoBox 업데이트
  const handleSelectNumber = (number: number) => {
    setSelectedIdx(number);
  };

  return (
    <div className='relative mx-auto mt-[6.25rem] flex w-[98%] max-w-[1300px] justify-between'>
      <div className='w-[100%]'>
        <div className='left-[15%] right-[15%]'>
          <Next onClick={handleNext} />
        </div>

        <div className='mb-[3rem] mt-[3rem]'>
          <WaitingNumber
            numbers={numbers}
            angle={angle}
            displayNum={displayNum}
            categories={categories}
          />
        </div>

        <InfoCard
          waitingCount={waitingInfo?.section_info.wait_amount || 0}
          estimatedTime={waitingInfo?.section_info.wait_time || 0}
          todayVisitors={waitingInfo?.section_info.today_visitors || 0}
        />
      </div>

      <div className='w-full rounded-[.9375rem] shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]'>
        <CallInfoBox
          selectedCall={
            visitDetail
              ? {
                  id: visitDetail.visit_id,
                  customer_id: visitDetail.customer_id,
                  waiting_num: selectedIdx || 0,
                  category: visitDetail.category,
                  tags: visitDetail.tags,
                  content: visitDetail.content,
                  memo: '',
                  reservation_time: new Date().toISOString(),
                }
              : undefined
          }
          currentIdx={selectedIdx || 0}
          changeIdx={handleSelectNumber}
          toggleOpen={() => {}}
        />
      </div>
    </div>
  );
}

export default VisitPage;
