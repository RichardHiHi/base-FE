import Image from '@/components/common/Image';
import { FaMoon, FaPeopleGroup, FaSun } from 'react-icons/fa6';
import { IoPeopleOutline } from 'react-icons/io5';
import { NavLink, useNavigate } from 'react-router-dom';

import { icons } from '@/components/constants/images';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { removeAuth, setAuth } from '@/lib/common';
import { getFromLocalStorage, LOCAL_STORAGE, ROLE } from '@/lib/utils';
import { useGetMe, useLogout } from '@/queries/auth';
import { ACCESS_PAGE_ROUTES } from '@/routers/routes';
import { useEffect } from 'react';

const NavBar = () => {
  const logout = useLogout();
  const { theme, setTheme } = useTheme();
  const { data, isSuccess } = useGetMe();
  const navigate = useNavigate();
  const role = getFromLocalStorage(LOCAL_STORAGE.ROLE) || '';

  const menus = [
    {
      name: 'Nhân viên',
      link: '/users',
      icon: <FaPeopleGroup />,
      roleBan: [ROLE.EMPLOYEE],
    },
    {
      name: 'Giờ làm',
      link: '/record',
      icon: <FaPeopleGroup />,
    },
  ];

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        removeAuth();
        navigate(ACCESS_PAGE_ROUTES.LOGIN);
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setAuth({ role: data.result.role, userInformation: data.result });
    }
  }, [isSuccess]);

  return (
    <div className='h-[64px] w-screen bg-[#777777] dark:bg-[#222222] top-0 left-0 z-50 fixed border-b'>
      <div className='max-w-[1200px] mx-auto h-full '>
        <div className='flex items-center justify-between h-full'>
          <div>
            <NavLink to='/' end>
              <Image src={icons.logo} className=' w-[600px] h-[25px]' />
            </NavLink>
          </div>
          <div>
            <ul className='flex items-center gap-[16px] text-white'>
              {menus.map((menu, index) => {
                return !menu.roleBan?.includes(role) ? (
                  <li key={index}>
                    <NavLink
                      to={menu.link}
                      className='flex items-center text-[16px] transition-colors hover:text-gray-300'
                    >
                      <div className='relative'>
                        {typeof menu.icon === 'string' ? (
                          <Image
                            src={menu.icon}
                            className='mr-[8px] w-[25px] h-[25px]'
                          />
                        ) : (
                          <div className='mr-[8px]'>{menu.icon}</div>
                        )}
                      </div>
                      {menu.name}
                    </NavLink>
                  </li>
                ) : (
                  <></>
                );
              })}

              <li className='ml-[16px]'>
                <DropdownMenu>
                  <DropdownMenuTrigger className='flex items-center text-[16px] transition-colors hover:text-gray-300 focus:outline-none cursor-pointer'>
                    <IoPeopleOutline className='mr-[8px]' />
                    {data?.result?.name}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onSelect={() => navigate(ACCESS_PAGE_ROUTES.PROFILE)}
                    >
                      Thông tin
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleLogout}>
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li className='ml-4'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  <FaSun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                  <FaMoon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                  <span className='sr-only'>Toggle theme</span>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
