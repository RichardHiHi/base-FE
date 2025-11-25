import {
  changePassWord,
  getMe,
  login,
  Logout,
  resetPassWord,
  signin,
  updateProfile,
  type changePassWordCredentials,
  type changePassWordResponse,
  type LoginCredentials,
  type LoginResponse,
  type signinCredentials,
  type signinResponse,
  type updateProfileBody,
  type updateUserResponse,
} from '@/api/auth';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: login,
  });
};

export const UseSignin = () => {
  return useMutation<signinResponse, Error, signinCredentials>({
    mutationFn: signin,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: Logout,
  });
};

export const GET_ME_QUERY_KEY = ['getMe'];
export const useGetMe = () =>
  useQuery({
    queryKey: GET_ME_QUERY_KEY,
    queryFn: getMe,
    staleTime: 0,
    gcTime: 0,
  });

export const useResetPassWord = () =>
  useMutation({
    mutationFn: (id: string) => resetPassWord(id),
  });

export const UseChangePassWord = () => {
  return useMutation<changePassWordResponse, Error, changePassWordCredentials>({
    mutationFn: (body: changePassWordCredentials) => changePassWord(body),
  });
};

export const useUpdateProfile = () => {
  return useMutation<updateUserResponse, Error, updateProfileBody>({
    mutationFn: (body: updateProfileBody) => updateProfile(body),
  });
};
