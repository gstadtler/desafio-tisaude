import { apiFetch } from '@/services/api'

interface Props {
  id: number
}

export async function deleteProduct({ id }: Props) {
  try {
    const response = await apiFetch({
      url: `/products/${id}`,
      method: 'DELETE',
    })

    return response
  } catch (error) {
    console.error(error)
  }

  return null
}
