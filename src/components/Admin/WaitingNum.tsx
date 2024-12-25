import { useEffect, useState } from 'react';
import CategoryButton from './CategoryButton';
// import './YourStyles.css';

type WaitingNumberProps = {
  numbers: number[];
  angle: number;
  displayNum: number[];
  categories: string[];
};

function WaitingNumber({
  numbers,
  angle,
  displayNum,
  categories,
}: WaitingNumberProps) {
  const [isRow] = useState(false);
  const rotateAngle = 45;
  const radian = (rotateAngle / 2) * (Math.PI / 180);
  const colTz = Math.round(210 / 2 / Math.tan(radian));
  const rowTz = Math.round(140 / 2 / Math.tan(radian));

  useEffect(() => {
    const carouselCards = document.querySelectorAll('.carousel-card');
    carouselCards.forEach((el, idx) => {
      (el as HTMLElement).style.transform = isRow
        ? `rotateX(${rotateAngle * idx}deg) translateZ(${rowTz}px)`
        : `rotateY(${rotateAngle * idx}deg) translateZ(${colTz}px)`;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotateAngle]);

  useEffect(() => {
    console.log(...numbers);
  }, [numbers]);

  return (
    <div className='mt-10 flex w-full flex-col items-center rounded-lg bg-white pb-[4.25rem]'>
      <div className='mb-[-5rem] flex w-full max-w-xl justify-between px-2 md:px-8'>
        <span className='text-[1.5625rem] font-extrabold text-[#d9d9d9] md:text-lg'>
          이전 대기번호
        </span>
        <span className='pt-2 text-[1.5625rem] font-extrabold text-[#d9d9d9] md:text-lg'>
          현재 대기번호
        </span>
        <span className='text-[1.5625rem] font-extrabold text-[#d9d9d9] md:text-lg'>
          다음 대기번호
        </span>
      </div>
      <div className='relative w-full max-w-xl pl-[0.8rem]'>
        <div
          className='scene relative mx-auto h-[8.75rem]'
          style={{
            perspective: '1200px',
          }}
        >
          <div
            className='carousel transform-style-preserve-3d absolute h-full w-full transition-transform duration-500'
            style={{
              transform: `rotateY(${-angle}deg)`,
            }}
          >
            {numbers.map((number, idx) => (
              <div
                key={idx}
                className='carousel-card absolute flex h-[7.5rem] flex-col items-center justify-center bg-white opacity-90 transition-all duration-500'
              >
                <span
                  className={`text-4xl font-bold text-[#000000] md:text-6xl ${
                    displayNum.includes(idx) && number !== 0 ? '' : 'hidden'
                  }`}
                >
                  {number}
                </span>
                <div
                  className={`${displayNum.includes(idx) && number !== 0 ? '' : 'hidden'}`}
                >
                  <CategoryButton category={categories[idx] || '예금'} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitingNumber;
