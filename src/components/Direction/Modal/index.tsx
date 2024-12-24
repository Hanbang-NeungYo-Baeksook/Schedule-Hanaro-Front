import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

type Props = {
  buttonTitle: string;
  buttonVariant: 'default' | 'ghost' | 'outline';
  buttonSize: string;
  modalTitle: string;
  modalDescription1: string;
  modalDescription2: string;
  modalButtonTitle: string;
  navigateTo?: string;
  onClick: () => void;
};

export default function Modalbutton({
  buttonTitle,
  buttonVariant,
  buttonSize,
  modalTitle,
  modalDescription1,
  modalDescription2,
  modalButtonTitle,
  onClick,
}: Props) {
  const [checkBox, setCheckBox] = useState(false);

  const toggleCheckBox = () => {
    setCheckBox((cur) => !cur);
  };
  const handleAgree = () => {
    onClick();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`font-bold ${buttonSize}`} variant={buttonVariant}>
          {buttonTitle}
        </Button>
      </DialogTrigger>
      <DialogContent className='h-[15.0625rem] w-[21.375rem]'>
        <DialogHeader>
          <div className='flex flex-col gap-3'>
            <DialogTitle className='text-center text-[1.375rem]'>
              {modalTitle}
            </DialogTitle>
            <div className='flex flex-col items-center justify-center'>
              <DialogDescription>{modalDescription1}</DialogDescription>
              <DialogDescription>{modalDescription2}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className='flex items-center justify-center gap-2'>
          <Checkbox
            id='accept'
            className='mt-0.5'
            onCheckedChange={toggleCheckBox}
          />
          <label
            htmlFor='accept'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            확인하였습니다.
          </label>
        </div>

        <DialogFooter>
          <div className='flex w-full gap-3'>
            <DialogClose asChild>
              <Button
                variant='outline'
                className='h-[3.1875rem] w-1/3 rounded-[1.875rem] border-[#454545] bg-white font-bold text-[#454545] hover:bg-[#f8f8f8]'
                onClick={() => setCheckBox(false)}
              >
                취소
              </Button>
            </DialogClose>

            {checkBox ? (
              <Button
                onClick={handleAgree}
                className='h-[3.1875rem] w-2/3 rounded-[1.875rem] bg-[#454545] font-bold hover:bg-[#545454]'
              >
                {modalButtonTitle}
              </Button>
            ) : (
              <Button className='h-[3.1875rem] w-2/3 rounded-[1.875rem] bg-[#E4E4E4] font-bold text-[#D2D2D2] hover:bg-[#E4E4E4]'>
                {modalButtonTitle}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
