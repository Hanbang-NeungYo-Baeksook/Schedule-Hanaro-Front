type ReservationDetailHeaderProps = {
  title: string;
  tags: string[];
};

const ReservationDetailCallTags = ({
  title,
  tags,
}: ReservationDetailHeaderProps) => {
  return (
    <div className='flex w-full items-center'>
      <label className='ml-2 text-2xl font-bold'>{title}</label>
      <div className='ml-4 flex space-x-2'>
        {tags.map((label, index) => (
          <span
            key={index}
            className='rounded-full bg-[#008485]/15 px-3 py-1 text-sm text-[#008485]'
          >
            #{label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ReservationDetailCallTags;
