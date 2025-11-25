import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getFromLocalStorage, LOCAL_STORAGE } from '@/lib/utils';
import { PAGE_ROUTES } from '@/routers/routes';
import { removeAuth } from '@/lib/common';

const ProtectedRoute = () => {
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
  const user = getFromLocalStorage(LOCAL_STORAGE.GET_ME);
  const location = useLocation();
  const userData = user ? JSON.parse(user) : null;

  if (!token) {
    removeAuth();
    return <Navigate to={PAGE_ROUTES.LOGIN} replace />;
  }

  if (userData?.isFirstLogin && location.pathname !== PAGE_ROUTES.FIRST_LOGIN) {
    return <Navigate to={PAGE_ROUTES.FIRST_LOGIN} replace />;
  }

  if (
    !userData?.isFirstLogin &&
    location.pathname === PAGE_ROUTES.FIRST_LOGIN
  ) {
    return <Navigate to={PAGE_ROUTES.HOME} replace />;
  }

  return <Outlet />;
};
interface ProtectedRoleRouteProps {
  roleBan: string[];
}

const ProtectedRoleRoute = ({ roleBan }: ProtectedRoleRouteProps) => {
  const role = localStorage.getItem(LOCAL_STORAGE.ROLE) || '';

  if (role && roleBan.includes(role)) {
    return <Navigate to={PAGE_ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export { ProtectedRoute, ProtectedRoleRoute };
