import { Product } from '@/types/Products'
import styles from '../styles/card.module.css'
import Link from 'next/link'
// import { ImageCarousel } from './ImageCarousel'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <Link
        href={`/products/${product.id}`}
        style={{ textDecoration: 'none', color: '#000' }}
      >
        {/* <ImageCarousel images={product.images} /> */}
        <div className="product-info">
          <div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
          </div>
          <h4>{product.price}</h4>
        </div>
      </Link>
    </div>
  )
}
