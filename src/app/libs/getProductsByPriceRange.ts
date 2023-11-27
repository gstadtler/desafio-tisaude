import { Product } from '@/types/Products'
import { apiFetch } from '@/services/api'

interface Props {
  minPrice: string
  maxPrice: string
}

export async function getProductsByPriceRange({ minPrice, maxPrice }: Props) {
  try {
    const { data } = await apiFetch({
      url: `/products?price_min=${minPrice}&price_max=${maxPrice}`,
    })

    if (data) return data as Product[]
  } catch (error) {
    console.error(error)
  }

  return null
}
