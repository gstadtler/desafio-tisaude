import { Product } from '@/types/Products'
import { apiFetch } from '@/services/api'

interface Props {
  price: string
}

export async function getProductsByPrice({ price }: Props) {
  try {
    const { data } = await apiFetch({
      url: `/products?price=${price}`,
    })

    if (data) return data as Product[]
  } catch (error) {
    console.error(error)
  }

  return null
}
