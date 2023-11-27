export interface FilterBy {
  title: string
  price: string
  minPrice: string
  maxPrice: string
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
