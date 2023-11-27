'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SessionControl } from '@/components/SessionControl'

export function Navbar() {
  const pathname = usePathname()

  const routesWithoutSessionControl = ['/signin', '/register']
  const hideSessionControl = routesWithoutSessionControl.includes(pathname)

  return (
    <nav className="flex justify-between">
      <div className="flex gap-3">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
      </div>
      {!hideSessionControl && <SessionControl />}
    </nav>
  )
}
