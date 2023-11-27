interface ProductProps {
  params: {
    id: string
  }
}

export default function Product({ params }: ProductProps) {
  return (
    <div className="product-info">
      <div>
        <h2>{params.id}</h2>
      </div>
    </div>
  )
}
