'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FilterBy, Filters, Product } from '@/types/Products'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { filter, getProducts } from './lib'
import { ProductsList } from './components/ProductsList'
import { AdminControl } from './components/AdminControl'

interface FilterByPriceRangeProps {
  setProducts: Dispatch<SetStateAction<Product[]>>
}

export default function Products() {
  const [products, setProducts] = useState([] as Product[])
  const { register, handleSubmit, reset } = useForm<FilterBy>()

  useEffect(() => {
    async function loadData() {
      const data = await getProducts()
      if (data) setProducts(data)
    }
    loadData()
  }, [])

  const onSubmit: SubmitHandler<FilterBy> = async ({ title, price }) => {
    if (title && !price) {
      const filteredData = await filter({
        filterBy: Filters.title,
        filterValue: { firstValue: title },
      })

      if (filteredData) setProducts(filteredData)
    }

    if (price && !title) {
      const filteredData = await filter({
        filterBy: Filters.price,
        filterValue: { firstValue: price },
      })

      if (filteredData) setProducts(filteredData)
    }
  }

  const handleCleanupFilters = async () => {
    reset()
    const data = await getProducts()
    if (data) setProducts(data)
  }

  return (
    <>
      <div className="flex gap-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="search by title" {...register('title')} />
          <input placeholder="search by price" {...register('price')} />
          <button type="submit">filter</button>
        </form>
        <div>
          <button onClick={handleCleanupFilters}>clean filter</button>
        </div>
        <FilterByPriceRange setProducts={setProducts} />
      </div>
      <div className="flex justify-end">
        <AdminControl />
      </div>
      <ProductsList products={products} />
    </>
  )
}

function FilterByPriceRange({ setProducts }: FilterByPriceRangeProps) {
  const { register, handleSubmit, reset } = useForm<FilterBy>()

  const onSubmit: SubmitHandler<FilterBy> = async ({ minPrice, maxPrice }) => {
    const filteredData = await filter({
      filterBy: Filters.priceRange,
      filterValue: {
        firstValue: minPrice,
        secondValue: maxPrice,
      },
    })

    if (filteredData) setProducts(filteredData)
  }

  const handleCleanupFilters = async () => {
    reset()
    const data = await getProducts()
    if (data) setProducts(data)
  }

  return (
    <div className="flex gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="min price" {...register('minPrice')} />
        <input placeholder="max price" {...register('maxPrice')} />
        <button type="submit">filter</button>
      </form>
      <div>
        <button onClick={handleCleanupFilters}>clean filter</button>
      </div>
    </div>
  )
}
