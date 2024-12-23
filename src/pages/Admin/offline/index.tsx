import InfoCard from '@/components/Admin/Infocard';
import WaitingNumber from '@/components/Admin/WaitingNum';
import { useState, useEffect } from 'react';
// import CallInfoBox from '@/components/Admin/main/CallInfoBox';
import apiCall from '@/api/Api';
import Next from '../../../components/Admin/Next';

const ROTATE_ANGLE = 45;
const SECTION_ID = 5;

interface WaitingData {
  waitingCount: number;
  estimatedTime: number;
  todayVisitors: number;
  waitingNumbers: number[];
}

function VisitPage() {
  // const [selectedIdx, setSelectedIdx] = useState(123);
  const [numbers, setNumbers] = useState<number[]>(Array(8).fill(0));
  const [angle, setAngle] = useState(0);
  const [displayNum, setDisplayNum] = useState([7, 0, 1]);
  const [waitingInfo, setWaitingInfo] = useState<WaitingData | null>(null);

  const fetchWaitingStatus = async () => {
    try {
      const response = await apiCall.get(
        `/admin/api/visits/${SECTION_ID}/status`
      );
      console.log('대기 현황:', response);
      setWaitingInfo(response);

      // displayNum의 현재 인덱스에 맞춰 번호 배치
      const updatedNumbers = Array(8).fill(0);
      displayNum.forEach((index, i) => {
        if (i === 0) updatedNumbers[index] = response.previousNum;
        if (i === 1) updatedNumbers[index] = response.currentNum;
        if (i === 2) updatedNumbers[index] = response.nextNum;
      });

      setNumbers(updatedNumbers);
    } catch (error) {
      console.error('대기 현황 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchWaitingStatus();

    // 선택적: 주기적으로 데이터 갱신
    const interval = setInterval(fetchWaitingStatus, 30000); // 30초마다 갱신
    return () => clearInterval(interval);
  }, []);

  const handleNext = async () => {
    try {
      const response = await apiCall.post(
        `/admin/api/visits/${SECTION_ID}/status`
      );
      console.log('다음 번호 호출 결과:', response);
      setWaitingInfo(response);

      // displayNum의 새로운 인덱스에 맞춰 번호 배치
      const updatedNumbers = Array(8).fill(0);
      const newDisplayNum = displayNum.map((num) =>
        num + 1 > 7 ? 0 : num + 1
      );

      newDisplayNum.forEach((index, i) => {
        if (i === 0) updatedNumbers[index] = response.previousNum;
        if (i === 1) updatedNumbers[index] = response.currentNum;
        if (i === 2) updatedNumbers[index] = response.nextNum;
      });

      setNumbers(updatedNumbers);
      setAngle((prevAngle) => prevAngle + ROTATE_ANGLE);
      setDisplayNum(newDisplayNum);
    } catch (error) {
      console.error('다음 번호 호출 실패:', error);
    }
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
          />
        </div>

        <InfoCard
          waitingCount={waitingInfo?.waitingCount || 0}
          estimatedTime={waitingInfo?.estimatedTime || 0}
          todayVisitors={waitingInfo?.todayVisitors || 0}
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
