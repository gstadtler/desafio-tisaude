'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SigninValidation } from '../validators'
import { SignInValues } from '@/types/User'

export default function SignIn() {
  const router = useRouter()
  const validation = SigninValidation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInValues>({
    resolver: yupResolver(validation),
    mode: 'onChange',
  })

  async function handleSignIn({ email, password }: SignInValues) {
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (response?.error) {
      if (response.status === 401) {
        setError('root', {
          type: 'validate',
          message: 'Email ou senha inválidos',
        })
      }
      return
    }

    router.replace('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8">
        <div className="">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Entrar na sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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
          </div>
          {errors.root && (
            <p className="text-sm text-red-500">{errors.root.message}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Ainda não possui conta? Cadastre-se
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
