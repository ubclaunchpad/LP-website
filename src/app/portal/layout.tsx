import React from 'react';
import { UserContextProvider } from '../lib/context/usercontext';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PortalNavbar from '@/components/general/portal/portalNav';


export default function Layout({ children }: { children: React.ReactNode }) {

  const authCookie = cookies().get("pb_auth");

  if (!authCookie) {
    redirect("/portal/auth");
  }
  
  return (
    <UserContextProvider authCookie={authCookie}>
    <div className="w-screen min-h-screen bg-neutral-900 relative flex flex-col overflow-x-hidden ">
      <PortalNavbar />
        {children}
    </div>
    </UserContextProvider>
  );
}

