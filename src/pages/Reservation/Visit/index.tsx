import { VisitData } from '@/api/customer/visits';
import { Toaster } from '@/components/ui/toaster';
import useGetVisitList from '@/hooks/query/customer/useGetVisitList';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

export function ReservationVisitPage() {
  const { data: visitList, isLoading } = useGetVisitList({ page: 1, size: 20 });

  const navigate = useNavigate();

  if (isLoading || !visitList) {
    return (
      <div className='z-10 mx-auto mt-10 flex w-[90%] flex-col items-center gap-12'>
        <div className='w-full space-y-2'>
          <Skeleton className='h-4 w-full bg-[#F2F2F2]' />
          <Skeleton className='h-4 w-[80%] bg-[#F2F2F2]' />
        </div>
        <div className='w-full space-y-2'>
          <Skeleton className='h-4 w-full bg-[#F2F2F2]' />
          <Skeleton className='h-4 w-[80%] bg-[#F2F2F2]' />
        </div>
        <div className='w-full space-y-2'>
          <Skeleton className='h-4 w-full bg-[#F2F2F2]' />
          <Skeleton className='h-4 w-[80%] bg-[#F2F2F2]' />
        </div>
        <div className='w-full space-y-2'>
          <Skeleton className='h-4 w-full bg-[#F2F2F2]' />
          <Skeleton className='h-4 w-[80%] bg-[#F2F2F2]' />
        </div>
      </div>
    );
  }

  const moveToDetail = (id: string) => {
    navigate(`/reservation/visit/${id}`);
  };

  return (
    <>
      <div className='mx-auto flex h-screen w-[90%] flex-col pb-[120px]'>
        <hr />
        <div className='h-full overflow-auto scrollbar-hide'>
          {visitList.data.length > 0 ? (
            visitList.data.map(
              ({
                visit_id: id,
                visit_num: visitNum,
                branch_name: name,
                waiting_amount: waitAmount,
                waiting_time: waitTime,
              }: VisitData) => {
                const [topName, ...lastName] = name.split(' ');
                const bottomName = lastName.join(' ');
                return (
                  <div key={id}>
                    <button
                      onClick={() => moveToDetail(id.toString())}
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
                            {visitNum}
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
                          {waitAmount}명
                        </div>
                      </div>
                      <div className='mx-2 mt-4 flex justify-between'>
                        <div className='text-lg font-medium text-[#666666]'>
                          예상 대기 시간
                        </div>
                        <div className='text-xl font-bold text-[#464646]'>
                          {waitTime}분
                        </div>
                      </div>
                    </button>
                    <hr className='mt-[1.4375rem]' />
                  </div>
                );
              }
            )
          ) : (
            <div className='flex h-[500px] items-center justify-center'>
              <span className='text-2xl font-bold text-[#464646]'>
                방문 예약 내역이 없습니다.
              </span>
            </div>
          )}
        </div>
        <div className='relative pb-[142px] min-[435px]:pb-[160px] min-[800px]:pb-[180px]'></div>
      </div>
      <Toaster />
    </>
  );
}
