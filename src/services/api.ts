import axios, { AxiosRequestConfig } from 'axios'
import { addAuthentication } from './helpers/addAuthentication'

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// api.interceptors.request.use(async (request) => {
//   const withoutAuth = !request.url?.includes('auth')
//   if (withoutAuth) {
//     await addAuthentication(request)
//   }
//   return request
// })

export const apiFetch = (requestConfig: AxiosRequestConfig) =>
  api.request(requestConfig)
