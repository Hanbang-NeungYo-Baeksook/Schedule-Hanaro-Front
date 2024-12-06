import { BackButton } from '../ui/back';

type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  return (
    <header className='top_header fixed z-50 flex items-center justify-between bg-white py-[0.75rem] drop-shadow'>
      <div className='flex h-[2.375rem] w-[2.375rem] items-center pl-3'>
        <BackButton />
      </div>
      <div className='text-center text-[1.25rem] font-bold text-[#2b2b2b]'>
        {title}
      </div>
      <div className='h-[2.375rem] w-[2.375rem]'> </div>
    </header>
  );
}

export default Header;
