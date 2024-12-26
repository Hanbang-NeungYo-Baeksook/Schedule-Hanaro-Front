import { Button } from '@/components/ui/button';
import { Category, PostCallRequest } from '@/api/customer/calls';
import Header from '@/components/Header/Header';
import { AgreementCheckbox } from '@/components/Register/AgreementCheckbox';
import { ConsultationSelect } from '@/components/Register/ConsultationSelect';
import { DateAndTimePicker } from '@/components/Register/DateAndTimePicker';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { contentAtom, isLoadingAtom, postCallRequestAtom } from '@/stores';
import useGetCallAvailability from '@/hooks/query/customer/useGetCallAvailability';
import { format } from 'date-fns';
import usePostRecommendList from '@/hooks/query/customer/usePostRecommendList';
import usePostCall from '@/hooks/query/customer/usePostCall';

export type RegisterCallData = {
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

export function RegisterCallFormPage() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');

  const { mutate: postRecommendList } = usePostRecommendList();
  const { mutate: postCall } = usePostCall();

  const navigate = useNavigate();
  const { toast } = useToast();

  const [content, setContent] = useAtom(contentAtom);
  const setPostCallRequest = useSetAtom(postCallRequestAtom);
  const setIsLoading = useSetAtom(isLoadingAtom);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [, setReload] = useState(false);

  useEffect(() => {
    setContent('');
    setReload((prev) => !prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterCallData>();

  const reservationDate = watch('reservationDate');
  const reservationTime = watch('reservationTime');
  const consultationType = watch('consultationType');

  const toFormatTimeData = (
    reservationDate: Date | undefined,
    reservationTime: string | undefined
  ) => {
    const selectedHour = (reservationTime ?? '00:00-00:00')
      .split('-')[0]
      .split(':')[0];
    const selectedMinute = (reservationTime ?? '00:00-00:00')
      .split('-')[0]
      .split(':')[1];

    const date = reservationDate ?? new Date(Date.now());

    date.setHours(+selectedHour);
    date.setMinutes(+selectedMinute);

    const localeString = format(date, 'yyyy-MM-dd HH:mm:ss');
    return localeString.split(' ').join('T');
  };

  const onSubmit: SubmitHandler<RegisterCallData> = ({
    reservationDate,
    reservationTime,
    consultationType,
  }) => {
    if (!isChecked1 || !isChecked2) {
      showToast(toast, '개인정보 수집 및 이용에 동의해야 합니다.');
      return;
    }

    if (!textAreaRef.current) {
      return;
    }

    setContent(textAreaRef.current?.value);

    setPostCallRequest({
      call_date: toFormatTimeData(reservationDate, reservationTime),
      category: consultationType,
      content: textAreaRef.current?.value,
    } as PostCallRequest);
    postRecommendList({ query: textAreaRef.current?.value });
    setIsLoading(true);
    if (from === 'ai') {
      postCall({
        call_date: toFormatTimeData(reservationDate, reservationTime),
        category: consultationType,
        content: textAreaRef.current?.value,
      } as PostCallRequest);
    } else {
      navigate('/ai/answer/call');
    }
  };

  const { data: callAvailability } = useGetCallAvailability({
    date: reservationDate ? format(reservationDate, 'yyyy-MM-dd') : '',
  });

  useEffect(() => {
    if (!callAvailability) {
      return;
    }
    const slots = callAvailability.data.map(
      ({ time_slot, available_slots }) => time_slot + ' ' + available_slots
    );

    setTimeSlots(slots);
  }, [callAvailability]);

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
              <textarea
                className='mt-1 block w-full rounded border border-gray-300 p-2 text-gray-800'
                placeholder='문의 내용을 입력해주세요.'
                defaultValue={content}
                rows={4}
                ref={textAreaRef}
              />
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
