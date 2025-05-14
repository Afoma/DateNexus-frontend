import { UserIcon } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Layout from '@/components/layouts/AuthLayout';
import Header from '@/components/global/Header';

const navItems = [
  {
    id: 1,
    name: 'Discover',
    icon: '/white-icon-2.png',
    isImage: true,
    active: false,
  },
  {
    id: 2,
    name: 'Inbox',
    icon: '/fluent-chat-20-filled.svg',
    isImage: true,
    active: false,
  },
  {
    id: 3,
    name: 'Matches',
    icon: '/group-2.png',
    isImage: true,
    active: true,
  },
  {
    id: 4,
    name: 'Explore',
    icon: '/group-1.png',
    isImage: true,
    active: false,
  },
  { id: 5, name: 'My Profile', icon: 'user', isImage: false, active: false },
];

const MatchPage = (): JSX.Element => {
  // Navigation items data for sidebar

  return (
    <Layout>
      <div className='z-10 relative mt-10'>
        <Header />
      </div>
      <div className='bg-white flex flex-col justify-center w-full p-4'>
        <div>
          <img
            src='/assets/match.png'
            alt=''
            className='max-w-[418px] w-full mx-auto'
          />
        </div>
        <img
          src='/assets/congrat-match.svg'
          alt=''
          className='max-w-[298px] w-full mx-auto'
        />
        <p className='text-center text-[#A3A3A3] text-[16px] mt-4'>
          <span className='bg-gradient-to-r from-[rgba(248,62,103,1)] to-[rgba(165,9,118,1)] bg-clip-text text-transparent'>
            You
          </span>{' '}
          and{' '}
          <span className='bg-gradient-to-r from-[rgba(248,62,103,1)] to-[rgba(165,9,118,1)] bg-clip-text text-transparent'>
            Jennifer
          </span>{' '}
          matched! Take the first step with your new partner
        </p>

        <div className='space-y-5 text-center mt-10'>
          <Button className="w-full max-w-[648px] h-[70px] rounded-2xl text-xl font-semibold font-['Poppins',Helvetica] bg-gradient-to-r from-[rgba(248,62,103,1)] to-[rgba(165,9,118,1)]">
            Chat Now
          </Button>

          <Button
            variant='outline'
            className="w-full max-w-[648px] h-[70px] bg-neutral-100 rounded-2xl text-xl font-semibold font-['Poppins',Helvetica] border-none"
          >
            <span className='bg-gradient-to-r from-[rgba(248,62,103,1)] to-[rgba(165,9,118,1)] bg-clip-text text-transparent'>
              Next Match
            </span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default MatchPage;
