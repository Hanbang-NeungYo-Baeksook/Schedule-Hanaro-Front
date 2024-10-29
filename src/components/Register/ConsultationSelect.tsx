import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { RegisterCallData, RegisterInquiryData } from '@/pages';
import { FormErrorMessage } from './FormErrorMessage';

type ConsultationSelectProps<T extends FieldValues> = {
  control: Control<T>;
  error: string | undefined;
  fieldName: Path<T>;
};

export function ConsultationSelect<
  T extends RegisterCallData | RegisterInquiryData,
>({ control, error, fieldName }: ConsultationSelectProps<T>) {
  return (
    <div>
      <label className='mb-1 block pb-2 text-left text-lg font-semibold'>
        상담 종류
      </label>
      <Controller
        name={fieldName}
        control={control}
        rules={{ required: '상담 종류를 선택해주세요.' }}
        render={({ field: { onChange, value } }) => {
          const selectedValue = typeof value === 'string' ? value : '';
          return (
            <Select
              onValueChange={onChange}
              value={value ? String(value) : undefined}
            >
              <SelectTrigger className='w-full'>
                <SelectValue
                  placeholder='상담 종류를 선택하세요'
                  className='text-base'
                >
                  {selectedValue || '상담 종류를 선택하세요'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {[
                  '예금',
                  '펀드',
                  '대출',
                  '외환',
                  '마이데이터/모바일/인터넷뱅킹',
                ].map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }}
      />
      <FormErrorMessage error={error} />
    </div>
  );
}
