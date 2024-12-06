import ModalFormPage from '@/pages/Register/Modal';
import { Check } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

interface AgreementCheckboxProps {
  isChecked1: boolean;
  isChecked2: boolean;
  setIsChecked1: Dispatch<SetStateAction<boolean>>;
  setIsChecked2: Dispatch<SetStateAction<boolean>>;
}

export function AgreementCheckbox({
  isChecked1,
  isChecked2,
  setIsChecked1,
  setIsChecked2,
}: AgreementCheckboxProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className='flex items-center space-x-2 pb-2'>
      <div onClick={handleOpenModal}>
        <Check
          className={`h-5 w-5 ${isChecked1 && isChecked2 ? 'text-black' : 'text-gray-400'}`}
        />
      </div>
      <label
        className={`${isChecked1 && isChecked2 ? 'text-black' : 'text-gray-400'}`}
        onClick={handleOpenModal}
      >
        개인 정보 수집 및 이용 동의
      </label>

      <div className='z-50'>
        {isModalOpen && (
          <ModalFormPage
            isChecked1={isChecked1}
            isChecked2={isChecked2}
            setIsChecked1={setIsChecked1}
            setIsChecked2={setIsChecked2}
            handleClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}
