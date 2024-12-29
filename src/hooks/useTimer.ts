import { useEffect, useState } from 'react';

const useTimer = (startTime: string | Date) => {
  const [progressTime, setProgressTime] = useState('00:00');

  useEffect(() => {
    const updateProgressTime = () => {
      const startDate = new Date(startTime);
      const now = new Date();

      const timeDiff = now.getTime() - startDate.getTime() - 9 * 60 * 60 * 1000;

      const diffInSeconds = Math.floor(timeDiff / 1000);

      const minutes = Math.floor(diffInSeconds / 60)
        .toString()
        .padStart(2, '0');
      const seconds = (diffInSeconds % 60).toString().padStart(2, '0');

      setProgressTime(`${minutes}:${seconds}`);
    };

    updateProgressTime();
    const interval = setInterval(updateProgressTime, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return progressTime;
};

export default useTimer;
