import { Button } from '@/components/ui/button';
import { RESERVATION_TYPE } from '@/constants/reservation';
import '@/index.css';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function ReservationPage() {
  const [searchParams] = useSearchParams();
  const registerType = searchParams.get('type');
  const from = searchParams.get('from');

  const navigate = useNavigate();
  const [selectedRes, setSelectedRes] = useState('call');

  useEffect(() => {
    setSelectedRes(registerType ?? 'call');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePage = () => {
    navigate(`/register/${selectedRes}?from=${from}`);
  };

  return (
    <>
      <div className='mx-auto flex h-screen w-[100%] flex-col overflow-visible'>
        <div className='flex h-full w-full flex-col space-y-[1.5rem] overflow-auto scrollbar-hide'>
          <div className='mx-auto flex w-[90%] flex-col'>
            <div className='flex flex-col items-start justify-center pt-10 text-4xl font-bold'>
              <span>상담 유형을</span>
              <span>선택해주세요</span>
            </div>
            <div className='flex flex-col items-start justify-center pt-5 text-lg'>
              <span>고객님이 작성하신 문의 내용을</span>
              <span>원하시는 유형의 상담으로 문의할 수 있어요</span>
            </div>

            <ul className='space-y-5 pt-5'>
              {RESERVATION_TYPE.map(({ id, title, subTitle }) => (
                <li key={id} onClick={() => setSelectedRes(id)}>
                  <ReservationTypeCard
                    title={title}
                    subTitle={subTitle}
                    selected={selectedRes === id}
                  />
                </li>
              ))}
            </ul>
            <div className='pb-10 pt-10'>
              <Button onClick={handlePage}>상담 유형 선택하기</Button>
            </div>
          </div>
        </div>
        <div className='=pb-[80px] min-[435px]:pb-[85px] min-[800px]:pb-[90px]'></div>
      </div>
    </>
  );
}

function ReservationTypeCard({
  title,
  subTitle,
  selected,
}: {
  title: string;
  subTitle: string[];
  selected: boolean;
}) {
  return (
    <div
      className={cn(
        'flex w-full cursor-pointer flex-col items-start gap-4 rounded-[0.9125rem] border-2 border-border bg-[#F9F9F9] p-5 transition-colors',
        selected
          ? 'border-[3px] border-main bg-white shadow-[0_0_17px_0_rgba(0,132,133,0.25)] hover:bg-none'
          : 'hover:bg-[#f1f1f1]'
      )}
    >
      <span className='text-[1.5rem] font-bold'>{title}</span>
      <ul className='flex flex-col items-start'>
        {subTitle.map((st, idx) => (
          <li key={idx} className='text-[1rem] text-lightGrey'>
            {st}
          </li>
        ))}
      </ul>
    </div>
  );
}
