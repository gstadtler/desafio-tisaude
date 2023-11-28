'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FilterBy, Filters, Product } from '@/types/Products'
import { Suspense, useEffect, useState } from 'react'
import { filter, getProducts } from './lib'
import { ProductsList } from './components/ProductsList'
import { AdminControl } from './components/AdminControl'
import {
  MagnifyingGlassIcon,
  XCircleIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline'

export default function Products() {
  const [products, setProducts] = useState([] as Product[])
  const [titleFilterMarker, setTitleFilterMarker] = useState(false)
  const [priceFilterMarker, setPriceFilterMarker] = useState(false)
  const [priceRangeFilterMarker, setPriceRangeFilterMarker] = useState(false)

  const { register, handleSubmit, reset } = useForm<FilterBy>()

  useEffect(() => {
    async function loadData() {
      const data = await getProducts()
      if (data) setProducts(data)
    }
    loadData()
  }, [])

  const onSubmit: SubmitHandler<FilterBy> = async ({
    title,
    price,
    priceRange,
  }) => {
    if (title) {
      setTitleFilterMarker(true)

      const filteredData = await filter({
        filterBy: Filters.title,
        filterValue: { firstValue: title },
      })

      if (filteredData) setProducts(filteredData)
    }

    if (price) {
      setPriceFilterMarker(true)

      const filteredData = await filter({
        filterBy: Filters.price,
        filterValue: { firstValue: price },
      })

      if (filteredData) setProducts(filteredData)
    }

    if (priceRange?.minPrice && priceRange?.maxPrice) {
      setPriceRangeFilterMarker(true)

      const filteredData = await filter({
        filterBy: Filters.priceRange,
        filterValue: {
          firstValue: priceRange.minPrice,
          secondValue: priceRange.maxPrice,
        },
      })

      if (filteredData) setProducts(filteredData)
    }
  }

  const handleFetchProducts = async () => {
    const data = await getProducts()
    if (data) setProducts(data)
  }

  const handleCleanTitleFilterMarker = () => {
    setTitleFilterMarker(false)
    reset()
    handleFetchProducts()
  }
  const handleCleanPriceFilterMarker = () => {
    setPriceFilterMarker(false)
    reset()
    handleFetchProducts()
  }

  const handleCleanPriceRangeFilterMarker = () => {
    setPriceRangeFilterMarker(false)
    reset()
    handleFetchProducts()
  }

  return (
    <>
      <div className="flex items-center mt-6 justify-end gap-4">
        <div className="flex items-center gap-2 font-medium text-indigo-600">
          <FunnelIcon className="block h-5 w-5 text-indigo-600" />
          <h3>Filtros</h3>
        </div>
        {titleFilterMarker && (
          <button
            onClick={handleCleanTitleFilterMarker}
            className="flex items-center gap-1 hover:font-medium"
          >
            <p>Título</p>
            <XCircleIcon className="block h-5 w-5 text-gray-900" />
          </button>
        )}
        {priceFilterMarker && (
          <button
            onClick={handleCleanPriceFilterMarker}
            className="flex items-center gap-1 hover:font-medium"
          >
            <p>Preço</p>
            <XCircleIcon className="block h-5 w-5 text-gray-900" />
          </button>
        )}
        {priceRangeFilterMarker && (
          <button
            onClick={handleCleanPriceRangeFilterMarker}
            className="flex items-center gap-1 hover:font-medium"
          >
            <p>Faixa de preço</p>
            <XCircleIcon className="block h-5 w-5 text-gray-900" />
          </button>
        )}
      </div>
      <div className="flex mt-6 justify-end">
        <div className="flex items-center gap-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 md:flex-row"
          >
            <input
              placeholder="search by title"
              {...register('title')}
              className="rounded-xl border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <input
              placeholder="search by price"
              {...register('price')}
              className="rounded-xl border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <input
              placeholder="min price"
              {...register('priceRange.minPrice')}
              className="rounded-xl border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <input
              placeholder="max price"
              {...register('priceRange.maxPrice')}
              className="rounded-xl border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button type="submit">
              <MagnifyingGlassIcon className="block h-6 w-6 text-gray-900" />
            </button>
          </form>
        </div>
      </div>
      <div className="pl-8 mt-8">
        <AdminControl />
      </div>
      <Suspense fallback={<p>loading...</p>}>
        <ProductsList products={products} />
      </Suspense>
    </>
  )
}
