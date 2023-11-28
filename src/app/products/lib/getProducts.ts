import { Product } from '@/types/Products'
import { apiFetch } from '@/services/api'

export async function getProducts() {
  try {
    const { data } = await apiFetch({
      url: '/products',
    })

    if (data) return data as Product[]
  } catch (error) {
    console.error(error)
  }

  return null
}
