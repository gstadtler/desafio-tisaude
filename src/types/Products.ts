interface PriceRange {
  minPrice: string
  maxPrice: string
}
export interface FilterBy {
  title: string
  price: string
  priceRange: PriceRange
}

export interface Category {
  id: number
  name: string
  image: string
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: Category
  images: string[]
}

interface FilterValue {
  firstValue: string
  secondValue?: string
}

export interface FilterTypes {
  filterBy: string
  filterValue: FilterValue
}

export enum Filters {
  title = 'TITLE',
  price = 'PRICE',
  priceRange = 'PRICE RANGE',
}

export interface CreateProductProps {
  title: string
  price: string
  description: string
  categoryId: number
  images: string
}

export interface UpdateProductProps {
  title: string
  price: string
  description: string
  categoryId: number
  images: string[]
}
