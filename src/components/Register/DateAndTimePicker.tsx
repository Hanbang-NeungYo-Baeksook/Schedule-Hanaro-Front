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
import { format } from 'date-fns';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Button } from '../ui/button';
import { FormErrorMessage } from './FormErrorMessage';

type DateAndTimePickerProps<T extends FieldValues> = {
  control: Control<T>;
  timeSlots: string[];
  dateError: string | undefined;
  timeError: string | undefined;
  dateFieldName: Path<T>;
  timeFieldName?: Path<T>;
};

export function DateAndTimePicker<T extends FieldValues>({
  control,
  timeSlots,
  dateError,
  timeError,
  dateFieldName,
  timeFieldName,
}: DateAndTimePickerProps<T>) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    const chevron = document.querySelector('.time-select .lucide-chevron-down');
    if (chevron) {
      chevron.remove();
    }
  }, []);

  return (
    <div>
      <label className='mb-1 block pb-2 text-left text-lg font-semibold'>
        예약일시
      </label>
      <div className='flex space-x-2'>
        <div className='w-1/2 flex-1'>
          <Controller
            name={dateFieldName}
            control={control}
            rules={{ required: '예약일을 선택해주세요.' }}
            render={({ field: { onChange, value } }) => (
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='text-lightGray h-10 w-full justify-start border-input pl-3 text-left'
                  >
                    {value ? (
                      <span className='text-lightGray text-base font-normal'>
                        {format(value, 'yyyy-MM-dd')}
                      </span>
                    ) : (
                      <span className='text-lightGray text-base font-normal'>
                        예약일 선택
                      </span>
                    )}
                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className='min-h-[360px] w-auto p-0'
                  align='start'
                >
                  <Calendar
                    mode='single'
                    selected={value}
                    onSelect={(date) => {
                      onChange(date);
                      setIsPopoverOpen(false);
                    }}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          <FormErrorMessage error={dateError} />
        </div>
        {timeFieldName && (
          <div className='w-1/2 flex-1'>
            <Controller
              name={timeFieldName}
              control={control}
              rules={{ required: '시간대를 선택해주세요.' }}
              render={({ field: { onChange, value } }) => (
                <Select
                  onValueChange={(value) => onChange(value)}
                  value={value || ''}
                >
                  <SelectTrigger className='time-select w-full'>
                    <SelectValue
                      placeholder='시간대를 선택하세요'
                      className='text-base'
                    >
                      {value ? value.split(' ')[0] : '시간대를 선택하세요'}
                    </SelectValue>
                    <ClockIcon className='clock-icon ml-2 h-5 w-5 text-gray-400' />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => {
                      const [time, availability] = slot.split(' ');
                      return (
                        <SelectItem key={slot} value={`${time}`}>
                          <div className='flex w-[12.5rem] justify-between'>
                            <div>{time}</div>
                            <div className='font-bold text-main'>
                              {availability}명
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
            />
            <FormErrorMessage error={timeError} />
          </div>
        )}
      </div>
    </div>
  );
}
