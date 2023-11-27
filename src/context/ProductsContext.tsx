'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '@/types/Products'

interface ProductsContextType {
  products: Product[]
  setProducts: (data: Product[]) => void
}

export const ProductsContext = createContext({} as ProductsContextType)

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [stateProducts, setStateProducts] = useState<Product[]>([])

  const setProducts = (data: Product[]) => setStateProducts(data)

  const value = {
    products: stateProducts,
    setProducts,
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => {
  return useContext(ProductsContext)
}
