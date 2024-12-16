import { REC_BRANCH_MOCK } from '@/mock/branch_mock';
import RecBranchBox from './RecBranchBox';

function RecBranch() {
  return (
    <div className='flex w-full flex-col items-start justify-center py-3 text-left'>
      <span className='font-regular text-[1.125rem]'>실시간 추천 영업점</span>
      <span className='text-[0.75rem] text-[#666666]'>
        혼잡도를 기준으로 업무를 가장 빠르게 보실 수 있는 영업점을 추천해드려요!
      </span>
      <ul className='flex w-full items-stretch gap-4 overflow-x-scroll p-2'>
        {REC_BRANCH_MOCK.map(
          ({ branchId, branchName, location, distance, congestion }) => (
            <li key={branchId} className='w-[40%] flex-shrink-0 items-stretch'>
              <RecBranchBox
                branchId={branchId}
                branchName={branchName}
                location={location}
                distance={distance}
                congestion={congestion}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default RecBranch;
