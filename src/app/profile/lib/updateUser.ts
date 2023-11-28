import { apiFetch } from '@/services/api'
import { UpdateUser } from '@/types/User'

interface Props {
  payload: UpdateUser
  userId: string
}

export async function updateUser({ payload, userId }: Props) {
  try {
    const response = await apiFetch({
      url: `/users/${userId}`,
      method: 'PUT',
      data: payload,
    })

    return response
  } catch (error) {
    console.error(error)
  }

  return null
}
