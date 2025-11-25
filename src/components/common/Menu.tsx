import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Image from './Image';
import { NavLink } from 'react-router';
import { icons } from '../constants/images';

export const Menu = ({ menuItems = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const defaultMenuItems = [
    { id: 1, title: '自分の記録', href: '/' },
    { id: 2, title: '体重グラフ', href: '#' },
    { id: 3, title: '目標', href: '#' },
    { id: 4, title: '選択中のコース', href: '#' },
    { id: 5, title: 'コラム一覧', href: '/column' },
    { id: 6, title: '設定', href: '#' },
  ];

  const items = menuItems.length > 0 ? menuItems : defaultMenuItems;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className='relative '>
        <button
          onClick={toggleMenu}
          className={twMerge(
            isMenuOpen && 'bg-[#777777]',
            'hover:bg-primary transition-all duration-200 z-50'
          )}
        >
          {!isMenuOpen && (
            <Image src={icons.logo} className={'cursor-pointer'} />
          )}
          {isMenuOpen && <Image src={icons.logo} className='cursor-pointer' />}
        </button>

        {isMenuOpen && (
          <div className='absolute top-[82%] left-0 translate-x-[-128px] w-48 bg-[#777777] shadow-lg z-50 cursor-pointer'>
            <ul className='py-1'>
              {items.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.href}
                    className='block px-4 py-2 text-white hover:bg-gray-700 transition-all duration-100'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className='fixed inset-0 z-41' onClick={toggleMenu} />
      )}
    </>
  );
};
