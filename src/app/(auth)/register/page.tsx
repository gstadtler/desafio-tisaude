'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterValidation } from '../validators'
import { RegisterValues } from '@/types/User'
import { register as registerUser } from '../lib'
import Link from 'next/link'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

export default function Register() {
  const router = useRouter()
  const validation = RegisterValidation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: yupResolver(validation),
    mode: 'onChange',
  })

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

  async function handleRegister(values: RegisterValues) {
    const response = await registerUser({ payload: values })

    if (response?.status === 201) {
      handleSignIn({ email: values.email, password: values.password })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                {...register('name')}
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-sm text-red-500 p-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register('email')}
                id="email"
                name="email"
                autoComplete="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-sm text-red-500 p-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
              />
              {errors.password && (
                <p className="text-sm text-red-500 p-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register('avatar')}
                id="avatar"
                name="avatar"
                type="avatar"
                autoComplete="avatar"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Insira um link para a imagem do seu avatar"
              />
              {errors.avatar && (
                <p className="text-sm text-red-500 p-1">
                  {errors.avatar.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <ArrowUturnLeftIcon
                className="block h-4 w-4 text-indigo-600"
                aria-hidden="true"
              />
              <Link
                href="/signin"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Voltar para Login
              </Link>
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
