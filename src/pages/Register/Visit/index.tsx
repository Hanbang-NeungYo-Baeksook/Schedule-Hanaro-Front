import { Button } from '@/components/ui/button';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { ConsultationSelect } from '@/components/Register/ConsultationSelect';
import { AgreementCheckbox } from '@/components/Register/AgreementCheckbox';
import { ReusableInput } from '@/components/Register/ReusableInput';

export type RegisterVisitData = {
  name: string;
  consultationType: string;
  reservationDate: Date | undefined;
  reservationTime: string;
  inquiryTitle: string;
  inquiryContent: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const showToast = (toast: any, description: string) => {
  toast({
    description,
    duration: 3000,
  });
};

export function RegisterVisitFormPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterVisitData>();

  const onSubmit: SubmitHandler<RegisterVisitData> = (data) => {
    if (!isChecked1 || !isChecked2) {
      showToast(toast, '개인정보 수집 및 이용에 동의해야 합니다.');
      return;
    }
    console.log('예약 정보:', {
      ...data,
      consultationType: data.consultationType,
      reservationDate: data.reservationDate,
      reservationTime: data.reservationTime,
      inquiryTitle: data.inquiryTitle,
      inquiryContent: data.inquiryContent,
    });

    showToast(toast, '예약 완료되었습니다!');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  return (
    <div className='mx-auto flex min-h-[80%] w-[90%] flex-col justify-between py-5'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-1 flex-col'>
        <div className='flex-1 space-y-4'>
          <ReusableInput
            register={register}
            fieldName='name'
            error={errors.name?.message}
            label='이름'
            placeholder='ex) 김하나'
            type='text'
          />
          <ConsultationSelect
            control={control}
            error={errors.consultationType?.message}
            fieldName={'consultationType'}
          />

          <ReusableInput
            register={register}
            fieldName='inquiryTitle'
            error={errors.inquiryTitle?.message}
            label='상담 제목'
            placeholder='제목을 입력하세요.'
            type='text'
          />
          <ReusableInput
            register={register}
            fieldName='inquiryContent'
            error={errors.inquiryContent?.message}
            label='상담 내용'
            placeholder='내용을 입력하세요.'
            type='textarea'
          />
        </div>

        <div>
          <AgreementCheckbox
            isChecked1={isChecked1}
            isChecked2={isChecked2}
            setIsChecked1={setIsChecked1}
            setIsChecked2={setIsChecked2}
          />
          <div className='flex justify-between'>
            <Button
              type='button'
              onClick={() => navigate('/')}
              variant='ghost'
              className='w-1/4'
            >
              취소
            </Button>
            <Button type='submit' variant='default' className='ml-2 w-3/4'>
              예약하기
            </Button>
          </div>
        </div>
      </form>

      <Toaster />
    </div>
  );
}