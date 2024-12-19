import { ReservationPage } from '..';
import { useNavigate } from 'react-router-dom';
import { VISIT_MOCK } from '@/mock/visit_mock';

export function ReservationVisitPage() {
  const visitNum = VISIT_MOCK;
  const navigate = useNavigate();
  if (!visitNum) {
    return <ReservationPage />;
  }
  const moveToDetail = (id: string) => {
    navigate(`/reservation/visit/${id}`);
  };
  return (
    <div className='mx-auto flex h-screen w-[90%] flex-col pb-[120px]'>
      <hr />
      <div className='h-full overflow-auto scrollbar-hide'>
        {visitNum.map(({ id, my_num, name, waiting_number, waiting_time }) => {
          const [topName, ...lastName] = name.split(' ');
          const bottomName = lastName.join(' ');
          return (
            <>
              <div key={id}>
                <button
                  onClick={() => moveToDetail(my_num)}
                  className='mt-[1.4375rem] w-full px-2'
                >
                  <div className='mx-2 flex justify-between gap-2'>
                    <div className='flex flex-wrap gap-[0.3rem]'>
                      <span className='text-2xl font-bold text-[#464646]'>
                        {topName}
                      </span>
                      <span className='text-2xl font-bold text-[#464646]'>
                        {bottomName}
                      </span>
                    </div>
                    <div className='flex items-end gap-[0.1rem]'>
                      <span className='text-3xl font-[1000] text-[#008485]/80'>
                        {my_num}
                      </span>
                      <span className='text-lg font-bold text-[#008485]/80'>
                        번
                      </span>
                    </div>
                  </div>
                  <div className='mx-2 mt-4 flex justify-between'>
                    <div className='text-lg font-medium text-[#666666]'>
                      현재 대기 인원
                    </div>
                    <div className='text-xl font-bold text-[#464646]'>
                      {waiting_number}명
                    </div>
                  </div>
                  <div className='mx-2 mt-4 flex justify-between'>
                    <div className='text-lg font-medium text-[#666666]'>
                      예상 대기 시간
                    </div>
                    <div className='text-xl font-bold text-[#464646]'>
                      {waiting_time}분
                    </div>
                  </div>
                </button>
                <hr className='mt-[1.4375rem]' />
              </div>
            </>
          );
        })}
      </div>
      <div className='relative pb-[142px] min-[435px]:pb-[160px] min-[800px]:pb-[180px]'></div>
    </div>
  );
}
