import Header from '@/components/Header/Header';

type Props = {
  branchName: string;
};

export default function BranchDetailHeader({ branchName }: Props) {
  return (
    <>
      <div className='absolute z-10'>
        <Header title={branchName} />
      </div>
      <div className='pt-[3.5rem]'></div>
    </>
  );
}
