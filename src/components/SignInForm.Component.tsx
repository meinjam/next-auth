'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { handleCredentialsSignIn } from '@/lib/actions/authActions';
import { signInSchema } from '@/lib/schema/authSchema';

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setServerError(null);

    try {
      const result = await handleCredentialsSignIn(data.email, data.password);
      // console.log(result);
      if (result?.message) {
        setServerError(result?.message);
      }
    } catch (error) {
      setServerError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className='w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden'>
      <div className='px-6 py-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>Sign In</h2>
        <p className='text-gray-600 mb-6'>Enter your credentials to access your account</p>

        {serverError && <p className='bg-red-200 rounded p-3 mb-6'>{serverError}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              id='email'
              type='email'
              placeholder='you@example.com'
              {...register('email')}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className='mt-1 text-sm text-red-600' role='alert'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <input
              id='password'
              type='password'
              placeholder='••••••••'
              {...register('password')}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && (
              <p className='mt-1 text-sm text-red-600' role='alert'>
                {errors.password.message}
              </p>
            )}
          </div>
          {serverError && (
            <div className='bg-red-50 border-l-4 border-red-400 p-4' role='alert'>
              <p className='text-sm text-red-700'>{serverError}</p>
            </div>
          )}
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
      <div className='px-6 py-4 bg-gray-50 border-t border-gray-200'>
        <p className='text-sm text-center text-gray-600'>
          Don't have an account?{' '}
          <a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
