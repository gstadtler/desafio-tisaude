import { apiFetch } from '@/services/api'
import { UpdateProductProps } from '@/types/Products'

interface Props {
  data: UpdateProductProps
}

export async function updateProduct({ data }: Props) {
  const { id, ...payload } = data
  try {
    const response = await apiFetch({
      url: `/products/${id}`,
      method: 'PUT',
      data: payload,
    })

    return response
  } catch (error) {
    console.error(error)
  }

  return null
}
