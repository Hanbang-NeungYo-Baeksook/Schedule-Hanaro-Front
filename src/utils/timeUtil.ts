import dayjs from 'dayjs';

// 시간 계산 함수
export const formatElapsedTime = (created_at: string): string => {
  const minutesAHour = 60; // 1시간 = 60분
  const minutesADay = 1440;

  const now = dayjs();
  const startTime = dayjs(created_at);
  const elapsedMinutes = now.diff(startTime, 'minute'); // 경과 시간(분)

  if (elapsedMinutes < minutesAHour) {
    return `${elapsedMinutes}분 전`;
  } else if (elapsedMinutes < minutesADay) {
    return `${Math.floor(elapsedMinutes / minutesAHour)}시간 전`;
  } else {
    return `${Math.floor(elapsedMinutes / minutesADay)}일 전`;
  }
};
