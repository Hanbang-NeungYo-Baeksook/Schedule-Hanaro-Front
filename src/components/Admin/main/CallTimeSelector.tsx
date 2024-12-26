import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

// 영업점 운영 시간 데이터
const storeOperatingHours = {
  startTime: '09:00',
  endTime: '18:00',
};

// 1시간 단위의 시간 생성
function generateTimeSlots(startTime: string, endTime: string) {
  const slots: string[] = [];
  let current = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);

  while (current < end) {
    const next = new Date(current);
    next.setMinutes(current.getMinutes() + 30);
    slots.push(
      `${current.toTimeString().slice(0, 5)}~${next.toTimeString().slice(0, 5)}`
    );
    current = next;
  }

  return slots;
}

function CallTimeSelector() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const timeSlots = generateTimeSlots(
    storeOperatingHours.startTime,
    storeOperatingHours.endTime
  );
  const [timeValue, setTimeValue] = useState<Date>(new Date(timeSlots[0]));

  return (
    <div className='flex w-[40%] min-w-52 items-center justify-center space-x-2'>
      {/* <label className='mb-1 block pb-2 text-left text-lg font-semibold'>
        예약일시
      </label> */}
      <div className='flex w-full space-x-2'>
        <div className='w-full flex-1'>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='text-lightGray h-10 w-full justify-start border-input py-5 pl-3 text-left'
              >
                {timeValue ? (
                  <span className='text-lightGray text-base font-normal'>
                    {dayjs(timeValue).format('YYYY-MM-DD')}
                  </span>
                ) : (
                  <span className='text-lightGray text-base font-normal'>
                    예약일 선택
                  </span>
                )}
                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='min-h-[360px] w-auto py-5' align='start'>
              <Calendar
                mode='single'
                selected={timeValue}
                onSelect={(date) => {
                  setTimeValue(date ?? new Date(timeSlots[0]));
                  setIsPopoverOpen(false);
                }}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
            </PopoverContent>
          </Popover>
          {/* <FormErrorMessage error={dateError} /> */}
        </div>
        <div className='w-full flex-1'>
          <Select
            onValueChange={(value) => setTimeValue(new Date(value))}
            value={timeValue.toString() || ''}
          >
            <SelectTrigger className='time-select w-full'>
              <SelectValue
                placeholder='시간대를 선택하세요'
                className='text-base'
              >
                {timeValue
                  ? dayjs(timeValue).format('HH:mm')
                  : '시간대를 선택하세요'}
              </SelectValue>
              {/* <ClockIcon className='clock-icon ml-2 h-5 w-5 text-gray-400' /> */}
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  <div className='flex w-fit justify-between'>
                    <div>{slot}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* <FormErrorMessage error={timeError} /> */}
        </div>
      </div>
      <Button
        variant='default'
        className='w-fit bg-lightText px-8 hover:bg-lightGrey'
      >
        적용
      </Button>
    </div>
  );
}

export default CallTimeSelector;
