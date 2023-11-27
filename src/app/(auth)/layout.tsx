import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'

interface PrivateLayoutTypes {
  children: ReactNode
}
export default async function PrivateLayout({ children }: PrivateLayoutTypes) {
  const session = await getServerSession(nextAuthOptions)

  if (session) {
    redirect('/')
  }

  return <>{children}</>
}
