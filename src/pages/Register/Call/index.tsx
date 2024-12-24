import { Button } from '@/components/ui/button';
import { Category, PostCallRequest } from '@/api/customer/calls';
import Header from '@/components/Header/Header';
import { AgreementCheckbox } from '@/components/Register/AgreementCheckbox';
import { ConsultationSelect } from '@/components/Register/ConsultationSelect';
import { DateAndTimePicker } from '@/components/Register/DateAndTimePicker';
import { PhoneNumberInput } from '@/components/Register/PhoneNumberInput';
import { ReusableInput } from '@/components/Register/ReusableInput';
import { Toaster } from '@/components/ui/toaster';
import usePostCall from '@/hooks/query/customer/usePostCall';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { contentAtom } from '@/stores';

export type RegisterCallData = {
  name: string;
  phone: string;
  consultationType: Category;
  reservationDate: Date | undefined;
  reservationTime: string | undefined;
  callContent: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, react-refresh/only-export-components
export const showToast = (toast: any, description: string) => {
  toast({
    description,
    duration: 3000,
  });
};

// 영업점 운영 시간 데이터
export const storeOperatingHours = {
  startTime: '09:00',
  endTime: '18:00',
};

// 1시간 단위의 시간 생성
export function generateTimeSlots(startTime: string, endTime: string) {
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

export function RegisterCallFormPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutate: postCall } = usePostCall();

  const [content] = useAtom(contentAtom);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterCallData>();

  const reservationDate = watch('reservationDate');
  const reservationTime = watch('reservationTime');
  const consultationType = watch('consultationType');

  const onSubmit: SubmitHandler<RegisterCallData> = ({
    reservationDate,
    reservationTime,
    consultationType,
  }) => {
    if (!isChecked1 || !isChecked2) {
      showToast(toast, '개인정보 수집 및 이용에 동의해야 합니다.');
      return;
    }

    const selectedHour = (reservationTime ?? '00:00~00:00 100명')
      .split('~')[0]
      .split(':')[0];
    const selectedMinute = (reservationTime ?? '00:00~00:00 100명')
      .split('~')[0]
      .split(':')[1];

    const date = reservationDate ?? new Date(Date.now());
    date.setHours(+selectedHour);
    date.setMinutes(+selectedMinute);

    const localeString = format(date, 'yyyy-MM-dd HH:mm:ss');
    const dateTime = localeString.split(' ').join('T');

    postCall({
      call_date: dateTime,
      category: consultationType,
      content: content,
    } as PostCallRequest);
  };

  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  useEffect(() => {
    const slots = generateTimeSlots(
      storeOperatingHours.startTime,
      storeOperatingHours.endTime
    );
    setTimeSlots(slots);
  }, []);

  const isFormComplete =
    reservationDate &&
    reservationTime &&
    consultationType &&
    isChecked1 &&
    isChecked2;

  return (
    <>
      <Header title='전화 상담 예약' />
      <div className='mx-auto flex min-h-screen w-[90%] py-5 pt-[5rem]'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex h-screen w-full flex-col justify-between gap-[5rem]'
        >
          <div className='flex w-full flex-col gap-[2rem]'>
            <ReusableInput
              register={register}
              fieldName='name'
              error={errors.name?.message}
              label='이름'
              placeholder='ex) 김하나'
              type='text'
            />
            <PhoneNumberInput
              register={register}
              name='phone'
              error={errors.phone?.message}
            />
            <ConsultationSelect
              control={control}
              error={errors.consultationType?.message}
              fieldName={'consultationType'}
            />
            <DateAndTimePicker<RegisterCallData>
              control={control}
              timeSlots={timeSlots}
              dateError={errors.reservationDate?.message}
              timeError={errors.reservationTime?.message}
              dateFieldName={'reservationDate'}
              timeFieldName={'reservationTime'}
            />

            <div>
              <label className='mb-1 block pb-2 text-left text-lg font-semibold'>
                문의 내용
              </label>
              <span className='mt-1 block text-left text-gray-800'>
                {content || '문의 내용이 없습니다.'}
              </span>
            </div>
          </div>

          <div className='flex w-full flex-col'>
            <AgreementCheckbox
              isChecked1={isChecked1}
              isChecked2={isChecked2}
              setIsChecked1={setIsChecked1}
              setIsChecked2={setIsChecked2}
            />
            <div className='flex justify-between pb-[12rem]'>
              <Button
                type='button'
                onClick={() => navigate('/')}
                variant='ghost'
                className='w-1/4'
              >
                취소
              </Button>
              <Button
                type='submit'
                variant='default'
                className='ml-2 w-3/4'
                disabled={!isFormComplete}
              >
                예약하기
              </Button>
            </div>
          </div>
        </form>

        <Toaster />
      </div>
    </>
  );
}
