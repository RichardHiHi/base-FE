import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import WrapperSection from '@/components/common/WapperSeccion';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormFieldInput from '@/components/common/hookForm/FormFieldInput';
import { ACCESS_PAGE_ROUTES } from '@/routers/routes';
import { UseChangePassWord } from '@/queries/auth';
import { removeAuth, setAuth } from '@/lib/common';
import { getFromLocalStorage, LOCAL_STORAGE } from '@/lib/utils';

const formSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: 'Mật khẩu hiện tại phải có ít nhất 6 ký tự.',
    }),
    newPassword: z.string().min(6, {
      message: 'Mật khẩu mới phải có ít nhất 6 ký tự.',
    }),
    confirmNewPassword: z.string().min(6, {
      message: 'Xác nhận mật khẩu mới phải có ít nhất 6 ký tự.',
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Mật khẩu mới và xác nhận mật khẩu mới không khớp.',
    path: ['confirmNewPassword'], // Gắn lỗi vào trường confirmNewPassword
  });

type ChangePasswordFormValues = z.infer<typeof formSchema>;

const FirstLoginPage = () => {
  const navigate = useNavigate();
  const changePassword = UseChangePassWord();
  const getMe = getFromLocalStorage(LOCAL_STORAGE.GET_ME) || '';

  const phone = JSON.parse(getMe)?.phone;

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  function onSubmit(values: ChangePasswordFormValues) {
    changePassword.mutate(values, {
      onSuccess: () => {
        removeAuth();
        navigate(ACCESS_PAGE_ROUTES.LOGIN, {
          state: { phone: phone },
        });
      },
    });
  }

  return (
    <WrapperSection className='mt-[100px]'>
      <div className='w-full max-w-md mx-auto'>
        <h1 className='text-3xl font-semibold mb-6 text-center'>
          Đổi Mật Khẩu
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormFieldInput
              control={form.control}
              name='currentPassword'
              label='Mật khẩu hiện tại'
              placeholder='Nhập mật khẩu hiện tại'
              type='password'
            />
            <FormFieldInput
              control={form.control}
              name='newPassword'
              label='Mật khẩu mới'
              placeholder='Nhập mật khẩu mới'
              type='password'
            />
            <FormFieldInput
              control={form.control}
              name='confirmNewPassword'
              label='Xác nhận mật khẩu mới'
              placeholder='Nhập lại mật khẩu mới'
              type='password'
            />
            <Button type='submit' className='w-full mt-[50px]'>
              Đổi Mật Khẩu
            </Button>
          </form>
        </Form>
      </div>
    </WrapperSection>
  );
};

export default FirstLoginPage;
