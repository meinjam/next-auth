'use server';

import { signIn, signOut } from '@/auth';

import { AuthError } from 'next-auth';

export async function handleCredentialsSignIn(email: string, password: string) {
  try {
    await signIn('credentials', { email, password, redirectTo: '/' });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: 'Invalid credentials',
          };
        default:
          return {
            message: 'Something went wrong.',
          };
      }
    }
    throw error;
  }
}

export async function handleGithubSignIn() {
  await signIn('github', { redirectTo: '/' });
}

export async function handleGoogleSignIn() {
  // await signIn('google', { redirectTo: '/' });
}

export async function handleSignOut() {
  await signOut();
}
