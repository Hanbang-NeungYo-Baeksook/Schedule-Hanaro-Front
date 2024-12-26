import { Button } from '@/components/ui/button';
import { AgreementCheckbox } from '@/components/Register/AgreementCheckbox';
import { ConsultationSelect } from '@/components/Register/ConsultationSelect';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header/Header';
import { Category } from '@/api/customer/calls';
import { useAtom, useSetAtom } from 'jotai';
import { contentAtom, isLoadingAtom, postVisitRequestAtom } from '@/stores';
import usePostRecommendList from '@/hooks/query/customer/usePostRecommendList';
import usePostVisit from '@/hooks/query/customer/usePostVisit';

export type RegisterVisitData = {
  consultationType: Category;
  reservationDate: Date | undefined;
  reservationTime: string;
  title: string;
  content: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const showToast = (toast: any, description: string) => {
  toast({
    description,
    duration: 3000,
  });
};

export function RegisterVisitFormPage() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');

  const { branchId } = useParams<{ branchId: string }>();

  const { mutate: postRecommendList } = usePostRecommendList();
  const { mutate: postVisit } = usePostVisit();

  const { toast } = useToast();
  const navigate = useNavigate();

  const [content, setContent] = useAtom(contentAtom);
  const setPostVisitRequest = useSetAtom(postVisitRequestAtom);
  const setIsLoading = useSetAtom(isLoadingAtom);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
  } = useForm<RegisterVisitData>();

  const consultationType = watch('consultationType');

  const onSubmit: SubmitHandler<RegisterVisitData> = ({
    consultationType: category,
  }) => {
    if (!isChecked1 || !isChecked2) {
      showToast(toast, '개인정보 수집 및 이용에 동의해야 합니다.');
      return;
    }

    if (!textAreaRef.current) {
      return;
    }

    setContent(textAreaRef.current?.value);
    setPostVisitRequest({
      branch_id: +(branchId ?? '0'),
      content: textAreaRef.current?.value,
      category,
    });
    postRecommendList({ query: textAreaRef.current?.value });
    setIsLoading(true);
    if (from === 'ai') {
      postVisit({
        branch_id: +(branchId ?? '0'),
        content: textAreaRef.current?.value,
        category,
      });
    } else {
      navigate('/ai/answer/visit');
    }
  };

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const isFormComplete = consultationType && isChecked1 && isChecked2;

  return (
    <>
      <Header title='방문 상담 예약' />
      <div className='mx-auto flex min-h-screen w-[90%] flex-col'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex min-h-screen w-full flex-col justify-between gap-[1rem] pt-[5rem]'
        >
          <div className='flex flex-col gap-[2rem]'>
            <ConsultationSelect
              control={control}
              error={errors.consultationType?.message}
              fieldName={'consultationType'}
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
