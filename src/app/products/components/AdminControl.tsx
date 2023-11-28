'use client'
import { Product } from '@/types/Products'
import { deleteProduct } from '@/app/products/lib'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@/hooks/useUser'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface AdminControlProps {
  product?: Product
}

export function AdminControl({ product }: AdminControlProps) {
  const { isAdminUser } = useUser()
  const pathname = usePathname()
  const router = useRouter()

  if (!isAdminUser) return

  const isProductsPage = pathname === '/products'

  const handleDelete = async () => {
    if (product) {
      const response = await deleteProduct({ id: product.id })

      if (response?.status === 200) router.replace('/products')
    }
  }

  return (
    <>
      {isProductsPage ? (
        <Link
          href="/products/create"
          className="bg-indigo-500 text-white rounded-md p-2 font-medium"
        >
          Cadastrar produto
        </Link>
      ) : (
        <div className="flex gap-6">
          <div className="flex items-center gap-2 ">
            <Link
              href={{
                pathname: '/products/update',
                query: { product: JSON.stringify(product) },
              }}
              className="text-green-600 font-medium hover:font-bold hover:text-lg"
            >
              Editar produto
            </Link>
            <PencilIcon className="block h-5 w-5 text-green-600" />
          </div>
          <div className="flex items-center gap-2 ">
            <button
              onClick={handleDelete}
              className="text-indigo-600 font-medium hover:font-bold hover:text-lg"
            >
              Excluir produto
            </button>
            <TrashIcon className="block h-5 w-5 text-indigo-600" />
          </div>
        </div>
      )}
    </>
  )
}
