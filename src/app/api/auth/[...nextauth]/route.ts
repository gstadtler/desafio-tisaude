import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { apiFetch } from '@/services/api'

const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        if (credentials == null) return null

        const response = await apiFetch({
          url: '/auth/login',
          method: 'POST',
          data: {
            email: credentials.email,
            password: credentials.password,
          },
        })

        const tokens = response.data

        if (tokens) {
          const { data } = await apiFetch({
            url: '/auth/profile',
            method: 'GET',
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          })

          if (data) {
            const userData = { ...tokens, ...data }

            return userData
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token as any
      return session
    },
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
