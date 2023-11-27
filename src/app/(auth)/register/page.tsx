'use client'
import { apiFetch } from '@/services/api'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
// import { LockClosedIcon } from '@heroicons/react/solid'
// import { AuthContext } from '../contexts/AuthContext'

interface RegisterValues {
  name: string
  email: string
  password: string
  avatar: string
}

export default function Register() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<RegisterValues>()

  async function handleSignIn({ email, password }: Partial<RegisterValues>) {
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (response?.error) {
      console.error(response)
      return
    }

    router.replace('/')
  }

  async function handleRegister({
    name,
    email,
    password,
    avatar,
  }: RegisterValues) {
    const response = await apiFetch({
      url: '/users/',
      method: 'POST',
      data: {
        name,
        email,
        password,
        avatar,
      },
    })

    if (response.status === 200) {
      handleSignIn({ email, password })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8">
        <div className="">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Cadastro
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(handleRegister)}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Nome
              </label>
              <input
                {...register('name')}
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                {...register('email')}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
              />
            </div>
            <div>
              <label htmlFor="avatar" className="sr-only">
                Avatar
              </label>
              <input
                {...register('avatar')}
                id="avatar"
                name="avatar"
                type="avatar"
                autoComplete="avatar"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Avatar"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
