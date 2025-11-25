import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router';
import { ProtectedRoleRoute, ProtectedRoute } from './routers/ProtectedRoute';
import PublicRoute from './routers/PublicRoute';
import MainLayout from './MainLayout';
import { privateRouters, PublicRouters } from './routers/routes';
import NotFoundPage from './pages/NotFoundPage';
import { useGetMe } from './queries/auth';
import { useEffect } from 'react';
import { setAuth } from './lib/common';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            {privateRouters.map((route, index) => (
              <Route
                element={
                  <ProtectedRoleRoute roleBan={route.roleBan} key={index} />
                }
              >
                <Route path={route.path} element={route.element} />
              </Route>
            ))}
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          {PublicRouters.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
        {/* 404 */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
