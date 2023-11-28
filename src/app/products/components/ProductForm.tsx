'use client'
import { useFormContext } from 'react-hook-form'
import { CategoryOptions } from './CategoryOptions'
import { CreateProductProps } from '@/types/Products'

interface Props {
  title: string
}

export function ProductForm({ title }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateProductProps>()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8">
        <div className="">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title} produto
          </h2>
        </div>
        <div className="mt-8 space-y-2">
          <input
            {...register('title')}
            placeholder="Título"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          {errors.title && (
            <p className="text-sm text-red-500 p-1">{errors.title.message}</p>
          )}
          <input
            {...register('price')}
            placeholder="Preço"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          {errors.price && (
            <p className="text-sm text-red-500 p-1">{errors.price.message}</p>
          )}
          <input
            {...register('description')}
            placeholder="Descrição"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          {errors.description && (
            <p className="text-sm text-red-500 p-1">
              {errors.description.message}
            </p>
          )}
          <CategoryOptions />
          <input
            {...register('images')}
            placeholder="Imagens"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          {errors.images && (
            <p className="text-sm text-red-500 p-1">{errors.images.message}</p>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {title}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
