import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { AxiosRequestConfig } from 'axios'
import { getServerSession } from 'next-auth'

export const addAuthentication = async (
  config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  const session = await getServerSession(nextAuthOptions)

  if (session?.user) {
    const token = session.user.access_token

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  return config
}
