import { apiFetch } from '@/services/api'
import { RegisterValues } from '@/types/User'

interface Props {
  payload: RegisterValues
}

export async function register({ payload }: Props) {
  try {
    const response = await apiFetch({
      url: '/users',
      method: 'POST',
      data: payload,
    })

    return response
  } catch (error) {
    console.error(error)
  }

  return null
}
