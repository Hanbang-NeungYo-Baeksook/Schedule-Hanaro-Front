import InfoCard from '@/components/Admin/Infocard';
import WaitingNumber from '@/components/Admin/WaitingNum';
import { useState } from 'react';
import Next from '../../../components/Admin/Next';

const INITIAL_NUMBERS = [952, 953, 954, 955, 956, 957, 958, 951];
const ROTATE_ANGLE = 45;

function VisitPage() {
  // const [selectedIdx, setSelectedIdx] = useState(123);
  const [numbers, setNumbers] = useState(INITIAL_NUMBERS);
  const [angle, setAngle] = useState(0);
  const [displayNum, setDisplayNum] = useState([7, 0, 1]);

  const handleNext = () => {
    setNumbers((prevNumbers) => {
      if (prevNumbers.length === 0) return prevNumbers;
      const lastNumber = prevNumbers[prevNumbers.length - 1];
      return [lastNumber, ...prevNumbers.slice(0, -1)].map((num) => num + 1);
    });

    setAngle((prevAngle) => prevAngle + ROTATE_ANGLE);
    console.log(angle);

    setDisplayNum((prevDisplay) =>
      prevDisplay.map((num) => (num + 1 > 7 ? 0 : num + 1))
    );
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

        <InfoCard waitingCount={2} estimatedTime={15} todayVisitors={72} />
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
