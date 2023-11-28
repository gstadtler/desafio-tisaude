/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link'
import { Fragment } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Menu, Transition } from '@headlessui/react'
import { useUser } from '@/hooks/useUser'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

export function AccountMenuControl() {
  const router = useRouter()

  const { isAuthenticated, user } = useUser()

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-blue-500">
        <Link href="/signin">Login</Link>
        <ArrowRightOnRectangleIcon
          className="block h-5 w-5"
          aria-hidden="true"
        />
      </div>
    )
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    })

    router.replace('/')
  }

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="relative flex items-center gap-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5" />
            <p>Olá, {user?.name}</p>
            <img
              className="h-8 w-8 rounded-full"
              src={user?.avatar}
              alt={user?.name}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <Link
                href="/profile"
                className={classNames('block px-4 py-2 text-sm text-gray-700')}
              >
                Sua conta
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button
                onClick={handleSignOut}
                className={classNames('block px-4 py-2 text-sm text-gray-700')}
              >
                Sair
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
