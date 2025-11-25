import { ROLE } from './../routers/routes';
import {
  LOCAL_STORAGE,
  removeFromLocalStorage,
  saveToLocalStorage,
} from './utils';

type Role = (typeof ROLE)[keyof typeof ROLE];

interface AuthPayload {
  role?: Role;
  userInformation?: unknown;
  token?: string;
}

export const setAuth = ({ role, userInformation, token }: AuthPayload) => {
  if (userInformation !== undefined) {
    saveToLocalStorage(LOCAL_STORAGE.GET_ME, JSON.stringify(userInformation));
  }

  if (role !== undefined) {
    saveToLocalStorage(LOCAL_STORAGE.ROLE, role);
  }

  if (token !== undefined) {
    saveToLocalStorage(LOCAL_STORAGE.TOKEN, token);
  }
};

export const removeAuth = () => {
  removeFromLocalStorage(LOCAL_STORAGE.GET_ME);
  removeFromLocalStorage(LOCAL_STORAGE.ROLE);
  removeFromLocalStorage(LOCAL_STORAGE.TOKEN);
};
