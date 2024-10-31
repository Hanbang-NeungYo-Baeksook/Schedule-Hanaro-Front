import { LABEL } from '@/constants';

type CustomerInfoProps = {
  customerCount: number;
  name: string;
  phoneNumber: string;
  birthDate: string;
  inquiryCount: number;
};

export const CustomerInfo = ({
  customerCount,
  name,
  phoneNumber,
  birthDate,
  inquiryCount,
}: CustomerInfoProps) => {
  const customerDetails = [
    { label: LABEL[0].label, id: LABEL[0].id, value: name },
    { label: LABEL[1].label, id: LABEL[0].id, value: phoneNumber },
    { label: LABEL[2].label, id: LABEL[0].id, value: birthDate },
    { label: LABEL[3].label, id: LABEL[0].id, value: `${inquiryCount}회` },
  ];

  return (
    <div className='flex h-[18rem] w-[50%] flex-col justify-between rounded-lg bg-white p-[3rem] shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]'>
      <div className='flex items-center justify-between'>
        <span className='text-[.875rem] font-extrabold text-[#464646]'>
          현재 고객 정보
        </span>
        <span className='text-[1.375rem] font-extrabold text-[#008485]'>
          {customerCount}
        </span>
      </div>
      <hr />

      {customerDetails.map(({ label, id, value }) => (
        <div
          key={id}
          className='flex justify-between text-[.8125rem] font-medium text-[#666666]'
        >
          <span>{label}</span>
          <span className='font-bold'>{value}</span>
        </div>
      ))}
    </div>
  );
};
