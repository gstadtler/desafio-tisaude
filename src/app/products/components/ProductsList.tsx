import { ProductCard } from './ProductCard'
import { Product } from '@/types/Products'

interface ProductsListProps {
  products: Product[] | null
}

export function ProductsList({ products }: ProductsListProps) {
  if (!products?.length) return <p>Nehum resultado foi encontrado</p>

  return (
    <div className="grid grid-cols-3 gap-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
