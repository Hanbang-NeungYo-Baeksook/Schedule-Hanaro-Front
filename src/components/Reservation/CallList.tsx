import { ReactComponent as TimerButton } from '@/assets/icons/reservation/timer.svg';
import { ReactComponent as WarningTimer } from '@/assets/icons/reservation/warningalarm.svg';
import { CallData } from '@/types/Call';
import { formatArriveTime } from '@/utils/timeUtil';
import { useNavigate } from 'react-router-dom';

const TIMER_LIMIT = 5;

const CallList = ({
  call_id,
  call_date,
  call_time,
  call_num,
  category,
  status,
}: CallData) => {
  const navigate = useNavigate();
  const timerText = formatArriveTime(call_date + 'T' + call_time);
  const timerNumber = timerText.includes('분')
    ? +(timerText.split('분').at(0) ?? TIMER_LIMIT + 1)
    : TIMER_LIMIT + 1;

  return (
    <div
      className='z-30 mx-auto w-[90%] cursor-pointer rounded-[0.9375rem] bg-white pb-[2.1875rem] pl-[1.1875rem] pr-[1.4688rem] pt-[1.75rem] drop-shadow'
      onClick={() => navigate(`/reservation/call/${call_id}`)}
    >
      {status === '대기중' &&
        timerNumber <= TIMER_LIMIT &&
        0 <= timerNumber && (
          <div className='mb-[1rem] flex items-center text-[#e90061]'>
            <WarningTimer className='mr-[0.25rem] h-[0.75rem] w-[0.75rem] sm:h-[0.875rem] sm:w-[0.875rem] md:h-[1rem] md:w-[1rem] lg:h-[1.25rem] lg:w-[1.25rem]' />
            <span className='text-[0.875rem] font-bold'>
              예약 시간까지 얼마 남지 않았습니다.
            </span>
          </div>
        )}
      <div className='flex justify-between'>
        <div className='inline-flex gap-[1rem]'>
          <div className='text-[1rem] font-semibold text-[#2b2b2b]'>
            상담종류
          </div>
          <div className='text-[1rem] font-normal'>{category}</div>
        </div>
        <div className='ml-auto'>
          {status === '대기중' && timerNumber > 0 && (
            <div className='flex items-center text-[1rem] font-bold text-[#2b2b2b]'>
              <TimerButton className='mr-[0.0625rem] h-[1.2rem] w-[1.2rem] sm:h-[0.91em] sm:w-[0.9rem] md:h-[0.9rem] md:w-[0.9rem] lg:h-[1rem] lg:w-[1rem]' />
              {timerText}
            </div>
          )}
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='inline-flex gap-[1rem]'>
          <div className='text-[1rem] font-semibold text-[#2b2b2b]'>
            상담일시
          </div>
          <div className='text-[1rem] font-normal text-[#2b2b2b]'>
            {call_date}
          </div>
        </div>
        <div className='ml-auto flex items-end gap-[0.1rem]'>
          <span className='text-3xl font-bold text-[#2b2b2b]'>{call_num}</span>
          <span className='pb-[0.1rem] text-xl font-bold text-[#2b2b2b]'>
            번
          </span>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='inline-flex gap-[1rem]'>
          <div className='text-[1rem] font-semibold text-[#2b2b2b]'>
            상담시간
          </div>
          <div className='text-[1rem] font-normal text-[#2b2b2b]'>
            {call_time}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallList;
