import { object, string } from 'yup'

export const UserValidation = () =>
  object({
    email: string().required('Campo obrigatório'),
    password: string().required('Campo obrigatório'),
    name: string().required('Campo obrigatório'),
    role: string().required('Campo obrigatório'),
    avatar: string().required('Campo obrigatório'),
  })
