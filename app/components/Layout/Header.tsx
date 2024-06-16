'use client';
import Image from 'next/image';
import { NavBar } from '@app/components/Layout/NavBar/NavBar';
import testIds from '@app/utils/test-ids';
import { useState } from 'react';
import { maxWidthClassnames } from '@app/utils/tailwind-common-classes';

const Header = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <header
        className="absolute md:fixed h-header bg-white z-40 w-full"
        data-testid={testIds.LAYOUT.HEADER}
      >
        <div className={`${maxWidthClassnames} relative flex justify-center mx-auto gap-8 h-header items-center`}>
          <a
            href="/"
            target="_self"
            className="flex flex-col justify-between items-center min-w-[300px]"
          >
            <Image
              src="/logo/w_190.jpg"
              alt="Logo"
              width={200}
              height={200}
              priority={true}

            />
          </a>
          <div className="flex-grow pb-5 pr-5">
            <NavBar />
          </div>
        </div>
      </header>
      <div className="h-header"></div>
    </>
  );
};

export default Header;
