'use client'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { ProductForm } from '../components/ProductForm'
import { createProduct } from '@/app/products/lib'
import { CreateProductProps } from '@/types/Products'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { CreateProductValidation } from '../validators'

export default function Create() {
  const router = useRouter()
  const validation = CreateProductValidation()

  const methods = useForm<CreateProductProps>({
    resolver: yupResolver(validation),
    mode: 'onChange',
  })

  const handleCreate: SubmitHandler<CreateProductProps> = async (values) => {
    const images = [values.images]
    const payload = {
      ...values,
      images,
    }

    const response = await createProduct({ payload })

    if (response?.status === 201) router.push('/products')
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleCreate)}>
          <ProductForm title="Cadastrar" />
        </form>
      </FormProvider>
    </>
  )
}
