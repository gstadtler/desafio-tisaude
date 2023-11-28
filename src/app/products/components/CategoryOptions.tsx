'use client'
import { apiFetch } from '@/services/api'
import { Category } from '@/types/Products'
import { useEffect, useState } from 'react'
import { useFormContext, useController } from 'react-hook-form'

export function CategoryOptions() {
  const [categories, setCategories] = useState<Category[]>([] as Category[])
  const { control } = useFormContext()

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name: 'categoryId',
  })

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await apiFetch({
        url: '/categories',
      })
      if (data) setCategories(data)
    }
    fetchCategories()
  }, [])

  return (
    <>
      <label className="text-sm text-gray-500 pr-2">Categoria</label>
      <select onChange={(e) => field.onChange(e)} value={field.value}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500 p-1">{error.message}</p>}
    </>
  )
}
