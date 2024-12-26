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
                value={`제 1조 목적 본 약관은 하나은행 (이하 "은행")이 제공하는 상담 예약 서비스(이하 "서비스")의 이용과 관련하여 은행과 이용자 간의 권리, 의무, 책임사항 및 기타 필요한 사항을 규정함을 목적으로 합니다. 제 2조 서비스 이용 은행은 이용자가 본 약관에 동의한 경우에 한하여 서비스를 제공합니다. 예약은 은행이 정한 절차에 따라 진행됩니다.제 3조 책임의 제한 은행은 이용자의 귀책 사유로 발생한 손해에 대해 책임을 지지 않습니다.천재지변 등 불가항력으로 인해 서비스 제공이 불가능할 경우 은행은 책임을 면합니다.제 4조 기타 사항 본 약관에 명시되지 않은 사항은 관련 법령 및 은행의 정책에 따릅니다.`}
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
                value='1. 수집하는 개인정보 항목 - 필수 항목: 이름, 연락처 2. 개인정보의 수집 및 이용 목적 - 상담 예약 확인 및 진행, 서비스 품질 향상을 위한 통계 분석. 3. 개인정보의 보유 및 이용 기간 - 상담 완료 후 1년간 보관하며, 관련 법령에 따라 보존 기간이 경과한 후 즉시 파기합니다. 4. 개인정보의 제3자 제공 - 하나은행은 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 5. 개인정보의 파기 절차 및 방법 - 보유 기간이 만료되거나 이용 목적이 달성된 경우, 개인정보는 즉시 파기됩니다. 6. 기타 사항 - 개인정보 보호와 관련된 문의는 하나은행 고객센터를 통해 접수하실 수 있습니다.'
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
