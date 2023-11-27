'use client'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function SessionControl() {
  const router = useRouter()
  const session = useSession()

  const isAuthenticated = session.status === 'authenticated'

  if (!isAuthenticated) {
    return <Link href="/signin">Sign in</Link>
  }

  const user = session.data.user

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    })

    router.replace('/')
  }

  return (
    <div className="flex items-center gap-2.5">
      <p>Olá, {user?.name}</p>
      <button
        onClick={handleSignOut}
        className="p-2 w-20 border border-gray-300 rounded-md"
      >
        sair
      </button>
    </div>
  )
}
