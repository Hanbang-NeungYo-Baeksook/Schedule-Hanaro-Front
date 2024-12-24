type DetailCustomerInfoProps = {
  name: string;
  phoneNumber: string;
  start_time: string;
  end_time: string;
  className?: string; // 외부에서 스타일을 전달받을 수 있도록 추가
};

function DetailCustomerInfo({
  name,
  phoneNumber,
  start_time,
  end_time,
  className = '',
}: DetailCustomerInfoProps) {
  return (
    <div
      className={`mx-auto mb-6 flex h-[8rem] w-full items-center rounded-[1rem] bg-white p-4 ${className} shadow-custom`}
    >
      <div className='mx-auto flex items-center justify-between font-medium text-gray-400'>
        {/* 고객명 */}
        <div className='flex items-center space-x-6'>
          <span className='text-[1.4rem] text-gray-400'>고객명</span>
          <span className='ml-6 text-[1.4rem] font-semibold text-gray-800'>
            {name}
          </span>
        </div>

        {/* 전화번호 */}
        <div className='ml-10 flex items-center border-l border-gray-200'>
          <span className='ml-10 text-[1.4rem] text-gray-400'>전화번호</span>
          <span className='ml-6 text-[1.4rem] font-semibold text-gray-800'>
            {phoneNumber}
          </span>
        </div>

        {/* 상담시간 */}
        <div className='ml-10 flex items-center border-l border-gray-200'>
          <span className='ml-10 text-[1.4rem] text-gray-400'>문의시간</span>
          <span className='ml-6 text-[1.4rem] font-semibold text-gray-800'>
            {start_time}
          </span>
        </div>

        {/* 답변시간 */}
        <div className='ml-10 flex items-center border-l border-gray-200'>
          <span className='ml-10 text-[1.4rem] text-gray-400'>답변시간</span>
          <span className='ml-6 text-[1.4rem] font-semibold text-gray-800'>
            {end_time}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DetailCustomerInfo;
