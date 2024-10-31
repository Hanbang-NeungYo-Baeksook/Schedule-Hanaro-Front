function WaitingNumber() {
  const previousNumber = 951;
  const currentNumber = 952;
  const nextNumber = 953;

  return (
    <div className='flex w-full flex-col items-center rounded-lg bg-white pb-[4.25rem]'>
      {/* 레이블 */}
      <div className='mb-4 flex w-full max-w-xl justify-between px-2 md:px-8'>
        <span className='text-sm text-gray-400 md:text-lg'>이전 대기번호</span>
        <span className='pt-10 text-sm text-gray-400 md:text-lg'>
          현재 대기번호
        </span>
        <span className='text-sm text-gray-400 md:text-lg'>다음 대기번호</span>
      </div>

      {/* 대기번호 */}
      <div className='flex w-full max-w-xl items-end justify-between px-2 md:px-8'>
        <span className='text-4xl font-bold text-gray-600 md:text-6xl'>
          {previousNumber}
        </span>
        <span className='relative top-10 text-6xl font-extrabold text-black md:text-8xl'>
          {currentNumber}
        </span>
        <span className='text-4xl font-bold text-gray-600 md:text-6xl'>
          {nextNumber}
        </span>
      </div>
    </div>
  );
}

export default WaitingNumber;
