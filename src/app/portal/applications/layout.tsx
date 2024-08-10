import React from 'react';
import Image from 'next/image';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen bg-neutral-900 relative ">
      <div className="h-full w-full flex flex-col items-center justify-center p-4 lg:p-10 gap-10 z-10 *:z-20">
        {children}
      </div>
      <Image
        src="/images/bg.png"
        alt="hero"
        className="z-1  top-0 left-0 hidden lg:fixed lg:block"
        objectFit="cover"
        fill
      />
    </div>
  );
}