import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../lib/axios';
import { USER } from '@/constants/endpoints';
import {
  createUser,
  deleteUser,
  getDetailUser,
  getListUser,
  updateUser,
} from '@/api/user';

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await api.get(USER.LIST);
      return data;
    },
  });

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Parameters<typeof updateUser>[1];
    }) => {
      return updateUser(id, payload);
    },
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: Parameters<typeof createUser>[0];
    }) => {
      return createUser(payload);
    },
  });
};

export const DETAIL_USER_QUERY_KEY = ['detail-users'];
export const useGetDetailUser = (id: string, isCall: boolean = true) =>
  useQuery({
    queryKey: [...DETAIL_USER_QUERY_KEY, id],
    queryFn: () => getDetailUser(id),
    enabled: isCall,
  });

export const USER_LIST_QUERY_KEY = ['user-list'];
export const UseUserList = () =>
  useQuery({
    queryKey: USER_LIST_QUERY_KEY,
    queryFn: getListUser,
  });

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return deleteUser(id);
    },
  });
};
