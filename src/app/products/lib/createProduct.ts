// import { CreateProductProps, Product } from '@/types/Products'
import { apiFetch } from '@/services/api'

interface Props {
  title: string
  price: string
  description: string
  categoryId: number
  images: string[]
}

export async function createProduct({ payload }: { payload: Props }) {
  try {
    const response = await apiFetch({
      url: '/products',
      method: 'POST',
      data: payload,
    })

    return response
  } catch (error) {
    console.error(error)
  }

  return null
}
