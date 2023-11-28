'use client'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { ProductForm } from '../components/ProductForm'
import { updateProduct } from '@/app/products/lib'
import { Product, UpdateProductProps } from '@/types/Products'
import { useRouter, useSearchParams } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { UpdateProductValidation } from '../validators'

export default function Update() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const result = searchParams.get('product')
  const product = result ? (JSON.parse(result) as Product) : null

  const validation = UpdateProductValidation()

  const defaultFormValues = product
    ? {
        id: product.id.toString(),
        title: product.title,
        price: product.price.toString(),
        description: product.description,
        categoryId: product.category.id,
        images: product.images,
      }
    : {}

  const methods = useForm<UpdateProductProps>({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: defaultFormValues,
  })

  const handleUpdate: SubmitHandler<UpdateProductProps> = async (values) => {
    const response = await updateProduct({ data: values })

    if (response?.status === 200) router.back()
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleUpdate)}>
          <ProductForm title="Atualizar" />
        </form>
      </FormProvider>
    </>
  )
}
