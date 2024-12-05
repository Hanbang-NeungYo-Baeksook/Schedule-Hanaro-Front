import { ReactComponent as Location } from '@/assets/icons/location.svg';

export function MyLocation({
  onClick,
  type,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type: 'map' | 'direction';
}) {
  return (
    <button
      type='button'
      className={`myLocation fixed z-10 self-end ${type == 'map' ? 'bottom-[20%] mr-[2.5rem]' : 'bottom-[21.375rem] mr-[4.25rem] max-[800px]:mr-[1rem] max-[450px]:bottom-[21.75rem] max-[450px]:mr-[1rem]'}`}
      onClick={onClick}
    >
      <Location width={30} height={30} />
    </button>
  );
}
