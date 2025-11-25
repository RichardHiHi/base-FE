import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import WrapperSection from '@/components/common/WapperSeccion';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { PAGE_ROUTES } from '@/routers/routes';
import FormFieldInput from '@/components/common/hookForm/FormFieldInput';
import FormFieldSelect from '@/components/common/hookForm/FormFieldSelect';
import {
  useCreateUser,
  useGetDetailUser,
  useUpdateUser,
} from '@/queries/users';
import { RATE, ROLE } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import type { newUserBody, updateAdminBody } from '@/api/user';
import { toast } from 'sonner';
import { GET_ME_QUERY_KEY, useResetPassWord } from '@/queries/auth';

const PAY_RATE_TYPE = {
  DAY: '0',
  HOUR: '1',
};

const baseSchema = {
  name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự.' }),
  phone: z
    .string()
    .min(10, { message: 'Số điện thoại phải có ít nhất 10 ký tự.' })
    .regex(/^[0-9]+$/, { message: 'Số điện thoại chỉ được chứa số.' }),
  email: z.string().email({ message: 'Email không hợp lệ.' }),
};

const profileAdminFormSchema = z.object({
  ...baseSchema,
  role: z.string(),
  rate: z.string(),
  payRateType: z.string(),
});

const defaultAdminValues = {
  name: '',
  phone: '',
  email: '',
  role: '',
  rate: '',
  payRateType: '',
};

type ProfileAdminFormValues = z.infer<typeof profileAdminFormSchema>;

const EditUserPage = () => {
  const navigator = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isNewUserPage = id === 'new';
  const { data: userData, isSuccess } = useGetDetailUser(
    id || '',
    !isNewUserPage
  );

  const updateUser = useUpdateUser();
  const createUser = useCreateUser();
  const queryClient = useQueryClient();
  const resetPassWord = useResetPassWord();

  const form = useForm<ProfileAdminFormValues>({
    resolver: zodResolver(profileAdminFormSchema),
    defaultValues: defaultAdminValues,
  });

  const payRateType = form.watch('payRateType');
  const RoleType = form.watch('role');

  function onSubmit(values: ProfileAdminFormValues) {
    const payload = { ...values };
    if (values.payRateType === RATE.DAY) {
      payload.rate = '';
    }

    if (values.role === ROLE.ADMIN) {
      payload.rate = '';
      payload.payRateType = RATE.DAY;
    }

    if (isNewUserPage) {
      createUser.mutate(
        {
          payload: payload as newUserBody,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GET_ME_QUERY_KEY });
            navigator(PAGE_ROUTES.USER_LIST);
          },
        }
      );
    } else {
      updateUser.mutate(
        {
          id: id || '',
          payload: payload as updateAdminBody,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GET_ME_QUERY_KEY });
            navigator(PAGE_ROUTES.USER_LIST);
          },
        }
      );
    }
  }

  const resetpassWord = () => {
    if (id) {
      resetPassWord.mutate(id);
    }
  };

  useEffect(() => {
    if (isNewUserPage) {
      form.reset({
        role: '',
        name: '',
        email: '',
        phone: '',
        rate: '',
        payRateType: '',
      });
      return;
    }

    if (isSuccess && !isNewUserPage) {
      form.reset({
        role: userData.user.role || '',
        name: userData.user.name || '',
        email: userData.user.email || '',
        phone: userData.user.phone || '',
        rate: userData.user.rate?.toString() || '',
        payRateType: userData.user.payRateType?.toString() || '',
      });
    }
  }, [isSuccess, userData, form]);

  return (
    <WrapperSection className='mt-[100px]'>
      <div className='w-full max-w-md mx-auto'>
        <h1 className='text-3xl font-semibold mb-6 text-center'>Chỉnh sửa</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-6'>
              <FormFieldInput
                control={form.control}
                name='name'
                label='Tên'
                placeholder='Nhập tên của bạn'
              />
              <FormFieldInput
                control={form.control}
                name='phone'
                label='Số điện thoại'
                placeholder='Nhập số điện thoại'
                type='number'
              />
              <FormFieldInput
                control={form.control}
                name='email'
                label='Email'
                placeholder='Nhập email của bạn'
                type='email'
              />
              <FormFieldSelect
                control={form.control}
                name='role'
                label='role'
                placeholder='Chọn role'
                options={[
                  { value: '0', label: 'Admin' },
                  { value: '1', label: 'Employee' },
                ]}
              />
              <FormFieldSelect
                control={form.control}
                name='payRateType'
                label='PayRateType'
                placeholder='Chọn payRateType'
                disabled={RoleType === ROLE.ADMIN}
                options={[
                  { value: PAY_RATE_TYPE.DAY, label: 'Day' },
                  { value: PAY_RATE_TYPE.HOUR, label: 'Hour' },
                ]}
              />
              <FormFieldInput
                control={form.control}
                disabled={
                  payRateType === PAY_RATE_TYPE.DAY || RoleType === ROLE.ADMIN
                }
                name='rate'
                label='Rate'
                placeholder='Nhập Rate'
                type='number'
              />
            </div>
            <Button type='submit' className='w-full mt-[60px]'>
              {isNewUserPage ? 'Thêm' : 'Cập nhật'}
            </Button>
            <Button
              type='button'
              variant='outline'
              className='w-full mt-[10px]'
              onClick={resetpassWord}
            >
              Reset mật khẩu
            </Button>
          </form>
        </Form>
      </div>
    </WrapperSection>
  );
};

export default EditUserPage;
