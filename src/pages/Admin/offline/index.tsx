import InfoCard from '@/components/Admin/Infocard';
import WaitingNumber from '@/components/Admin/WaitingNum';
import { useState, useEffect } from 'react';
// import CallInfoBox from '@/components/Admin/main/CallInfoBox';
import { getVisitStatus } from '@/api/admin/visit';
import useUpdateVisitStatusMutation from '@/hooks/mutation/admin/useUpdateVisitStatus';
import { AdminVisitStatusUpdateResponse } from '@/types/Visit';
import Next from '../../../components/Admin/Next';

const ROTATE_ANGLE = 45;
const SECTION_ID = 5;

function VisitPage() {
  // const [selectedIdx, setSelectedIdx] = useState(123);
  const [numbers, setNumbers] = useState<number[]>(Array(8).fill(0));
  const [angle, setAngle] = useState(0);
  const [displayNum, setDisplayNum] = useState([7, 0, 1]);
  const [waitingInfo, setWaitingInfo] =
    useState<AdminVisitStatusUpdateResponse | null>(null);

  const updateVisitMutation = useUpdateVisitStatusMutation();

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
      setWaitingInfo(response); // 응답으로 waitingInfo 업데이트

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
      console.log(angle);

      setDisplayNum((prevDisplay) =>
        prevDisplay.map((num) => (num + 1 > 7 ? 0 : num + 1))
      );
    } catch (error) {
      console.error('다음 번호 호출 실패:', error);
    }
  };

  useEffect(() => {
    const fetchInitialStatus = async () => {
      try {
        console.log('초기 상태 조회 시작 - SECTION_ID:', SECTION_ID);
        const response = await getVisitStatus(SECTION_ID);
        console.log('초기 대기 현황 응답:', response);

        if (!response) {
          console.log('응답이 없습니다.');
          return;
        }

        console.log('waitingInfo 설정:', response);
        setWaitingInfo(response);

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
    };

    console.log('VisitPage 마운트');
    fetchInitialStatus();
  }, []);

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
          />
        </div>

        <InfoCard
          waitingCount={waitingInfo?.section_info.wait_amount || 0}
          estimatedTime={waitingInfo?.section_info.wait_time || 0}
          todayVisitors={waitingInfo?.section_info.today_visitors || 0}
        />
      </div>

      <div className='w-full rounded-[.9375rem] shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]'>
        {/* <CallInfoBox
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
          toggleOpen={() => {}}
        /> */}
      </div>
    </div>
  );
}

export default VisitPage;
