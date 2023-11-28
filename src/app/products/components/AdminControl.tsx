'use client'
import { useSession } from 'next-auth/react'
import { isAdmin } from '@/app/helpers/roles'
import { Product } from '@/types/Products'
import { deleteProduct } from '@/app/products/lib'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

interface AdminControlProps {
  product?: Product
}

export function AdminControl({ product }: AdminControlProps) {
  const session = useSession()
  const pathname = usePathname()
  const router = useRouter()

  if (!session) return

  const isAdminUser = session.data && isAdmin(session.data.user.role)

  if (!isAdminUser) return

  const isProductsPage = pathname === '/products'

  // const handleCreate = async () => console.log('worst')

  // const handleUpdate = async () => console.log('worst')

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
          className="bg-blue-500 text-white rounded-md p-1"
        >
          Cadastrar produto
        </Link>
      ) : (
        <div className="flex gap-3">
          <Link
            href={{
              pathname: '/products/update',
              query: { product: JSON.stringify(product) },
            }}
            className="bg-blue-500 text-white rounded-md p-1"
          >
            Editar produto
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white rounded-md p-1"
          >
            Excluir produto
          </button>
        </div>
      )}
    </>
  )
}
