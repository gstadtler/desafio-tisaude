import { array, number, object, string } from 'yup'

export const CreateProductValidation = () =>
  object({
    title: string().required('Campo obrigatório'),
    price: string()
      .required('Campo obrigatório')
      .matches(/^[0-9]+$/, 'Preencha apenas com números'),
    description: string().required('Campo obrigatório'),
    categoryId: number().required('Campo obrigatório'),
    images: string().required('Campo obrigatório'),
  })
