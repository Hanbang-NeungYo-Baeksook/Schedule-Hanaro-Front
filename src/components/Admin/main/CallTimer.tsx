import useTimer from '@/hooks/useTimer';

function CallTimer({ start_time }: { start_time: string | Date }) {
  const progressTime = useTimer(start_time ?? new Date());
  return (
    <div className='mb-5 flex w-full justify-center'>
      <span className='rounded-xl bg-white px-4 py-2 text-[1.25rem] font-bold text-main'>
        {progressTime}
      </span>
    </div>
  );
}

export default CallTimer;
