import { useForm } from 'react-hook-form';
import z from 'zod';
import WrapperSection from '@/components/common/WapperSeccion';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormFieldInput from '@/components/common/hookForm/FormFieldInput';
import { UseSignin } from '@/queries/auth';
import { Link, useNavigate } from 'react-router-dom';
import { ACCESS_PAGE_ROUTES } from '@/routers/routes';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Tên người dùng phải có ít nhất 2 ký tự.',
    }),
    password: z.string().min(6, {
      message: 'Mật khẩu phải có ít nhất 6 ký tự.',
    }),
    phone: z
      .string()
      .min(10, { message: 'Số điện thoại phải có ít nhất 10 ký tự.' })
      .regex(/^[0-9]+$/, {
        message: 'Số điện thoại chỉ được chứa các chữ số.',
      }),
    rePassword: z.string().min(6, {
      message: 'Mật khẩu phải có ít nhất 6 ký tự.',
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: 'Mật khẩu không khớp.',
    path: ['rePassword'],
  });

const SigninPage = () => {
  const signin = UseSignin();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      rePassword: '',
      phone: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signin.mutate(values, {
      onSuccess: (data) => {
        navigate(ACCESS_PAGE_ROUTES.LOGIN, {
          state: { phone: data.user?.phone },
        });
      },
    });
  }

  return (
    <WrapperSection className='mt-[200px]'>
      <div className='w-full max-w-md mx-auto '>
        <h1 className='text-3xl font-semibold mb-6 text-center'>Đăng Ký</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormFieldInput
              control={form.control}
              name='name'
              label='Tên người dùng'
              placeholder='Nhập tên người dùng'
              autoComplete='new-name'
            />
            <FormFieldInput
              control={form.control}
              name='phone'
              label='Số điện thoại'
              placeholder='Nhập số điện thoại'
              type='number'
              autoComplete='new-phone'
            />
            <FormFieldInput
              control={form.control}
              name='password'
              label='Mật khẩu'
              placeholder='Nhập mật khẩu'
              type='password'
              autoComplete='new-password'
            />
            <FormFieldInput
              control={form.control}
              name='rePassword'
              label='Nhập lại Mật khẩu'
              placeholder='Nhập mật khẩu'
              type='password'
              autoComplete='new-password'
            />
            <Button type='submit' className='w-full'>
              Đăng ký
            </Button>
          </form>
        </Form>
      </div>
    </WrapperSection>
  );
};

export default SigninPage;
