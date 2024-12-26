type DetailCustomerInfoProps = {
  name: string;
  phoneNumber: string;
  start_time: string;
  end_time?: string;
};

function DetailCustomerInfo({
  name,
  phoneNumber,
  start_time,
  end_time,
}: DetailCustomerInfoProps) {
  return (
    <div className={`mx-auto mb-6 rounded-[1rem] bg-white py-8 shadow-custom`}>
      <div className='mx-auto flex items-center justify-around text-[1.25rem] text-gray-400'>
        {/* 고객명 */}
        <div className='flex items-center space-x-6'>
          <span className='text-gray-400'>고객명</span>
          <span className='ml-6 font-semibold text-gray-800'>{name}</span>
        </div>

        {/* 전화번호 */}
        <div className='ml-10 flex items-center border-l border-gray-200'>
          <span className='ml-10 text-gray-400'>전화번호</span>
          <span className='ml-6 font-semibold text-gray-800'>
            {phoneNumber}
          </span>
        </div>

        {/* 상담시간 */}
        <div className='ml-10 flex items-center border-l border-gray-200'>
          <span className='ml-10 text-gray-400'>문의시간</span>
          <span className='ml-6 font-semibold text-gray-800'>{start_time}</span>
        </div>

        {/* 답변시간 */}
        {end_time ? (
          <div className='ml-10 flex items-center border-l border-gray-200'>
            <span className='ml-10 text-gray-400'>답변시간</span>
            <span className='ml-6 font-semibold text-gray-800'>{end_time}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default DetailCustomerInfo;
