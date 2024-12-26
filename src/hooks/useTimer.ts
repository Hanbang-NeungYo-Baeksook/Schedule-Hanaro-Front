import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const useTimer = (startTime: string | Date) => {
  const [progressTime, setProgressTime] = useState('00:00');

  useEffect(() => {
    const updateProgressTime = () => {
      const diff = dayjs().diff(startTime, 'second');
      const minutes = Math.floor(diff / 60)
        .toString()
        .padStart(2, '0');
      const seconds = (diff % 60).toString().padStart(2, '0');
      setProgressTime(`${minutes}:${seconds}`);
    };

    updateProgressTime(); // 초기 값 설정
    const interval = setInterval(updateProgressTime, 1000);

    return () => clearInterval(interval); // 타이머 정리
  }, [startTime]);

  return progressTime;
};

export default useTimer;
