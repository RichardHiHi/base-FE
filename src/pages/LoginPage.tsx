import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import z from 'zod';

import WrapperSection from '@/components/common/WapperSeccion';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormFieldInput from '@/components/common/hookForm/FormFieldInput';
import { useLogin } from '@/queries/auth';
import { ACCESS_PAGE_ROUTES } from '@/routers/routes';
import { setAuth } from '@/lib/common';

const formSchema = z.object({
  phone: z.string().min(2, {
    message: 'Số điện Thoại phải có ít nhất 11 ký tự.',
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải có ít nhất 6 ký tự.',
  }),
});

const LoginPage = () => {
  const location = useLocation();
  const PhoneFromSignUp = location.state?.phone;
  const navigate = useNavigate();
  const login = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: PhoneFromSignUp || '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login.mutate(values, {
      onSuccess: (data) => {
        if (data.accessToken) {
          setAuth({
            token: data.accessToken,
            role: data.result.role,
            userInformation: data.result,
          });
          navigate(ACCESS_PAGE_ROUTES.HOME);
        }
      },
    });
  }

  return (
    <WrapperSection className='mt-[200px]'>
      <div className='w-full max-w-md mx-auto '>
        <h1 className='text-3xl font-semibold mb-6 text-center'>Đăng Nhập</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormFieldInput
              control={form.control}
              name='phone'
              label='Tên người dùng'
              placeholder='Nhập số điện thoại'
              type='number'
            />
            <FormFieldInput
              control={form.control}
              name='password'
              label='Mật khẩu'
              placeholder='Nhập mật khẩu'
              type='password'
            />
            <Button type='submit' className='w-full'>
              Đăng Nhập
            </Button>
            <p className='text-center text-sm text-gray-600 mt-4'>
              Bạn chưa có tài khoản?{' '}
              <Link
                to={ACCESS_PAGE_ROUTES.SIGN_IN}
                className='font-semibold text-blue-600 hover:underline'
              >
                Đăng ký
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </WrapperSection>
  );
};

export default LoginPage;
