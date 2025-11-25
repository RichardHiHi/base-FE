import { CommonDialog } from '@/components/common/CommonDialog';
import CommonTable, { type ColumnDef } from '@/components/common/CommonTable';
import WrapperSection from '@/components/common/WapperSeccion';
import { Button } from '@/components/ui/button';
import {
  useDeleteUser,
  USER_LIST_QUERY_KEY,
  UseUserList,
} from '@/queries/users';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { RATE, ROLE } from '@/lib/utils';

interface User {
  ids: string;
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  payRateType: string;
  rate: string;
}
import { useNavigate } from 'react-router-dom';
import { ACCESS_PAGE_ROUTES } from '@/routers/routes';

const UserListPage = () => {
  const { data, isSuccess } = UseUserList();
  const [users, setUsers] = useState<User[]>([]);
  const [userToDeleteId, setUserToDeleteId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useDeleteUser();
  const client = useQueryClient();
  const navigate = useNavigate();

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'ids',
      header: 'ID',
      headerClassName: 'w-[100px]',
      cellClassName: 'font-medium',
    },
    {
      accessorKey: 'name',
      header: 'Tên',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Số điện thoại',
    },
    {
      accessorKey: 'payRateType',
      header: 'Kiểu trả lương',
    },
    {
      accessorKey: 'rate',
      header: 'Rate',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      headerClassName: 'text-right',
      cellClassName: 'text-right',
    },
    {
      accessorKey: 'actions',
      header: 'Hành động',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      cell: (user: User) => (
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => navigate(ACCESS_PAGE_ROUTES.EDIT_USER(user.id))}
          >
            Sửa
          </Button>
          <Button
            variant='destructive'
            size='sm'
            onClick={() => {
              setIsOpen(true);
              setUserToDeleteId(user.id);
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const handleConfirmDelete = () => {
    if (userToDeleteId) {
      mutate(userToDeleteId, {
        onSuccess: () => {
          setIsOpen(false);
          client.invalidateQueries({ queryKey: USER_LIST_QUERY_KEY });
          setUserToDeleteId('');
        },
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const newUsers = data.map((user, index) => ({
        ...user,
        ids: index + 1 + '',
        role: user.role === ROLE.ADMIN ? 'Admin' : 'Employee',
        payRateType: user.payRateType === RATE.DAY ? 'Day' : 'Hour',
      }));
      data && setUsers(newUsers);
    }
  }, [isSuccess, data]);

  return (
    <WrapperSection className='mt-[100px]'>
      <h1 className='text-3xl font-semibold mb-6 text-center'>
        Danh sách người dùng
      </h1>
      <div className='flex justify-end mb-4'>
        <Button
          variant='outline'
          onClick={() => navigate(ACCESS_PAGE_ROUTES.EDIT_USER('new'))}
        >
          <PlusCircle className='mr-1 h-4 w-4' /> Thêm nhân viên
        </Button>
      </div>
      <CommonTable columns={columns} data={users} />
      <CommonDialog
        size='md'
        showClose={false}
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirmDelete}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title='Xác nhận xóa'
        description='Bạn có chắc chắn muốn xóa người dùng này?'
      >
        <></>
      </CommonDialog>
    </WrapperSection>
  );
};

export default UserListPage;
