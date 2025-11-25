export const USER = {
  LIST: '/users',
  DETAIL: (id: string) => `/users/${id}`,
  CREATE: '/users',
  UPDATE: (id: string) => `/users/${id}`,
  DELETE: (id: string) => `/users/${id}`,
};

export const AUTH = {
  LOGIN: 'auth/login',
  SIGNIN: 'auth/sign-up',
  LOGOUT: 'auth/logout',
  REFRESH_TOKEN: 'auth/refresh-token',
  GET_ME: 'auth/get-me',
  CHANGE_PASSWORD: 'auth/change-password',
  UPDATE_PROFILE: 'auth/update-profile',
  RESET_PASSWORD: 'auth/reset-password',
};
