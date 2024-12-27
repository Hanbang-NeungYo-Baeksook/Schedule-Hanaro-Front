import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Modalbutton from '../Modal';
import useGetBranchDetail from '@/hooks/query/customer/useGetBranchDetail';
import { useMap } from '@/hooks/map-context';
import useDeleteVisit from '@/hooks/query/customer/useDeleteVisit';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReservationButton({ branchId }: { branchId: number }) {
  const { getCurrentLatitude, getCurrentLongitude } = useMap();

  const { data: branch, isLoading } = useGetBranchDetail({
    branch_id: branchId,
    latitude: getCurrentLatitude(),
    longitude: getCurrentLongitude(),
  });

  const { mutate: deleteVisit } = useDeleteVisit();

  const navigate = useNavigate();

  if (isLoading || !branch) {
    return (
      <div className='z-10 mx-auto mt-10 flex w-full items-center space-x-4'>
        <div className='mx-auto w-full space-y-2'>
          <Skeleton className='h-4 w-full bg-[#F2F2F2]' />
          <Skeleton className='h-4 w-[80%] bg-[#F2F2F2]' />
          <Skeleton className='h-4 w-[75%] bg-[#F2F2F2]' />
        </div>
      </div>
    );
  }

  const { reserved, visit_id } = branch;

  const handlePage =
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => (url: string) => {
      e.stopPropagation();
      navigate(url);
    };
  return (
    <div className='flex gap-3'>
      {reserved ? (
        <>
          <Modalbutton
            buttonTitle='예약 취소'
            buttonVariant='ghost'
            buttonSize='w-1/4'
            modalTitle='영업점 예약 취소'
            modalDescription1='취소 시 30분 후부터 재예약이 가능합니다.'
            modalDescription2=''
            modalButtonTitle='확인'
            onClick={() => deleteVisit({ visit_id })}
          ></Modalbutton>
          <Button
            className='w-3/4 font-bold'
            // TODO: visit_id로 수정
            onClick={(e) => handlePage(e)(`/reservation/visit/${visit_id}`)}
          >
            예약 상세보기
          </Button>
        </>
      ) : (
        <Modalbutton
          buttonTitle='예약하기'
          buttonVariant='default'
          buttonSize='w-full'
          modalTitle={''}
          modalDescription1='방문 예약 후 1시간 이내 미방문 시'
          modalDescription2=' 예약이 취소될 수 있습니다.'
          modalButtonTitle='예약'
          onClick={() => navigate(`/register/visit/${branchId}`)}
        ></Modalbutton>
      )}
    </div>
  );
}
