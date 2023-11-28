/* eslint-disable @next/next/no-img-element */
import { apiFetch } from '@/services/api'
import { Product } from '@/types/Products'
import { AdminControl } from '../components/AdminControl'

interface ProductProps {
  params: {
    id: string
  }
}

export default async function Product({ params }: ProductProps) {
  const productId = params.id

  const { data } = await apiFetch({
    url: `/products/${productId}`,
  })

  if (!data) return

  const product = data as Product

  return (
    <div>
      <div className="pt-6">
        <div className="flex justify-center">
          <div className="max-w-lg sm:px-6 lg:grid lg:max-w-2xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[1]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[2]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <p className="text-3xl tracking-tight text-gray-900">
                ${product.price}
              </p>
            </div>
            <div>
              <div className="space-y-6">
                <p className="text-base text-gray-600 font-medium">
                  {product.description}
                </p>
              </div>
            </div>
            <AdminControl product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}
