import NextAuth, { NextAuthOptions } from 'next-auth';
// eslint-disable-next-line import/no-named-as-default
import CredentialsProvider from 'next-auth/providers/credentials';

import { loginUser } from '@/lib/api/authentification';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }
  interface JWT {
    id?: string;
    email: string;
    image?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userEmail: { label: 'userEmail', type: 'email' },
        userPassword: { label: 'userPassword', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.userEmail || !credentials?.userPassword) {
          throw new Error('Email et mot de passe requis.');
        }
        const user = await loginUser(credentials);
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.profilPicture = user.image; // Ajouter l'image de l'utilisateur au token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.image = token.profilPicture as string | null | undefined; // Ajouter l'image de l'utilisateur à la session
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
