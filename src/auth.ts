import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from '@/lib/schema/authSchema';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // validate credentials
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error('Invalid credentials:', parsedCredentials.error.errors);
          return null;
        }

        user = {
          id: '1',
          name: 'John Doe',
          email: 'hBqg3@example.com',
        };

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;

      const { pathname } = nextUrl;

      if (pathname.startsWith('/login') && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }

      // if (pathname.startsWith("/page2") && role !== "admin") {
      //     return Response.redirect(new URL('/', nextUrl));
      // }

      return !!auth;
    },
  },
  pages: {
    signIn: '/login',
  },
});
