import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

type ModalFormPageProps = {
  isChecked1: boolean;
  isChecked2: boolean;
  setIsChecked1: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChecked2: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
};

export default function ModalFormPage({
  isChecked1,
  isChecked2,
  setIsChecked1,
  setIsChecked2,
  handleClose,
}: ModalFormPageProps) {
  return (
    <div className='w-full'>
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='w-[22.5rem] space-y-4 rounded-lg bg-white p-6'>
          <h2 className='text-lg font-semibold'>이용 약관 동의</h2>
          <div className='space-y-4 text-left'>
            <div>
              <div
                className='flex items-center space-x-2'
                onClick={() => setIsChecked1((prev) => !prev)}
              >
                <Check
                  className={`h-5 w-5 ${
                    isChecked1 ? 'text-black' : 'text-gray-400'
                  }`}
                />
                <label className='ml-2 text-left'>이용약관(필수)</label>
              </div>
              <textarea
                readOnly
                className='mt-2 h-24 w-full rounded-md border p-2'
                value='이용약관...'
              />
            </div>

            <div>
              <div
                className='flex items-center space-x-2'
                onClick={() => setIsChecked2((prev) => !prev)}
              >
                <Check
                  className={`h-5 w-5 ${
                    isChecked2 ? 'text-black' : 'text-gray-400'
                  }`}
                />
                <label className='ml-2'>개인정보 처리방침(필수)</label>
              </div>
              <textarea
                readOnly
                className='mt-2 h-24 w-full rounded-md border p-2'
                value='개인정보...'
              />
            </div>
          </div>
          {isChecked1 && isChecked2 ? (
            <Button
              onClick={handleClose}
              className='h-[3.1875rem] w-full rounded-[1.875rem] bg-[#454545] font-bold hover:bg-[#545454]'
            >
              동의합니다
            </Button>
          ) : (
            <Button className='h-[3.1875rem] w-full rounded-[1.875rem] bg-[#E4E4E4] font-bold text-[#D2D2D2] hover:bg-[#E4E4E4]'>
              동의합니다
            </Button>
          )}

          <Button
            variant='outline'
            className='h-[3.1875rem] w-full rounded-[1.875rem] border-[#454545] bg-white font-bold text-[#454545] hover:bg-[#f8f8f8]'
            onClick={handleClose}
          >
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}
