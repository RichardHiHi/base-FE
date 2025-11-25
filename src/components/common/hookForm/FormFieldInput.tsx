import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Control } from 'react-hook-form';

interface FormFieldInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  disabled?: boolean;
}

const FormFieldInput = ({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  onChange,
  autoComplete = '',
  disabled = false,
}: FormFieldInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type === 'number' ? 'text' : type}
              disabled={disabled}
              placeholder={placeholder}
              autoComplete={autoComplete}
              {...field}
              onChange={(e) => {
                if (type === 'number') {
                  const { value } = e.target;
                  if (/^[0-9]*$/.test(value)) {
                    field.onChange(value);
                  }
                } else {
                  onChange ? onChange(e) : field.onChange(e);
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldInput;
