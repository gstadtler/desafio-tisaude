'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUser } from '@/hooks/useUser'
import { UpdateUser } from '@/types/User'
import { UserValidation } from './validators'
import { updateUser } from './lib'

export default function Profile() {
  const router = useRouter()
  const { user, isAdminUser } = useUser()

  const validation = UserValidation()

  const defaultFormValues = user
    ? {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      }
    : {}

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UpdateUser>({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: defaultFormValues,
  })

  const handleUpdate: SubmitHandler<UpdateUser> = async (values) => {
    if (user) {
      const response = await updateUser({ payload: values, userId: user.id })

      if (response?.status === 200) router.back()

      if (response?.status === 401) {
        setError('root', {
          type: 'validate',
          message: 'Esse usuário não pode ser alterado',
        })
      }
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="max-w-sm w-full space-y-8">
            <div className="">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Atualizar dados
              </h2>
            </div>
            <div className="mt-8 space-y-2">
              <input
                {...register('name')}
                placeholder="Nome"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {errors.name && (
                <p className="text-sm text-red-500 p-1">
                  {errors.name.message}
                </p>
              )}
              <input
                {...register('email')}
                placeholder="Email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {errors.email && (
                <p className="text-sm text-red-500 p-1">
                  {errors.email.message}
                </p>
              )}
              <input
                {...register('password')}
                placeholder="Senha"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {errors.password && (
                <p className="text-sm text-red-500 p-1">
                  {errors.password.message}
                </p>
              )}
              {isAdminUser && (
                <>
                  <input
                    {...register('role')}
                    placeholder="Cargo"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                  {errors.role && (
                    <p className="text-sm text-red-500 p-1">
                      {errors.role.message}
                    </p>
                  )}
                </>
              )}
              <input
                {...register('avatar')}
                placeholder="Avatar"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {errors.avatar && (
                <p className="text-sm text-red-500 p-1">
                  {errors.avatar.message}
                </p>
              )}
              <div>
                {errors.root && (
                  <p className="text-sm text-red-500 p-1">
                    {errors.root.message}
                  </p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Atualizar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
