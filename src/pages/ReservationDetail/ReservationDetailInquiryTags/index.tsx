type ReservationDetailTagProps = {
  tags: string[];
};

const ReservationDetailInquiryTags = ({ tags }: ReservationDetailTagProps) => {
  return (
    <div className='flex w-full items-center'>
      <div className='flex space-x-2'>
        {tags.map((label, index) => (
          <div
            key={index}
            className='rounded-full bg-[#008485]/15 px-3 py-1 text-sm text-[#008485]'
          >
            #{label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationDetailInquiryTags;
