import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({ className, children }) => {
  return (
    <button
      className={twMerge(
        'gradient rounded-[6px] px-[8px] py-[16px] text-white w-[296px] cursor-pointer transition-all duration-100',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
