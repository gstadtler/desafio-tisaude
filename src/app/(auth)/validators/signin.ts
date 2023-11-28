import { object, string } from 'yup'

export const SigninValidation = () =>
  object({
    email: string()
      .email('Insira um email válido')
      .required('Campo obrigatório'),
    password: string()
      .min(4, 'A senha precisa ter ao menos 4 caracteres')
      .required('Campo obrigatório'),
  })
