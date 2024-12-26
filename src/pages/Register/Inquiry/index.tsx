import { Button } from '@/components/ui/button';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { ConsultationSelect } from '@/components/Register/ConsultationSelect';
import { AgreementCheckbox } from '@/components/Register/AgreementCheckbox';
import { ReusableInput } from '@/components/Register/ReusableInput';
import Header from '@/components/Header/Header';
import { Category } from '@/api/customer/calls';
import usePostInquiry from '@/hooks/query/customer/usePostInquiry';
import { useAtomValue } from 'jotai';
import { contentAtom } from '@/stores';

export type RegisterInquiryData = {
  name: string;
  consultationType: Category;
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

export function RegisterInquiryFormPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutate: postInquiry } = usePostInquiry();

  const content = useAtomValue(contentAtom);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterInquiryData>();

  const consultationType = watch('consultationType');

  const onSubmit: SubmitHandler<RegisterInquiryData> = ({
    consultationType: category,
  }) => {
    if (!isChecked1 || !isChecked2) {
      showToast(toast, '개인정보 수집 및 이용에 동의해야 합니다.');
      return;
    }
    postInquiry({ category, content });
  };

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const isFormComplete = consultationType && isChecked1 && isChecked2;

  return (
    <>
      <Header title='1:1 상담 예약' />
      <div className='mx-auto flex min-h-screen w-[90%] flex-col'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex min-h-screen w-full flex-col justify-between gap-[1rem] pt-[5rem]'
        >
          <div className='flex flex-col gap-[2rem]'>
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

            <div>
              <label className='mb-1 block pb-2 text-left text-lg font-semibold'>
                문의 내용
              </label>
              <span className='mt-1 block text-left text-gray-800'>
                {content || '문의 내용이 없습니다.'}
              </span>
            </div>
          </div>

          <div className='flex flex-col'>
            <AgreementCheckbox
              isChecked1={isChecked1}
              isChecked2={isChecked2}
              setIsChecked1={setIsChecked1}
              setIsChecked2={setIsChecked2}
            />
            <div className='flex justify-between pb-[6.5rem]'>
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
