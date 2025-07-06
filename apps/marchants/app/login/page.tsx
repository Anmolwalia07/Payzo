'use client';

import Logo from '@repo/ui/Logo';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SlArrowLeft } from "react-icons/sl";


export default function MerchantLoginPage() {
  const router = useRouter();
  return (
    <>
    <div className="w-full h-20 sm:h-22 shadow items-center flex"><Logo/></div>
    <div className="mt-8 flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
       <div className="absolute left-2 top-[14%] sm:left-5 sm:top-[15%]  flex items-center gap-1 md:gap-2 font-bold w-fit cursor-pointer" onClick={()=>{
       router.push('/');
       }}><SlArrowLeft />
      Back
     </div>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Merchant Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your merchant dashboard
          </p>
        </div>


        <div className="mt-8 space-y-6">
          <div className="mt-6 grid grid-cols-1 gap-3">
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              Sign in with Google
            </button>

            <button
              onClick={() => signIn('facebook', { callbackUrl: '/dashboard' })}
              className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Sign in with Facebook
            </button>
          </div>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Merchant support
              </span>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Need help? Contact{' '}
            <a href="mailto:merchant-support@example.com" className="font-medium text-indigo-600 hover:text-indigo-500">
              merchant support
            </a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}