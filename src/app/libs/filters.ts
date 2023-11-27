import { Product, FilterTypes, Filters } from '@/types/Products'
import {
  getProducts,
  getProductsByTitle,
  getProductsByPrice,
  getProductsByPriceRange,
} from '.'

export async function filter({ filterBy, filterValue }: FilterTypes) {
  let products = [] as Product[] | null

  switch (filterBy) {
    case Filters.title:
      products = await getProductsByTitle({ title: filterValue.firstValue })
      break
    case Filters.price:
      products = await getProductsByPrice({ price: filterValue.firstValue })
      break
    case Filters.priceRange:
      if (filterValue.secondValue) {
        products = await getProductsByPriceRange({
          minPrice: filterValue.firstValue,
          maxPrice: filterValue.secondValue,
        })
      }
      break
    default:
      products = await getProducts()
      break
  }

  return products
}
