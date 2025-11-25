import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import z from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const saveToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const LOCAL_STORAGE = {
  TOKEN: 'token',
  GET_ME: 'getMe',
  ROLE: 'role',
};

export const ROLE = {
  ADMIN: '0',
  EMPLOYEE: '1',
};

export const RATE = {
  DAY: '0',
  HOUR: '1',
};

export const baseSchema = {
  name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự.' }),
  phone: z
    .string()
    .min(10, { message: 'Số điện thoại phải có ít nhất 10 ký tự.' })
    .regex(/^[0-9]+$/, { message: 'Số điện thoại chỉ được chứa số.' }),
  email: z.string().email({ message: 'Email không hợp lệ.' }),
};
