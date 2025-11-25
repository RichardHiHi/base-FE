import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import FormFieldInput from '@/components/common/hookForm/FormFieldInput';
import FormFieldSelect from '@/components/common/hookForm/FormFieldSelect';
import WrapperSection from '@/components/common/WapperSeccion';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { baseSchema, getFromLocalStorage, LOCAL_STORAGE } from '@/lib/utils';
import { GET_ME_QUERY_KEY, useUpdateProfile } from '@/queries/auth';
import { DETAIL_USER_QUERY_KEY, useGetDetailUser } from '@/queries/users';
import { ACCESS_PAGE_ROUTES } from '@/routers/routes';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { updateProfileBody } from '@/api/auth';

const PAY_RATE_TYPE = {
  DAY: '0',
  HOUR: '1',
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

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = getFromLocalStorage(LOCAL_STORAGE.GET_ME);
  const id = user ? JSON.parse(user)?.id : null;
  const { data: userData, isSuccess } = useGetDetailUser(id);

  const queryClient = useQueryClient();
  const updateProfile = useUpdateProfile();

  const form = useForm<ProfileAdminFormValues>({
    resolver: zodResolver(profileAdminFormSchema),
    defaultValues: defaultAdminValues,
  });

  function onSubmit(values: ProfileAdminFormValues) {
    const payload: Partial<ProfileAdminFormValues> = { ...values };
    delete payload.role;
    delete payload.rate;
    delete payload.payRateType;

    updateProfile.mutate(payload as updateProfileBody, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [...DETAIL_USER_QUERY_KEY, id],
        });
        queryClient.invalidateQueries({ queryKey: GET_ME_QUERY_KEY });
      },
    });
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset({
        role: userData.user.role || '',
        name: userData.user.name || '',
        phone: userData.user.phone || '',
        email: userData.user.email || '',
        rate: userData.user.rate?.toString() || '',
        payRateType: userData.user.payRateType?.toString() || '',
      });
    }
  }, [isSuccess, userData, form]);

  return (
    <WrapperSection className='mt-[80px]'>
      <div className='w-full max-w-md mx-auto'>
        <h1 className='text-3xl font-semibold mb-6 text-center'>
          Thông Tin Cá Nhân
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-2'>
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
                label='Role'
                placeholder='Chọn role'
                options={[
                  { value: '0', label: 'Admin' },
                  { value: '1', label: 'Employee' },
                ]}
                disabled
              />
              <FormFieldSelect
                control={form.control}
                name='payRateType'
                label='Tính Lương Theo'
                placeholder='Chọn payRateType'
                options={[
                  { value: PAY_RATE_TYPE.DAY, label: 'Day' },
                  { value: PAY_RATE_TYPE.HOUR, label: 'Hour' },
                ]}
                disabled
              />
              <FormFieldInput
                control={form.control}
                name='rate'
                label='Rate'
                placeholder='Nhập Rate'
                type='number'
                disabled
              />
            </div>
            <Button type='submit' className='w-full mt-[40px]'>
              Cập nhật
            </Button>
            <Button
              type='button'
              variant='outline'
              className='w-full mt-[10px]'
              onClick={() => navigate(ACCESS_PAGE_ROUTES.CHANGE_PASSWORD)}
            >
              Đổi mật khẩu
            </Button>
          </form>
        </Form>
      </div>
    </WrapperSection>
  );
};

export default ProfilePage;
