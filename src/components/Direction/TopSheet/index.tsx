import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';
import DepartureArrivalAddress from './DepartureArrivalAddress';
import DepartureArrivalTime from './DepartureArrivalTime';
import DirectionBar from './DirectionBar';
import TotalDistance from './TotalDistance';
import TotalTime from './TotalTime';

type TopSheetProps = {
  closeDirection: () => void;
  branchId: string;
};

export default function TopSheet({ closeDirection, branchId }: TopSheetProps) {
  return (
    <div className='absolute top-4 z-10 h-[13rem] w-[70%] max-w-[30rem] rounded-xl bg-white px-4 py-4 max-[800px]:w-[52.5%] max-[715px]:pr-[0rem] max-[685px]:w-[57%] max-[630px]:w-[60%] max-[600px]:w-[72%] max-[565px]:w-[75%] max-[511px]:w-[80%] max-[480px]:w-[85%] max-[450px]:w-[90%] max-[400px]:w-[95%] max-[380px]:w-[97%] max-[370px]:w-[98%] max-[370px]:px-3 max-[350px]:pr-0'>
      <div className='flex h-full flex-col justify-between'>
        <div className='flex h-2/3 justify-between'>
          <div className='flex gap-3'>
            <DepartureArrivalTime />
            <DirectionBar />
            <DepartureArrivalAddress branchId={branchId} />
          </div>
          <Button variant={'link'} className='w-auto' onClick={closeDirection}>
            <X />
          </Button>
        </div>
        <div className='flex w-full items-center justify-evenly'>
          <TotalTime />
          <Separator orientation='vertical' />
          <TotalDistance />
        </div>
      </div>
    </div>
  );
}
