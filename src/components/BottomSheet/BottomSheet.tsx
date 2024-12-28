/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/7gDl3KQt14t
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { BranchData, BranchOrder } from '@/api/customer/branches';
import { ReactComponent as Refresh } from '@/assets/icons/refresh.svg';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { MAP_CHIPS } from '@/constants';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useMap } from '@/hooks/map-context';
import useGetBranchList from '@/hooks/query/customer/useGetBranchList';
import { cn } from '@/lib/utils';
import { branchOrderByAtom, sectionTypeAtom } from '@/stores';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useAtom, useAtomValue } from 'jotai';
import { List, MapPin } from 'lucide-react';
import { useState } from 'react';
import BranchCard from '../Map/BranchCard';
import RecBranch from '../Map/RecBranch';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

export function BottomSheet() {
  const {
    currentAddress,
    setSelectedBranchId,
    setFocus,
    getCurrentLatitude,
    getCurrentLongitude,
  } = useMap();

  const [selectedChipIdx, setSelectedChipIdx] = useState(0); // 영업점 | ATM chip
  const [open, setOpen] = useState(false);

  const [branchOrderBy, setBranchOrderByAtom] = useAtom(branchOrderByAtom);
  const sectionType = useAtomValue(sectionTypeAtom);

  const queryClient = useQueryClient();
  const [isSpinning, setIsSpinning] = useState(false);

  const {
    data: branchList,
    isLoading,
    refetch,
  } = useGetBranchList({
    latitude: getCurrentLatitude(),
    longitude: getCurrentLongitude(),
    order_by: branchOrderBy,
    sectionType,
  });

  const [now, setNow] = useState(Date.now());

  if (isLoading || !branchList) {
    return (
      <div className='z-10 flex items-center space-x-4'>
        <Skeleton className='h-12 w-12 rounded-full bg-[#F2F2F2]' />
        <div className='w-full space-y-2'>
          <Skeleton className='h-4 w-full bg-[#F2F2F2]' />
          <Skeleton className='h-4 w-[80%] bg-[#F2F2F2]' />
        </div>
      </div>
    );
  }

  const selectedBranchList: BranchData[] =
    selectedChipIdx === 0 ? branchList.bank_list : branchList.atm_list;

  const [firstAddress, secondAddress, ...lastAddress] =
    currentAddress.split(' ');
  const topAddress = firstAddress + ' ' + secondAddress;
  const bottomAdrress = lastAddress.join(' ');

  const toggleOpen = () => setOpen((prev) => !prev);

  // 영업중 확인
  const isOpen = (business_hours: string) => {
    const date = new Date(Date.now());

    if (date.getDay() === 0 || date.getDay() === 6) {
      return false;
    }

    const [startTime, endTime] = business_hours.split('~');
    const startHour = startTime.split(':')[0];
    const endHour = endTime.split(':')[0];
    return date.getHours() >= +startHour && date.getHours() < +endHour;
  };

  // 새로고침 버튼 클릭 시
  const handleRefresh = () => {
    setIsSpinning(true);
    refetch();
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.BRANCH_RECOMMEND],
    });
    setNow(Date.now());

    setTimeout(() => setIsSpinning(false), 500);
  };

  const handleDetailPage = (branchId: number) => {
    toggleOpen();
    const targetBranch = selectedBranchList.find(
      ({ branch_id }) => branch_id === branchId
    ) as BranchData;
    const { x_position: lat, y_position: lon } = targetBranch;
    setTimeout(() => {
      setSelectedBranchId(branchId.toString());
      if (lat && lon) setFocus(+lon, +lat);
    }, 200);
  };

  const convertValueToItem = (type: BranchOrder) => {
    if (type === 'distance') {
      return '거리순';
    } else if (type === 'wait') {
      return '대기시간순';
    }
  };

  return (
    <>
      {/* TODO: 검색 화면 구현시 SearchInput 설정 */}
      {/* <SearchInput /> */}
      <div className='navbar fixed bottom-24 left-1/2 z-[60] -translate-x-1/2'>
        <Drawer open={open} onOpenChange={setOpen} snapPoints={[0.4, 1]}>
          <DrawerTrigger asChild>
            <Button className='mb-4 w-fit rounded-full bg-white px-6 py-2 shadow-[2px_4px_4px_0px_rgba(0,0,0,0.15)] hover:bg-[#F9F9F9]'>
              <List width='1.0625rem' height='1.0625rem' color='#666666' />
              <span className='text-[0.875rem] font-bold text-lightGrey'>
                지점목록
              </span>
            </Button>
          </DrawerTrigger>
          <DrawerContent
            aria-describedby='custom-description'
            className='customWidth h-[100%] rounded-t-2xl bg-black/20 bg-white shadow-2xl dark:bg-gray-950'
          >
            <div className='after:none mx-auto h-[90%] w-[90%]'>
              {/* <DrawerHeader> */}
              <DrawerDescription id='custom-description'></DrawerDescription>
              <DrawerTitle className='w-full pt-6 text-center text-2xl font-bold'>
                <div className='flex flex-col items-center justify-center gap-4'>
                  <Badge
                    variant='outline'
                    className='ml-[18px] flex w-fit cursor-default items-center justify-center gap-[0.3125rem] self-center border-border bg-[#F8F8F8] px-5 py-3 tracking-wider text-text'
                  >
                    <MapPin width='1.25rem' height='1.25rem' />
                    <div className='flex flex-wrap justify-center gap-1'>
                      <span className='text-[1rem] font-bold'>
                        {topAddress}
                      </span>
                      <span className='text-[1rem] font-bold'>
                        {bottomAdrress}
                      </span>
                    </div>
                  </Badge>
                  <div
                    className='flex cursor-pointer items-center gap-2 self-end'
                    onClick={handleRefresh}
                  >
                    <div
                      className={cn(
                        `transition-transform duration-500 ease-in-out`,
                        isSpinning ? 'animate-spin-once' : ''
                      )}
                    >
                      <Refresh />
                    </div>
                    <span className='text-[1.25rem] font-normal text-[#666]'>
                      {dayjs(now).format('HH:mm')}
                    </span>
                  </div>
                </div>
                <Separator className='mt-1' />
              </DrawerTitle>
              <div className='relative flex h-full flex-col overflow-auto scrollbar-hide'>
                {/* 추천 지점 */}
                <RecBranch />
                <div className='z-10'>
                  <div className='sticky top-0 flex items-center justify-between bg-white py-3'>
                    <span className='space-x-2'>
                      {MAP_CHIPS.map(
                        ({ id, txt }: { id: number; txt: string }) => (
                          <Badge
                            key={id}
                            variant={selectedChipIdx === id ? 'dark' : 'white'}
                            className='px-6 py-1 text-[0.875rem] tracking-wider'
                            onClick={() => setSelectedChipIdx(id)}
                          >
                            {txt}
                          </Badge>
                        )
                      )}
                    </span>
                    <div className='flex h-[90%] cursor-pointer items-center gap-1'>
                      {selectedChipIdx === 0 && (
                        <Select
                          onValueChange={(value) =>
                            setBranchOrderByAtom(value as BranchOrder)
                          }
                        >
                          <SelectTrigger className='z-[61] space-x-1 border-none text-lightGrey'>
                            <SelectValue
                              placeholder={convertValueToItem(branchOrderBy)}
                            />
                          </SelectTrigger>
                          <SelectContent className='right-8 z-[61]'>
                            <SelectItem value='distance'>거리순</SelectItem>
                            <SelectItem value='wait'>대기시간순</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                  <ul className='h-full space-y-6 p-1'>
                    {selectedBranchList
                      .map(
                        ({
                          branch_id: id,
                          branch_name: name,
                          address,
                          business_hours,
                          branch_type: type,
                          distance,
                          section_types,
                          wait_time,
                          wait_amount,
                        }) => {
                          return (
                            <li key={id} onClick={() => handleDetailPage(id)}>
                              <BranchCard
                                id={id.toString()}
                                name={name}
                                isOpen={isOpen(business_hours)}
                                address={address}
                                distance={distance.toString()}
                                openTime={business_hours}
                                sectionType={section_types}
                                waitingNumber={wait_amount}
                                waitingTime={wait_time}
                                type={type == '방문점' ? 'branch' : 'atm'}
                              />
                            </li>
                          );
                        }
                      )
                      ?.sort((a, b) => +a.props.distance - +b.props.distance)}
                  </ul>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

// function XIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns='http://www.w3.org/2000/svg'
//       width='24'
//       height='24'
//       viewBox='0 0 24 24'
//       fill='none'
//       stroke='currentColor'
//       strokeWidth='2'
//       strokeLinecap='round'
//       strokeLinejoin='round'
//     >
//       <path d='M18 6 6 18' />
//       <path d='m6 6 12 12' />
//     </svg>
//   );
// }
