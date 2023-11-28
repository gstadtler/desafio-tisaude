'use client'
import { useSession } from 'next-auth/react'
import { isAdmin } from '@/app/helpers/roles'
import { User } from '@/types/User'

interface useUserTypes {
  isAuthenticated: boolean
  isAdminUser: boolean
  user: User | undefined
}

export function useUser(): useUserTypes {
  const session = useSession()
  const user = session.data?.user as User | undefined

  const isAuthenticated = session.status === 'authenticated'

  const isAdminUser = isAuthenticated && !!user && isAdmin(user.role)

  const value = {
    isAuthenticated,
    isAdminUser,
    user,
  }

  return value
}
