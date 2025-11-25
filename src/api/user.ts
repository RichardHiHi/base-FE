import { USER } from '@/constants/endpoints';
import api from '@/lib/axios';

export interface userResponse {
  user: {
    phone: string;
    name: string;
    role: string;
    email: string;
    rate: string;
    payRateType: string;
  };
}

export const getDetailUser = async (id: string): Promise<userResponse> => {
  const { data } = await api.get(USER.DETAIL(id));
  return data;
};

//////////////////////////////////////

export interface updateUserResponse {
  user: { phone: string; name: string; role: string; email: string };
}

export interface updateAdminBody {
  phone: string;
  name: string;
  role: string;
  email: string;
  rate: string;
  payRateType: string;
}

export interface updateEmployeeBody {
  phone: string;
  name: string;
  role: string;
}

export const updateUser = async (
  id: string,
  body: updateAdminBody | updateEmployeeBody
): Promise<updateUserResponse> => {
  const { data } = await api.put(USER.UPDATE(id), body);
  return data;
};

//////////////////////////////////////

export interface updateUserResponse {
  user: { phone: string; name: string; role: string; email: string };
}

export interface newUserBody {
  phone: string;
  name: string;
  role: string;
  email: string;
  rate: string;
  payRateType: string;
}

export const createUser = async (
  body: newUserBody
): Promise<updateUserResponse> => {
  const { data } = await api.post(USER.CREATE, body);
  return data;
};

//////////////////////////////////////

export interface userResponse {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  rate: string;
  payRateType: string;
  id: string;
}

export const getListUser = async (): Promise<userResponse[]> => {
  const { data } = await api.get(USER.LIST);
  return data.data;
};

//////////////////////////////////////

export const deleteUser = async (id: string): Promise<any> => {
  const { data } = await api.delete(USER.DELETE(id));
  return data.data;
};

//////////////////////////////////////
