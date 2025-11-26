import { AUTH, SETTINGS } from '../constants/endpoints';
import api from '../lib/axios';
import { ROLE } from './../routers/routes';

type Role = (typeof ROLE)[keyof typeof ROLE];

export interface LoginResponse {
  accessToken: string;
  result: { name: string; role: Role };
}

export interface LoginCredentials {
  phone: string;
  password: string;
}

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(AUTH.LOGIN, credentials);
  return data;
};

//////////////////////////////////////

export interface signinResponse {
  accessToken: string;
  user: { phone: string };
}

export interface signinCredentials {
  phone: string;
  password: string;
}

export const signin = async (
  credentials: signinCredentials
): Promise<signinResponse> => {
  const { data } = await api.post<signinResponse>(AUTH.SIGNIN, credentials);
  return data;
};

//////////////////////////////////////

export interface refreshTokenResponse {
  accessToken: string;
}

export const refreshToken = async (): Promise<refreshTokenResponse> => {
  try {
    const { data } = await api.get<refreshTokenResponse>(AUTH.REFRESH_TOKEN);
    return data;
  } catch (error) {
    console.log('error:', error);
    throw error;
  }
};

//////////////////////////////////////

export const Logout = async () => {
  try {
    await api.post(AUTH.LOGOUT);
  } catch (error) {
    throw error;
  }
};

//////////////////////////////////////

export interface getMeResponse {
  result: {
    phone: string;
    name: string;
    role: string;
    email: string;
  };
}

export const getMe = async (): Promise<getMeResponse> => {
  const { data } = await api.get(AUTH.GET_ME);
  return data;
};

///////////////////////////////////////

export const resetPassWord = async (id: string): Promise<getMeResponse> => {
  const { data } = await api.get(AUTH.RESET_PASSWORD + '/' + id);
  return data;
};

//////////////////////////////////////

export const changeDefaultPassWord = async (
  passWord: string
): Promise<getMeResponse> => {
  const { data } = await api.post(SETTINGS.CHANGE_DEFAULT_PASSWORD, {
    passWord,
  });
  return data;
};

//////////////////////////////////////

export interface changePassWordResponse {
  message: string;
  accessToken: string;
}

export interface changePassWordCredentials {
  currentPassword: string;
  newPassword: string;
}

export const changePassWord = async (
  body: changePassWordCredentials
): Promise<changePassWordResponse> => {
  const { data } = await api.patch(AUTH.CHANGE_PASSWORD, body);
  return data;
};

//////////////////////////////////////

export interface updateUserResponse {
  user: { phone: string; name: string; role: string; email: string };
}

export interface updateProfileBody {
  phone: string;
  name: string;
  email: string;
}

export const updateProfile = async (
  body: updateProfileBody
): Promise<updateUserResponse> => {
  const { data } = await api.put(AUTH.UPDATE_PROFILE, body);
  return data;
};
