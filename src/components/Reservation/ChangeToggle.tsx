import { ReactComponent as ChangeButton } from '@/assets/icons/reservation/change.svg';
import { ReactComponent as UpButton } from '@/assets/icons/reservation/up.svg';
import { ReactComponent as DownButton } from '@/assets/icons/reservation/down.svg';
import { useNavigate } from 'react-router-dom';

type ChangeToggleProps = {
  isOpen: boolean;
  onToggle: () => void;
  selectedTab: string;
  onSelect: (tabName: string) => void;
};

export function ChangeToggle({
  isOpen,
  onToggle,
  selectedTab,
  onSelect,
}: ChangeToggleProps) {
  return (
    <div className='flex flex-col items-start'>
      <button
        className='mb-[1.6875rem] flex items-center text-left text-[1.5rem] font-bold text-[#2b2b2b]'
        onClick={onToggle}
      >
        <span className='mr-[0.5rem]'>{selectedTab}</span>
        {isOpen ? <UpButton /> : <DownButton />}
      </button>
      {isOpen && (
        <div className='absolute z-50 mt-[2rem] w-[15.5rem] rounded-[.9375rem] bg-white drop-shadow'>
          <div className='py-[1rem]'>
            <ChangeToggleOption
              label='전화 상담 내역'
              selectedTab={selectedTab}
              onSelect={onSelect}
            />
            <ChangeToggleOption
              label='1:1 상담 내역'
              selectedTab={selectedTab}
              onSelect={onSelect}
            />
          </div>
        </div>
      )}
    </div>
  );
}

type ChangeToggleOptionProps = {
  label: string;
  selectedTab: string;
  onSelect: (label: string) => void;
};

function ChangeToggleOption({
  label,
  selectedTab,
  onSelect,
}: ChangeToggleOptionProps) {
  const navigate = useNavigate();
  const isDisabled = label === selectedTab;
  const handleSelect = () => {
    if (!isDisabled) {
      onSelect(label);
      if (label === '1:1 상담 내역') {
        navigate('/Reservation/Inquiry');
      } else if (label === '전화 상담 내역') {
        navigate('/Reservation/Call');
      }
    }
  };
  return (
    <div className=''>
      <div
        onClick={handleSelect}
        className={`relative mx-[15px] my-[0.5rem] flex items-center justify-between rounded-[.625rem] px-[1.25rem] py-[0.7rem] text-[1.0625rem] font-semibold ${
          isDisabled
            ? 'cursor-default text-[#a8a8a8]'
            : 'cursor-pointer hover:bg-[#f1f1f1]'
        }`}
      >
        <ChangeButton
          className='absolute right-[1rem] h-[1rem] w-[1rem]'
          fill={isDisabled ? '#a8a8a8' : '#000000'}
        />
        {label}
      </div>
    </div>
  );
}
