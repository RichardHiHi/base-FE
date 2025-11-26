import ChangeDefaultPassword from '@/pages/changeDefaultPassword';
import ChangePassWordPage from '@/pages/ChangePassWordPage';
import FirstLoginPage from '@/pages/FirstLoginPage';
import LoginPage from '@/pages/LoginPage';
import ProfilePage from '@/pages/ProfilePage';
import SigninPage from '@/pages/SigninPage';
import TopPage from '@/pages/TopPage';
import EditUserPage from '@/pages/user/EditUser';
import UserListPage from '@/pages/user/UserListPage';

const COMMON_PAGE = {
  EDIT_USER: 'edit-user',
};

export const PAGE_ROUTES = {
  HOME: '/',
  LOGIN: '/log-in',
  SIGN_IN: '/sign-in',
  PROFILE: '/profile',
  CHANGE_PASSWORD: '/change-password',
  CHANGE_DEFAULT_PASSWORD: '/change-default-password',
  USER_LIST: '/users',
  EDIT_USER: `/${COMMON_PAGE.EDIT_USER}/:id`,
  FIRST_LOGIN: '/first-login',
};

export const ACCESS_PAGE_ROUTES = {
  ...PAGE_ROUTES,
  EDIT_USER: (id: string) => `/${COMMON_PAGE.EDIT_USER}/${id}`,
};

export const ROLE = {
  ADMIN: '0',
  EMPLOYEE: '1',
};

export const privateRouters = [
  {
    path: PAGE_ROUTES.HOME,
    element: <TopPage />,
    roleBan: [],
  },
  {
    path: PAGE_ROUTES.PROFILE,
    element: <ProfilePage />,
    roleBan: [],
  },
  {
    path: PAGE_ROUTES.CHANGE_PASSWORD,
    element: <ChangePassWordPage />,
    roleBan: [],
  },
  {
    path: PAGE_ROUTES.CHANGE_DEFAULT_PASSWORD,
    element: <ChangeDefaultPassword />,
    roleBan: [],
  },
  {
    path: PAGE_ROUTES.FIRST_LOGIN,
    element: <FirstLoginPage />,
    roleBan: [],
  },
  {
    path: PAGE_ROUTES.USER_LIST,
    element: <UserListPage />,
    roleBan: [ROLE.EMPLOYEE],
  },
  {
    path: PAGE_ROUTES.EDIT_USER,
    element: <EditUserPage />,
    roleBan: [ROLE.EMPLOYEE],
  },
];

export const PublicRouters = [
  {
    path: PAGE_ROUTES.SIGN_IN,
    element: <SigninPage />,
  },
  {
    path: PAGE_ROUTES.LOGIN,
    element: <LoginPage />,
  },
];
