import { Product } from '@/types/Products'
import { apiFetch } from '@/services/api'

interface Props {
  title: string
}

export async function getProductsByTitle({ title }: Props) {
  try {
    const { data } = await apiFetch({
      url: `/products?title=${title}`,
    })

    if (data) return data as Product[]
  } catch (error) {
    console.error(error)
  }

  return null
}
