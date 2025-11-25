import { Navigate, Outlet } from 'react-router-dom';
import { getFromLocalStorage, LOCAL_STORAGE } from '@/lib/utils';
import { PAGE_ROUTES } from '@/routers/routes';

const PublicRoute = () => {
  const token = getFromLocalStorage(LOCAL_STORAGE.TOKEN);

  if (token) {
    return <Navigate to={PAGE_ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
