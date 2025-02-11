import React from 'react';
import errorAnimations from '../../public/errorAnimations.json'
// import Lottie from "lottie-react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const ErrorPage = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col gap-0'>
      {/* <Lottie animationData={errorAnimations} className='w-[30%]' /> */}
      <div className='text-center space-y-2'>
        <h1 className='text-2xl font-semibold'>404 - Page Not Found</h1>
        <p className='max-w-lg'>Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or the URL could be incorrect.</p>
        <div>
          <Link href={'/'}>
            <Button>Back</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;