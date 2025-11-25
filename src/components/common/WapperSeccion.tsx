import React from 'react';
import { twMerge } from 'tailwind-merge';

const WrapperSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        'max-w-[1200px] px-[24px] mx-auto my-[24px]',
        className
      )}
    >
      {children}
    </div>
  );
};

export default WrapperSection;
