'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FilterBy, Filters, Product } from '@/types/Products'
import { useEffect, useState } from 'react'
import { filter, getProducts } from '../libs'
import { ProductsList } from './components/ProductsList'

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
    const data = await getProducts()
    if (data) setProducts(data)
    reset()
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
        <FilterByPriceRange />
      </div>
      <ProductsList products={products} />
    </>
  )
}

function FilterByPriceRange() {
  const { register, handleSubmit, reset } = useForm<FilterBy>()

  const onSubmit: SubmitHandler<FilterBy> = async ({ minPrice, maxPrice }) => {
    console.log(
      '🚀 ~ file: FilterBar.tsx:10 ~ FilterBar ~ title, price:',
      minPrice,
      maxPrice,
    )
  }

  const handleCleanupFilters = () => {
    reset()
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
