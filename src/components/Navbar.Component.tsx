'use client';

import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';
import { handleSignOut } from '@/lib/actions/authActions';

const Navbar = () => {
  const { data: session } = useSession();

  console.log('rendered', session);

  return (
    <nav className='bg-primary py-4 text-white'>
      <div className='container flex items-center justify-between'>
        <div>
          <Link href='/' className='text-2xl'>
            Website
          </Link>
        </div>
        <menu className='flex items-center gap-x-10'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
          <li>
            {session ? (
              <form action={handleSignOut}>
                <button className='bg-purple-500 px-4 py-1 rounded'>Logout</button>
              </form>
            ) : (
              <Link href='/login'>Login</Link>
            )}
          </li>
        </menu>
      </div>
    </nav>
  );
};

export default Navbar;
