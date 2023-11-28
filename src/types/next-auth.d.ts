// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      access_token: string
      refresh_token: string
      id: string
      email: string
      password: string
      name: string
      role: string
      avatar: string
      creationAt: string
      updatedAt: string
    }
  }
}
