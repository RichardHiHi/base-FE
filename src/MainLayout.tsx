import { Outlet } from 'react-router-dom';

import NavBar from '@/components/navbar';

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <div className='mt-[64px]' />
      <Outlet />
    </>
  );
};

export default MainLayout;
