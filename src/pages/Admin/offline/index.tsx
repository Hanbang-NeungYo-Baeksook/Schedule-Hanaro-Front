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
const SECTION_ID = 5;

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

  const fetchInitialStatus = useCallback(async () => {
    try {
      console.log('초기 상태 조회 시작 - SECTION_ID:', SECTION_ID);
      const response = await getVisitStatus(SECTION_ID);
      console.log('초기 대기 현황 응답:', response);

      if (!response) {
        console.log('응답이 없습니다.');
        return;
      }

      setWaitingInfo(response);
      setSelectedIdx(response.current_num);

      const updatedNumbers = Array(8).fill(0);
      displayNum.forEach((index, i) => {
        if (i === 0) updatedNumbers[index] = response.previous_num;
        if (i === 1) updatedNumbers[index] = response.current_num;
        if (i === 2) updatedNumbers[index] = response.next_num;
      });

      setNumbers(updatedNumbers);
    } catch (error) {
      console.error('초기 대기 현황 조회 실패:', error);
    }
  }, [displayNum]);

  const handleNext = async () => {
    try {
      console.log('다음 버튼 클릭, waitingInfo:', waitingInfo);
      if (!waitingInfo?.next_num) {
        console.log(
          '현재 대기중인 방문이 없습니다. next_num:',
          waitingInfo?.next_num
        );
        return;
      }

      const response = await updateVisitMutation.mutateAsync(
        waitingInfo.next_num
      );
      console.log('다음 번호 호출 결과:', response);

      setSelectedIdx(response.current_num);
      setWaitingInfo(response);

      setNumbers(() => {
        const updatedNumbers = Array(8).fill(0);
        const newDisplayNum = displayNum.map((num) =>
          num + 1 > 7 ? 0 : num + 1
        );

        newDisplayNum.forEach((index, i) => {
          if (i === 0) updatedNumbers[index] = response.previous_num;
          if (i === 1) updatedNumbers[index] = response.current_num;
          if (i === 2) updatedNumbers[index] = response.next_num;
        });

        return updatedNumbers;
      });

      setAngle((prevAngle) => prevAngle + ROTATE_ANGLE);
      setDisplayNum((prevDisplay) =>
        prevDisplay.map((num) => (num + 1 > 7 ? 0 : num + 1))
      );
    } catch (error) {
      console.error('다음 번호 호출 실패:', error);
    }
  };

  const handleWebSocketMessage = useCallback(
    (message: { type: 'UPDATE_NEEDED'; topicId: number }) => {
      console.log('웹소켓 메시지 수신 - 상태 업데이트 필요:', message);

      // 해당 섹션의 상태 업데이트가 필요한 경우에만 처리
      if (message.type === 'UPDATE_NEEDED' && message.topicId === SECTION_ID) {
        console.log(`섹션 ${SECTION_ID}의 상태 업데이트 시작`);
        void fetchInitialStatus();
      }
    },
    [fetchInitialStatus]
  );

  const { isConnected } = useWebSocket(
    SECTION_ID,
    'VISIT',
    handleWebSocketMessage
  );

  // 초기 로드와 웹소켓 연결 상태 변경 시에만 실행
  useEffect(() => {
    console.log('방문 페이지 마운트, 웹소켓 연결 상태:', isConnected);
    void fetchInitialStatus();
  }, [isConnected, fetchInitialStatus]);

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
      console.log(...newNumbers);
    }
  }, [waitingInfo, displayNum]);

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
                  waiting_num: waitingInfo?.current_num || 0,
                  category: visitDetail.category,
                  tags: visitDetail.tags,
                  content: visitDetail.content,
                  memo: '',
                  reservation_time: new Date().toISOString(),
                }
              : undefined
          }
          currentIdx={waitingInfo?.current_num || 0}
          changeIdx={setSelectedIdx}
          toggleOpen={() => {}}
        />
      </div>
    </div>
  );
}

export default VisitPage;
